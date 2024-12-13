package ai.yuvi.model;

public enum UserStatus {
    ACTIVE("active"),
    INACTIVE("inactive"),
    PENDING("pending");

    private final String value;

    UserStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static UserStatus fromString(String text) {
        for (UserStatus status : UserStatus.values()) {
            if (status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }
} 