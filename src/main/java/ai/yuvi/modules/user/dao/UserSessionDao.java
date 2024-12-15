package ai.yuvi.modules.user.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.user.enums.Browser;
import ai.yuvi.modules.user.enums.DeviceType;
import ai.yuvi.modules.user.enums.OsType;
import ai.yuvi.modules.user.enums.SessionStatus;
import ai.yuvi.modules.user.model.UserSession;

public class UserSessionDao {
    private static final Logger LOGGER = Logger.getLogger(UserSessionDao.class.getName());
    private final DataSource dataSource;

    public UserSessionDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<UserSession> findBySessionId(UUID sessionId) {
        String sql = "SELECT * FROM user_sessions WHERE session_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setObject(1, sessionId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUserSession(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding session by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public List<UserSession> findByUserId(Long userId) {
        List<UserSession> sessions = new ArrayList<>();
        String sql = "SELECT * FROM user_sessions WHERE user_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    sessions.add(mapResultSetToUserSession(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding sessions by user ID: " + e.getMessage());
        }
        return sessions;
    }

    public boolean create(UserSession session) {
        String sql = """
            INSERT INTO user_sessions (
                session_id, user_id, ip_address, user_agent, browser,
                browser_version, os, os_version, device_type, authenticated,
                secure_connection, status, last_activity_at, expires_at,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?::browser_type, ?, ?::os_type, ?, ?::device_type, ?, ?, ?::session_status, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setObject(paramIndex++, session.getSessionId());
            ps.setLong(paramIndex++, session.getUserId());
            ps.setString(paramIndex++, session.getIpAddress());
            ps.setString(paramIndex++, session.getUserAgent());
            ps.setString(paramIndex++, session.getBrowser().name());
            ps.setString(paramIndex++, session.getBrowserVersion());
            ps.setString(paramIndex++, session.getOs().name());
            ps.setString(paramIndex++, session.getOsVersion());
            ps.setString(paramIndex++, session.getDeviceType().name());
            ps.setBoolean(paramIndex++, session.isAuthenticated());
            ps.setBoolean(paramIndex++, session.isSecureConnection());
            ps.setString(paramIndex++, session.getStatus().name());
            
            if (session.getLastActivityAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(session.getLastActivityAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }
            
            if (session.getExpiresAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(session.getExpiresAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        session.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating session: " + e.getMessage());
        }
        return false;
    }

    public boolean invalidateSession(Long userId, UUID sessionId) {
        String sql = """
            UPDATE user_sessions SET 
                status = ?::session_status,
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ? AND session_id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, SessionStatus.INVALIDATED.name());
            ps.setLong(2, userId);
            ps.setObject(3, sessionId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error invalidating session: " + e.getMessage());
            return false;
        }
    }

    private UserSession mapResultSetToUserSession(ResultSet rs) throws SQLException {
        UserSession session = new UserSession();
        session.setId(rs.getLong("id"));
        session.setSessionId((UUID) rs.getObject("session_id"));
        session.setUserId(rs.getLong("user_id"));
        session.setIpAddress(rs.getString("ip_address"));
        session.setUserAgent(rs.getString("user_agent"));
        session.setBrowser(Browser.fromString(rs.getString("browser")));
        session.setBrowserVersion(rs.getString("browser_version"));
        session.setOs(OsType.fromString(rs.getString("os")));
        session.setOsVersion(rs.getString("os_version"));
        session.setDeviceType(DeviceType.fromString(rs.getString("device_type")));
        session.setAuthenticated(rs.getBoolean("authenticated"));
        session.setSecureConnection(rs.getBoolean("secure_connection"));
        session.setStatus(SessionStatus.fromString(rs.getString("status")));
        
        Timestamp lastActivityAt = rs.getTimestamp("last_activity_at");
        if (lastActivityAt != null) {
            session.setLastActivityAt(lastActivityAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp expiresAt = rs.getTimestamp("expires_at");
        if (expiresAt != null) {
            session.setExpiresAt(expiresAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            session.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            session.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return session;
    }
}
