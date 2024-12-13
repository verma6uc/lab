package ai.yuvi.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.theokanning.openai.completion.chat.ChatMessage;

import ai.yuvi.util.DbUtil;

/**
 * DatabaseLogger handles inserting conversation details and messages into the database.
 * 
 * This implementation:
 * - Creates a new conversation record per call.
 * - Inserts all user messages and one assistant response into the conversation_message table.
 * - Stores metadata such as model, token counts, and execution time in the conversation record.
 * - Assumes context is always a company (context_type = "company") and context_id = applicationContext.
 * 
 * If you need different context types or to append to existing conversations, modify the logic accordingly.
 */
public class DatabaseLogger {

    /**
     * Logs a conversation and its messages to the database.
     * 
     * @param model The name of the LLM model used (e.g., "gpt-4")
     * @param messages A list of user messages (ChatMessage objects with role='user')
     * @param chatResponse The assistant's response as a string
     * @param requestTokens Number of tokens in the request
     * @param responseTokens Number of tokens in the response
     * @param executionTime Time taken for the LLM call, in seconds
     * @param goal The goal of the conversation (e.g., "Research a company")
     * @param applicationContext The ID of the context entity, e.g. a company_id
     * @param object Reserved parameter (not used)
     */
    public static void logConversation(String model, List<ChatMessage> messages, String chatResponse, int requestTokens,
            int responseTokens, double executionTime, String goal, Integer applicationContext, Object object, String contextType) {

          long contextId = (applicationContext != null) ? applicationContext.longValue() : 0L;

        Connection conn = null;
        try {
            conn = DbUtil.getConnection();
            conn.setAutoCommit(false);

            // Insert a new conversation record
            Long conversationId = insertConversation(conn, contextType, contextId, goal, model, requestTokens, responseTokens, executionTime);
            if (conversationId == null) {
                System.err.println("Failed to insert conversation record");
                conn.rollback();
                return;
            }

            // Insert user messages
            for (ChatMessage msg : messages) {
                // Ensure role is 'user', if not, treat it accordingly
                String role = (msg.getRole() != null) ? msg.getRole() : "user";
                insertConversationMessage(conn, conversationId, role, msg.getContent());
            }

            // Insert assistant response
            if (chatResponse != null && !chatResponse.trim().isEmpty()) {
                insertConversationMessage(conn, conversationId, "assistant", chatResponse);
            }

            // If we got here, everything is good
            conn.commit();

        } catch (SQLException e) {
            System.err.println("Error logging conversation: " + e.getMessage());
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    System.err.println("Failed to rollback transaction: " + ex.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) {
                    // Ignored
                }
            }
        }
    }

    /**
     * Inserts a conversation record into the conversation table.
     */
    private static Long insertConversation(Connection conn, String contextType, long contextId, String goal, 
                                           String model, int requestTokens, int responseTokens, double executionTime) throws SQLException {
        String sql = "INSERT INTO conversation (context_type, context_id, goal, model, request_tokens, response_tokens, execution_time, created_at, updated_at) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW()) RETURNING conversation_id";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, contextType);
            ps.setLong(2, contextId);
            ps.setString(3, goal);
            ps.setString(4, model);
            ps.setObject(5, requestTokens);  // setObject used, can also use ps.setInt
            ps.setObject(6, responseTokens);
            ps.setObject(7, executionTime);  // setObject works for double too

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                } else {
                    return null;
                }
            }
        }
    }

    /**
     * Inserts a message into the conversation_message table.
     */
    private static void insertConversationMessage(Connection conn, Long conversationId, String role, String content) throws SQLException {
        String sql = "INSERT INTO conversation_message (conversation_id, role, content, created_at) VALUES (?, ?, ?, NOW())";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, conversationId);
            ps.setString(2, role);
            ps.setString(3, content);
            ps.executeUpdate();
        }
    }
}
