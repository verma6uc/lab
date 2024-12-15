package ai.yuvi.modules.user.enums;

public enum SessionStatus {
    ACTIVE("active"),
    EXPIRED("expired"),
    INVALIDATED("invalidated"),
    LOGGED_OUT("logged_out"),
    SUSPENDED("suspended");

    private final String value;

    SessionStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static SessionStatus fromString(String text) {
        for (SessionStatus status : SessionStatus.values()) {
            if (status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }

    public boolean isValid() {
        return this == ACTIVE;
    }

    public boolean isTerminated() {
        return this == EXPIRED || this == INVALIDATED || this == LOGGED_OUT || this == SUSPENDED;
    }
}
