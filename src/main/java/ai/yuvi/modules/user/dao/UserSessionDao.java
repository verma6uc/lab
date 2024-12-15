package ai.yuvi.modules.user.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import ai.yuvi.config.DataSourceProvider;
import ai.yuvi.modules.user.enums.Browser;
import ai.yuvi.modules.user.enums.DeviceType;
import ai.yuvi.modules.user.enums.OsType;
import ai.yuvi.modules.user.enums.SessionStatus;
import ai.yuvi.modules.user.model.UserSession;

public class UserSessionDao {
    private static final Logger LOGGER = Logger.getLogger(UserSessionDao.class.getName());

    public boolean create(UserSession session) {
        String sql = """
            INSERT INTO user_sessions (
                id, user_id, company_id, status, started_at, last_activity_at, ended_at,
                duration_seconds, device_type, browser, browser_version, os_type, os_version,
                device_id, ip_address, city, country, latitude, longitude, user_agent,
                screen_resolution, language, timezone, is_authenticated, is_secure_connection,
                connection_type, network_speed, current_page, previous_page, page_views,
                total_clicks, total_actions, bounce_rate
            ) VALUES (?, ?, ?, ?::session_status_enum, ?, ?, ?, ?, ?::device_type_enum,
                     ?::browser_enum, ?, ?::os_type_enum, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                     ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            int paramIndex = 1;
            stmt.setString(paramIndex++, session.getId());
            stmt.setLong(paramIndex++, session.getUserId());
            stmt.setLong(paramIndex++, session.getCompanyId());
            stmt.setString(paramIndex++, session.getStatus().name());
            stmt.setTimestamp(paramIndex++, Timestamp.from(session.getStartedAt().toInstant()));
            stmt.setTimestamp(paramIndex++, Timestamp.from(session.getLastActivityAt().toInstant()));
            stmt.setTimestamp(paramIndex++, session.getEndedAt() != null ? 
                Timestamp.from(session.getEndedAt().toInstant()) : null);
            stmt.setInt(paramIndex++, session.getDurationSeconds());
            stmt.setString(paramIndex++, session.getDeviceType().name());
            stmt.setString(paramIndex++, session.getBrowser().name());
            stmt.setString(paramIndex++, session.getBrowserVersion());
            stmt.setString(paramIndex++, session.getOsType().name());
            stmt.setString(paramIndex++, session.getOsVersion());
            stmt.setString(paramIndex++, session.getDeviceId());
            stmt.setObject(paramIndex++, session.getIpAddress().getHostAddress());
            stmt.setString(paramIndex++, session.getCity());
            stmt.setString(paramIndex++, session.getCountry());
            stmt.setBigDecimal(paramIndex++, session.getLatitude());
            stmt.setBigDecimal(paramIndex++, session.getLongitude());
            stmt.setString(paramIndex++, session.getUserAgent());
            stmt.setString(paramIndex++, session.getScreenResolution());
            stmt.setString(paramIndex++, session.getLanguage());
            stmt.setString(paramIndex++, session.getTimezone());
            stmt.setBoolean(paramIndex++, session.getIsAuthenticated());
            stmt.setBoolean(paramIndex++, session.getIsSecureConnection());
            stmt.setString(paramIndex++, session.getConnectionType());
            stmt.setString(paramIndex++, session.getNetworkSpeed());
            stmt.setString(paramIndex++, session.getCurrentPage());
            stmt.setString(paramIndex++, session.getPreviousPage());
            stmt.setInt(paramIndex++, session.getPageViews());
            stmt.setInt(paramIndex++, session.getTotalClicks());
            stmt.setInt(paramIndex++, session.getTotalActions());
            stmt.setBigDecimal(paramIndex++, session.getBounceRate());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error creating user session", e);
            return false;
        }
    }

    public Optional<UserSession> findById(String sessionId) {
        String sql = "SELECT * FROM user_sessions WHERE id = ?";
        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, sessionId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUserSession(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding session by ID", e);
        }
        return Optional.empty();
    }

    public List<UserSession> findByUserId(Long userId) {
        String sql = "SELECT * FROM user_sessions WHERE user_id = ? ORDER BY started_at DESC";
        List<UserSession> sessions = new ArrayList<>();
        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    sessions.add(mapResultSetToUserSession(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding sessions by user ID", e);
        }
        return sessions;
    }

    public boolean update(UserSession session) {
        String sql = """
            UPDATE user_sessions SET 
                status = ?::session_status_enum,
                last_activity_at = ?,
                ended_at = ?,
                duration_seconds = ?,
                current_page = ?,
                previous_page = ?,
                page_views = ?,
                total_clicks = ?,
                total_actions = ?,
                bounce_rate = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            int paramIndex = 1;
            stmt.setString(paramIndex++, session.getStatus().name());
            stmt.setTimestamp(paramIndex++, Timestamp.from(session.getLastActivityAt().toInstant()));
            stmt.setTimestamp(paramIndex++, session.getEndedAt() != null ? 
                Timestamp.from(session.getEndedAt().toInstant()) : null);
            stmt.setInt(paramIndex++, session.getDurationSeconds());
            stmt.setString(paramIndex++, session.getCurrentPage());
            stmt.setString(paramIndex++, session.getPreviousPage());
            stmt.setInt(paramIndex++, session.getPageViews());
            stmt.setInt(paramIndex++, session.getTotalClicks());
            stmt.setInt(paramIndex++, session.getTotalActions());
            stmt.setBigDecimal(paramIndex++, session.getBounceRate());
            stmt.setString(paramIndex++, session.getId());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating user session", e);
            return false;
        }
    }

    private UserSession mapResultSetToUserSession(ResultSet rs) throws SQLException {
        UserSession session = new UserSession();
        session.setId(rs.getString("id"));
        session.setUserId(rs.getLong("user_id"));
        session.setCompanyId(rs.getLong("company_id"));
        session.setStatus(SessionStatus.valueOf(rs.getString("status")));
        session.setStartedAt(rs.getTimestamp("started_at").toInstant().atZone(java.time.ZoneId.systemDefault()));
        session.setLastActivityAt(rs.getTimestamp("last_activity_at").toInstant().atZone(java.time.ZoneId.systemDefault()));
        
        Timestamp endedAt = rs.getTimestamp("ended_at");
        if (endedAt != null) {
            session.setEndedAt(endedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        session.setDurationSeconds(rs.getInt("duration_seconds"));
        session.setDeviceType(DeviceType.valueOf(rs.getString("device_type")));
        session.setBrowser(Browser.valueOf(rs.getString("browser")));
        session.setBrowserVersion(rs.getString("browser_version"));
        session.setOsType(OsType.valueOf(rs.getString("os_type")));
        session.setOsVersion(rs.getString("os_version"));
        session.setDeviceId(rs.getString("device_id"));
        
        try {
            session.setIpAddress(java.net.InetAddress.getByName(rs.getString("ip_address")));
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Error parsing IP address", e);
        }
        
        session.setCity(rs.getString("city"));
        session.setCountry(rs.getString("country"));
        session.setLatitude(rs.getBigDecimal("latitude"));
        session.setLongitude(rs.getBigDecimal("longitude"));
        session.setUserAgent(rs.getString("user_agent"));
        session.setScreenResolution(rs.getString("screen_resolution"));
        session.setLanguage(rs.getString("language"));
        session.setTimezone(rs.getString("timezone"));
        session.setIsAuthenticated(rs.getBoolean("is_authenticated"));
        session.setIsSecureConnection(rs.getBoolean("is_secure_connection"));
        session.setConnectionType(rs.getString("connection_type"));
        session.setNetworkSpeed(rs.getString("network_speed"));
        session.setCurrentPage(rs.getString("current_page"));
        session.setPreviousPage(rs.getString("previous_page"));
        session.setPageViews(rs.getInt("page_views"));
        session.setTotalClicks(rs.getInt("total_clicks"));
        session.setTotalActions(rs.getInt("total_actions"));
        session.setBounceRate(rs.getBigDecimal("bounce_rate"));
        session.setCreatedAt(rs.getTimestamp("created_at").toInstant().atZone(java.time.ZoneId.systemDefault()));
        session.setUpdatedAt(rs.getTimestamp("updated_at").toInstant().atZone(java.time.ZoneId.systemDefault()));
        
        return session;
    }
}
