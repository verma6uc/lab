import React, { useState } from 'react';
import { 
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Block as BlockIcon,
} from '@mui/icons-material';

interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  createdDate: string;
  status: 'Active' | 'Inactive';
  size: string;
  admin: string;
}

interface CompaniesTableProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
  onView: (company: Company) => void;
  onStatusChange: (company: Company) => void;
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({
  companies,
  onEdit,
  onDelete,
  onView,
  onStatusChange,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeCompany, setActiveCompany] = useState<Company | null>(null);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(companies.map(company => company.id));
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, company: Company) => {
    setMenuAnchorEl(event.currentTarget);
    setActiveCompany(company);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setActiveCompany(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <Paper sx={{ 
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
      backdropFilter: 'blur(10px)',
    }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < companies.length}
                  checked={companies.length > 0 && selected.length === companies.length}
                  onChange={handleSelectAllClick}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-checked': {
                      color: '#00A3FF',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Company</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Industry</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Created Date</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Status</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Size</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Admin</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company) => {
                const isItemSelected = isSelected(company.id);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={company.id}
                    selected={isItemSelected}
                    sx={{ 
                      '&.Mui-selected': {
                        bgcolor: 'rgba(0, 163, 255, 0.1) !important',
                      },
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.05) !important',
                      }
                    }}
                  >
                    <TableCell padding="checkbox" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleClick(company.id)}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-checked': {
                            color: '#00A3FF',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: 'white', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Avatar sx={{ bgcolor: 'rgba(0, 163, 255, 0.1)' }}>
                        {company.logo}
                      </Avatar>
                      {company.name}
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      {company.industry}
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      {company.createdDate}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <Chip 
                        label={company.status}
                        sx={{
                          bgcolor: company.status === 'Active' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255, 99, 71, 0.1)',
                          color: company.status === 'Active' ? '#2ecc71' : '#ff6347',
                          border: `1px solid ${company.status === 'Active' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255, 99, 71, 0.2)'}`,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      {company.size}
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      {company.admin}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, company)}
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={companies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          '.MuiTablePagination-select': {
            color: 'white',
          },
          '.MuiTablePagination-selectIcon': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '.MuiTablePagination-displayedRows': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '.MuiIconButton-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        }}
      />

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(10, 25, 41, 0.95)',
            border: '1px solid rgba(0, 163, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            '.MuiMenuItem-root': {
              color: 'rgba(255, 255, 255, 0.85)',
              gap: 1.5,
              '&:hover': {
                bgcolor: 'rgba(0, 163, 255, 0.1)',
              },
            },
          }
        }}
      >
        <MenuItem onClick={() => {
          if (activeCompany) onView(activeCompany);
          handleMenuClose();
        }}>
          <ViewIcon sx={{ color: '#00A3FF' }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => {
          if (activeCompany) onEdit(activeCompany);
          handleMenuClose();
        }}>
          <EditIcon sx={{ color: '#2ecc71' }} />
          Edit Company
        </MenuItem>
        <MenuItem onClick={() => {
          if (activeCompany) onStatusChange(activeCompany);
          handleMenuClose();
        }}>
          <BlockIcon sx={{ color: '#ff9800' }} />
          {activeCompany?.status === 'Active' ? 'Deactivate' : 'Activate'}
        </MenuItem>
        <MenuItem onClick={() => {
          if (activeCompany) onDelete(activeCompany);
          handleMenuClose();
        }}>
          <DeleteIcon sx={{ color: '#ff6347' }} />
          Delete Company
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default CompaniesTable;
