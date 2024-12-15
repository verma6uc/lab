import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { SectionData, TableColumn } from '../../types.ts';

interface DataTableSectionProps {
  section: SectionData;
}

type Order = 'asc' | 'desc';

const DataTableSection: React.FC<DataTableSectionProps> = ({ section }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [columnId]: value,
    }));
  };

  const filterData = (data: any[]) => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = item[key]?.toString().toLowerCase();
        return itemValue?.includes(value.toLowerCase());
      });
    });
  };

  const sortData = (data: any[]) => {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const processedData = sortData(filterData(section.config.items || []));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Tooltip title="Toggle Filters">
          <IconButton onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      {showFilters && (
        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {section.config.columns?.filter(col => col.filterable).map(column => (
            <TextField
              key={column.id}
              label={`Filter ${column.label}`}
              size="small"
              value={filters[column.id] || ''}
              onChange={(e) => handleFilterChange(column.id, e.target.value)}
            />
          ))}
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {section.config.columns?.map((column) => (
                <TableCell key={column.id}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                      IconComponent={order === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {processedData.map((row, index) => (
              <TableRow key={index}>
                {section.config.columns?.map(column => (
                  <TableCell key={column.id}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTableSection; 