package ai.yuvi.service;

import ai.yuvi.dao.CompanyBrandDao;
import ai.yuvi.dao.CompanyDao;
import ai.yuvi.dao.CompanyProductDao;
import ai.yuvi.model.Company;
import ai.yuvi.util.BrandDataExtractor;
import ai.yuvi.util.DbUtil;
import ai.yuvi.util.WebScraper;
import ai.yuvi.util.WebScraper.WebsiteData;

import com.theokanning.openai.completion.chat.ChatMessage;

import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * The {@code ResearchAgent} now:
 * <ol>
 *   <li>Asks the LLM if the company truly exists in the real world and requests a known website URL if we don't have one.</li>
 *   <li>If the LLM confirms existence, we proceed. If not confirmed, we may handle differently (e.g., mark as new/unverified).</li>
 *   <li>Scrape the website content. (If no website found by LLM, we may rely on user-provided URL or fail gracefully.)</li>
 *   <li>Optionally take screenshots of main pages (this step is commented as it depends on external tooling).
 *       Then, feed that information back into the LLM to identify UI archetypes and brand patterns.</li>
 *   <li>Get brand details, UI archetypes, product info, competitor analysis, etc., from LLM.</li>
 *   <li>Update database with richer data, including archetypes.</li>
 * </ol>
 *
 * This is a more elaborate workflow relying heavily on prompt engineering and multiple LLM calls.
 */
public class ResearchAgent {

    private static final Logger LOGGER = Logger.getLogger(ResearchAgent.class.getName());

    private final CompanyDao companyDao;
    private final CompanyBrandDao companyBrandDao;
    private final CompanyProductDao companyProductDao;
    private final OpenAIRegistry openAIRegistry;
    private final WebScraper webScraper;
    private final BrandDataExtractor brandDataExtractor;

    public ResearchAgent(CompanyDao companyDao,
                         CompanyBrandDao companyBrandDao,
                         CompanyProductDao companyProductDao,
                         OpenAIRegistry openAIRegistry,
                         WebScraper webScraper,
                         BrandDataExtractor brandDataExtractor) {
        this.companyDao = companyDao;
        this.companyBrandDao = companyBrandDao;
        this.companyProductDao = companyProductDao;
        this.openAIRegistry = openAIRegistry;
        this.webScraper = webScraper;
        this.brandDataExtractor = brandDataExtractor;
    }

