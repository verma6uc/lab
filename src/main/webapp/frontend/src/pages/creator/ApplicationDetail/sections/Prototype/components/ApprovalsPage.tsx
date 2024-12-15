import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Flag as FlagIcon,
  NewReleases as NewReleasesIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';

interface Approval {
  id: string;
  applicationName: string;
  company: string;
  submittedBy: string;
  submittedDate: string;
  status: string;
  priority: string;
  type: string;
}

interface ApprovalsPageProps {
  approvals: Approval[];
  onViewApplication: (applicationId: string) => void;
}

const ApprovalsPage: React.FC<ApprovalsPageProps> = ({ approvals, onViewApplication }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FFC107';
      case 'low':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFC107';
      case 'approved':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: 'common.white', mb: 3 }}>
        Approvals
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          background: 'rgba(13, 25, 41, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Application
              </TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Company
              </TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Type
              </TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Priority
              </TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Status
              </TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Submitted
              </TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvals.map((approval) => (
              <TableRow
                key={approval.id}
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <TableCell
                  sx={{
                    color: 'common.white',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {approval.applicationName}
                </TableCell>
                <TableCell
                  sx={{
                    color: 'common.white',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {approval.company}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Chip
                    icon={approval.type === 'New Application' ? <NewReleasesIcon /> : <UpdateIcon />}
                    label={approval.type}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'common.white',
                      '& .MuiChip-icon': { color: 'inherit' },
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Chip
                    icon={<FlagIcon />}
                    label={approval.priority}
                    size="small"
                    sx={{
                      bgcolor: `${getPriorityColor(approval.priority)}20`,
                      color: getPriorityColor(approval.priority),
                      '& .MuiChip-icon': { color: 'inherit' },
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Chip
                    label={approval.status}
                    size="small"
                    sx={{
                      bgcolor: `${getStatusColor(approval.status)}20`,
                      color: getStatusColor(approval.status),
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {new Date(approval.submittedDate).toLocaleDateString()}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <IconButton
                    onClick={() => onViewApplication(approval.id)}
                    sx={{
                      color: '#00A3FF',
                      '&:hover': {
                        bgcolor: 'rgba(0, 163, 255, 0.1)',
                      },
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApprovalsPage; 