package ai.yuvi.dao;

import ai.yuvi.model.Conversation;
import ai.yuvi.config.DataSourceProvider;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConversationDao {
    private static final Logger LOGGER = Logger.getLogger(ConversationDao.class.getName());

    public Long create(Conversation conversation) {
        String sql = """
            INSERT INTO conversation (context_type, context_id, goal, model, request_tokens, 
                                    response_tokens, execution_time)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            RETURNING conversation_id
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, conversation.getContextType());
            stmt.setLong(2, conversation.getContextId());
            stmt.setString(3, conversation.getGoal());
            stmt.setString(4, conversation.getModel());
            stmt.setObject(5, conversation.getRequestTokens());
            stmt.setObject(6, conversation.getResponseTokens());
            stmt.setObject(7, conversation.getExecutionTime());

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error creating conversation", e);
        }
        return null;
    }

    public Optional<Conversation> findById(Long conversationId) {
        String sql = """
            SELECT conversation_id, context_type, context_id, goal, model, 
                   request_tokens, response_tokens, execution_time, 
                   created_at, updated_at
            FROM conversation 
            WHERE conversation_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, conversationId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToConversation(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding conversation by ID", e);
        }
        return Optional.empty();
    }

    public List<Conversation> findByContextTypeAndId(String contextType, Long contextId) {
        String sql = """
            SELECT conversation_id, context_type, context_id, goal, model, 
                   request_tokens, response_tokens, execution_time, 
                   created_at, updated_at
            FROM conversation 
            WHERE context_type = ? AND context_id = ?
            ORDER BY created_at DESC
        """;

        List<Conversation> conversations = new ArrayList<>();
        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, contextType);
            stmt.setLong(2, contextId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    conversations.add(mapResultSetToConversation(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding conversations by context", e);
        }
        return conversations;
    }

    public boolean update(Conversation conversation) {
        String sql = """
            UPDATE conversation 
            SET context_type = ?, context_id = ?, goal = ?, model = ?,
                request_tokens = ?, response_tokens = ?, execution_time = ?,
                updated_at = NOW()
            WHERE conversation_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, conversation.getContextType());
            stmt.setLong(2, conversation.getContextId());
            stmt.setString(3, conversation.getGoal());
            stmt.setString(4, conversation.getModel());
            stmt.setObject(5, conversation.getRequestTokens());
            stmt.setObject(6, conversation.getResponseTokens());
            stmt.setObject(7, conversation.getExecutionTime());
            stmt.setLong(8, conversation.getConversationId());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating conversation", e);
            return false;
        }
    }

    public boolean delete(Long conversationId) {
        String sql = "DELETE FROM conversation WHERE conversation_id = ?";

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, conversationId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error deleting conversation", e);
            return false;
        }
    }

    private Conversation mapResultSetToConversation(ResultSet rs) throws SQLException {
        Conversation conversation = new Conversation();
        conversation.setConversationId(rs.getLong("conversation_id"));
        conversation.setContextType(rs.getString("context_type"));
        conversation.setContextId(rs.getLong("context_id"));
        conversation.setGoal(rs.getString("goal"));
        conversation.setModel(rs.getString("model"));
        conversation.setRequestTokens(rs.getObject("request_tokens", Integer.class));
        conversation.setResponseTokens(rs.getObject("response_tokens", Integer.class));
        conversation.setExecutionTime(rs.getObject("execution_time", Double.class));
        conversation.setCreatedAt(rs.getObject("created_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));
        conversation.setUpdatedAt(rs.getObject("updated_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));
        return conversation;
    }
} 