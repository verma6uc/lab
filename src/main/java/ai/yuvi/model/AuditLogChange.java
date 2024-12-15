package ai.yuvi.model;

public class AuditLogChange {
    private Long auditChangeId;
    private Long auditId;
    private String columnName;
    private String oldValue;
    private String newValue;

    // Getters and Setters
    public Long getAuditChangeId() {
        return auditChangeId;
    }
    public void setAuditChangeId(Long auditChangeId) {
        this.auditChangeId = auditChangeId;
    }

    public Long getAuditId() {
        return auditId;
    }
    public void setAuditId(Long auditId) {
        this.auditId = auditId;
    }

    public String getColumnName() {
        return columnName;
    }
    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getOldValue() {
        return oldValue;
    }
    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }
    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }
}