    /**
     * Perform advanced research:
     * 1. Ask LLM if the company exists and try to get website URL if not provided.
     * 2. If company confirmed, check DB: if not found, create a local record.
     * 3. Scrape website data.
     * 4. (Optionally) Take screenshots of main pages and feed that info into LLM.
     * 5. Ask LLM for UI archetypes, brand details, competitors, and products based on all gathered info.
     * 6. Update database with this richer dataset.
     */
    public Company performAdvancedResearch(String companyName, String websiteUrl, String contextName) throws SQLException {
        // Step 1: Confirm existence and get website
        CompanyExistenceResult existenceResult = confirmCompanyExistence(companyName, websiteUrl);

        if (!existenceResult.exists) {
            LOGGER.info("LLM indicates the company '" + companyName + "' does not seem to exist.");
            // Decide what to do if company doesn't exist:
            // Maybe create a stub record or just return?
            // For now, we return a newly created company with limited info.
            Company c = new Company();
            c.setCompanyName(companyName + " (Unverified)");
            c.setCreatedAt(OffsetDateTime.now());
            c.setUpdatedAt(OffsetDateTime.now());
            long companyId = companyDao.insertCompany(c);
            LOGGER.info("Created unverified company with ID: " + companyId);
            return companyDao.findById(companyId);
        }

        // If we get here, the company exists. Check DB and create if not present
        Company c = companyDao.findByName(companyName);
        long companyId;
        if (c == null) {
            c = new Company();
            c.setCompanyName(companyName);
            c.setCreatedAt(OffsetDateTime.now());
            c.setUpdatedAt(OffsetDateTime.now());
            companyId = companyDao.insertCompany(c);
            LOGGER.info("Created new company with ID: " + companyId);
        } else {
            companyId = c.getCompanyId();
            LOGGER.info("Found existing company with ID: " + companyId);
        }

        // Use confirmed or retrieved website URL from existenceResult
        if (websiteUrl == null || websiteUrl.trim().isEmpty()) {
            websiteUrl = existenceResult.websiteUrl;
        }

        // Step 3: Scrape website data if URL is available
        String websiteText = null;
        if (websiteUrl != null && !websiteUrl.isEmpty()) {
            String rawHtml = webScraper.fetchHTML(websiteUrl);
            if (rawHtml != null) {
                WebsiteData wd = webScraper.extractBasicTextAndImages(rawHtml);
                websiteText = wd.getTextContent();
            }
        }

        // Step 4: (Optional) Take screenshots.
        // Pseudocode:
        // List<String> screenshotPaths = takeScreenshotsOfMainPages(websiteUrl);
        // For demonstration, we won't implement this method. Just assume we have them.
        // We might feed descriptions of these screenshots or their metadata into the LLM.

        // Step 5: Ask LLM for brand details, UI archetypes, product info.
        String richPrompt = buildAdvancedPrompt(companyName, websiteUrl, websiteText /*, screenshot info if available*/);

        // Logging and context for LLM calls
        String goal = "Comprehensive Research on company: " + companyName;
        Integer applicationContext = (int) companyId;

        List<ChatMessage> chatMessages = promptToChatMessages(richPrompt);
        String llmResponse = openAIRegistry.chatCompletionGPT35(chatMessages, goal, applicationContext, contextName);

        // The llmResponse might now include lines like:
        // "Brand colors: Blue, White
        // Font: Roboto
        // Logo URL: http://example.com/logo.png
        // Products: Yuvi Assistant, Yuvi Analytics
        // UI Archetypes: Minimalist navigation bar, card-based product listings, responsive grid layout
        // Competitors: Company A, Company B"

        // Step 6: Parse brand and possibly archetype data. 
        // The BrandDataExtractor currently focuses on brand attributes and products. We may extend it to parse archetypes.
        // For demo, let's say we just parse brand and products, and we have another method to parse archetypes.
        BrandDataExtractor.ParsedBrandData parsedData = brandDataExtractor.parseBrandData(llmResponse);

        // Extract UI archetypes from the response - we'd need another parser or extend BrandDataExtractor:
        String archetypes = parseArchetypes(llmResponse); 
        // parseArchetypes is a placeholder method to be implemented similarly to brandDataExtractor.

        // Update DB with brand info
        upsertCompanyBrand(companyId, parsedData);

        // Update products
        for (String productName : parsedData.getProducts()) {
            insertOrUpdateCompanyProduct(companyId, productName);
        }

        // Update archetypes
        // Suppose we have a CompanyUiArchetypeDao and we store archetypes:
        // insertArchetypes(companyId, archetypes);

        return companyDao.findById(companyId);
    }

    /**
     * Ask the LLM if the company exists in the real world, and if so, what its known website might be.
     * For demonstration, we just do one call. In reality, you'd refine the prompt and possibly call multiple times.
     */
    private CompanyExistenceResult confirmCompanyExistence(String companyName, String websiteUrlProvided) {
        String existencePrompt = "You are an expert in global companies. Does the company named '" + companyName + 
            "' exist as a real, notable business in the world? If yes, provide its official website URL if known. " +
            "If you are not sure, say that you are not sure.";

        List<ChatMessage> messages = promptToChatMessages(existencePrompt);
        String goal = "Check real-world existence of " + companyName;
        Integer applicationContext = null; // no company_id yet
        String contextName = "ExistenceCheck";
        String response = openAIRegistry.chatCompletionGPT35(messages, goal, applicationContext, contextName);

        // Parse response. Suppose response might say:
        // "Yes, Yuvi.ai exists. The official website is https://www.yuvi.ai"
        // or "I'm not sure about the existence of this company."
        boolean exists = response.toLowerCase().contains("yes");
        String foundWebsite = null;
        if (exists) {
            // Extract the URL from the response if present:
            foundWebsite = extractWebsiteFromLLMResponse(response);
            if ((foundWebsite == null || foundWebsite.isEmpty()) && websiteUrlProvided != null && !websiteUrlProvided.isEmpty()) {
                foundWebsite = websiteUrlProvided;
            }
        }

        return new CompanyExistenceResult(exists, foundWebsite);
    }

    /**
     * Build a more advanced prompt asking for:
     * - Brand identity (colors, fonts, logo)
     * - Products and services
     * - UI/UX archetypes based on website or screenshots
     * - Competitors and differentiators
     *
     * This prompt is more comprehensive than the initial minimal version.
     */
    private String buildAdvancedPrompt(String companyName, String websiteUrl, String websiteText) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are a comprehensive research assistant.\n");
        sb.append("Company: ").append(companyName).append("\n");

