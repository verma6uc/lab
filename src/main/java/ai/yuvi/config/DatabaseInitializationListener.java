package ai.yuvi.config;

import javax.servlet.ServletContextListener;
import javax.servlet.ServletContextEvent;
import javax.servlet.annotation.WebListener;
import java.util.logging.Logger;
import java.util.logging.Level;

@WebListener
public class DatabaseInitializationListener implements ServletContextListener {
    private static final Logger LOGGER = Logger.getLogger(DatabaseInitializationListener.class.getName());

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        LOGGER.info("ServletContextListener starting - Initializing database...");
        try {
            // Force early initialization of DataSourceProvider
            DataSourceProvider.getDataSource();
            LOGGER.info("Database initialization completed successfully");
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed to initialize database", e);
            throw new RuntimeException("Database initialization failed", e);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        LOGGER.info("ServletContextListener destroyed");
    }
} 