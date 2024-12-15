package ai.yuvi.modules.conversation.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.conversation.enums.ConversationStatus;
import ai.yuvi.modules.conversation.model.Conversation;

public class ConversationDao {
    private static final Logger LOGGER = Logger.getLogger(ConversationDao.class.getName());
    private final DataSource dataSource;

    public ConversationDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<Conversation> findByUserId(Long userId) {
        List<Conversation> conversations = new ArrayList<>();
        String sql = "SELECT * FROM conversations WHERE user_id = ? ORDER BY last_message_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    conversations.add(mapResultSetToConversation(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding conversations by user ID: " + e.getMessage());
        }
        return conversations;
    }

    public Optional<Conversation> findById(Long id) {
        String sql = "SELECT * FROM conversations WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToConversation(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding conversation by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(Conversation conversation) {
        String sql = """
            INSERT INTO conversations (
                user_id, company_id, title, description, context, status,
                model, system_prompt, message_count, last_message_at,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?::conversation_status, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, conversation.getUserId());
            ps.setLong(paramIndex++, conversation.getCompanyId());
            ps.setString(paramIndex++, conversation.getTitle());
            ps.setString(paramIndex++, conversation.getDescription());
            ps.setString(paramIndex++, conversation.getContext());
            ps.setString(paramIndex++, conversation.getStatus().name());
            ps.setString(paramIndex++, conversation.getModel());
            ps.setString(paramIndex++, conversation.getSystemPrompt());
            ps.setInt(paramIndex++, conversation.getMessageCount());
            
            if (conversation.getLastMessageAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(conversation.getLastMessageAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        conversation.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating conversation: " + e.getMessage());
        }
        return false;
    }

    public boolean update(Conversation conversation) {
        String sql = """
            UPDATE conversations SET 
                title = ?, description = ?, context = ?, status = ?::conversation_status,
                model = ?, system_prompt = ?, message_count = ?, last_message_at = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, conversation.getTitle());
            ps.setString(paramIndex++, conversation.getDescription());
            ps.setString(paramIndex++, conversation.getContext());
            ps.setString(paramIndex++, conversation.getStatus().name());
            ps.setString(paramIndex++, conversation.getModel());
            ps.setString(paramIndex++, conversation.getSystemPrompt());
            ps.setInt(paramIndex++, conversation.getMessageCount());
            
            if (conversation.getLastMessageAt() != null) {
                ps.setTimestamp(paramIndex++, Timestamp.from(conversation.getLastMessageAt().toInstant()));
            } else {
                ps.setNull(paramIndex++, Types.TIMESTAMP);
            }
            
            ps.setLong(paramIndex++, conversation.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating conversation: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM conversations WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting conversation: " + e.getMessage());
            return false;
        }
    }

    private Conversation mapResultSetToConversation(ResultSet rs) throws SQLException {
        Conversation conversation = new Conversation();
        conversation.setId(rs.getLong("id"));
        conversation.setUserId(rs.getLong("user_id"));
        conversation.setCompanyId(rs.getLong("company_id"));
        conversation.setTitle(rs.getString("title"));
        conversation.setDescription(rs.getString("description"));
        conversation.setContext(rs.getString("context"));
        conversation.setStatus(ConversationStatus.valueOf(rs.getString("status")));
        conversation.setModel(rs.getString("model"));
        conversation.setSystemPrompt(rs.getString("system_prompt"));
        conversation.setMessageCount(rs.getInt("message_count"));
        
        Timestamp lastMessageAt = rs.getTimestamp("last_message_at");
        if (lastMessageAt != null) {
            conversation.setLastMessageAt(lastMessageAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            conversation.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            conversation.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return conversation;
    }
}
