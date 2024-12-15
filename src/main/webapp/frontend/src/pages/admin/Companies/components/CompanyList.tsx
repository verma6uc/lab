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
  Stack,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
} from '@mui/icons-material';
import { BaseCard, CardContent } from '../../../../components/shared/StyledComponents';
import { Company } from '../types';

interface CompanyListProps {
  companies: Company[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const getStatusChipStyles = (status: string) => {
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

  switch (status) {
    case 'active':
      return {
        ...baseStyles,
        bgcolor: 'rgba(46, 125, 50, 0.25)',
        '&:hover': {
          ...baseStyles['&:hover'],
          bgcolor: 'rgba(46, 125, 50, 0.35)',
        }
      };
    case 'inactive':
      return {
        ...baseStyles,
        bgcolor: 'rgba(211, 47, 47, 0.25)',
        '&:hover': {
          ...baseStyles['&:hover'],
          bgcolor: 'rgba(211, 47, 47, 0.35)',
        }
      };
    default:
      return {
        ...baseStyles,
        bgcolor: 'rgba(245, 124, 0, 0.25)',
        '&:hover': {
          ...baseStyles['&:hover'],
          bgcolor: 'rgba(245, 124, 0, 0.35)',
        }
      };
  }
};

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <ActiveIcon sx={{ fontSize: '1rem', color: '#4caf50' }} />;
      case 'inactive':
        return <InactiveIcon sx={{ fontSize: '1rem', color: '#f44336' }} />;
      default:
        return null;
    }
  };

  // Calculate the start and end index for the current page
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedCompanies = companies.slice(startIndex, endIndex);

  return (
    <BaseCard>
      <CardContent sx={{ p: 0 }}>
        <Table sx={{
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
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Employees</TableCell>
              <TableCell align="right">Applications</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedCompanies.map((company) => (
              <TableRow
                key={company.id}
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(0, 163, 255, 0.05)',
                    '& .actions': {
                      opacity: 1,
                    },
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getStatusIcon(company.status)}
                    <Chip
                      label={company.status}
                      size="small"
                      sx={getStatusChipStyles(company.status)}
                    />
                  </Stack>
                </TableCell>
                <TableCell align="right">{company.employees.toLocaleString()}</TableCell>
                <TableCell align="right">{company.applications}</TableCell>
                <TableCell>{company.lastActive}</TableCell>
                <TableCell align="right">
                  <Box
                    className="actions"
                    sx={{
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onEdit(company.id)}
                      sx={{
                        color: 'primary.main',
                        mr: 1,
                      }}
                    >
                      <EditIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(company.id)}
                      sx={{
                        color: 'error.main',
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={companies.length}
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

export default CompanyList;
