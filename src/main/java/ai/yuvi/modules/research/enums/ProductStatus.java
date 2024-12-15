package ai.yuvi.modules.research.enums;

public enum ProductStatus {
    CONCEPT("concept"),
    DEVELOPMENT("development"),
    BETA("beta"),
    LAUNCHED("launched"),
    MAINTENANCE("maintenance"),
    DEPRECATED("deprecated"),
    DISCONTINUED("discontinued");

    private final String value;

    ProductStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ProductStatus fromString(String text) {
        for (ProductStatus status : ProductStatus.values()) {
            if (status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }
}
