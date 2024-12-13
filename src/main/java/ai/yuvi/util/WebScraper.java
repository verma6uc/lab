package ai.yuvi.util;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

/**
 * The {@code WebScraper} class is responsible for fetching web pages and extracting textual 
 * and image content. This is useful for the Research Agent, which may need a company’s
 * public website data to understand branding, products, or UI archetypes.
 *
 * <p>Typical Usage:
 * <ol>
 *   <li>Call {@link #fetchHTML(String)} with the company's homepage URL to get raw HTML.</li>
 *   <li>Call {@link #extractBasicTextAndImages(String)} to parse and extract main text and image URLs.</li>
 *   <li>Use this extracted data as input to the LLM for deeper analysis.</li>
 * </ol>
 */
public class WebScraper {

    private static final Logger LOGGER = Logger.getLogger(WebScraper.class.getName());

    /**
     * Fetches the raw HTML content from the given URL using Java's HttpClient.
     * 
     * @param url The web page URL.
     * @return The raw HTML content as a String, or null if an error occurs.
     */
    public String fetchHTML(String url) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder(URI.create(url)).GET().build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                return response.body();
            } else {
                LOGGER.warning("Failed to fetch HTML from " + url + " with status " + response.statusCode());
            }
        } catch (IOException | InterruptedException e) {
            LOGGER.severe("Error fetching HTML from " + url + ": " + e.getMessage());
        }
        return null;
    }

    /**
     * Extracts main textual content and image URLs from the provided HTML.
     * This uses Jsoup to parse the HTML and return a {@link WebsiteData} object
     * containing textual content and a list of image URLs.
     * 
     * @param html The raw HTML string.
     * @return A {@link WebsiteData} object with textContent and image URLs.
     */
    public WebsiteData extractBasicTextAndImages(String html) {
        WebsiteData data = new WebsiteData();
        if (html == null || html.isEmpty()) {
            return data;
        }

        Document doc = Jsoup.parse(html);

        // Extracting text content (e.g., paragraphs, headings)
        String text = doc.body() != null ? doc.body().text() : "";
        data.setTextContent(text);

        // Extracting image URLs
        doc.select("img[src]").forEach(img -> {
            String src = img.attr("abs:src");
            if (src != null && !src.isEmpty()) {
                data.getImages().add(src);
            }
        });

        return data;
    }

    /**
     * A simple data class holding extracted website content.
     * 
     * <p>{@code textContent}: The main textual content from the page's body.
     * <br>{@code images}: A list of image URLs found on the page.
     */
    public static class WebsiteData {
        private String textContent;
        private List<String> images = new ArrayList<>();

        public String getTextContent() {
            return textContent;
        }

        public void setTextContent(String textContent) {
            this.textContent = textContent;
        }

        public List<String> getImages() {
            return images;
        }

        public void setImages(List<String> images) {
            this.images = images;
        }
    }
}
