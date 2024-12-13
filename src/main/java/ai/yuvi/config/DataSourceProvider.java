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

        

        try {
            ComboPooledDataSource cpds = new ComboPooledDataSource();
            cpds.setJdbcUrl(url);
            cpds.setUser(user);
            cpds.setPassword(password);

        
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
