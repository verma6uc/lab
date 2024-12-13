package ai.yuvi.dao;

import ai.yuvi.model.ConversationMessage;
import ai.yuvi.config.DataSourceProvider;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConversationMessageDao {
    private static final Logger LOGGER = Logger.getLogger(ConversationMessageDao.class.getName());

    public Long create(ConversationMessage message) {
        String sql = """
            INSERT INTO conversation_message (conversation_id, role, content)
            VALUES (?, ?, ?)
            RETURNING message_id
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, message.getConversationId());
            stmt.setString(2, message.getRole());
            stmt.setString(3, message.getContent());

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error creating conversation message", e);
        }
        return null;
    }

    public Optional<ConversationMessage> findById(Long messageId) {
        String sql = """
            SELECT message_id, conversation_id, role, content, created_at
            FROM conversation_message 
            WHERE message_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, messageId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToMessage(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding message by ID", e);
        }
        return Optional.empty();
    }

    public List<ConversationMessage> findByConversationId(Long conversationId) {
        String sql = """
            SELECT message_id, conversation_id, role, content, created_at
            FROM conversation_message 
            WHERE conversation_id = ?
            ORDER BY created_at ASC
        """;

        List<ConversationMessage> messages = new ArrayList<>();
        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, conversationId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    messages.add(mapResultSetToMessage(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding messages by conversation ID", e);
        }
        return messages;
    }

    public boolean update(ConversationMessage message) {
        String sql = """
            UPDATE conversation_message 
            SET role = ?, content = ?
            WHERE message_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, message.getRole());
            stmt.setString(2, message.getContent());
            stmt.setLong(3, message.getMessageId());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating message", e);
            return false;
        }
    }

    public boolean delete(Long messageId) {
        String sql = "DELETE FROM conversation_message WHERE message_id = ?";

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, messageId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error deleting message", e);
            return false;
        }
    }

    private ConversationMessage mapResultSetToMessage(ResultSet rs) throws SQLException {
        ConversationMessage message = new ConversationMessage();
        message.setMessageId(rs.getLong("message_id"));
        message.setConversationId(rs.getLong("conversation_id"));
        message.setRole(rs.getString("role"));
        message.setContent(rs.getString("content"));
        message.setCreatedAt(rs.getObject("created_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));
        return message;
    }
} 