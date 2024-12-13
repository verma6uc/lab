package ai.yuvi.dao;

import ai.yuvi.model.CompanyProduct;
import ai.yuvi.util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CompanyProductDao {

    /**
     * Insert a new product. Returns the newly generated product_id.
     */
    public long insert(CompanyProduct product) throws SQLException {
        String sql = "INSERT INTO company_product (company_id, product_name, product_description) VALUES (?, ?, ?) RETURNING product_id";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, product.getCompanyId());
            ps.setString(2, product.getProductName());
            ps.setString(3, product.getProductDescription());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
            }
        }
        throw new SQLException("Failed to insert company_product");
    }

    /**
     * Find a product by product_id.
     */
    public CompanyProduct findById(long productId) throws SQLException {
        String sql = "SELECT product_id, company_id, product_name, product_description FROM company_product WHERE product_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, productId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapRow(rs);
                }
            }
        }
        return null;
    }

    /**
     * Find all products for a given company.
     */
    public List<CompanyProduct> findByCompanyId(long companyId) throws SQLException {
        String sql = "SELECT product_id, company_id, product_name, product_description FROM company_product WHERE company_id = ?";
        List<CompanyProduct> products = new ArrayList<>();
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    products.add(mapRow(rs));
                }
            }
        }
        return products;
    }

    /**
     * Update an existing product’s name and description by product_id.
     */
    public boolean update(long productId, String newName, String newDescription) throws SQLException {
        String sql = "UPDATE company_product SET product_name = ?, product_description = ? WHERE product_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newName);
            ps.setString(2, newDescription);
            ps.setLong(3, productId);
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    /**
     * Delete a product by product_id.
     */
    public boolean delete(long productId) throws SQLException {
        String sql = "DELETE FROM company_product WHERE product_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, productId);
            int rows = ps.executeUpdate();
            return rows > 0;
        }
    }

    /**
     * Insert or Update (Upsert) a product based on (company_id, product_name).
     * Requires a unique constraint on (company_id, product_name).
     */
    public void insertOrUpdate(CompanyProduct product) throws SQLException {
        String sql = "INSERT INTO company_product (company_id, product_name, product_description) VALUES (?, ?, ?) "
                   + "ON CONFLICT (company_id, product_name) DO UPDATE SET product_description = EXCLUDED.product_description";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, product.getCompanyId());
            ps.setString(2, product.getProductName());
            ps.setString(3, product.getProductDescription());
            ps.executeUpdate();
        }
    }

    private CompanyProduct mapRow(ResultSet rs) throws SQLException {
        CompanyProduct p = new CompanyProduct();
        p.setProductId(rs.getLong("product_id"));
        p.setCompanyId(rs.getLong("company_id"));
        p.setProductName(rs.getString("product_name"));
        p.setProductDescription(rs.getString("product_description"));
        return p;
    }

	public void insertOrUpdateProduct(long companyId, String productName) throws SQLException {
        String sql = "INSERT INTO company_product (company_id, product_name) VALUES (?, ?) "
                   + "ON CONFLICT (company_id, product_name) DO NOTHING";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            ps.setString(2, productName);
            ps.executeUpdate();
        }
    }
}
