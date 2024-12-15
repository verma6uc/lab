package ai.yuvi.modules.organization.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.organization.model.UserSpace;

public class UserSpaceDao {
    private static final Logger LOGGER = Logger.getLogger(UserSpaceDao.class.getName());
    private final DataSource dataSource;

    public UserSpaceDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<UserSpace> findBySpaceId(Long spaceId) {
        List<UserSpace> userSpaces = new ArrayList<>();
        String sql = "SELECT * FROM user_spaces WHERE space_id = ? ORDER BY joined_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, spaceId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    userSpaces.add(mapResultSetToUserSpace(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding user spaces by space ID: " + e.getMessage());
        }
        return userSpaces;
    }

    public List<UserSpace> findByUserId(Long userId) {
        List<UserSpace> userSpaces = new ArrayList<>();
        String sql = "SELECT * FROM user_spaces WHERE user_id = ? ORDER BY joined_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    userSpaces.add(mapResultSetToUserSpace(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding user spaces by user ID: " + e.getMessage());
        }
        return userSpaces;
    }

    public Optional<UserSpace> findByUserIdAndSpaceId(Long userId, Long spaceId) {
        String sql = "SELECT * FROM user_spaces WHERE user_id = ? AND space_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            ps.setLong(2, spaceId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUserSpace(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding user space by user ID and space ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(UserSpace userSpace) {
        String sql = """
            INSERT INTO user_spaces (
                user_id, space_id, role, joined_at
            ) VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userSpace.getUserId());
            ps.setLong(2, userSpace.getSpaceId());
            ps.setString(3, userSpace.getRole());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error creating user space: " + e.getMessage());
            return false;
        }
    }

    public boolean updateRole(Long userId, Long spaceId, String newRole) {
        String sql = "UPDATE user_spaces SET role = ? WHERE user_id = ? AND space_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newRole);
            ps.setLong(2, userId);
            ps.setLong(3, spaceId);

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating user space role: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long userId, Long spaceId) {
        String sql = "DELETE FROM user_spaces WHERE user_id = ? AND space_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            ps.setLong(2, spaceId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting user space: " + e.getMessage());
            return false;
        }
    }

    public boolean deleteBySpaceId(Long spaceId) {
        String sql = "DELETE FROM user_spaces WHERE space_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, spaceId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting user spaces by space ID: " + e.getMessage());
            return false;
        }
    }

    public boolean deleteByUserId(Long userId) {
        String sql = "DELETE FROM user_spaces WHERE user_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting user spaces by user ID: " + e.getMessage());
            return false;
        }
    }

    private UserSpace mapResultSetToUserSpace(ResultSet rs) throws SQLException {
        UserSpace userSpace = new UserSpace();
        userSpace.setUserId(rs.getLong("user_id"));
        userSpace.setSpaceId(rs.getLong("space_id"));
        userSpace.setRole(rs.getString("role"));
        
        Timestamp joinedAt = rs.getTimestamp("joined_at");
        if (joinedAt != null) {
            userSpace.setJoinedAt(joinedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return userSpace;
    }
}
