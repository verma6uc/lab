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

import ai.yuvi.modules.organization.enums.Industry;
import ai.yuvi.modules.organization.model.Company;

public class CompanyDao {
    private static final Logger LOGGER = Logger.getLogger(CompanyDao.class.getName());
    private final DataSource dataSource;

    public CompanyDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Company> findAll() {
        List<Company> companies = new ArrayList<>();
        String sql = "SELECT * FROM companies ORDER BY created_at DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                companies.add(mapResultSetToCompany(rs));
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding all companies: " + e.getMessage());
        }
        return companies;
    }

    public Optional<Company> findById(Long id) {
        String sql = "SELECT * FROM companies WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToCompany(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding company by id: " + e.getMessage());
        }
        return Optional.empty();
    }

    public Optional<Company> findByName(String name) {
        String sql = "SELECT * FROM companies WHERE company_name = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, name);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToCompany(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding company by name: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(Company company) {
        String sql = """
            INSERT INTO companies (
                company_name, type, website, logo_url, industry, size, description,
                contact_email, contact_phone, contact_address, linkedin_url, twitter_url, github_url,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, company.getCompanyName());
            ps.setString(paramIndex++, company.getType());
            ps.setString(paramIndex++, company.getWebsite());
            ps.setString(paramIndex++, company.getLogoUrl());
            ps.setString(paramIndex++, company.getIndustry() != null ? company.getIndustry().name() : null);
            ps.setInt(paramIndex++, company.getSize() != null ? company.getSize() : 0);
            ps.setString(paramIndex++, company.getDescription());
            ps.setString(paramIndex++, company.getContactEmail());
            ps.setString(paramIndex++, company.getContactPhone());
            ps.setString(paramIndex++, company.getContactAddress());
            ps.setString(paramIndex++, company.getLinkedinUrl());
            ps.setString(paramIndex++, company.getTwitterUrl());
            ps.setString(paramIndex++, company.getGithubUrl());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        company.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating company: " + e.getMessage());
        }
        return false;
    }

    public boolean update(Company company) {
        String sql = """
            UPDATE companies SET
                company_name = ?, type = ?, website = ?, logo_url = ?, industry = ?,
                size = ?, description = ?, contact_email = ?, contact_phone = ?, contact_address = ?,
                linkedin_url = ?, twitter_url = ?, github_url = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, company.getCompanyName());
            ps.setString(paramIndex++, company.getType());
            ps.setString(paramIndex++, company.getWebsite());
            ps.setString(paramIndex++, company.getLogoUrl());
            ps.setString(paramIndex++, company.getIndustry() != null ? company.getIndustry().name() : null);
            ps.setInt(paramIndex++, company.getSize() != null ? company.getSize() : 0);
            ps.setString(paramIndex++, company.getDescription());
            ps.setString(paramIndex++, company.getContactEmail());
            ps.setString(paramIndex++, company.getContactPhone());
            ps.setString(paramIndex++, company.getContactAddress());
            ps.setString(paramIndex++, company.getLinkedinUrl());
            ps.setString(paramIndex++, company.getTwitterUrl());
            ps.setString(paramIndex++, company.getGithubUrl());
            ps.setLong(paramIndex++, company.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating company: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM companies WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting company: " + e.getMessage());
            return false;
        }
    }

    private Company mapResultSetToCompany(ResultSet rs) throws SQLException {
        Company company = new Company();
        company.setId(rs.getLong("id"));
        company.setCompanyName(rs.getString("company_name"));
        company.setType(rs.getString("type"));
        company.setWebsite(rs.getString("website"));
        company.setLogoUrl(rs.getString("logo_url"));
        String industryStr = rs.getString("industry");
        if (industryStr != null) {
            company.setIndustry(Industry.valueOf(industryStr));
        }
        company.setSize(rs.getInt("size"));
        company.setDescription(rs.getString("description"));
        company.setContactEmail(rs.getString("contact_email"));
        company.setContactPhone(rs.getString("contact_phone"));
        company.setContactAddress(rs.getString("contact_address"));
        company.setLinkedinUrl(rs.getString("linkedin_url"));
        company.setTwitterUrl(rs.getString("twitter_url"));
        company.setGithubUrl(rs.getString("github_url"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            company.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            company.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return company;
    }
}
