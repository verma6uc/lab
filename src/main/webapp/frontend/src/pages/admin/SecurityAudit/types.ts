export interface AuditLogChange {
  audit_change_id: number;
  column_name: string;
  old_value: string;
  new_value: string;
}

export interface AuditLog {
  audit_id: number;
  table_name: string;
  record_id: number;
  operation: 'INSERT' | 'UPDATE' | 'DELETE';
  performed_by: string;
  performed_at: string;
  ip_address: string;
  user_agent: string;
  status: 'success' | 'warning' | 'error';
  severity: 'low' | 'medium' | 'high';
  details: string;
  changes?: AuditLogChange[];
}

export interface Filters {
  table: string;
  operation: string;
  status: string;
  severity: string;
  user: string;
}

export type SeverityColor = 'error' | 'warning' | 'success' | 'default';
