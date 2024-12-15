package ai.yuvi.modules.audit.util;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ai.yuvi.modules.audit.enums.AuditOperation;
import ai.yuvi.modules.audit.model.AuditLog;
import ai.yuvi.modules.audit.model.AuditLogChange;

public class AuditUtil {
    private static final Logger LOGGER = Logger.getLogger(AuditUtil.class.getName());
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    public static Map<String, String> compareObjects(Object oldObj, Object newObj) {
        Map<String, String> changes = new HashMap<>();
        
        try {
            ObjectNode oldNode = OBJECT_MAPPER.valueToTree(oldObj);
            ObjectNode newNode = OBJECT_MAPPER.valueToTree(newObj);

            oldNode.fieldNames().forEachRemaining(fieldName -> {
                String oldValue = oldNode.get(fieldName).asText();
                String newValue = newNode.get(fieldName).asText();
                
                if (!oldValue.equals(newValue)) {
                    changes.put(fieldName, oldValue + "|" + newValue);
                }
            });
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error comparing objects", e);
        }
        
        return changes;
    }

    public static String formatAuditLog(AuditLog log) {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("Operation: %s\n", log.getOperation()));
        sb.append(String.format("Entity: %s (ID: %d)\n", log.getEntityType(), log.getEntityId()));
        sb.append(String.format("Description: %s\n", log.getDescription()));
        sb.append(String.format("User: %d\n", log.getUserId()));
        sb.append(String.format("Timestamp: %s\n", log.getTimestamp().format(DATE_FORMATTER)));
        
        if (log.getChanges() != null && !log.getChanges().isEmpty()) {
            sb.append("Changes:\n");
            for (AuditLogChange change : log.getChanges()) {
                sb.append(String.format("  %s: %s -> %s\n", 
                    change.getField(), change.getOldValue(), change.getNewValue()));
            }
        }
        
        return sb.toString();
    }

    public static List<Map<String, Object>> summarizeAuditLogs(List<AuditLog> logs) {
        List<Map<String, Object>> summaries = new ArrayList<>();
        
        for (AuditLog log : logs) {
            Map<String, Object> summary = new HashMap<>();
            summary.put("operation", log.getOperation().name());
            summary.put("entityType", log.getEntityType());
            summary.put("entityId", log.getEntityId());
            summary.put("timestamp", log.getTimestamp().format(DATE_FORMATTER));
            summary.put("userId", log.getUserId());
            
            if (log.getChanges() != null && !log.getChanges().isEmpty()) {
                List<Map<String, String>> changes = new ArrayList<>();
                for (AuditLogChange change : log.getChanges()) {
                    Map<String, String> changeMap = new HashMap<>();
                    changeMap.put("field", change.getField());
                    changeMap.put("oldValue", change.getOldValue());
                    changeMap.put("newValue", change.getNewValue());
                    changes.add(changeMap);
                }
                summary.put("changes", changes);
            }
            
            summaries.add(summary);
        }
        
        return summaries;
    }

    public static String generateAuditDescription(AuditOperation operation, String entityType, String entityName) {
        switch (operation) {
            case CREATE:
                return String.format("Created new %s: %s", entityType, entityName);
            case UPDATE:
                return String.format("Updated %s: %s", entityType, entityName);
            case DELETE:
                return String.format("Deleted %s: %s", entityType, entityName);
            case READ:
                return String.format("Accessed %s: %s", entityType, entityName);
            case SHARE:
                return String.format("Shared %s: %s", entityType, entityName);
            case ARCHIVE:
                return String.format("Archived %s: %s", entityType, entityName);
            case RESTORE:
                return String.format("Restored %s: %s", entityType, entityName);
            default:
                return String.format("%s operation on %s: %s", 
                    operation.name(), entityType, entityName);
        }
    }

    public static boolean isSignificantChange(String field, String oldValue, String newValue) {
        if (oldValue == null && newValue == null) {
            return false;
        }
        if (oldValue == null || newValue == null) {
            return true;
        }
        
        // Ignore whitespace changes
        oldValue = oldValue.trim();
        newValue = newValue.trim();
        if (oldValue.equals(newValue)) {
            return false;
        }
        
        // Consider the change significant if it's more than just case difference
        return !oldValue.equalsIgnoreCase(newValue);
    }
}
