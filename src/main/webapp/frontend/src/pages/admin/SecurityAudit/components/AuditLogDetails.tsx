import React from 'react';
import {
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { AuditLogChange } from '../types';

interface AuditLogDetailsProps {
  changes: AuditLogChange[];
  userAgent: string;
}

const AuditLogDetails: React.FC<AuditLogDetailsProps> = ({ changes, userAgent }) => {
  return (
    <Box 
      component="div"
      sx={{ 
        p: 2,
        bgcolor: 'rgba(17, 25, 40, 0.5)',
        borderRadius: 1,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s ease',
        '&:hover': {
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      <Stack spacing={2}>
        <Box component="div">
          <Typography
            component="div"
            variant="subtitle2"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 1,
            }}
          >
            Changes
          </Typography>
          <Stack spacing={1}>
            {changes.map((change, index) => (
              <Box 
                component="div"
                key={index}
                sx={{
                  p: 1.5,
                  bgcolor: 'rgba(17, 25, 40, 0.75)',
                  borderRadius: 1,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography
                  component="div"
                  variant="subtitle2"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 0.5,
                  }}
                >
                  {change.column_name}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Box component="div" sx={{ flex: 1 }}>
                    <Typography
                      component="div"
                      variant="caption"
                      sx={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        mb: 0.5,
                      }}
                    >
                      Old Value
                    </Typography>
                    <Typography
                      component="div"
                      variant="body2"
                      sx={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        wordBreak: 'break-all',
                      }}
                    >
                      {change.old_value || '-'}
                    </Typography>
                  </Box>
                  <Box component="div" sx={{ flex: 1 }}>
                    <Typography
                      component="div"
                      variant="caption"
                      sx={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        mb: 0.5,
                      }}
                    >
                      New Value
                    </Typography>
                    <Typography
                      component="div"
                      variant="body2"
                      sx={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        wordBreak: 'break-all',
                      }}
                    >
                      {change.new_value || '-'}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box component="div">
          <Typography
            component="div"
            variant="subtitle2"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 1,
            }}
          >
            User Agent
          </Typography>
          <Typography
            component="div"
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.7)',
              wordBreak: 'break-all',
            }}
          >
            {userAgent}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default AuditLogDetails;
