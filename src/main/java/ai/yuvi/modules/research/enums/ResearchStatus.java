package ai.yuvi.modules.research.enums;

public enum ResearchStatus {
    PLANNED("planned"),
    IN_PROGRESS("in_progress"),
    COMPLETED("completed"),
    ARCHIVED("archived"),
    CANCELLED("cancelled");

    private final String value;

    ResearchStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ResearchStatus fromString(String text) {
        for (ResearchStatus status : ResearchStatus.values()) {
            if (status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }
}
