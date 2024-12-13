package ai.yuvi.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * The {@code BrandDataExtractor} class is responsible for analyzing textual responses from LLMs
 * and extracting structured brand-related attributes. For example, after calling OpenAI or Claude
 * to describe a company’s brand identity, products, and UI archetypes, this class attempts to parse
 * and combine that information into a usable data structure.
 * 
 * <p>Typical usage involves:
 * <ol>
 *   <li>Calling LLMs to get responses describing a company's brand, products, etc.</li>
 *   <li>Passing these responses to {@code BrandDataExtractor} to parse out structured info.</li>
 *   <li>Returning that structured data to higher-level services (e.g., ResearchAgent).</li>
 * </ol>
 * 
 * <p>This is a simplified example. In a real system, you might:
 * <ul>
 *   <li>Rely on JSON-formatted responses and parse with a JSON library.</li>
 *   <li>Use more sophisticated NLP or pattern matching.</li>
 * </ul>
 */
public class BrandDataExtractor {

    // Regex patterns for extracting brand attributes from LLM responses.
    // These are simplistic and rely on prompt engineering to ensure consistent formats.
    private static final Pattern COLOR_PATTERN = Pattern.compile("Brand colors?:\\s*([^\\n]+)", Pattern.CASE_INSENSITIVE);
    private static final Pattern FONT_PATTERN = Pattern.compile("Font(?: family)?:\\s*([^\\n]+)", Pattern.CASE_INSENSITIVE);
    private static final Pattern LOGO_PATTERN = Pattern.compile("Logo(?: URL)?:\\s*([^\\n]+)", Pattern.CASE_INSENSITIVE);
    private static final Pattern PRODUCTS_PATTERN = Pattern.compile("Products?:\\s*([^\\n]+)", Pattern.CASE_INSENSITIVE);

    /**
     * Combines LLM responses from different sources (e.g., OpenAI, Claude) and returns a structured data set.
     * 
     * @param openAIResponse   The textual response from an OpenAI model describing the brand.
     * @param claudeResponse   The textual response from a Claude model providing additional UI/UX or product info.
     * @return A {@link ParsedBrandData} object containing extracted brand attributes, products, etc.
     */
    public ParsedBrandData combineLLMResponses(String openAIResponse, String claudeResponse) {
        // In this example, we simply parse both responses and attempt to combine results.
        // If there's a conflict, openAIResponse takes precedence for demonstration.
        
        ParsedBrandData openAIData = parseBrandData(openAIResponse);
        ParsedBrandData claudeData = parseBrandData(claudeResponse);

        ParsedBrandData combined = new ParsedBrandData();

        combined.setBrandColors(chooseNonEmpty(openAIData.getBrandColors(), claudeData.getBrandColors()));
        combined.setFontFamily(chooseNonEmpty(openAIData.getFontFamily(), claudeData.getFontFamily()));
        combined.setLogoUrl(chooseNonEmpty(openAIData.getLogoUrl(), claudeData.getLogoUrl()));

        // Merge product lists
        List<String> combinedProducts = new ArrayList<>(openAIData.getProducts());
        for (String product : claudeData.getProducts()) {
            if (!combinedProducts.contains(product)) {
                combinedProducts.add(product);
            }
        }
        combined.setProducts(combinedProducts);

        return combined;
    }

    /**
     * Parses brand data from a single LLM response.
     * 
     * @param response The LLM response as a raw string.
     * @return A {@link ParsedBrandData} object extracted from the response.
     */
    public ParsedBrandData parseBrandData(String response) {
        ParsedBrandData data = new ParsedBrandData();

        // Extract brand colors
        data.setBrandColors(extractMatch(COLOR_PATTERN, response));
        // Extract font family
        data.setFontFamily(extractMatch(FONT_PATTERN, response));
        // Extract logo URL
        data.setLogoUrl(extractMatch(LOGO_PATTERN, response));
        // Extract products (split by commas)
        String productLine = extractMatch(PRODUCTS_PATTERN, response);
        if (productLine != null) {
            String[] productArray = productLine.split(",\\s*");
            for (String p : productArray) {
                data.getProducts().add(p.trim());
            }
        }

        return data;
    }

    /**
     * Extracts the first matching group from a pattern in a given text.
     */
    private String extractMatch(Pattern pattern, String text) {
        if (text == null) return null;
        Matcher m = pattern.matcher(text);
        if (m.find()) {
            return m.group(1).trim();
        }
        return null;
    }

    /**
     * Chooses a non-empty value from a primary or secondary string. 
     * If primary is non-empty, return primary; otherwise return secondary.
     */
    private String chooseNonEmpty(String primary, String secondary) {
        if (primary != null && !primary.isEmpty()) {
            return primary;
        }
        return secondary;
    }

    /**
     * A simple data class holding parsed brand data.
     */
    public static class ParsedBrandData {
        private String brandColors;
        private String fontFamily;
        private String logoUrl;
        private List<String> products = new ArrayList<>();

        public String getBrandColors() {
            return brandColors;
        }

        public void setBrandColors(String brandColors) {
            this.brandColors = brandColors;
        }

        public String getFontFamily() {
            return fontFamily;
        }

        public void setFontFamily(String fontFamily) {
            this.fontFamily = fontFamily;
        }

        public String getLogoUrl() {
            return logoUrl;
        }

        public void setLogoUrl(String logoUrl) {
            this.logoUrl = logoUrl;
        }

        public List<String> getProducts() {
            return products;
        }

        public void setProducts(List<String> products) {
            this.products = products;
        }
    }
}
