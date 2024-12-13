package ai.yuvi.util;

import ai.yuvi.config.DataSourceProvider;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * The {@code DbUtil} class provides methods to initialize and get database connections.
 * After calling init(), it uses DataSourceProvider which reads from application.properties.
 */
public class DbUtil {
    private static final Logger LOGGER = Logger.getLogger(DbUtil.class.getName());
    private static volatile DataSource dataSource;
    private static volatile boolean initialized = false;

    /**
     * Initializes the DataSource by loading configuration from application.properties via DataSourceProvider.
     * Only call once at application startup.
     */
    public static synchronized void init() {
        if (!initialized) {
            try {
                dataSource = DataSourceProvider.getDataSource();
                // Test the connection to ensure it's properly configured
                try (Connection conn = dataSource.getConnection()) {
                    LOGGER.info("Database connection test successful");
                }
                initialized = true;
            } catch (SQLException e) {
                LOGGER.log(Level.SEVERE, "Failed to initialize database connection", e);
                throw new RuntimeException("Database initialization failed", e);
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Failed to test database connection", e);
                throw new RuntimeException("Database connection test failed", e);
            }
           }
    }

    public static Connection getConnection() throws SQLException {
        if (!initialized || dataSource == null) {
            init(); // Auto-initialize if not done yet
        }
        return dataSource.getConnection();
    }
}
