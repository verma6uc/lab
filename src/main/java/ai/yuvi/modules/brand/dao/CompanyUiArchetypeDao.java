package ai.yuvi.modules.brand.dao;

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

import ai.yuvi.modules.brand.enums.UIArchetype;
import ai.yuvi.modules.brand.model.CompanyUiArchetype;

public class CompanyUiArchetypeDao {
    private static final Logger LOGGER = Logger.getLogger(CompanyUiArchetypeDao.class.getName());
    private final DataSource dataSource;

    public CompanyUiArchetypeDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<CompanyUiArchetype> findByCompanyId(Long companyId) {
        List<CompanyUiArchetype> archetypes = new ArrayList<>();
        String sql = "SELECT * FROM company_ui_archetypes WHERE company_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    archetypes.add(mapResultSetToCompanyUiArchetype(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding UI archetypes by company ID: " + e.getMessage());
        }
        return archetypes;
    }

    public Optional<CompanyUiArchetype> findById(Long id) {
        String sql = "SELECT * FROM company_ui_archetypes WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToCompanyUiArchetype(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding UI archetype by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(CompanyUiArchetype archetype) {
        String sql = """
            INSERT INTO company_ui_archetypes (
                company_id, archetype, confidence, analysis,
                created_at, updated_at
            ) VALUES (?, ?::ui_archetype, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, archetype.getCompanyId());
            ps.setString(paramIndex++, archetype.getArchetype().name());
            ps.setDouble(paramIndex++, archetype.getConfidence());
            ps.setString(paramIndex++, archetype.getAnalysis());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        archetype.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating UI archetype: " + e.getMessage());
        }
        return false;
    }

    public boolean update(CompanyUiArchetype archetype) {
        String sql = """
            UPDATE company_ui_archetypes SET 
                archetype = ?::ui_archetype, confidence = ?, analysis = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, archetype.getArchetype().name());
            ps.setDouble(paramIndex++, archetype.getConfidence());
            ps.setString(paramIndex++, archetype.getAnalysis());
            ps.setLong(paramIndex++, archetype.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating UI archetype: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM company_ui_archetypes WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting UI archetype: " + e.getMessage());
            return false;
        }
    }

    private CompanyUiArchetype mapResultSetToCompanyUiArchetype(ResultSet rs) throws SQLException {
        CompanyUiArchetype archetype = new CompanyUiArchetype();
        archetype.setId(rs.getLong("id"));
        archetype.setCompanyId(rs.getLong("company_id"));
        archetype.setArchetype(UIArchetype.valueOf(rs.getString("archetype")));
        archetype.setConfidence(rs.getDouble("confidence"));
        archetype.setAnalysis(rs.getString("analysis"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            archetype.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            archetype.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return archetype;
    }
}
