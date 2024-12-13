import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  Button,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
  TablePagination,
  LinearProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Security,
  FileDownload,
  FilterList,
  Search,
  Info,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Warning,
  Error,
  CheckCircle,
  MoreVert,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PageContainer from '../../components/admin/PageContainer';

interface AuditLogChange {
  audit_change_id: number;
  column_name: string;
  old_value: string;
  new_value: string;
}

interface AuditLog {
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

// Enhanced mock data
const mockAuditLogs: AuditLog[] = [
  {
    audit_id: 1,
    table_name: 'companies',
    record_id: 123,
    operation: 'UPDATE',
    performed_by: 'john.doe@example.com',
    performed_at: '2024-03-14T15:30:00Z',
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
    status: 'success',
    severity: 'low',
    details: 'Company details updated',
    changes: [
      {
        audit_change_id: 1,
        column_name: 'company_name',
        old_value: 'TechCorp',
        new_value: 'TechCorp Solutions',
      },
      {
        audit_change_id: 2,
        column_name: 'status',
        old_value: 'active',
        new_value: 'inactive',
      },
    ],
  },
  // Add more mock data with various operations, statuses, and severities
];

const SecurityAudit = () => {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState({
    table: '',
    operation: '',
    status: '',
    severity: '',
    user: '',
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle fontSize="small" sx={{ color: 'success.main' }} />;
      case 'warning':
        return <Warning fontSize="small" sx={{ color: 'warning.main' }} />;
      case 'error':
        return <Error fontSize="small" sx={{ color: 'error.main' }} />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleExport = () => {
    setLoading(true);
    // Simulate export
    setTimeout(() => {
      setLoading(false);
      // Add export logic
    }, 2000);
  };

  return (
    <PageContainer
      icon={<Security />}
      title="Security Audit"
      onSearch={(value) => setFilters(prev => ({ ...prev, user: value }))}
      filterOptions={[
        'All Operations',
        'Inserts',
        'Updates',
        'Deletes',
      ]}
      searchPlaceholder="Search audit logs..."
    >
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error">High Severity</Typography>
              <Typography variant="h3">23</Typography>
              <Typography variant="body2" color="text.secondary">Last 24 hours</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">Failed Operations</Typography>
              <Typography variant="h3">45</Typography>
              <Typography variant="body2" color="text.secondary">Last 24 hours</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main">Total Events</Typography>
              <Typography variant="h3">1,234</Typography>
              <Typography variant="body2" color="text.secondary">Last 24 hours</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">Success Rate</Typography>
              <Typography variant="h3">98.5%</Typography>
              <Typography variant="body2" color="text.secondary">Last 24 hours</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Filters */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                <DatePicker
                  label="From Date"
                  value={dateRange[0]}
                  onChange={(date) => setDateRange([date, dateRange[1]])}
                  slotProps={{ textField: { size: 'small' } }}
                />
                <DatePicker
                  label="To Date"
                  value={dateRange[1]}
                  onChange={(date) => setDateRange([dateRange[0], date])}
                  slotProps={{ textField: { size: 'small' } }}
                />
                <TextField
                  select
                  label="Table"
                  size="small"
                  value={filters.table}
                  onChange={(e) => setFilters({ ...filters, table: e.target.value })}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="">All Tables</MenuItem>
                  <MenuItem value="companies">Companies</MenuItem>
                  <MenuItem value="users">Users</MenuItem>
                  <MenuItem value="sessions">Sessions</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Operation"
                  size="small"
                  value={filters.operation}
                  onChange={(e) => setFilters({ ...filters, operation: e.target.value })}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="">All Operations</MenuItem>
                  <MenuItem value="INSERT">Insert</MenuItem>
                  <MenuItem value="UPDATE">Update</MenuItem>
                  <MenuItem value="DELETE">Delete</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Status"
                  size="small"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Severity"
                  size="small"
                  value={filters.severity}
                  onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="">All Severities</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </TextField>
                <Button
                  variant="contained"
                  startIcon={<FileDownload />}
                  onClick={handleExport}
                  disabled={loading}
                >
                  Export
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Audit Log Table */}
        <Grid item xs={12}>
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>Timestamp</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Operation</TableCell>
                  <TableCell>Table</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockAuditLogs.map((log) => (
                  <React.Fragment key={log.audit_id}>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <IconButton
                          size="small"
                          onClick={() => setExpandedRow(expandedRow === log.audit_id ? null : log.audit_id)}
                        >
                          {expandedRow === log.audit_id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{new Date(log.performed_at).toLocaleString()}</TableCell>
                      <TableCell>{log.performed_by}</TableCell>
                      <TableCell>
                        <Chip
                          label={log.operation}
                          size="small"
                          color={log.operation === 'DELETE' ? 'error' : 'default'}
                        />
                      </TableCell>
                      <TableCell>{log.table_name}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {getStatusIcon(log.status)}
                          <Typography variant="body2">{log.status}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={log.severity}
                          size="small"
                          color={getSeverityColor(log.severity)}
                        />
                      </TableCell>
                      <TableCell>{log.ip_address}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                        <Collapse in={expandedRow === log.audit_id} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Details
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Field</TableCell>
                                  <TableCell>Old Value</TableCell>
                                  <TableCell>New Value</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {log.changes?.map((change) => (
                                  <TableRow key={change.audit_change_id}>
                                    <TableCell>{change.column_name}</TableCell>
                                    <TableCell>{change.old_value}</TableCell>
                                    <TableCell>{change.new_value}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <Typography variant="subtitle2" sx={{ mt: 2 }}>
                              User Agent
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {log.user_agent}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>View Details</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Export Entry</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Mark as Reviewed</MenuItem>
      </Menu>

      {loading && (
        <LinearProgress 
          sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 9999 
          }} 
        />
      )}
    </PageContainer>
  );
};

export default SecurityAudit; 