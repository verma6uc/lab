package ai.yuvi.modules.research.enums;

public enum CompetitorStatus {
    ACTIVE("active"),
    INACTIVE("inactive"),
    ACQUIRED("acquired"),
    MERGED("merged"),
    DEFUNCT("defunct"),
    WATCHING("watching"),
    POTENTIAL("potential");

    private final String value;

    CompetitorStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static CompetitorStatus fromString(String text) {
        for (CompetitorStatus status : CompetitorStatus.values()) {
            if (status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }
}
