package ai.yuvi.modules.user.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.Optional;
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.user.enums.UserRole;
import ai.yuvi.modules.user.enums.UserStatus;
import ai.yuvi.modules.user.model.User;

public class UserDao {
    private static final Logger LOGGER = Logger.getLogger(UserDao.class.getName());
    private final DataSource dataSource;

    public UserDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUser(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding user by email: " + e.getMessage());
        }
        return Optional.empty();
    }

    public Optional<User> findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUser(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding user by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(User user) {
        String sql = """
            INSERT INTO users (
                user_id, email, username, password, first_name, last_name,
                phone_number, avatar_url, role, status, preferences, settings,
                last_login_at, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?::user_role, ?::user_status, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, user.getUserId());
            ps.setString(paramIndex++, user.getEmail());
            ps.setString(paramIndex++, user.getUsername());
            ps.setString(paramIndex++, user.getPassword());
            ps.setString(paramIndex++, user.getFirstName());
            ps.setString(paramIndex++, user.getLastName());
            ps.setString(paramIndex++, user.getPhoneNumber());
            ps.setString(paramIndex++, user.getAvatarUrl());
            ps.setString(paramIndex++, user.getRole().name());
            ps.setString(paramIndex++, user.getStatus().name());
            ps.setString(paramIndex++, user.getPreferences());
            ps.setString(paramIndex++, user.getSettings());
            
            if (user.getLastLoginAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(user.getLastLoginAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        user.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating user: " + e.getMessage());
        }
        return false;
    }

    public boolean update(User user) {
        String sql = """
            UPDATE users SET 
                email = ?, username = ?, password = ?, first_name = ?,
                last_name = ?, phone_number = ?, avatar_url = ?,
                role = ?::user_role, status = ?::user_status,
                preferences = ?, settings = ?, last_login_at = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, user.getEmail());
            ps.setString(paramIndex++, user.getUsername());
            ps.setString(paramIndex++, user.getPassword());
            ps.setString(paramIndex++, user.getFirstName());
            ps.setString(paramIndex++, user.getLastName());
            ps.setString(paramIndex++, user.getPhoneNumber());
            ps.setString(paramIndex++, user.getAvatarUrl());
            ps.setString(paramIndex++, user.getRole().name());
            ps.setString(paramIndex++, user.getStatus().name());
            ps.setString(paramIndex++, user.getPreferences());
            ps.setString(paramIndex++, user.getSettings());
            
            if (user.getLastLoginAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(user.getLastLoginAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }
            
            ps.setLong(paramIndex++, user.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating user: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM users WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting user: " + e.getMessage());
            return false;
        }
    }

    private User mapResultSetToUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setUserId(rs.getLong("user_id"));
        user.setEmail(rs.getString("email"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password"));
        user.setFirstName(rs.getString("first_name"));
        user.setLastName(rs.getString("last_name"));
        user.setPhoneNumber(rs.getString("phone_number"));
        user.setAvatarUrl(rs.getString("avatar_url"));
        user.setRole(UserRole.valueOf(rs.getString("role")));
        user.setStatus(UserStatus.valueOf(rs.getString("status")));
        user.setPreferences(rs.getString("preferences"));
        user.setSettings(rs.getString("settings"));
        
        Timestamp lastLoginAt = rs.getTimestamp("last_login_at");
        if (lastLoginAt != null) {
            user.setLastLoginAt(lastLoginAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            user.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            user.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return user;
    }
}
