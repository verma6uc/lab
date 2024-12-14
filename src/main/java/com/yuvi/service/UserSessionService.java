package com.yuvi.service;

import com.yuvi.dao.UserSessionDao;
import com.yuvi.model.UserSession;
import com.yuvi.enums.*;
import java.util.List;
import java.util.UUID;
import java.util.Map;
import java.util.Optional;
import java.time.ZonedDateTime;
import java.sql.Connection;
import java.sql.SQLException;

public class UserSessionService {
    private final UserSessionDao sessionDao;
    private final Connection connection;

    public UserSessionService(Connection connection) {
        this.connection = connection;
        this.sessionDao = new UserSessionDao(connection);
    }

    public UserSession createSession(UserSession session) throws SQLException {
        try {
            connection.setAutoCommit(false);
            UserSession createdSession = sessionDao.create(session);
            connection.commit();
            return createdSession;
        } catch (SQLException e) {
            connection.rollback();
            throw e;
        }
    }

    public Optional<UserSession> getSession(UUID sessionId) throws SQLException {
        return sessionDao.findById(sessionId);
    }

    public List<UserSession> getActiveSessions(Long companyId) throws SQLException {
        return sessionDao.findActiveSessionsByCompany(companyId);
    }

    public void updateSessionStatus(UUID sessionId, SessionStatus status) throws SQLException {
        try {
            connection.setAutoCommit(false);
            sessionDao.updateStatus(sessionId, status);
            connection.commit();
        } catch (SQLException e) {
            connection.rollback();
            throw e;
        }
    }

    public void updateLastActivity(UUID sessionId) throws SQLException {
        sessionDao.updateLastActivity(sessionId);
    }

    public Map<String, Object> getSessionStats(Long companyId) throws SQLException {
        return sessionDao.getSessionStats(companyId);
    }

    public List<UserSession> getSessionsByFilters(Map<String, Object> filters) throws SQLException {
        return sessionDao.findByFilters(filters);
    }

    public void cleanupInactiveSessions() throws SQLException {
        try {
            connection.setAutoCommit(false);
            sessionDao.markInactiveSessions();
            connection.commit();
        } catch (SQLException e) {
            connection.rollback();
            throw e;
        }
    }

    public byte[] exportSessionData(Map<String, Object> filters) throws SQLException {
        List<UserSession> sessions = sessionDao.findByFilters(filters);
        return generateExportFile(sessions);
    }

    private byte[] generateExportFile(List<UserSession> sessions) {
        // Implementation for generating CSV/Excel file
        // You can use libraries like Apache POI for Excel or OpenCSV for CSV
        return new byte[0]; // Placeholder
    }
} 