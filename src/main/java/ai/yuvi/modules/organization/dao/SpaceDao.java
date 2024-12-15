package ai.yuvi.modules.organization.dao;

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
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.organization.enums.SpaceType;
import ai.yuvi.modules.organization.model.Space;

public class SpaceDao {
    private static final Logger LOGGER = Logger.getLogger(SpaceDao.class.getName());
    private final DataSource dataSource;

    public SpaceDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Space> findByCompanyId(Long companyId) {
        List<Space> spaces = new ArrayList<>();
        String sql = "SELECT * FROM spaces WHERE company_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    spaces.add(mapResultSetToSpace(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding spaces by company ID: " + e.getMessage());
        }
        return spaces;
    }

    public List<Space> findByParentId(Long parentId) {
        List<Space> spaces = new ArrayList<>();
        String sql = "SELECT * FROM spaces WHERE parent_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, parentId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    spaces.add(mapResultSetToSpace(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding spaces by parent ID: " + e.getMessage());
        }
        return spaces;
    }

    public Optional<Space> findById(Long id) {
        String sql = "SELECT * FROM spaces WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToSpace(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding space by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public Optional<Space> findByExternalId(String externalId) {
        String sql = "SELECT * FROM spaces WHERE external_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, externalId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToSpace(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding space by external ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(Space space) {
        String sql = """
            INSERT INTO spaces (
                company_id, external_id, name, description, type, parent_id,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?::space_type, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, space.getCompanyId());
            ps.setString(paramIndex++, space.getExternalId());
            ps.setString(paramIndex++, space.getName());
            ps.setString(paramIndex++, space.getDescription());
            ps.setString(paramIndex++, space.getType().name());
            if (space.getParentId() != null) {
                ps.setLong(paramIndex++, space.getParentId());
            } else {
                ps.setNull(paramIndex++, Types.BIGINT);
            }

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        space.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating space: " + e.getMessage());
        }
        return false;
    }

    public boolean update(Space space) {
        String sql = """
            UPDATE spaces SET 
                name = ?, description = ?, type = ?::space_type, parent_id = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, space.getName());
            ps.setString(paramIndex++, space.getDescription());
            ps.setString(paramIndex++, space.getType().name());
            if (space.getParentId() != null) {
                ps.setLong(paramIndex++, space.getParentId());
            } else {
                ps.setNull(paramIndex++, Types.BIGINT);
            }
            ps.setLong(paramIndex++, space.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating space: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM spaces WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting space: " + e.getMessage());
            return false;
        }
    }

    private Space mapResultSetToSpace(ResultSet rs) throws SQLException {
        Space space = new Space();
        space.setId(rs.getLong("id"));
        space.setCompanyId(rs.getLong("company_id"));
        space.setExternalId(rs.getString("external_id"));
        space.setName(rs.getString("name"));
        space.setDescription(rs.getString("description"));
        space.setType(SpaceType.valueOf(rs.getString("type")));
        
        Long parentId = rs.getLong("parent_id");
        if (!rs.wasNull()) {
            space.setParentId(parentId);
        }
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            space.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            space.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return space;
    }
}
