package ai.yuvi.modules.organization.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.organization.model.SpaceAttribute;

public class SpaceAttributeDao {
    private static final Logger LOGGER = Logger.getLogger(SpaceAttributeDao.class.getName());
    private final DataSource dataSource;

    public SpaceAttributeDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<SpaceAttribute> findBySpaceId(Long spaceId) {
        List<SpaceAttribute> attributes = new ArrayList<>();
        String sql = "SELECT * FROM space_attributes WHERE space_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, spaceId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    attributes.add(mapResultSetToSpaceAttribute(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding space attributes by space ID: " + e.getMessage());
        }
        return attributes;
    }

    public Optional<SpaceAttribute> findById(Long id) {
        String sql = "SELECT * FROM space_attributes WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToSpaceAttribute(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding space attribute by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public Optional<SpaceAttribute> findBySpaceIdAndKey(Long spaceId, String key) {
        String sql = "SELECT * FROM space_attributes WHERE space_id = ? AND key = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, spaceId);
            ps.setString(2, key);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToSpaceAttribute(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding space attribute by space ID and key: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(SpaceAttribute attribute) {
        String sql = """
            INSERT INTO space_attributes (
                space_id, key, value, created_at, updated_at
            ) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setLong(1, attribute.getSpaceId());
            ps.setString(2, attribute.getKey());
            ps.setString(3, attribute.getValue());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        attribute.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating space attribute: " + e.getMessage());
        }
        return false;
    }

    public boolean update(SpaceAttribute attribute) {
        String sql = """
            UPDATE space_attributes SET 
                value = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, attribute.getValue());
            ps.setLong(2, attribute.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating space attribute: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM space_attributes WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting space attribute: " + e.getMessage());
            return false;
        }
    }

    public boolean deleteBySpaceId(Long spaceId) {
        String sql = "DELETE FROM space_attributes WHERE space_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, spaceId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting space attributes by space ID: " + e.getMessage());
            return false;
        }
    }

    private SpaceAttribute mapResultSetToSpaceAttribute(ResultSet rs) throws SQLException {
        SpaceAttribute attribute = new SpaceAttribute();
        attribute.setId(rs.getLong("id"));
        attribute.setSpaceId(rs.getLong("space_id"));
        attribute.setKey(rs.getString("key"));
        attribute.setValue(rs.getString("value"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            attribute.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            attribute.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return attribute;
    }
}
