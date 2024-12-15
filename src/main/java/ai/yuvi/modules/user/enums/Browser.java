package ai.yuvi.modules.user.enums;

public enum Browser {
    CHROME("chrome"),
    FIREFOX("firefox"),
    SAFARI("safari"),
    EDGE("edge"),
    IE("ie"),
    OPERA("opera"),
    OTHER("other");

    private final String value;

    Browser(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Browser fromString(String text) {
        for (Browser browser : Browser.values()) {
            if (browser.value.equalsIgnoreCase(text)) {
                return browser;
            }
        }
        return OTHER;
    }
}
