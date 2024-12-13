package ai.yuvi.dao;

import ai.yuvi.model.Team;
import ai.yuvi.config.DataSourceProvider;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TeamDao {
    private static final Logger LOGGER = Logger.getLogger(TeamDao.class.getName());

    public Long create(Team team) {
        String sql = """
            INSERT INTO team (company_id, team_name)
            VALUES (?, ?)
            RETURNING team_id
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, team.getCompanyId());
            stmt.setString(2, team.getTeamName());

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error creating team", e);
        }
        return null;
    }

    public Optional<Team> findById(Long teamId) {
        String sql = """
            SELECT team_id, company_id, team_name, created_at, updated_at
            FROM team 
            WHERE team_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, teamId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToTeam(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding team by ID", e);
        }
        return Optional.empty();
    }

    public List<Team> findByCompanyId(Long companyId) {
        String sql = """
            SELECT team_id, company_id, team_name, created_at, updated_at
            FROM team 
            WHERE company_id = ?
            ORDER BY team_name
        """;

        List<Team> teams = new ArrayList<>();
        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, companyId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    teams.add(mapResultSetToTeam(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding teams by company ID", e);
        }
        return teams;
    }

    public boolean update(Team team) {
        String sql = """
            UPDATE team 
            SET team_name = ?, updated_at = NOW()
            WHERE team_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, team.getTeamName());
            stmt.setLong(2, team.getTeamId());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating team", e);
            return false;
        }
    }

    public boolean delete(Long teamId) {
        String sql = "DELETE FROM team WHERE team_id = ?";

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, teamId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error deleting team", e);
            return false;
        }
    }

    public boolean addUserToTeam(Long userId, Long teamId) {
        String sql = """
            INSERT INTO user_team (user_id, team_id)
            VALUES (?, ?)
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, userId);
            stmt.setLong(2, teamId);

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error adding user to team", e);
            return false;
        }
    }

    public boolean removeUserFromTeam(Long userId, Long teamId) {
        String sql = """
            DELETE FROM user_team 
            WHERE user_id = ? AND team_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, userId);
            stmt.setLong(2, teamId);

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error removing user from team", e);
            return false;
        }
    }

    public List<Long> getTeamUserIds(Long teamId) {
        String sql = """
            SELECT user_id 
            FROM user_team 
            WHERE team_id = ?
        """;

        List<Long> userIds = new ArrayList<>();
        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, teamId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    userIds.add(rs.getLong("user_id"));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error getting team user IDs", e);
        }
        return userIds;
    }

    private Team mapResultSetToTeam(ResultSet rs) throws SQLException {
        Team team = new Team();
        team.setTeamId(rs.getLong("team_id"));
        team.setCompanyId(rs.getLong("company_id"));
        team.setTeamName(rs.getString("team_name"));
        team.setCreatedAt(rs.getObject("created_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));
        team.setUpdatedAt(rs.getObject("updated_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));
        return team;
    }
} 