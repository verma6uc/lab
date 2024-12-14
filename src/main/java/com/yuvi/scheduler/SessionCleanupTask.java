package com.yuvi.scheduler;

import com.yuvi.service.UserSessionService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;
import java.util.logging.Level;

public class SessionCleanupTask {
    private static final Logger logger = Logger.getLogger(SessionCleanupTask.class.getName());
    private final UserSessionService sessionService;
    private final ScheduledExecutorService scheduler;
    private static final long CLEANUP_INTERVAL_MINUTES = 5;

    public SessionCleanupTask(UserSessionService sessionService) {
        this.sessionService = sessionService;
        this.scheduler = Executors.newSingleThreadScheduledExecutor();
    }

    public void startCleanupTask() {
        scheduler.scheduleAtFixedRate(
            this::cleanupInactiveSessions,
            CLEANUP_INTERVAL_MINUTES,
            CLEANUP_INTERVAL_MINUTES,
            TimeUnit.MINUTES
        );
    }

    private void cleanupInactiveSessions() {
        try {
            logger.info("Starting session cleanup task");
            sessionService.cleanupInactiveSessions();
            logger.info("Session cleanup completed successfully");
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error during session cleanup", e);
        }
    }

    public void shutdown() {
        scheduler.shutdown();
        try {
            if (!scheduler.awaitTermination(60, TimeUnit.SECONDS)) {
                scheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
} 