package ai.yuvi.dao;

import ai.yuvi.model.AuditLogChange;
import ai.yuvi.util.DbUtil;

import java.sql.*;
import java.util.List;

/**
 * DAO for audit_log_change table operations.
 */
public class AuditLogChangeDao {

    public void insertAuditLogChanges(List<AuditLogChange> changes) throws SQLException {
        if (changes.isEmpty()) return;
        String sql = "INSERT INTO audit_log_change (audit_id, column_name, old_value, new_value) VALUES (?, ?, ?, ?)";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            for (AuditLogChange c : changes) {
                ps.setLong(1, c.getAuditId());
                ps.setString(2, c.getColumnName());
                ps.setString(3, c.getOldValue());
                ps.setString(4, c.getNewValue());
                ps.addBatch();
            }
            ps.executeBatch();
        }
    }
}
