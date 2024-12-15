import React, { useState } from 'react';
import { Grid, LinearProgress } from '@mui/material';
import { Security } from '@mui/icons-material';
import type { Dayjs } from 'dayjs';
import PageContainer from '../../../components/admin/PageContainer';
import { StatisticsCards, FilterSection, AuditLogTable } from './components';
import { mockAuditLogs, filterOptions } from './mockData';
import type { Filters } from './types';

const SecurityAudit = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    table: '',
    operation: '',
    status: '',
    severity: '',
    user: '',
  });

  const handleFiltersChange = (field: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <PageContainer
      icon={<Security />}
      title="Security Audit"
      onSearch={(value) => setFilters(prev => ({ ...prev, user: value }))}
      filterOptions={filterOptions}
      searchPlaceholder="Search audit logs..."
    >
      <Grid container spacing={2}>
        {/* Statistics Cards */}
        <Grid item xs={12}>
          <StatisticsCards />
        </Grid>

        {/* Filters */}
        <Grid item xs={12}>
          <FilterSection
            startDate={startDate}
            endDate={endDate}
            filters={filters}
            loading={loading}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onFiltersChange={handleFiltersChange}
            onExport={handleExport}
          />
        </Grid>

        {/* Audit Log Table */}
        <Grid item xs={12}>
          <AuditLogTable
            logs={mockAuditLogs}
            page={page}
            rowsPerPage={rowsPerPage}
            expandedRow={expandedRow}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            onExpandRow={setExpandedRow}
          />
        </Grid>
      </Grid>

      {loading && (
        <LinearProgress 
          sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 9999,
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            }
          }} 
        />
      )}
    </PageContainer>
  );
};

export default SecurityAudit;
