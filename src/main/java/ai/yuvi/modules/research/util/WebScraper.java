package ai.yuvi.modules.research.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class WebScraper {
    private static final Logger LOGGER = Logger.getLogger(WebScraper.class.getName());
    private static final int TIMEOUT_MS = 10000;

    public Map<String, String> scrapeCompetitorData(String url) {
        Map<String, String> data = new HashMap<>();
        try {
            Document doc = Jsoup.connect(url)
                .timeout(TIMEOUT_MS)
                .userAgent("Mozilla/5.0")
                .get();

            // Extract employee count
            data.put("employee_count", extractEmployeeCount(doc));
            
            // Extract location
            data.put("location", extractLocation(doc));
            
            // Extract other relevant data
            data.putAll(extractAdditionalData(doc));

        } catch (IOException e) {
            LOGGER.log(Level.WARNING, "Error scraping competitor data from " + url, e);
        }
        return data;
    }

    public List<String> scrapeProductFeatures(String url) {
        List<String> features = new ArrayList<>();
        try {
            Document doc = Jsoup.connect(url)
                .timeout(TIMEOUT_MS)
                .userAgent("Mozilla/5.0")
                .get();

            // Look for common feature list patterns
            Elements featureLists = doc.select("ul.features, ul.benefits, .feature-list");
            for (Element list : featureLists) {
                list.select("li").forEach(item -> features.add(item.text().trim()));
            }

        } catch (IOException e) {
            LOGGER.log(Level.WARNING, "Error scraping product features from " + url, e);
        }
        return features;
    }

    public Map<String, String> scrapePricingData(String url) {
        Map<String, String> pricing = new HashMap<>();
        try {
            Document doc = Jsoup.connect(url)
                .timeout(TIMEOUT_MS)
                .userAgent("Mozilla/5.0")
                .get();

            // Look for pricing information
            Elements pricingElements = doc.select(".pricing, .price, .plan");
            for (Element element : pricingElements) {
                String planName = extractPlanName(element);
                String price = extractPrice(element);
                if (planName != null && price != null) {
                    pricing.put(planName, price);
                }
            }

        } catch (IOException e) {
            LOGGER.log(Level.WARNING, "Error scraping pricing data from " + url, e);
        }
        return pricing;
    }

    private String extractEmployeeCount(Document doc) {
        // Common patterns for employee count
        String[] patterns = {
            "\\d+[\\s-]*employees?",
            "\\d+[\\s-]*people",
            "team of \\d+",
            "workforce of \\d+"
        };

        for (String pattern : patterns) {
            Elements elements = doc.getElementsMatchingOwnText(Pattern.compile(pattern, Pattern.CASE_INSENSITIVE));
            if (!elements.isEmpty()) {
                Matcher matcher = Pattern.compile("\\d+").matcher(elements.first().text());
                if (matcher.find()) {
                    return matcher.group();
                }
            }
        }
        return null;
    }

    private String extractLocation(Document doc) {
        // Common patterns for location information
        Elements locationElements = doc.select("[itemtype*='PostalAddress'], .location, .address");
        if (!locationElements.isEmpty()) {
            return locationElements.first().text().trim();
        }

        // Try meta tags
        Elements metaLocation = doc.select("meta[name*='location'], meta[property*='location']");
        if (!metaLocation.isEmpty()) {
            return metaLocation.first().attr("content");
        }

        return null;
    }

    private Map<String, String> extractAdditionalData(Document doc) {
        Map<String, String> data = new HashMap<>();

        // Extract social media links
        Elements socialLinks = doc.select("a[href*='linkedin.com'], a[href*='twitter.com'], a[href*='facebook.com']");
        socialLinks.forEach(link -> {
            String href = link.attr("href");
            if (href.contains("linkedin.com")) {
                data.put("linkedin", href);
            } else if (href.contains("twitter.com")) {
                data.put("twitter", href);
            } else if (href.contains("facebook.com")) {
                data.put("facebook", href);
            }
        });

        // Extract contact information
        Elements contactElements = doc.select(".contact, .contact-info");
        if (!contactElements.isEmpty()) {
            data.put("contact_info", contactElements.first().text().trim());
        }

        return data;
    }

    private String extractPlanName(Element element) {
        Elements nameElements = element.select(".plan-name, .pricing-title, h2, h3");
        return !nameElements.isEmpty() ? nameElements.first().text().trim() : null;
    }

    private String extractPrice(Element element) {
        Elements priceElements = element.select(".price, .amount, .cost");
        if (!priceElements.isEmpty()) {
            String priceText = priceElements.first().text().trim();
            // Extract numeric value and currency symbol
            Matcher matcher = Pattern.compile("[\\$£€]\\s*\\d+(?:\\.\\d{2})?").matcher(priceText);
            return matcher.find() ? matcher.group() : priceText;
        }
        return null;
    }
}
