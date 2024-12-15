package ai.yuvi.modules.conversation.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

public class OpenAIRegistry {
    private static final Logger LOGGER = Logger.getLogger(OpenAIRegistry.class.getName());
    private static final Map<String, String> API_KEYS = new ConcurrentHashMap<>();
    private static final Map<String, Integer> API_KEY_USAGE = new ConcurrentHashMap<>();
    private static final Map<String, Long> LAST_RESET = new ConcurrentHashMap<>();
    private static final int RATE_LIMIT = 3000; // tokens per minute
    private static final long RESET_INTERVAL = 60 * 1000; // 1 minute in milliseconds

    public static void registerApiKey(String userId, String apiKey) {
        API_KEYS.put(userId, apiKey);
        API_KEY_USAGE.put(userId, 0);
        LAST_RESET.put(userId, System.currentTimeMillis());
        LOGGER.info("Registered API key for user: " + userId);
    }

    public static void removeApiKey(String userId) {
        API_KEYS.remove(userId);
        API_KEY_USAGE.remove(userId);
        LAST_RESET.remove(userId);
        LOGGER.info("Removed API key for user: " + userId);
    }

    public static String getApiKey(String userId) {
        return API_KEYS.get(userId);
    }

    public static boolean canUseTokens(String userId, int tokenCount) {
        if (!API_KEYS.containsKey(userId)) {
            LOGGER.warning("No API key registered for user: " + userId);
            return false;
        }

        long currentTime = System.currentTimeMillis();
        long lastReset = LAST_RESET.get(userId);
        
        // Check if we need to reset the usage counter
        if (currentTime - lastReset >= RESET_INTERVAL) {
            API_KEY_USAGE.put(userId, 0);
            LAST_RESET.put(userId, currentTime);
            LOGGER.info("Reset usage counter for user: " + userId);
        }

        int currentUsage = API_KEY_USAGE.get(userId);
        return (currentUsage + tokenCount) <= RATE_LIMIT;
    }

    public static void recordTokenUsage(String userId, int tokenCount) {
        if (!API_KEYS.containsKey(userId)) {
            LOGGER.warning("Attempted to record token usage for unregistered user: " + userId);
            return;
        }

        int currentUsage = API_KEY_USAGE.get(userId);
        API_KEY_USAGE.put(userId, currentUsage + tokenCount);
        LOGGER.info(String.format("User %s used %d tokens. Total usage: %d/%d", 
            userId, tokenCount, currentUsage + tokenCount, RATE_LIMIT));
    }

    public static Map<String, Object> getUsageStats(String userId) {
        Map<String, Object> stats = new HashMap<>();
        
        if (!API_KEYS.containsKey(userId)) {
            LOGGER.warning("Attempted to get usage stats for unregistered user: " + userId);
            return stats;
        }

        int currentUsage = API_KEY_USAGE.get(userId);
        long lastReset = LAST_RESET.get(userId);
        long currentTime = System.currentTimeMillis();
        long timeUntilReset = Math.max(0, RESET_INTERVAL - (currentTime - lastReset));

        stats.put("current_usage", currentUsage);
        stats.put("rate_limit", RATE_LIMIT);
        stats.put("remaining_tokens", RATE_LIMIT - currentUsage);
        stats.put("time_until_reset_ms", timeUntilReset);
        stats.put("time_until_reset_seconds", timeUntilReset / 1000);

        return stats;
    }

    public static void resetUsage(String userId) {
        if (!API_KEYS.containsKey(userId)) {
            LOGGER.warning("Attempted to reset usage for unregistered user: " + userId);
            return;
        }

        API_KEY_USAGE.put(userId, 0);
        LAST_RESET.put(userId, System.currentTimeMillis());
        LOGGER.info("Manually reset usage counter for user: " + userId);
    }

    public static void updateRateLimit(String userId, int newLimit) {
        if (!API_KEYS.containsKey(userId)) {
            LOGGER.warning("Attempted to update rate limit for unregistered user: " + userId);
            return;
        }

        // Implementation for updating rate limit per user
        // This is a placeholder - in a real implementation, you would:
        // 1. Validate the new limit
        // 2. Update the limit in a user-specific settings store
        // 3. Apply any business rules around limit changes
        LOGGER.info(String.format("Updated rate limit for user %s: %d -> %d", 
            userId, RATE_LIMIT, newLimit));
    }
}
