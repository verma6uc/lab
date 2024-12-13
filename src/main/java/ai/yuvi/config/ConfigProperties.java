package ai.yuvi.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Utility class to load configuration properties from the application.properties file.
 */
public class ConfigProperties {
    private static final Logger LOGGER = Logger.getLogger(ConfigProperties.class.getName());
    private static final Properties properties = new Properties();

    static {
        loadProperties();
    }

    private static void loadProperties() {
        try (InputStream input = ConfigProperties.class.getClassLoader().getResourceAsStream("application.properties")) {
            properties.load(input);
        } catch (IOException e) {
            LOGGER.log(Level.SEVERE, "Unable to load configuration properties", e);
        }
    }

    /**
     * Retrieves a property value by key.
     *
     * @param key The property key.
     * @return The property value or null if the key is not found.
     */
    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    /**
     * Retrieves a property value by key with a default value.
     *
     * @param key The property key.
     * @param defaultValue The default value if the property is not found.
     * @return The property value or default value if the key is not found.
     */
    public static String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }
}