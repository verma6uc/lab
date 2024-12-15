import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Card,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Application } from '../types';

interface ApplicationListProps {
  applications: Application[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: '#00A3FF',
          backgroundColor: 'rgba(0, 163, 255, 0.1)',
          border: '1px solid rgba(0, 163, 255, 0.2)',
        };
      case 'draft':
        return {
          color: '#FFB547',
          backgroundColor: 'rgba(255, 181, 71, 0.1)',
          border: '1px solid rgba(255, 181, 71, 0.2)',
        };
      case 'archived':
        return {
          color: '#FF4757',
          backgroundColor: 'rgba(255, 71, 87, 0.1)',
          border: '1px solid rgba(255, 71, 87, 0.2)',
        };
      default:
        return {
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Owner</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Last Updated</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app) => (
                <TableRow
                  key={app.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    },
                  }}
                >
                  <TableCell 
                    sx={{ 
                      color: 'white',
                      fontWeight: 500,
                    }}
                  >
                    {app.name}
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{app.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      sx={{
                        ...getStatusColor(app.status),
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{app.owner}</TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {formatDate(app.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => onEdit(app.id)}
                      size="small"
                      sx={{
                        color: '#00A3FF',
                        mr: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 163, 255, 0.1)',
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(app.id)}
                      size="small"
                      sx={{
                        color: '#FF4757',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 71, 87, 0.1)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={applications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          '.MuiTablePagination-select': {
            color: 'white',
          },
          '.MuiTablePagination-selectIcon': {
            color: 'white',
          },
          '.MuiTablePagination-displayedRows': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '.MuiIconButton-root': {
            color: 'white',
          },
        }}
      />
    </Card>
  );
};

export default ApplicationList;
