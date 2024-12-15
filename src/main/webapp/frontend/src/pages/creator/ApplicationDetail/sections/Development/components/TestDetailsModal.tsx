import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { TestDetails } from '../types';

interface TestDetailsModalProps {
  test: TestDetails | null;
  open: boolean;
  onClose: () => void;
}

const TestDetailsModal: React.FC<TestDetailsModalProps> = ({
  test,
  open,
  onClose,
}) => {
  if (!test) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <DialogTitle sx={{ color: 'common.white' }}>
        Test Details: {test.name}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {test.description}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
            Test Steps
          </Typography>
          <TableContainer component={Paper} sx={{ bgcolor: 'transparent' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    Step
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    Duration
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {test.steps.map((step, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: 'common.white', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      {step.name}
                    </TableCell>
                    <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <Chip
                        size="small"
                        label={step.status}
                        color={step.status === 'passed' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'common.white', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      {step.duration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {test.coverage && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
              Coverage Report
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                    {test.coverage.lines}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Line Coverage
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                    {test.coverage.functions}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Function Coverage
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                    {test.coverage.branches}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Branch Coverage
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {test.performance && (
          <Box>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
              Performance Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#00A3FF' }}>
                    {test.performance.avgDuration}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Average Duration
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#00A3FF' }}>
                    {test.performance.peakMemory}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Peak Memory
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#00A3FF' }}>
                    {test.performance.networkCalls}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Network Calls
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestDetailsModal; 