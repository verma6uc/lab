package ai.yuvi.dao;

import ai.yuvi.model.Research;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

public class ResearchDao {
    private static final Logger LOGGER = Logger.getLogger(ResearchDao.class.getName());
    private final DataSource dataSource;

    public ResearchDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<Research> findById(Long id) {
        String sql = "SELECT * FROM research WHERE research_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToResearch(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding research by id: " + e.getMessage());
        }
        return Optional.empty();
    }

    public List<Research> findByCompanyId(Long companyId) {
        List<Research> researchList = new ArrayList<>();
        String sql = "SELECT * FROM research WHERE company_id = ? ORDER BY created_at DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    researchList.add(mapResultSetToResearch(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding research by company id: " + e.getMessage());
        }
        return researchList;
    }

    public List<Research> findAll() {
        List<Research> researchList = new ArrayList<>();
        String sql = "SELECT * FROM research ORDER BY created_at DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                researchList.add(mapResultSetToResearch(rs));
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding all research: " + e.getMessage());
        }
        return researchList;
    }

    public boolean create(Research research) {
        String sql = """
            INSERT INTO research (
                company_id, title, description, category, status, type,
                methodology, findings, recommendations, conducted_by,
                participant_count, budget, currency,
                document_url, presentation_url,
                start_date, end_date, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, research.getCompanyId());
            ps.setString(paramIndex++, research.getTitle());
            ps.setString(paramIndex++, research.getDescription());
            ps.setString(paramIndex++, research.getCategory());
            ps.setString(paramIndex++, research.getStatus());
            ps.setString(paramIndex++, research.getType());
            ps.setString(paramIndex++, research.getMethodology());
            ps.setString(paramIndex++, research.getFindings());
            ps.setString(paramIndex++, research.getRecommendations());
            ps.setString(paramIndex++, research.getConductedBy());
            ps.setInt(paramIndex++, research.getParticipantCount());
            ps.setDouble(paramIndex++, research.getBudget());
            ps.setString(paramIndex++, research.getCurrency());
            ps.setString(paramIndex++, research.getDocumentUrl());
            ps.setString(paramIndex++, research.getPresentationUrl());
            ps.setTimestamp(paramIndex++, research.getStartDate() != null ? 
                Timestamp.from(research.getStartDate().toInstant()) : null);
            ps.setTimestamp(paramIndex++, research.getEndDate() != null ? 
                Timestamp.from(research.getEndDate().toInstant()) : null);

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        research.setResearchId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating research: " + e.getMessage());
        }
        return false;
    }

    public boolean update(Research research) {
        String sql = """
            UPDATE research SET 
                title = ?, description = ?, category = ?, status = ?, type = ?,
                methodology = ?, findings = ?, recommendations = ?, conducted_by = ?,
                participant_count = ?, budget = ?, currency = ?,
                document_url = ?, presentation_url = ?,
                start_date = ?, end_date = ?, updated_at = CURRENT_TIMESTAMP
            WHERE research_id = ? AND company_id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, research.getTitle());
            ps.setString(paramIndex++, research.getDescription());
            ps.setString(paramIndex++, research.getCategory());
            ps.setString(paramIndex++, research.getStatus());
            ps.setString(paramIndex++, research.getType());
            ps.setString(paramIndex++, research.getMethodology());
            ps.setString(paramIndex++, research.getFindings());
            ps.setString(paramIndex++, research.getRecommendations());
            ps.setString(paramIndex++, research.getConductedBy());
            ps.setInt(paramIndex++, research.getParticipantCount());
            ps.setDouble(paramIndex++, research.getBudget());
            ps.setString(paramIndex++, research.getCurrency());
            ps.setString(paramIndex++, research.getDocumentUrl());
            ps.setString(paramIndex++, research.getPresentationUrl());
            ps.setTimestamp(paramIndex++, research.getStartDate() != null ? 
                Timestamp.from(research.getStartDate().toInstant()) : null);
            ps.setTimestamp(paramIndex++, research.getEndDate() != null ? 
                Timestamp.from(research.getEndDate().toInstant()) : null);
            ps.setLong(paramIndex++, research.getResearchId());
            ps.setLong(paramIndex++, research.getCompanyId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating research: " + e.getMessage());
        }
        return false;
    }

    public boolean delete(Long researchId, Long companyId) {
        String sql = "DELETE FROM research WHERE research_id = ? AND company_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, researchId);
            ps.setLong(2, companyId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting research: " + e.getMessage());
        }
        return false;
    }

    private Research mapResultSetToResearch(ResultSet rs) throws SQLException {
        Research research = new Research();
        research.setResearchId(rs.getLong("research_id"));
        research.setCompanyId(rs.getLong("company_id"));
        research.setTitle(rs.getString("title"));
        research.setDescription(rs.getString("description"));
        research.setCategory(rs.getString("category"));
        research.setStatus(rs.getString("status"));
        research.setType(rs.getString("type"));
        research.setMethodology(rs.getString("methodology"));
        research.setFindings(rs.getString("findings"));
        research.setRecommendations(rs.getString("recommendations"));
        research.setConductedBy(rs.getString("conducted_by"));
        research.setParticipantCount(rs.getInt("participant_count"));
        research.setBudget(rs.getDouble("budget"));
        research.setCurrency(rs.getString("currency"));
        research.setDocumentUrl(rs.getString("document_url"));
        research.setPresentationUrl(rs.getString("presentation_url"));
        
        Timestamp startDate = rs.getTimestamp("start_date");
        if (startDate != null) {
            research.setStartDate(startDate.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp endDate = rs.getTimestamp("end_date");
        if (endDate != null) {
            research.setEndDate(endDate.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            research.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            research.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return research;
    }
} 