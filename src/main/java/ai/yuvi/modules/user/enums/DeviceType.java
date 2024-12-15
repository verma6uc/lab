package ai.yuvi.modules.user.enums;

public enum DeviceType {
    DESKTOP("desktop"),
    LAPTOP("laptop"),
    TABLET("tablet"),
    MOBILE("mobile"),
    TV("tv"),
    CONSOLE("console"),
    OTHER("other");

    private final String value;

    DeviceType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static DeviceType fromString(String text) {
        for (DeviceType device : DeviceType.values()) {
            if (device.value.equalsIgnoreCase(text)) {
                return device;
            }
        }
        return OTHER;
    }

    public boolean isMobile() {
        return this == MOBILE || this == TABLET;
    }

    public boolean isDesktop() {
        return this == DESKTOP || this == LAPTOP;
    }
}
