package ai.yuvi.modules.audit.enums;

public enum AuditOperation {
    CREATE("create"),
    UPDATE("update"),
    DELETE("delete"),
    READ("read"),
    LOGIN("login"),
    LOGOUT("logout"),
    EXPORT("export"),
    IMPORT("import"),
    SHARE("share"),
    ARCHIVE("archive"),
    RESTORE("restore"),
    CONFIGURE("configure"),
    ANALYZE("analyze"),
    GENERATE("generate"),
    PROCESS("process");

    private final String value;

    AuditOperation(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static AuditOperation fromString(String text) {
        for (AuditOperation operation : AuditOperation.values()) {
            if (operation.value.equalsIgnoreCase(text)) {
                return operation;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }
}
