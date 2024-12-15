package ai.yuvi.modules.conversation.enums;

public enum ConversationStatus {
    ACTIVE("active"),
    PAUSED("paused"),
    COMPLETED("completed"),
    ARCHIVED("archived"),
    DELETED("deleted");

    private final String value;

    ConversationStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ConversationStatus fromString(String text) {
        for (ConversationStatus status : ConversationStatus.values()) {
            if (status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }
}
