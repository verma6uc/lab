import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Apps as AppsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../components/creator/PageContainer';
import ApplicationList from './components/ApplicationList';
import { mockApplications } from './mockData';
import { Application } from './types';

const Applications = () => {
  const navigate = useNavigate();
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
    navigate(`/creator/application/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log('Delete application:', id);
  };

  const handleAddApplication = () => {
    console.log('Add new application');
  };

  // Filter applications based on search query and selected filter
  const filteredApplications = mockApplications.filter((app: Application) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !selectedFilter || app.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageContainer
      icon={<AppsIcon />}
      title="Applications"
      onSearch={handleSearch}
      onFilter={handleFilter}
      onAdd={handleAddApplication}
      addButtonLabel="Create Application"
      filterOptions={[
        { value: 'active', label: 'Active' },
        { value: 'draft', label: 'Draft' },
        { value: 'archived', label: 'Archived' },
      ]}
      searchPlaceholder="Search applications..."
    >
      <Box 
        component="div" 
        sx={{ 
          p: { xs: 2, sm: 3 },
          minHeight: 'calc(100vh - 180px)', // Account for header and padding
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ApplicationList
          applications={filteredApplications}
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

export default Applications;
