package ai.yuvi.dao;

import ai.yuvi.model.User;
import ai.yuvi.model.UserRole;
import ai.yuvi.model.UserStatus;
import ai.yuvi.config.DataSourceProvider;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
 
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Arrays;

public class UserDao {
    private static final Logger LOGGER = Logger.getLogger(UserDao.class.getName());
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Long create(User user) {
        String sql = """
            INSERT INTO "user" (id, company_id, name, email, password, role, status, avatar, 
                              department, phone, location, bio, skills, preferences, social_links)
            VALUES (?, ?, ?, ?, ?, ?::user_role, ?::user_status, ?, ?, ?, ?, ?, ?, ?::jsonb, ?::jsonb)
            RETURNING user_id
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            int paramIndex = 1;
            stmt.setString(paramIndex++, user.getId());
            stmt.setLong(paramIndex++, user.getCompanyId());
            stmt.setString(paramIndex++, user.getName());
            stmt.setString(paramIndex++, user.getEmail());
            stmt.setString(paramIndex++, user.getPassword());
            stmt.setString(paramIndex++, user.getRole().name());
            stmt.setString(paramIndex++, user.getStatus().getValue());
            stmt.setString(paramIndex++, user.getAvatar());
            stmt.setString(paramIndex++, user.getDepartment());
            stmt.setString(paramIndex++, user.getPhone());
            stmt.setString(paramIndex++, user.getLocation());
            stmt.setString(paramIndex++, user.getBio());
            
            // Convert List<String> to Array
            if (user.getSkills() != null) {
                Array skillsArray = conn.createArrayOf("text", user.getSkills().toArray());
                stmt.setArray(paramIndex++, skillsArray);
            } else {
                stmt.setNull(paramIndex++, Types.ARRAY);
            }

            // Convert JsonNode to JSONB
            setJsonbParameter(stmt, paramIndex++, user.getPreferences());
            setJsonbParameter(stmt, paramIndex++, user.getSocialLinks());

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error creating user", e);
        }
        return null;
    }

    public Optional<User> findById(Long userId) {
        String sql = """
            SELECT * FROM "user" WHERE user_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUser(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding user by ID", e);
        }
        return Optional.empty();
    }

    public Optional<User> findByEmail(String email) {
        String sql = """
            SELECT * FROM "user" WHERE email = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, email);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToUser(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding user by email", e);
        }
        return Optional.empty();
    }

    public List<User> findByCompanyId(Long companyId) {
        String sql = """
            SELECT * FROM "user" WHERE company_id = ?
        """;

        List<User> users = new ArrayList<>();
        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, companyId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    users.add(mapResultSetToUser(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding users by company ID", e);
        }
        return users;
    }

    public boolean update(User user) {
        String sql = """
            UPDATE "user" 
            SET name = ?, email = ?, password = ?, role = ?::user_role, status = ?::user_status,
                avatar = ?, department = ?, phone = ?, location = ?, bio = ?,
                skills = ?, preferences = ?::jsonb, social_links = ?::jsonb,
                last_active = NOW()
            WHERE user_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            int paramIndex = 1;
            stmt.setString(paramIndex++, user.getName());
            stmt.setString(paramIndex++, user.getEmail());
            stmt.setString(paramIndex++, user.getPassword());
            stmt.setString(paramIndex++, user.getRole().name());
            stmt.setString(paramIndex++, user.getStatus().getValue());
            stmt.setString(paramIndex++, user.getAvatar());
            stmt.setString(paramIndex++, user.getDepartment());
            stmt.setString(paramIndex++, user.getPhone());
            stmt.setString(paramIndex++, user.getLocation());
            stmt.setString(paramIndex++, user.getBio());
            
            if (user.getSkills() != null) {
                Array skillsArray = conn.createArrayOf("text", user.getSkills().toArray());
                stmt.setArray(paramIndex++, skillsArray);
            } else {
                stmt.setNull(paramIndex++, Types.ARRAY);
            }

            setJsonbParameter(stmt, paramIndex++, user.getPreferences());
            setJsonbParameter(stmt, paramIndex++, user.getSocialLinks());
            stmt.setLong(paramIndex++, user.getUserId());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating user", e);
            return false;
        }
    }

    public boolean delete(Long userId) {
        String sql = """
            DELETE FROM "user" WHERE user_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, userId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error deleting user", e);
            return false;
        }
    }

    private User mapResultSetToUser(ResultSet rs) throws SQLException {
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
    }

    private void setJsonbParameter(PreparedStatement stmt, int index, JsonNode jsonNode) throws SQLException {
		/*
		 * if (jsonNode != null) { PGobject jsonObject = new PGobject();
		 * jsonObject.setType("jsonb"); jsonObject.setValue(jsonNode.toString());
		 * stmt.setObject(index, jsonObject); } else { stmt.setNull(index, Types.OTHER);
		 * }
		 */
    }
    
    public static void main(String[] args) {
		System.err.println(new UserDao().findByEmail("admin@yuvilabs.com").get().getEmail());
	}
} 