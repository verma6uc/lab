package ai.yuvi.modules.conversation.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.conversation.enums.MessageType;
import ai.yuvi.modules.conversation.model.ConversationMessage;

public class ConversationMessageDao {
    private static final Logger LOGGER = Logger.getLogger(ConversationMessageDao.class.getName());
    private final DataSource dataSource;

    public ConversationMessageDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<ConversationMessage> findByConversationId(Long conversationId) {
        List<ConversationMessage> messages = new ArrayList<>();
        String sql = "SELECT * FROM conversation_messages WHERE conversation_id = ? ORDER BY created_at ASC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, conversationId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    messages.add(mapResultSetToConversationMessage(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding messages by conversation ID: " + e.getMessage());
        }
        return messages;
    }

    public Optional<ConversationMessage> findById(Long id) {
        String sql = "SELECT * FROM conversation_messages WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToConversationMessage(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding message by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(ConversationMessage message) {
        String sql = """
            INSERT INTO conversation_messages (
                conversation_id, type, content, function_name, function_args,
                function_result, token_count, processing_time,
                created_at, updated_at
            ) VALUES (?, ?::message_type, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, message.getConversationId());
            ps.setString(paramIndex++, message.getType().name());
            ps.setString(paramIndex++, message.getContent());
            ps.setString(paramIndex++, message.getFunctionName());
            ps.setString(paramIndex++, message.getFunctionArgs());
            ps.setString(paramIndex++, message.getFunctionResult());
            ps.setInt(paramIndex++, message.getTokenCount());
            ps.setDouble(paramIndex++, message.getProcessingTime());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        message.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating message: " + e.getMessage());
        }
        return false;
    }

    public boolean update(ConversationMessage message) {
        String sql = """
            UPDATE conversation_messages SET 
                content = ?, function_name = ?, function_args = ?,
                function_result = ?, token_count = ?, processing_time = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            ps.setString(paramIndex++, message.getContent());
            ps.setString(paramIndex++, message.getFunctionName());
            ps.setString(paramIndex++, message.getFunctionArgs());
            ps.setString(paramIndex++, message.getFunctionResult());
            ps.setInt(paramIndex++, message.getTokenCount());
            ps.setDouble(paramIndex++, message.getProcessingTime());
            ps.setLong(paramIndex++, message.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating message: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM conversation_messages WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting message: " + e.getMessage());
            return false;
        }
    }

    private ConversationMessage mapResultSetToConversationMessage(ResultSet rs) throws SQLException {
        ConversationMessage message = new ConversationMessage();
        message.setId(rs.getLong("id"));
        message.setConversationId(rs.getLong("conversation_id"));
        message.setType(MessageType.valueOf(rs.getString("type")));
        message.setContent(rs.getString("content"));
        message.setFunctionName(rs.getString("function_name"));
        message.setFunctionArgs(rs.getString("function_args"));
        message.setFunctionResult(rs.getString("function_result"));
        message.setTokenCount(rs.getInt("token_count"));
        message.setProcessingTime(rs.getDouble("processing_time"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            message.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            message.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return message;
    }
}
