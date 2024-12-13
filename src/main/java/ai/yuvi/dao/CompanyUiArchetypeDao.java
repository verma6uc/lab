package ai.yuvi.dao;

import ai.yuvi.model.CompanyUiArchetype;
import ai.yuvi.util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CompanyUiArchetypeDao {

    /**
     * Insert a new UI archetype. Returns the newly generated archetype_id.
     */
    public long insert(CompanyUiArchetype archetype) throws SQLException {
        String sql = "INSERT INTO company_ui_archetype (company_id, archetype_name, description) VALUES (?, ?, ?) RETURNING archetype_id";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, archetype.getCompanyId());
            ps.setString(2, archetype.getArchetypeName());
            ps.setString(3, archetype.getDescription());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
            }
        }
        throw new SQLException("Failed to insert company_ui_archetype");
    }

    /**
     * Find a UI archetype by archetype_id.
     */
    public CompanyUiArchetype findById(long archetypeId) throws SQLException {
        String sql = "SELECT archetype_id, company_id, archetype_name, description FROM company_ui_archetype WHERE archetype_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, archetypeId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapRow(rs);
                }
            }
        }
        return null;
    }

    /**
     * Find all UI archetypes for a given company.
     */
    public List<CompanyUiArchetype> findByCompanyId(long companyId) throws SQLException {
        String sql = "SELECT archetype_id, company_id, archetype_name, description FROM company_ui_archetype WHERE company_id = ?";
        List<CompanyUiArchetype> archetypes = new ArrayList<>();
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    archetypes.add(mapRow(rs));
                }
            }
        }
        return archetypes;
    }

    /**
     * Update an existing UI archetype’s name and description by archetype_id.
     */
    public boolean update(long archetypeId, String newName, String newDescription) throws SQLException {
        String sql = "UPDATE company_ui_archetype SET archetype_name = ?, description = ? WHERE archetype_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newName);
            ps.setString(2, newDescription);
            ps.setLong(3, archetypeId);
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    /**
     * Delete a UI archetype by archetype_id.
     */
    public boolean delete(long archetypeId) throws SQLException {
        String sql = "DELETE FROM company_ui_archetype WHERE archetype_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, archetypeId);
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    /**
     * Insert or Update (Upsert) a UI archetype based on (company_id, archetype_name).
     * Requires a unique constraint on (company_id, archetype_name).
     */
    public void insertOrUpdate(CompanyUiArchetype archetype) throws SQLException {
        String sql = "INSERT INTO company_ui_archetype (company_id, archetype_name, description) VALUES (?, ?, ?) "
                   + "ON CONFLICT (company_id, archetype_name) DO UPDATE SET description = EXCLUDED.description";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, archetype.getCompanyId());
            ps.setString(2, archetype.getArchetypeName());
            ps.setString(3, archetype.getDescription());
            ps.executeUpdate();
        }
    }

    private CompanyUiArchetype mapRow(ResultSet rs) throws SQLException {
        CompanyUiArchetype ua = new CompanyUiArchetype();
        ua.setArchetypeId(rs.getLong("archetype_id"));
        ua.setCompanyId(rs.getLong("company_id"));
        ua.setArchetypeName(rs.getString("archetype_name"));
        ua.setDescription(rs.getString("description"));
        return ua;
    }
}
