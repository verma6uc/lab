package ai.yuvi.dao;

import ai.yuvi.model.Company;
import ai.yuvi.util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO for 'company' table operations.
 */
public class CompanyDao {

    public long insertCompany(Company company) throws SQLException {
        String sql = "INSERT INTO company (company_name, created_at, updated_at) VALUES (?, NOW(), NOW()) RETURNING company_id";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, company.getCompanyName());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                } else {
                    throw new SQLException("Failed to insert company, no ID obtained.");
                }
            }
        }
    }

    public Company findById(long companyId) throws SQLException {
        String sql = "SELECT company_id, company_name, created_at, updated_at FROM company WHERE company_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Company c = new Company();
                    c.setCompanyId(rs.getLong("company_id"));
                    c.setCompanyName(rs.getString("company_name"));
                    c.setCreatedAt(rs.getObject("created_at", java.time.OffsetDateTime.class));
                    c.setUpdatedAt(rs.getObject("updated_at", java.time.OffsetDateTime.class));
                    return c;
                }
            }
        }
        return null;
    }

    public List<Company> findAll() throws SQLException {
        String sql = "SELECT company_id, company_name, created_at, updated_at FROM company ORDER BY company_id";
        List<Company> companies = new ArrayList<>();
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Company c = new Company();
                c.setCompanyId(rs.getLong("company_id"));
                c.setCompanyName(rs.getString("company_name"));
                c.setCreatedAt(rs.getObject("created_at", java.time.OffsetDateTime.class));
                c.setUpdatedAt(rs.getObject("updated_at", java.time.OffsetDateTime.class));
                companies.add(c);
            }
        }
        return companies;
    }

    public boolean updateCompanyName(long companyId, String newName) throws SQLException {
        String sql = "UPDATE company SET company_name = ?, updated_at = NOW() WHERE company_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newName);
            ps.setLong(2, companyId);
            int rowsUpdated = ps.executeUpdate();
            return rowsUpdated > 0;
        }
    }

    public boolean deleteCompany(long companyId) throws SQLException {
        String sql = "DELETE FROM company WHERE company_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            int rowsDeleted = ps.executeUpdate();
            return rowsDeleted > 0;
        }
    }

	public Company findByName(String companyName) throws SQLException {
        String sql = "SELECT company_id, company_name, created_at, updated_at FROM company WHERE company_name = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, companyName);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Company c = new Company();
                    c.setCompanyId(rs.getLong("company_id"));
                    c.setCompanyName(rs.getString("company_name"));
                    c.setCreatedAt(rs.getObject("created_at", java.time.OffsetDateTime.class));
                    c.setUpdatedAt(rs.getObject("updated_at", java.time.OffsetDateTime.class));
                    return c;
                }
            }
        }
        return null;
    }

   
}
