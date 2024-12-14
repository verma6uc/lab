package ai.yuvi.dao;

import ai.yuvi.model.Browser;
import ai.yuvi.model.DeviceType;
import ai.yuvi.model.OsType;
import ai.yuvi.model.SessionStatus;
import ai.yuvi.model.UserSession;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Optional;
import java.sql.*;
import java.time.ZonedDateTime;

public class UserSessionDao {
    private final Connection connection;

    public UserSessionDao(Connection connection) {
        this.connection = connection;
    }

    public UserSession create(UserSession session) throws SQLException {
        String sql = "INSERT INTO user_sessions (session_id, user_id, company_id, status, device_type, browser, " +
                    "browser_version, os_type, os_version, device_id, ip_address, city, country, latitude, longitude, " +
                    "user_agent, screen_resolution, language, timezone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setObject(1, session.getSessionId());
            stmt.setLong(2, session.getUserId());
            stmt.setLong(3, session.getCompanyId());
            stmt.setString(4, session.getStatus().name());
            // ... set other parameters
            
            stmt.executeUpdate();
            return session;
        }
    }

    public Optional<UserSession> findById(UUID sessionId) throws SQLException {
        String sql = "SELECT * FROM user_sessions WHERE session_id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setObject(1, sessionId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUserSession(rs));
                }
                return Optional.empty();
            }
        }
    }

    public List<UserSession> findActiveSessionsByCompany(Long companyId) throws SQLException {
        String sql = "SELECT * FROM user_sessions WHERE company_id = ? AND status = 'active'";
        List<UserSession> sessions = new ArrayList<>();
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, companyId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    sessions.add(mapResultSetToUserSession(rs));
                }
            }
        }
        return sessions;
    }

    public void updateStatus(UUID sessionId, SessionStatus status) throws SQLException {
        String sql = "UPDATE user_sessions SET status = ? WHERE session_id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, status.name());
            stmt.setObject(2, sessionId);
            stmt.executeUpdate();
        }
    }

    public void updateLastActivity(UUID sessionId) throws SQLException {
        String sql = "UPDATE user_sessions SET last_activity_at = NOW() WHERE session_id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setObject(1, sessionId);
            stmt.executeUpdate();
        }
    }

    private UserSession mapResultSetToUserSession(ResultSet rs) throws SQLException {
        UserSession session = new UserSession();
        
        // Basic Info
        session.setSessionId((UUID) rs.getObject("session_id"));
        session.setUserId(rs.getLong("user_id"));
        session.setCompanyId(rs.getLong("company_id"));
        
        // Session Status
        session.setStatus(SessionStatus.valueOf(rs.getString("status")));
        session.setStartedAt(rs.getObject("started_at", ZonedDateTime.class));
        session.setLastActivityAt(rs.getObject("last_activity_at", ZonedDateTime.class));
        session.setEndedAt(rs.getObject("ended_at", ZonedDateTime.class));
        session.setDurationSeconds(rs.getInt("duration_seconds"));
        
        // Device Information
        session.setDeviceType(DeviceType.valueOf(rs.getString("device_type")));
        session.setBrowser(Browser.valueOf(rs.getString("browser")));
        session.setBrowserVersion(rs.getString("browser_version"));
        session.setOsType(OsType.valueOf(rs.getString("os_type")));
        session.setOsVersion(rs.getString("os_version"));
        session.setDeviceId(rs.getString("device_id"));
        
        // Location Information
        session.setIpAddress(rs.getString("ip_address"));
        session.setCity(rs.getString("city"));
        session.setCountry(rs.getString("country"));
        session.setLatitude(rs.getBigDecimal("latitude"));
        session.setLongitude(rs.getBigDecimal("longitude"));
        
        // Technical Details
        session.setUserAgent(rs.getString("user_agent"));
        session.setScreenResolution(rs.getString("screen_resolution"));
        session.setLanguage(rs.getString("language"));
        session.setTimezone(rs.getString("timezone"));
        
        // Security & Performance
        session.setAuthenticated(rs.getBoolean("is_authenticated"));
        session.setSecureConnection(rs.getBoolean("is_secure_connection"));
        session.setConnectionType(rs.getString("connection_type"));
        session.setNetworkSpeed(rs.getString("network_speed"));
        
        // Page Navigation
        session.setCurrentPage(rs.getString("current_page"));
        session.setPreviousPage(rs.getString("previous_page"));
        session.setPageViews(rs.getInt("page_views"));
        
        // Analytics
        session.setTotalClicks(rs.getInt("total_clicks"));
        session.setTotalActions(rs.getInt("total_actions"));
        session.setBounceRate(rs.getBigDecimal("bounce_rate"));
        
        // System Columns
        session.setCreatedAt(rs.getObject("created_at", ZonedDateTime.class));
        session.setUpdatedAt(rs.getObject("updated_at", ZonedDateTime.class));
        
        return session;
    }
} 