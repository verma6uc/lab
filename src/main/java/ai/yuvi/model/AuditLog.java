package ai.yuvi.model;

import java.time.ZonedDateTime;

public class AuditLog {
    private Long id;
    private String tableName;
    private Long recordId;
    private String operation;
    private String performedBy;
    private ZonedDateTime performedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }
    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Long getRecordId() {
        return recordId;
    }
    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    public String getOperation() {
        return operation;
    }
    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getPerformedBy() {
        return performedBy;
    }
    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public ZonedDateTime getPerformedAt() {
        return performedAt;
    }
    public void setPerformedAt(ZonedDateTime performedAt) {
        this.performedAt = performedAt;
    }
}
