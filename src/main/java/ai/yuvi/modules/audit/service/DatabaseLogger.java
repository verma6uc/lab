package ai.yuvi.modules.audit.service;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import ai.yuvi.modules.audit.dao.AuditLogChangeDao;
import ai.yuvi.modules.audit.dao.AuditLogDao;
import ai.yuvi.modules.audit.enums.AuditOperation;
import ai.yuvi.modules.audit.model.AuditLog;

public class DatabaseLogger {
    private static final Logger LOGGER = Logger.getLogger(DatabaseLogger.class.getName());
    
    private final AuditLogDao auditLogDao;
    private final AuditLogChangeDao auditLogChangeDao;

    public DatabaseLogger(AuditLogDao auditLogDao, AuditLogChangeDao auditLogChangeDao) {
        this.auditLogDao = auditLogDao;
        this.auditLogChangeDao = auditLogChangeDao;
    }

    public CompletableFuture<Boolean> logAction(
            Long userId,
            Long companyId,
            String entityType,
            Long entityId,
            AuditOperation operation,
            String description,
            HttpServletRequest request,
            Map<String, String> changes) {
        
        return CompletableFuture.supplyAsync(() -> {
            try {
                AuditLog log = new AuditLog();
                log.setUserId(userId);
                log.setCompanyId(companyId);
                log.setEntityType(entityType);
                log.setEntityId(entityId);
                log.setOperation(operation);
                log.setDescription(description);
                log.setTimestamp(ZonedDateTime.now());

                // Add request information if available
                if (request != null) {
                    log.setIpAddress(getClientIpAddress(request));
                    log.setUserAgent(request.getHeader("User-Agent"));
                }

                // Add changes if provided
                if (changes != null && !changes.isEmpty()) {
                    for (Map.Entry<String, String> entry : changes.entrySet()) {
                        String[] values = entry.getValue().split("\\|");
                        if (values.length == 2) {
                            log.addChange(entry.getKey(), values[0], values[1]);
                        }
                    }
                }

                return auditLogDao.create(log);
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Error logging action", e);
                return false;
            }
        });
    }

    public CompletableFuture<Boolean> logSystemAction(
            String entityType,
            Long entityId,
            AuditOperation operation,
            String description) {
        
        return CompletableFuture.supplyAsync(() -> {
            try {
                AuditLog log = new AuditLog();
                log.setEntityType(entityType);
                log.setEntityId(entityId);
                log.setOperation(operation);
                log.setDescription(description);
                log.setTimestamp(ZonedDateTime.now());
                log.setUserAgent("System");

                return auditLogDao.create(log);
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Error logging system action", e);
                return false;
            }
        });
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String[] HEADERS_TO_TRY = {
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"
        };

        for (String header : HEADERS_TO_TRY) {
            String ip = request.getHeader(header);
            if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip)) {
                // If IP contains multiple addresses, take the first one
                if (ip.contains(",")) {
                    ip = ip.split(",")[0].trim();
                }
                return ip;
            }
        }

        return request.getRemoteAddr();
    }

    public Map<String, Object> getAuditStats(Long companyId, String entityType) {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            // Get audit logs for the last 30 days
            ZonedDateTime thirtyDaysAgo = ZonedDateTime.now().minusDays(30);
            
            // Implementation for getting audit statistics
            // This is a placeholder - in a real implementation, you would:
            // 1. Query the database for relevant statistics
            // 2. Aggregate the data
            // 3. Return meaningful metrics
            
            stats.put("total_actions", 0);
            stats.put("unique_users", 0);
            stats.put("most_common_operation", "");
            stats.put("last_action_timestamp", null);
            
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error getting audit stats", e);
        }
        
        return stats;
    }
}
