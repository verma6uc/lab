package ai.yuvi.util;

import ai.yuvi.config.DataSourceProvider;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * The {@code DbUtil} class provides methods to initialize and get database connections.
 * After calling init(), it uses DataSourceProvider which reads from application.properties.
 */
public class DbUtil {

    private static DataSource dataSource;
    private static boolean initialized = false;

    /**
     * Initializes the DataSource by loading configuration from application.properties via DataSourceProvider.
     * Only call once at application startup.
     */
    public static void init() {
        if (!initialized) {
            dataSource = DataSourceProvider.getDataSource();
            initialized = true;
        }
    }

    public static Connection getConnection() throws SQLException {
        if (!initialized || dataSource == null) {
            throw new IllegalStateException("DbUtil not initialized. Call DbUtil.init() first.");
        }
        return dataSource.getConnection();
    }
}
