package ai.yuvi.modules.brand.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import ai.yuvi.modules.brand.enums.UIArchetype;

public class BrandDataExtractor {
    private static final Logger LOGGER = Logger.getLogger(BrandDataExtractor.class.getName());

    public static Map<String, String> extractColorPalette(String html) {
        Map<String, String> colors = new HashMap<>();
        Pattern pattern = Pattern.compile("#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgb\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}\\)");
        Matcher matcher = pattern.matcher(html);
        
        while (matcher.find()) {
            String color = matcher.group();
            // Convert RGB to Hex if needed
            if (color.startsWith("rgb")) {
                color = rgbToHex(color);
            }
            colors.put(generateColorName(color), color);
        }
        
        return colors;
    }

    public static Map<String, String> extractTypography(String html) {
        Map<String, String> typography = new HashMap<>();
        Pattern fontPattern = Pattern.compile("font-family:\\s*([^;]+);");
        Matcher fontMatcher = fontPattern.matcher(html);
        
        while (fontMatcher.find()) {
            String fonts = fontMatcher.group(1).trim();
            String[] fontStack = fonts.split(",");
            for (String font : fontStack) {
                font = font.trim().replaceAll("['\"]", "");
                if (!font.equalsIgnoreCase("sans-serif") && !font.equalsIgnoreCase("serif")) {
                    typography.put(generateFontName(font), font);
                }
            }
        }
        
        return typography;
    }

    public static List<UIArchetype> analyzeUiArchetypes(String html, List<String> screenshots) {
        List<UIArchetype> archetypes = new ArrayList<>();
        Map<String, Double> scores = new HashMap<>();
        
        // Analyze color usage
        Map<String, String> colors = extractColorPalette(html);
        analyzeColors(colors, scores);
        
        // Analyze typography
        Map<String, String> fonts = extractTypography(html);
        analyzeFonts(fonts, scores);
        
        // Analyze layout and spacing
        analyzeLayout(html, scores);
        
        // Get top archetypes based on scores
        scores.entrySet().stream()
            .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
            .limit(3)
            .forEach(entry -> {
                try {
                    archetypes.add(UIArchetype.valueOf(entry.getKey().toUpperCase()));
                } catch (IllegalArgumentException e) {
                    LOGGER.warning("Invalid archetype name: " + entry.getKey());
                }
            });
        
        return archetypes;
    }

    private static String rgbToHex(String rgb) {
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(rgb);
        List<Integer> values = new ArrayList<>();
        
        while (matcher.find() && values.size() < 3) {
            values.add(Integer.parseInt(matcher.group()));
        }
        
        return String.format("#%02x%02x%02x", 
            values.get(0), values.get(1), values.get(2));
    }

    private static String generateColorName(String hexColor) {
        // Simple logic to generate color names based on hex values
        return "color_" + hexColor.substring(1);
    }

    private static String generateFontName(String fontFamily) {
        // Generate a clean font name
        return "font_" + fontFamily.toLowerCase()
            .replaceAll("[^a-z0-9]", "_")
            .replaceAll("_+", "_")
            .replaceAll("^_|_$", "");
    }

    private static void analyzeColors(Map<String, String> colors, Map<String, Double> scores) {
        int colorCount = colors.size();
        
        // Example scoring logic based on color count
        if (colorCount <= 3) {
            incrementScore(scores, "minimalist", 0.8);
            incrementScore(scores, "corporate", 0.6);
        } else if (colorCount <= 5) {
            incrementScore(scores, "modern", 0.7);
            incrementScore(scores, "tech_focused", 0.6);
        } else {
            incrementScore(scores, "playful", 0.7);
            incrementScore(scores, "artistic", 0.6);
        }
    }

    private static void analyzeFonts(Map<String, String> fonts, Map<String, Double> scores) {
        int fontCount = fonts.size();
        
        // Example scoring logic based on font count
        if (fontCount <= 2) {
            incrementScore(scores, "minimalist", 0.7);
            incrementScore(scores, "corporate", 0.6);
        } else if (fontCount <= 3) {
            incrementScore(scores, "modern", 0.6);
            incrementScore(scores, "tech_focused", 0.5);
        } else {
            incrementScore(scores, "artistic", 0.7);
            incrementScore(scores, "playful", 0.6);
        }
    }

    private static void analyzeLayout(String html, Map<String, Double> scores) {
        // Example layout analysis based on CSS classes and structure
        if (html.contains("grid") || html.contains("flex")) {
            incrementScore(scores, "modern", 0.6);
            incrementScore(scores, "tech_focused", 0.5);
        }
        
        if (html.contains("container") || html.contains("wrapper")) {
            incrementScore(scores, "corporate", 0.5);
            incrementScore(scores, "traditional", 0.4);
        }
        
        // Add more layout analysis logic as needed
    }

    private static void incrementScore(Map<String, Double> scores, String key, double value) {
        scores.merge(key, value, Double::sum);
    }
}
