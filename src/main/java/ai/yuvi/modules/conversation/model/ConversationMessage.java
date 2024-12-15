package ai.yuvi.modules.conversation.model;

import java.time.ZonedDateTime;

import ai.yuvi.modules.conversation.enums.MessageType;

public class ConversationMessage {
    private Long id;
    private Long messageId;
    private Long conversationId;
    private MessageType type;
    private String content;
    private String functionName;
    private String functionArgs;
    private String functionResult;
    private Integer tokenCount;
    private Double processingTime;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getMessageId() {
        return messageId;
    }
    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public Long getConversationId() {
        return conversationId;
    }
    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public MessageType getType() {
        return type;
    }
    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public String getFunctionName() {
        return functionName;
    }
    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public String getFunctionArgs() {
        return functionArgs;
    }
    public void setFunctionArgs(String functionArgs) {
        this.functionArgs = functionArgs;
    }

    public String getFunctionResult() {
        return functionResult;
    }
    public void setFunctionResult(String functionResult) {
        this.functionResult = functionResult;
    }

    public Integer getTokenCount() {
        return tokenCount;
    }
    public void setTokenCount(Integer tokenCount) {
        this.tokenCount = tokenCount;
    }

    public Double getProcessingTime() {
        return processingTime;
    }
    public void setProcessingTime(Double processingTime) {
        this.processingTime = processingTime;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
