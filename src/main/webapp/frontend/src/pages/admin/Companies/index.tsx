import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import PageContainer from '../../../components/admin/PageContainer';
import CompanyList from './components/CompanyList';
import { mockCompanies } from './mockData';

const Companies = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(0);
  };

  const handleFilter = (value: string) => {
    setSelectedFilter(value);
    setPage(0);
  };

  const handleEdit = (id: number) => {
    console.log('Edit company:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete company:', id);
  };

  const handleAddCompany = () => {
    console.log('Add new company');
  };

  // Filter companies based on search query and selected filter
  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !selectedFilter || company.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageContainer
      icon={<BusinessIcon />}
      title="Companies"
      onSearch={handleSearch}
      onFilter={handleFilter}
      onAdd={handleAddCompany}
      addButtonLabel="Add Company"
      filterOptions={[
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
      ]}
      searchPlaceholder="Search companies..."
    >
      <Box component="div" sx={{ p: { xs: 2, sm: 3 } }}>
        <CompanyList
          companies={filteredCompanies}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </PageContainer>
  );
};

export default Companies;