        if (websiteUrl != null && !websiteUrl.isEmpty()) {
            sb.append("Official Website: ").append(websiteUrl).append("\n");
        } else {
            sb.append("No official website provided.\n");
        }

        if (websiteText != null && !websiteText.isEmpty()) {
            sb.append("Website Text Content (sampled):\n").append(websiteText).append("\n");
        }

        // If we had screenshot info:
        // sb.append("Based on provided webpage screenshots or their descriptions, identify common UI patterns.\n");

        sb.append("Please identify and return the following details in a structured, easy-to-parse format:\n");
        sb.append("- Brand colors\n");
        sb.append("- Font family\n");
        sb.append("- Logo URL\n");
        sb.append("- List of known products or services\n");
        sb.append("- UI Archetypes (e.g., type of navigation, layout patterns, design components)\n");
        sb.append("- Key competitors and how this company differentiates itself\n");

        sb.append("If you are not sure about any item, say 'Unknown'.\n");

        return sb.toString();
    }

    private List<ChatMessage> promptToChatMessages(String prompt) {
        List<ChatMessage> messages = new ArrayList<>();
        messages.add(new ChatMessage("user", prompt));
        return messages;
    }

    private void upsertCompanyBrand(long companyId, BrandDataExtractor.ParsedBrandData data) {
        try {
            String[] colors = data.getBrandColors() != null ? data.getBrandColors().split(",\\s*") : new String[0];
            String primaryColor = colors.length > 0 ? colors[0] : null;
            String secondaryColor = colors.length > 1 ? colors[1] : null;

            companyBrandDao.upsertCompanyBrand(companyId, primaryColor, secondaryColor, data.getFontFamily(), data.getLogoUrl());
            LOGGER.info("Updated brand details for company ID: " + companyId);
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Failed to update company brand data for company_id " + companyId, e);
        }
    }

    private void insertOrUpdateCompanyProduct(long companyId, String productName) {
        try {
            companyProductDao.insertOrUpdateProduct(companyId, productName);
            LOGGER.info("Inserted/updated product: " + productName + " for company ID: " + companyId);
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Failed to insert/update product " + productName + " for company_id " + companyId, e);
        }
    }

    /**
     * Placeholder method to extract website URL from LLM response.
     * In reality, you'd use regex or prompt engineering to ensure the LLM returns a clear line with the URL.
     */
    private String extractWebsiteFromLLMResponse(String response) {
        // Example: search for something like "http" substring and take that line
        String lower = response.toLowerCase();
        int idx = lower.indexOf("http");
        if (idx >= 0) {
            // Take substring from idx until next whitespace
            int end = lower.indexOf(' ', idx);
            if (end < 0) end = lower.length();
            return response.substring(idx, end).trim();
        }
        return null;
    }

    /**
     * Placeholder method to parse archetypes from LLM response.
     * Similar logic to BrandDataExtractor but for archetypes.
     */
    private String parseArchetypes(String llmResponse) {
        // For demonstration, just search for a line starting with "UI Archetypes:"
        String[] lines = llmResponse.split("\n");
        for (String line : lines) {
            if (line.toLowerCase().startsWith("ui archetypes:")) {
                return line.substring("ui archetypes:".length()).trim();
            }
        }
        return null;
    }

    // Placeholder class to store existence check results.
    private static class CompanyExistenceResult {
        boolean exists;
        String websiteUrl;
        CompanyExistenceResult(boolean exists, String websiteUrl) {
            this.exists = exists;
            this.websiteUrl = websiteUrl;
        }
    }

    // Placeholder for screenshot logic if implemented
    // private List<String> takeScreenshotsOfMainPages(String websiteUrl) { ... }
    public static void main(String[] args) {
  	  // Initialize DB from properties
      DbUtil.init();

      CompanyDao companyDao = new CompanyDao();
      CompanyBrandDao companyBrandDao = new CompanyBrandDao();
      CompanyProductDao companyProductDao = new CompanyProductDao();
      OpenAIRegistry openAIRegistry = new OpenAIRegistry(); 
      WebScraper webScraper = new WebScraper();
      BrandDataExtractor brandDataExtractor = new BrandDataExtractor();

      ResearchAgent agent = new ResearchAgent(companyDao, companyBrandDao, companyProductDao, openAIRegistry, webScraper, brandDataExtractor);

      try {
          Company updatedCompany = agent.performAdvancedResearch("Yuvi.ai", "http://yuvi.ai", "CompanyResearch");
          System.out.println("Research complete for: " + updatedCompany.getCompanyName());
      } catch (SQLException e) {
          e.printStackTrace();
      }

	}
}
