package ai.yuvi.modules.brand.dao;

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

import ai.yuvi.modules.brand.model.CompanyBrand;

public class CompanyBrandDao {
    private static final Logger LOGGER = Logger.getLogger(CompanyBrandDao.class.getName());
    private final DataSource dataSource;

    public CompanyBrandDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<CompanyBrand> findByCompanyId(Long companyId) {
        List<CompanyBrand> companyBrands = new ArrayList<>();
        String sql = "SELECT * FROM company_brands WHERE company_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    companyBrands.add(mapResultSetToCompanyBrand(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding company brands by company ID: " + e.getMessage());
        }
        return companyBrands;
    }

    public Optional<CompanyBrand> findById(Long id) {
        String sql = "SELECT * FROM company_brands WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToCompanyBrand(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding company brand by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(CompanyBrand companyBrand) {
        String sql = """
            INSERT INTO company_brands (
                company_id, brand_id, status, activated_at, deactivated_at,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, companyBrand.getCompanyId());
            ps.setLong(paramIndex++, companyBrand.getBrandId());
            ps.setString(paramIndex++, companyBrand.getStatus());
            
            if (companyBrand.getActivatedAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(companyBrand.getActivatedAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }
            
            if (companyBrand.getDeactivatedAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(companyBrand.getDeactivatedAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        companyBrand.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating company brand: " + e.getMessage());
        }
        return false;
    }

    public boolean update(CompanyBrand companyBrand) {
        String sql = """
            UPDATE company_brands SET 
                status = ?, activated_at = ?, deactivated_at = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, companyBrand.getStatus());
            
            if (companyBrand.getActivatedAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(companyBrand.getActivatedAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }
            
            if (companyBrand.getDeactivatedAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(companyBrand.getDeactivatedAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }
            
            ps.setLong(paramIndex++, companyBrand.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating company brand: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM company_brands WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting company brand: " + e.getMessage());
            return false;
        }
    }

    private CompanyBrand mapResultSetToCompanyBrand(ResultSet rs) throws SQLException {
        CompanyBrand companyBrand = new CompanyBrand();
        companyBrand.setId(rs.getLong("id"));
        companyBrand.setCompanyId(rs.getLong("company_id"));
        companyBrand.setBrandId(rs.getLong("brand_id"));
        companyBrand.setStatus(rs.getString("status"));
        
        Timestamp activatedAt = rs.getTimestamp("activated_at");
        if (activatedAt != null) {
            companyBrand.setActivatedAt(activatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp deactivatedAt = rs.getTimestamp("deactivated_at");
        if (deactivatedAt != null) {
            companyBrand.setDeactivatedAt(deactivatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            companyBrand.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            companyBrand.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return companyBrand;
    }
}
