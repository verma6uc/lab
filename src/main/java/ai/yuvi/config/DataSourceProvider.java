package ai.yuvi.config;

import ai.yuvi.config.ConfigProperties;
import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * The {@code DataSourceProvider} class reads database configuration from application.properties via ConfigProperties
 * and sets up a c3p0 connection pool.
 */
public class DataSourceProvider {
    private static final Logger LOGGER = Logger.getLogger(DataSourceProvider.class.getName());
    private static DataSource dataSource;

    static {
        initDataSource();
    }

    private static void initDataSource() {
        String url = ConfigProperties.getProperty("database.url");
        String user = ConfigProperties.getProperty("database.username");
        String password = ConfigProperties.getProperty("database.password");

        String minPoolSize = ConfigProperties.getProperty("c3p0.minPoolSize", "5");
        String maxPoolSize = ConfigProperties.getProperty("c3p0.maxPoolSize", "100");
        String acquireIncrement = ConfigProperties.getProperty("c3p0.acquireIncrement", "10");
        String maxIdleTime = ConfigProperties.getProperty("c3p0.maxIdleTime", "1800");
        String unreturnedConnTimeout = ConfigProperties.getProperty("c3p0.unreturnedConnectionTimeout", "30");
        String debugUnreturned = ConfigProperties.getProperty("c3p0.debugUnreturnedConnectionStackTraces", "true");

        try {
            ComboPooledDataSource cpds = new ComboPooledDataSource();
            cpds.setJdbcUrl(url);
            cpds.setUser(user);
            cpds.setPassword(password);

            cpds.setMinPoolSize(Integer.parseInt(minPoolSize));
            cpds.setMaxPoolSize(Integer.parseInt(maxPoolSize));
            cpds.setAcquireIncrement(Integer.parseInt(acquireIncrement));
            cpds.setMaxIdleTime(Integer.parseInt(maxIdleTime));

            cpds.setUnreturnedConnectionTimeout(Integer.parseInt(unreturnedConnTimeout));
            cpds.setDebugUnreturnedConnectionStackTraces(Boolean.parseBoolean(debugUnreturned));

            dataSource = cpds;
            LOGGER.info("DataSource initialized with c3p0 connection pool.");
        } catch (NumberFormatException e) {
            LOGGER.log(Level.SEVERE, "Invalid numeric property in application.properties", e);
            throw new RuntimeException("Invalid numeric configuration", e);
        }
    }

    public static DataSource getDataSource() {
        return dataSource;
    }
}
