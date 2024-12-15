package ai.yuvi.modules.user.service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import ai.yuvi.modules.user.dao.UserSessionDao;
import ai.yuvi.modules.user.enums.SessionStatus;
import ai.yuvi.modules.user.model.UserSession;

public class UserSessionService {
    private static final Logger LOGGER = Logger.getLogger(UserSessionService.class.getName());
    private final UserSessionDao sessionDao;

    public UserSessionService(UserSessionDao sessionDao) {
        this.sessionDao = sessionDao;
    }

    public boolean createSession(UserSession session) {
        return sessionDao.create(session);
    }

    public Optional<UserSession> getSession(String sessionId) {
        return sessionDao.findById(sessionId);
    }

    public List<UserSession> getUserSessions(Long userId) {
        return sessionDao.findByUserId(userId);
    }

    public boolean updateSession(UserSession session) {
        return sessionDao.update(session);
    }

    public boolean endSession(String sessionId) {
        Optional<UserSession> sessionOpt = sessionDao.findById(sessionId);
        if (sessionOpt.isPresent()) {
            UserSession session = sessionOpt.get();
            session.setStatus(SessionStatus.disconnected);
            session.setEndedAt(ZonedDateTime.now());
            return sessionDao.update(session);
        }
        return false;
    }

    public void cleanupInactiveSessions() {
        LOGGER.info("Starting session cleanup task");
        // Implementation for cleaning up inactive sessions
        // This could involve:
        // 1. Finding all active sessions that haven't had activity in X time
        // 2. Marking them as disconnected
        // 3. Setting their end time
        LOGGER.info("Completed session cleanup task");
    }
}
