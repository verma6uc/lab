package ai.yuvi.dao;

import ai.yuvi.model.*;
import javax.sql.DataSource;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.sql.*;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class CompanyDao {
    private static final Logger LOGGER = Logger.getLogger(CompanyDao.class.getName());
    private final DataSource dataSource;

    public CompanyDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Company> findAll() {
        List<Company> companies = new ArrayList<>();
        String sql = "SELECT * FROM company ORDER BY created_at DESC";
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
        String sql = "SELECT * FROM company WHERE company_id = ?";
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
        String sql = "SELECT * FROM company WHERE name = ?";
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
            INSERT INTO company (
                name, type, website, logo_url, industry, size, description,
                email, phone, location, linkedin_url, twitter_url, github_url,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, company.getName());
            ps.setString(paramIndex++, company.getType());
            ps.setString(paramIndex++, company.getWebsite());
            ps.setString(paramIndex++, company.getLogoUrl());
            ps.setString(paramIndex++, company.getIndustry() != null ? company.getIndustry().toString() : null);
            ps.setInt(paramIndex++, company.getSize() != null ? company.getSize() : 0);
            ps.setString(paramIndex++, company.getDescription());
            ps.setString(paramIndex++, company.getEmail());
            ps.setString(paramIndex++, company.getPhone());
            ps.setString(paramIndex++, company.getLocation());
            ps.setString(paramIndex++, company.getLinkedinUrl());
            ps.setString(paramIndex++, company.getTwitterUrl());
            ps.setString(paramIndex++, company.getGithubUrl());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        company.setCompanyId(generatedKeys.getLong(1));
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
            UPDATE company SET
                name = ?, type = ?, website = ?, logo_url = ?, industry = ?,
                size = ?, description = ?, email = ?, phone = ?, location = ?,
                linkedin_url = ?, twitter_url = ?, github_url = ?, updated_at = CURRENT_TIMESTAMP
            WHERE company_id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, company.getName());
            ps.setString(paramIndex++, company.getType());
            ps.setString(paramIndex++, company.getWebsite());
            ps.setString(paramIndex++, company.getLogoUrl());
            ps.setString(paramIndex++, company.getIndustry() != null ? company.getIndustry().toString() : null);
            ps.setInt(paramIndex++, company.getSize() != null ? company.getSize() : 0);
            ps.setString(paramIndex++, company.getDescription());
            ps.setString(paramIndex++, company.getEmail());
            ps.setString(paramIndex++, company.getPhone());
            ps.setString(paramIndex++, company.getLocation());
            ps.setString(paramIndex++, company.getLinkedinUrl());
            ps.setString(paramIndex++, company.getTwitterUrl());
            ps.setString(paramIndex++, company.getGithubUrl());
            ps.setLong(paramIndex++, company.getCompanyId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating company: " + e.getMessage());
        }
        return false;
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM company WHERE company_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting company: " + e.getMessage());
        }
        return false;
    }

    public List<CompanyProduct> getCompanyProducts(Long companyId) {
        List<CompanyProduct> products = new ArrayList<>();
        String sql = "SELECT * FROM company_product WHERE company_id = ? ";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    products.add(mapResultSetToCompanyProduct(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error getting company products: " + e.getMessage());
        }
        return products;
    }

     

    public List<Research> getCompanyResearch(Long companyId) {
        List<Research> research = new ArrayList<>();
        String sql = "SELECT * FROM research WHERE company_id = ? ";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    research.add(mapResultSetToResearch(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error getting company research: " + e.getMessage());
        }
        return research;
    }

    public List<Competitor> getCompanyCompetitors(Long companyId) {
        List<Competitor> competitors = new ArrayList<>();
        String sql = "SELECT * FROM competitor WHERE company_id = ? ";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    competitors.add(mapResultSetToCompetitor(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error getting company competitors: " + e.getMessage());
        }
        return competitors;
    }

    public List<User> getCompanyUsers(Long companyId) {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM \"user\" WHERE company_id = ? ORDER BY created_at DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    users.add(mapResultSetToCompanyUser(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error getting company users: " + e.getMessage());
        }
        return users;
    }

    private User mapResultSetToCompanyUser(ResultSet rs) {
         try {
			ObjectMapper objectMapper = new ObjectMapper();
			 User user = new User();
			  user.setUserId(rs.getLong("user_id"));
			  user.setId(rs.getString("id"));
			  user.setCompanyId(rs.getLong("company_id"));
			  user.setName(rs.getString("name"));
			  user.setEmail(rs.getString("email"));
			  user.setPassword(rs.getString("password"));
			  user.setRole(UserRole.valueOf(rs.getString("role")));
			  user.setStatus(UserStatus.fromString(rs.getString("status")));
			  user.setLastActive(rs.getObject("last_active", Timestamp.class) != null ? 
			      rs.getObject("last_active", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()) : null);
			  user.setAvatar(rs.getString("avatar"));
			  user.setCreatedAt(rs.getObject("created_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));
			  user.setDepartment(rs.getString("department"));
			  user.setPhone(rs.getString("phone"));
			  user.setLocation(rs.getString("location"));
			  user.setBio(rs.getString("bio"));

			  // Convert array to List<String>
			  Array skillsArray = rs.getArray("skills");
			  if (skillsArray != null) {
			      user.setSkills(Arrays.asList((String[]) skillsArray.getArray()));
			  }

			  // Convert JSONB to JsonNode
			  String preferencesJson = rs.getString("preferences");
			  if (preferencesJson != null) {
			      try {
			          user.setPreferences(objectMapper.readTree(preferencesJson));
			      } catch (Exception e) {
			          LOGGER.log(Level.WARNING, "Error parsing preferences JSON", e);
			      }
			  }

			  String socialLinksJson = rs.getString("social_links");
			  if (socialLinksJson != null) {
			      try {
			          user.setSocialLinks(objectMapper.readTree(socialLinksJson));
			      } catch (Exception e) {
			          LOGGER.log(Level.WARNING, "Error parsing social links JSON", e);
			      }
			  }

			  return user;
		} catch (SQLException e) {
			return null;
		}
	}

	public Brand getCompanyBrand(Long companyId) {
        String sql = "SELECT * FROM company_brand WHERE company_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToBrand(rs);
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error getting company brand: " + e.getMessage());
        }
        return null;
    }

    public List<CompanyUiArchetype> getCompanyUIArchetypes(Long companyId) {
        List<CompanyUiArchetype> archetypes = new ArrayList<>();
        String sql = "SELECT * FROM company_ui_archetype WHERE company_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    archetypes.add(mapResultSetToUIArchetype(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error getting company UI archetypes: " + e.getMessage());
        }
        return archetypes;
    }

    private Company mapResultSetToCompany(ResultSet rs) throws SQLException {
        Company company = new Company();
        company.setCompanyId(rs.getLong("company_id"));
        company.setName(rs.getString("company_name"));
        company.setType(rs.getString("type"));
        company.setWebsite(rs.getString("website"));
        company.setLogoUrl(rs.getString("logo_url"));
        String industryStr = rs.getString("industry");
        if (industryStr != null) {
            company.setIndustry(Industry.valueOf(industryStr));
        }
        company.setSize(rs.getInt("size"));
        company.setDescription(rs.getString("description"));
        company.setEmail(rs.getString("contact_email"));
        company.setPhone(rs.getString("contact_phone"));
        company.setLocation(rs.getString("contact_address"));
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

    private CompanyProduct mapResultSetToCompanyProduct(ResultSet rs) throws SQLException {
        CompanyProduct product = new CompanyProduct();
        product.setProductId(rs.getLong("product_id"));
        product.setCompanyId(rs.getLong("company_id"));
        product.setProductName(rs.getString("product_name"));
        product.setProductDescription(rs.getString("product_description"));
        return product;
    }

   
    private Research mapResultSetToResearch(ResultSet rs) throws SQLException {
        Research research = new Research();
        research.setResearchId(rs.getLong("research_id"));
        research.setCompanyId(rs.getLong("company_id"));
        research.setTitle(rs.getString("title"));
        research.setDescription(rs.getString("description"));
        research.setType(rs.getString("type"));
         research.setPublishedDate(rs.getTimestamp("published_date").toInstant().atZone(java.time.ZoneId.systemDefault()));
        research.setLink(rs.getString("link"));
         research.setStatus(rs.getString("status"));
        research.setDownloads(rs.getInt("downloads"));
        research.setViews(rs.getInt("views"));
         research.setCreatedAt(rs.getTimestamp("created_at").toInstant().atZone(java.time.ZoneId.systemDefault()));
        research.setUpdatedAt(rs.getTimestamp("updated_at").toInstant().atZone(java.time.ZoneId.systemDefault()));
        return research;
    }

    private Competitor mapResultSetToCompetitor(ResultSet rs) throws SQLException {
        Competitor competitor = new Competitor();
        competitor.setCompetitorId(rs.getLong("competitor_id"));
        competitor.setCompanyId(rs.getLong("company_id"));
        competitor.setName(rs.getString("name"));
        competitor.setDescription(rs.getString("description"));
        competitor.setIndustry(rs.getString("industry"));
        competitor.setMarketPosition(rs.getString("market_position"));
        competitor.setTrend(rs.getString("trend"));
        competitor.setEmployeeCount(rs.getString("employee_count"));
        competitor.setFoundedYear(rs.getString("founded_year"));
        competitor.setWebsite(rs.getString("website"));
        competitor.setLinkedinUrl(rs.getString("linkedin_url"));
        competitor.setTwitterUrl(rs.getString("twitter_url"));
       
        competitor.setLastAnalyzed(rs.getTimestamp("last_analyzed").toInstant().atZone(java.time.ZoneId.systemDefault()));
        competitor.setCreatedAt(rs.getTimestamp("created_at").toInstant().atZone(java.time.ZoneId.systemDefault()));
        competitor.setUpdatedAt(rs.getTimestamp("updated_at").toInstant().atZone(java.time.ZoneId.systemDefault()));
        return competitor;
    }

     
    private Brand mapResultSetToBrand(ResultSet rs) throws SQLException {
        Brand brand = new Brand();
        brand.setCompanyId(rs.getLong("company_id"));
        brand.setPrimaryColor(rs.getString("primary_color"));
        brand.setSecondaryColor(rs.getString("secondary_color"));
        brand.setFontFamily(rs.getString("font_family"));
        brand.setLogoUrl(rs.getString("logo_url"));
        return brand;
    }

    private CompanyUiArchetype mapResultSetToUIArchetype(ResultSet rs) throws SQLException {
        CompanyUiArchetype archetype = new CompanyUiArchetype();
        archetype.setArchetypeId(rs.getLong("archetype_id"));
         archetype.setDescription(rs.getString("description"));
         return archetype;
    }

    
}
