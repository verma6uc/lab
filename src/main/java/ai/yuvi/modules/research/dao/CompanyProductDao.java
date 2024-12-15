package ai.yuvi.modules.research.dao;

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

import ai.yuvi.modules.research.enums.ProductStatus;
import ai.yuvi.modules.research.model.CompanyProduct;

public class CompanyProductDao {
    private static final Logger LOGGER = Logger.getLogger(CompanyProductDao.class.getName());
    private final DataSource dataSource;

    public CompanyProductDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<CompanyProduct> findByCompanyId(Long companyId) {
        List<CompanyProduct> products = new ArrayList<>();
        String sql = "SELECT * FROM company_products WHERE company_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    products.add(mapResultSetToCompanyProduct(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding products by company ID: " + e.getMessage());
        }
        return products;
    }

    public Optional<CompanyProduct> findById(Long id) {
        String sql = "SELECT * FROM company_products WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToCompanyProduct(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding product by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(CompanyProduct product) {
        String sql = """
            INSERT INTO company_products (
                company_id, name, description, features, target_audience,
                use_cases, pricing, currency, product_url, documentation_url,
                api_url, status, launch_date, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?::product_status, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, product.getCompanyId());
            ps.setString(paramIndex++, product.getName());
            ps.setString(paramIndex++, product.getDescription());
            ps.setString(paramIndex++, product.getFeatures());
            ps.setString(paramIndex++, product.getTargetAudience());
            ps.setString(paramIndex++, product.getUseCases());
            ps.setString(paramIndex++, product.getPricing());
            ps.setString(paramIndex++, product.getCurrency());
            ps.setString(paramIndex++, product.getProductUrl());
            ps.setString(paramIndex++, product.getDocumentationUrl());
            ps.setString(paramIndex++, product.getApiUrl());
            ps.setString(paramIndex++, product.getStatus().name());
            
            if (product.getLaunchDate() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(product.getLaunchDate().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        product.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating product: " + e.getMessage());
        }
        return false;
    }

    public boolean update(CompanyProduct product) {
        String sql = """
            UPDATE company_products SET 
                name = ?, description = ?, features = ?, target_audience = ?,
                use_cases = ?, pricing = ?, currency = ?, product_url = ?,
                documentation_url = ?, api_url = ?, status = ?::product_status,
                launch_date = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, product.getName());
            ps.setString(paramIndex++, product.getDescription());
            ps.setString(paramIndex++, product.getFeatures());
            ps.setString(paramIndex++, product.getTargetAudience());
            ps.setString(paramIndex++, product.getUseCases());
            ps.setString(paramIndex++, product.getPricing());
            ps.setString(paramIndex++, product.getCurrency());
            ps.setString(paramIndex++, product.getProductUrl());
            ps.setString(paramIndex++, product.getDocumentationUrl());
            ps.setString(paramIndex++, product.getApiUrl());
            ps.setString(paramIndex++, product.getStatus().name());
            
            if (product.getLaunchDate() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(product.getLaunchDate().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }
            
            ps.setLong(paramIndex++, product.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating product: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM company_products WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting product: " + e.getMessage());
            return false;
        }
    }

    private CompanyProduct mapResultSetToCompanyProduct(ResultSet rs) throws SQLException {
        CompanyProduct product = new CompanyProduct();
        product.setId(rs.getLong("id"));
        product.setCompanyId(rs.getLong("company_id"));
        product.setName(rs.getString("name"));
        product.setDescription(rs.getString("description"));
        product.setFeatures(rs.getString("features"));
        product.setTargetAudience(rs.getString("target_audience"));
        product.setUseCases(rs.getString("use_cases"));
        product.setPricing(rs.getString("pricing"));
        product.setCurrency(rs.getString("currency"));
        product.setProductUrl(rs.getString("product_url"));
        product.setDocumentationUrl(rs.getString("documentation_url"));
        product.setApiUrl(rs.getString("api_url"));
        product.setStatus(ProductStatus.valueOf(rs.getString("status")));
        
        Timestamp launchDate = rs.getTimestamp("launch_date");
        if (launchDate != null) {
            product.setLaunchDate(launchDate.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            product.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            product.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return product;
    }
}
