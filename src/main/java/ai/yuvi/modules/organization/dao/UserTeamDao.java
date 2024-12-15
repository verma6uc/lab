package ai.yuvi.modules.organization.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.organization.model.UserTeam;

public class UserTeamDao {
    private static final Logger LOGGER = Logger.getLogger(UserTeamDao.class.getName());
    private final DataSource dataSource;

    public UserTeamDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<UserTeam> findByTeamId(Long teamId) {
        List<UserTeam> userTeams = new ArrayList<>();
        String sql = "SELECT * FROM user_teams WHERE team_id = ?";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, teamId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    userTeams.add(mapResultSetToUserTeam(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding user teams by team ID: " + e.getMessage());
        }
        return userTeams;
    }

    public List<UserTeam> findByUserId(Long userId) {
        List<UserTeam> userTeams = new ArrayList<>();
        String sql = "SELECT * FROM user_teams WHERE user_id = ?";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    userTeams.add(mapResultSetToUserTeam(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding user teams by user ID: " + e.getMessage());
        }
        return userTeams;
    }

    public Optional<UserTeam> findByUserIdAndTeamId(Long userId, Long teamId) {
        String sql = "SELECT * FROM user_teams WHERE user_id = ? AND team_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            ps.setLong(2, teamId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUserTeam(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding user team by user ID and team ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(UserTeam userTeam) {
        String sql = "INSERT INTO user_teams (user_id, team_id) VALUES (?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userTeam.getUserId());
            ps.setLong(2, userTeam.getTeamId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error creating user team: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long userId, Long teamId) {
        String sql = "DELETE FROM user_teams WHERE user_id = ? AND team_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            ps.setLong(2, teamId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting user team: " + e.getMessage());
            return false;
        }
    }

    public boolean deleteByTeamId(Long teamId) {
        String sql = "DELETE FROM user_teams WHERE team_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, teamId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting user teams by team ID: " + e.getMessage());
            return false;
        }
    }

    public boolean deleteByUserId(Long userId) {
        String sql = "DELETE FROM user_teams WHERE user_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting user teams by user ID: " + e.getMessage());
            return false;
        }
    }

    private UserTeam mapResultSetToUserTeam(ResultSet rs) throws SQLException {
        UserTeam userTeam = new UserTeam();
        userTeam.setUserId(rs.getLong("user_id"));
        userTeam.setTeamId(rs.getLong("team_id"));
        return userTeam;
    }
}
