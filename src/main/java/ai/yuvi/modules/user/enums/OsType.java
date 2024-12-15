package ai.yuvi.modules.user.enums;

public enum OsType {
    WINDOWS("windows"),
    MACOS("macos"),
    LINUX("linux"),
    IOS("ios"),
    ANDROID("android"),
    OTHER("other");

    private final String value;

    OsType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static OsType fromString(String text) {
        for (OsType os : OsType.values()) {
            if (os.value.equalsIgnoreCase(text)) {
                return os;
            }
        }
        return OTHER;
    }

    public boolean isMobile() {
        return this == IOS || this == ANDROID;
    }

    public boolean isDesktop() {
        return this == WINDOWS || this == MACOS || this == LINUX;
    }
}
