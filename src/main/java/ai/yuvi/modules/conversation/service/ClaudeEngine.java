package ai.yuvi.modules.conversation.service;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Level;
import java.util.logging.Logger;

import ai.yuvi.modules.conversation.dao.ConversationDao;
import ai.yuvi.modules.conversation.dao.ConversationMessageDao;
import ai.yuvi.modules.conversation.enums.MessageType;
import ai.yuvi.modules.conversation.model.Conversation;
import ai.yuvi.modules.conversation.model.ConversationMessage;
import ai.yuvi.modules.conversation.model.claude.Claude;
import ai.yuvi.modules.conversation.model.claude.Message;
import ai.yuvi.modules.conversation.model.claude.Messages;

public class ClaudeEngine {
    private static final Logger LOGGER = Logger.getLogger(ClaudeEngine.class.getName());
    
    private final Claude claude;
    private final ConversationDao conversationDao;
    private final ConversationMessageDao messageDao;

    public ClaudeEngine(String apiKey, ConversationDao conversationDao, ConversationMessageDao messageDao) {
        this.claude = Claude.builder()
            .apiKey(apiKey)
            .build();
        this.conversationDao = conversationDao;
        this.messageDao = messageDao;
    }

    public CompletableFuture<ConversationMessage> generateResponse(Long conversationId, String userInput) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                // Get conversation context
                Conversation conversation = conversationDao.findById(conversationId)
                    .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));

                // Get conversation history
                List<ConversationMessage> history = messageDao.findByConversationId(conversationId);

                // Create user message
                ConversationMessage userMessage = new ConversationMessage();
                userMessage.setConversationId(conversationId);
                userMessage.setType(MessageType.USER);
                userMessage.setContent(userInput);
                userMessage.setCreatedAt(ZonedDateTime.now());
                messageDao.create(userMessage);

                // Prepare Claude messages
                List<Message> messages = prepareMessages(conversation, history, userInput);

                // Start timing
                Instant start = Instant.now();

                // Generate response
                Messages.Response response = claude.messages(Messages.builder()
                    .model("claude-3-opus-20240229")
                    .maxTokens(4096)
                    .messages(messages)
                    .build());

                // Calculate processing time
                double processingTime = java.time.Duration.between(start, Instant.now()).toMillis() / 1000.0;

                // Create assistant message
                ConversationMessage assistantMessage = new ConversationMessage();
                assistantMessage.setConversationId(conversationId);
                assistantMessage.setType(MessageType.ASSISTANT);
                assistantMessage.setContent(response.content().get(0).text());
                assistantMessage.setTokenCount(response.usage().outputTokens());
                assistantMessage.setProcessingTime(processingTime);
                assistantMessage.setCreatedAt(ZonedDateTime.now());
                messageDao.create(assistantMessage);

                // Update conversation
                conversation.setMessageCount(conversation.getMessageCount() + 2); // User + Assistant
                conversation.setLastMessageAt(ZonedDateTime.now());
                conversationDao.update(conversation);

                return assistantMessage;
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Error generating response", e);
                throw new RuntimeException("Failed to generate response", e);
            }
        });
    }

    private List<Message> prepareMessages(Conversation conversation, List<ConversationMessage> history, String userInput) {
        List<Message> messages = new ArrayList<>();

        // Add system message if present
        if (conversation.getSystemPrompt() != null && !conversation.getSystemPrompt().isEmpty()) {
            messages.add(Message.builder()
                .role("system")
                .content(conversation.getSystemPrompt())
                .build());
        }

        // Add conversation history
        for (ConversationMessage msg : history) {
            messages.add(Message.builder()
                .role(msg.getType().getValue())
                .content(msg.getContent())
                .build());
        }

        // Add current user input
        messages.add(Message.builder()
            .role("user")
            .content(userInput)
            .build());

        return messages;
    }

    public CompletableFuture<Map<String, Object>> analyzeConversation(Long conversationId) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                Conversation conversation = conversationDao.findById(conversationId)
                    .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));

                List<ConversationMessage> messages = messageDao.findByConversationId(conversationId);

                Map<String, Object> analysis = new HashMap<>();
                analysis.put("message_count", messages.size());
                analysis.put("total_tokens", messages.stream()
                    .mapToInt(ConversationMessage::getTokenCount)
                    .sum());
                analysis.put("average_response_time", messages.stream()
                    .filter(m -> m.getType() == MessageType.ASSISTANT)
                    .mapToDouble(ConversationMessage::getProcessingTime)
                    .average()
                    .orElse(0.0));

                return analysis;
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Error analyzing conversation", e);
                throw new RuntimeException("Failed to analyze conversation", e);
            }
        });
    }
}
