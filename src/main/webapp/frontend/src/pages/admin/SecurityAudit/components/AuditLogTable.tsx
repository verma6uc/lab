import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Chip,
  IconButton,
  Typography,
  Stack,
  Collapse,
  Box,
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Warning,
  Error,
  CheckCircle,
} from '@mui/icons-material';
import type { AuditLog } from '../types';
import { BaseCard, CardContent } from '../../../../components/shared/StyledComponents';
import AuditLogDetails from './AuditLogDetails';

interface AuditLogTableProps {
  logs: AuditLog[];
  page: number;
  rowsPerPage: number;
  expandedRow: number | null;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExpandRow: (rowId: number | null) => void;
}

const tableStyles = {
  '& .MuiTableCell-root': {
    fontSize: '0.8125rem',
    color: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    py: 1.5,
  },
  '& .MuiTableCell-head': {
    fontWeight: 500,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'rgba(255, 255, 255, 0.7)',
  },
};

const iconSx = {
  fontSize: '1rem',
  strokeWidth: 1,
  stroke: 'currentColor'
};

const getChipStyles = (type: string) => {
  const baseStyles = {
    fontSize: '0.75rem',
    height: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s ease',
    '&:hover': {
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }
  };

  switch (type) {
    case 'DELETE':
    case 'error':
    case 'high':
      return {
        ...baseStyles,
        bgcolor: 'rgba(211, 47, 47, 0.25)',
        '&:hover': {
          ...baseStyles['&:hover'],
          bgcolor: 'rgba(211, 47, 47, 0.35)',
        }
      };
    case 'warning':
    case 'medium':
      return {
        ...baseStyles,
        bgcolor: 'rgba(245, 124, 0, 0.25)',
        '&:hover': {
          ...baseStyles['&:hover'],
          bgcolor: 'rgba(245, 124, 0, 0.35)',
        }
      };
    case 'success':
    case 'low':
      return {
        ...baseStyles,
        bgcolor: 'rgba(46, 125, 50, 0.25)',
        '&:hover': {
          ...baseStyles['&:hover'],
          bgcolor: 'rgba(46, 125, 50, 0.35)',
        }
      };
    case 'INSERT':
      return {
        ...baseStyles,
        bgcolor: 'rgba(2, 136, 209, 0.25)',
        '&:hover': {
          ...baseStyles['&:hover'],
          bgcolor: 'rgba(2, 136, 209, 0.35)',
        }
      };
    default:
      return {
        ...baseStyles,
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        '&:hover': {
          ...baseStyles['&:hover'],
          bgcolor: 'rgba(255, 255, 255, 0.15)',
        }
      };
  }
};

const AuditLogTable: React.FC<AuditLogTableProps> = ({
  logs,
  page,
  rowsPerPage,
  expandedRow,
  onPageChange,
  onRowsPerPageChange,
  onExpandRow,
}) => {
  const getStatusIcon = (status: string) => {    
    switch (status) {
      case 'success':
        return <CheckCircle fontSize="small" sx={{ ...iconSx, color: 'success.main' }} />;
      case 'warning':
        return <Warning fontSize="small" sx={{ ...iconSx, color: 'warning.main' }} />;
      case 'error':
        return <Error fontSize="small" sx={{ ...iconSx, color: 'error.main' }} />;
      default:
        return null;
    }
  };

  return (
    <BaseCard>
      <CardContent sx={{ p: 0 }}>
        <Table sx={tableStyles}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <React.Fragment key={log.audit_id}>
                <TableRow sx={{ 
                  '&:hover': { 
                    bgcolor: 'rgba(0, 163, 255, 0.05)',
                    '& .MuiIconButton-root': {
                      color: '#00A3FF'
                    }
                  },
                  transition: 'all 0.2s ease'
                }}>
                  <TableCell padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={() => onExpandRow(expandedRow === log.audit_id ? null : log.audit_id)}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {expandedRow === log.audit_id ? 
                        <KeyboardArrowUp fontSize="small" /> : 
                        <KeyboardArrowDown fontSize="small" />
                      }
                    </IconButton>
                  </TableCell>
                  <TableCell>{new Date(log.performed_at).toLocaleString()}</TableCell>
                  <TableCell>{log.performed_by}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.operation}
                      size="small"
                      sx={getChipStyles(log.operation)}
                    />
                  </TableCell>
                  <TableCell>{log.table_name}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getStatusIcon(log.status)}
                      <Chip
                        label={log.status}
                        size="small"
                        sx={getChipStyles(log.status)}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={log.severity}
                      size="small"
                      sx={getChipStyles(log.severity)}
                    />
                  </TableCell>
                  <TableCell>{log.ip_address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={expandedRow === log.audit_id} timeout="auto" unmountOnExit>
                      <AuditLogDetails
                        changes={log.changes || []}
                        userAgent={log.user_agent}
                      />
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
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.85)',
            '.MuiTablePagination-select': {
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.85)'
            },
            '.MuiTablePagination-selectLabel': {
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.85)'
            },
            '.MuiTablePagination-displayedRows': {
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.85)'
            },
            '.MuiTablePagination-selectIcon': {
              color: 'rgba(255, 255, 255, 0.85)'
            },
            '.MuiTablePagination-actions': {
              '& .MuiIconButton-root': {
                color: 'rgba(255, 255, 255, 0.85)',
                '&.Mui-disabled': {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            }
          }}
        />
      </CardContent>
    </BaseCard>
  );
};

export default AuditLogTable;
