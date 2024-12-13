package ai.yuvi.dao;

import ai.yuvi.model.Team;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

public class TeamDao {
    private static final Logger LOGGER = Logger.getLogger(TeamDao.class.getName());
    private final DataSource dataSource;

    public TeamDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<Team> findById(Long id) {
        String sql = "SELECT * FROM teams WHERE team_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToTeam(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding team by id: " + e.getMessage());
        }
        return Optional.empty();
    }

    public List<Team> findByCompanyId(Long companyId) {
        List<Team> teams = new ArrayList<>();
        String sql = "SELECT * FROM teams WHERE company_id = ? ORDER BY created_at DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    teams.add(mapResultSetToTeam(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding teams by company id: " + e.getMessage());
        }
        return teams;
    }

    public List<Team> findAll() {
        List<Team> teams = new ArrayList<>();
        String sql = "SELECT * FROM teams ORDER BY created_at DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                teams.add(mapResultSetToTeam(rs));
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding all teams: " + e.getMessage());
        }
        return teams;
    }

    public boolean create(Team team) {
        String sql = """
            INSERT INTO teams (
                company_id, name, description, department, type,
                status, location, member_count, timezone,
                slack_channel, github_team, lead_id, project_id,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, team.getCompanyId());
            ps.setString(paramIndex++, team.getName());
            ps.setString(paramIndex++, team.getDescription());
            ps.setString(paramIndex++, team.getDepartment());
            ps.setString(paramIndex++, team.getType());
            ps.setString(paramIndex++, team.getStatus());
            ps.setString(paramIndex++, team.getLocation());
            ps.setInt(paramIndex++, team.getMemberCount());
            ps.setString(paramIndex++, team.getTimezone());
            ps.setString(paramIndex++, team.getSlackChannel());
            ps.setString(paramIndex++, team.getGithubTeam());
            ps.setString(paramIndex++, team.getLeadId());
            ps.setString(paramIndex++, team.getProjectId());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        team.setTeamId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating team: " + e.getMessage());
        }
        return false;
    }

    public boolean update(Team team) {
        String sql = """
            UPDATE teams SET 
                name = ?, description = ?, department = ?, type = ?,
                status = ?, location = ?, member_count = ?, timezone = ?,
                slack_channel = ?, github_team = ?, lead_id = ?, project_id = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE team_id = ? AND company_id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, team.getName());
            ps.setString(paramIndex++, team.getDescription());
            ps.setString(paramIndex++, team.getDepartment());
            ps.setString(paramIndex++, team.getType());
            ps.setString(paramIndex++, team.getStatus());
            ps.setString(paramIndex++, team.getLocation());
            ps.setInt(paramIndex++, team.getMemberCount());
            ps.setString(paramIndex++, team.getTimezone());
            ps.setString(paramIndex++, team.getSlackChannel());
            ps.setString(paramIndex++, team.getGithubTeam());
            ps.setString(paramIndex++, team.getLeadId());
            ps.setString(paramIndex++, team.getProjectId());
            ps.setLong(paramIndex++, team.getTeamId());
            ps.setLong(paramIndex++, team.getCompanyId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating team: " + e.getMessage());
        }
        return false;
    }

    public boolean delete(Long teamId, Long companyId) {
        String sql = "DELETE FROM teams WHERE team_id = ? AND company_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, teamId);
            ps.setLong(2, companyId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting team: " + e.getMessage());
        }
        return false;
    }

    private Team mapResultSetToTeam(ResultSet rs) throws SQLException {
        Team team = new Team();
        team.setTeamId(rs.getLong("team_id"));
        team.setCompanyId(rs.getLong("company_id"));
        team.setName(rs.getString("name"));
        team.setDescription(rs.getString("description"));
        team.setDepartment(rs.getString("department"));
        team.setType(rs.getString("type"));
        team.setStatus(rs.getString("status"));
        team.setLocation(rs.getString("location"));
        team.setMemberCount(rs.getInt("member_count"));
        team.setTimezone(rs.getString("timezone"));
        team.setSlackChannel(rs.getString("slack_channel"));
        team.setGithubTeam(rs.getString("github_team"));
        team.setLeadId(rs.getString("lead_id"));
        team.setProjectId(rs.getString("project_id"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            team.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            team.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return team;
    }
} 