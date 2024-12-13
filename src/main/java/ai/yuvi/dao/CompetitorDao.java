package ai.yuvi.dao;

import ai.yuvi.model.Competitor;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

public class CompetitorDao {
    private static final Logger LOGGER = Logger.getLogger(CompetitorDao.class.getName());
    private final DataSource dataSource;

    public CompetitorDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<Competitor> findById(Long id) {
        String sql = "SELECT * FROM competitors WHERE competitor_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToCompetitor(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding competitor by id: " + e.getMessage());
        }
        return Optional.empty();
    }

    public List<Competitor> findByCompanyId(Long companyId) {
        List<Competitor> competitors = new ArrayList<>();
        String sql = "SELECT * FROM competitors WHERE company_id = ? ORDER BY created_at DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    competitors.add(mapResultSetToCompetitor(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding competitors by company id: " + e.getMessage());
        }
        return competitors;
    }

    public List<Competitor> findAll() {
        List<Competitor> competitors = new ArrayList<>();
        String sql = "SELECT * FROM competitors ORDER BY created_at DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                competitors.add(mapResultSetToCompetitor(rs));
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding all competitors: " + e.getMessage());
        }
        return competitors;
    }

    public boolean create(Competitor competitor) {
        String sql = """
            INSERT INTO competitors (
                company_id, name, website, description, type,
                status, strengths_weaknesses, market_share, target_market,
                revenue, currency, employee_count, location, founded,
                logo_url, linkedin_url, twitter_url,
                product_url, pricing_url, notes,
                last_updated, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, competitor.getCompanyId());
            ps.setString(paramIndex++, competitor.getName());
            ps.setString(paramIndex++, competitor.getWebsite());
            ps.setString(paramIndex++, competitor.getDescription());
            ps.setString(paramIndex++, competitor.getType());
            ps.setString(paramIndex++, competitor.getStatus());
            ps.setString(paramIndex++, competitor.getStrengthsWeaknesses());
            ps.setString(paramIndex++, competitor.getMarketShare());
            ps.setString(paramIndex++, competitor.getTargetMarket());
            ps.setDouble(paramIndex++, competitor.getRevenue());
            ps.setString(paramIndex++, competitor.getCurrency());
            ps.setInt(paramIndex++, competitor.getEmployeeCount());
            ps.setString(paramIndex++, competitor.getLocation());
            ps.setString(paramIndex++, competitor.getFounded());
            ps.setString(paramIndex++, competitor.getLogoUrl());
            ps.setString(paramIndex++, competitor.getLinkedinUrl());
            ps.setString(paramIndex++, competitor.getTwitterUrl());
            ps.setString(paramIndex++, competitor.getProductUrl());
            ps.setString(paramIndex++, competitor.getPricingUrl());
            ps.setString(paramIndex++, competitor.getNotes());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        competitor.setCompetitorId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating competitor: " + e.getMessage());
        }
        return false;
    }

    public boolean update(Competitor competitor) {
        String sql = """
            UPDATE competitors SET 
                name = ?, website = ?, description = ?, type = ?,
                status = ?, strengths_weaknesses = ?, market_share = ?, target_market = ?,
                revenue = ?, currency = ?, employee_count = ?, location = ?, founded = ?,
                logo_url = ?, linkedin_url = ?, twitter_url = ?,
                product_url = ?, pricing_url = ?, notes = ?,
                last_updated = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
            WHERE competitor_id = ? AND company_id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, competitor.getName());
            ps.setString(paramIndex++, competitor.getWebsite());
            ps.setString(paramIndex++, competitor.getDescription());
            ps.setString(paramIndex++, competitor.getType());
            ps.setString(paramIndex++, competitor.getStatus());
            ps.setString(paramIndex++, competitor.getStrengthsWeaknesses());
            ps.setString(paramIndex++, competitor.getMarketShare());
            ps.setString(paramIndex++, competitor.getTargetMarket());
            ps.setDouble(paramIndex++, competitor.getRevenue());
            ps.setString(paramIndex++, competitor.getCurrency());
            ps.setInt(paramIndex++, competitor.getEmployeeCount());
            ps.setString(paramIndex++, competitor.getLocation());
            ps.setString(paramIndex++, competitor.getFounded());
            ps.setString(paramIndex++, competitor.getLogoUrl());
            ps.setString(paramIndex++, competitor.getLinkedinUrl());
            ps.setString(paramIndex++, competitor.getTwitterUrl());
            ps.setString(paramIndex++, competitor.getProductUrl());
            ps.setString(paramIndex++, competitor.getPricingUrl());
            ps.setString(paramIndex++, competitor.getNotes());
            ps.setLong(paramIndex++, competitor.getCompetitorId());
            ps.setLong(paramIndex++, competitor.getCompanyId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating competitor: " + e.getMessage());
        }
        return false;
    }

    public boolean delete(Long competitorId, Long companyId) {
        String sql = "DELETE FROM competitors WHERE competitor_id = ? AND company_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, competitorId);
            ps.setLong(2, companyId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting competitor: " + e.getMessage());
        }
        return false;
    }

    private Competitor mapResultSetToCompetitor(ResultSet rs) throws SQLException {
        Competitor competitor = new Competitor();
        competitor.setCompetitorId(rs.getLong("competitor_id"));
        competitor.setCompanyId(rs.getLong("company_id"));
        competitor.setName(rs.getString("name"));
        competitor.setWebsite(rs.getString("website"));
        competitor.setDescription(rs.getString("description"));
        competitor.setType(rs.getString("type"));
        competitor.setStatus(rs.getString("status"));
        competitor.setStrengthsWeaknesses(rs.getString("strengths_weaknesses"));
        competitor.setMarketShare(rs.getString("market_share"));
        competitor.setTargetMarket(rs.getString("target_market"));
        competitor.setRevenue(rs.getDouble("revenue"));
        competitor.setCurrency(rs.getString("currency"));
        competitor.setEmployeeCount(rs.getInt("employee_count"));
        competitor.setLocation(rs.getString("location"));
        competitor.setFounded(rs.getString("founded"));
        competitor.setLogoUrl(rs.getString("logo_url"));
        competitor.setLinkedinUrl(rs.getString("linkedin_url"));
        competitor.setTwitterUrl(rs.getString("twitter_url"));
        competitor.setProductUrl(rs.getString("product_url"));
        competitor.setPricingUrl(rs.getString("pricing_url"));
        competitor.setNotes(rs.getString("notes"));
        
        Timestamp lastUpdated = rs.getTimestamp("last_updated");
        if (lastUpdated != null) {
            competitor.setLastUpdated(lastUpdated.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            competitor.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            competitor.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return competitor;
    }
} 