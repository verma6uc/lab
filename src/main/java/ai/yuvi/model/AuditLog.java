package ai.yuvi.model;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

public class AuditLog {
    private Long auditId;
    private String tableName;
    private Long recordId;
    private String operation;
    private String performedBy;
    private ZonedDateTime performedAt;
    private List<AuditLogChange> changes = new ArrayList<>();

    // Getters and Setters
    public Long getAuditId() { return auditId; }
    public void setAuditId(Long auditId) { this.auditId = auditId; }

    public String getTableName() { return tableName; }
    public void setTableName(String tableName) { this.tableName = tableName; }

    public Long getRecordId() { return recordId; }
    public void setRecordId(Long recordId) { this.recordId = recordId; }

    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }

    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }

    public ZonedDateTime getPerformedAt() { return performedAt; }
    public void setPerformedAt(ZonedDateTime performedAt) { this.performedAt = performedAt; }

    public List<AuditLogChange> getChanges() { return changes; }
    public void setChanges(List<AuditLogChange> changes) { this.changes = changes; }
    public void addChange(AuditLogChange change) { this.changes.add(change); }
}