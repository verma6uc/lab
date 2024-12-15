import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  Divider,
  Chip,
} from '@mui/material';
import {
  Apps as ProductsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { Company } from '../../../../types/company';

interface CompanyProductsProps {
  company: Company;
  onEditProduct: (id: number) => void;
  onDeleteProduct: (id: number) => void;
}

const CompanyProducts: React.FC<CompanyProductsProps> = ({
  company,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
    }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <ProductsIcon sx={{ color: '#00A3FF' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Products
          </Typography>
          <Box
            sx={{
              ml: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              border: '1px solid rgba(0, 163, 255, 0.2)',
            }}
          >
            <Typography sx={{ color: '#00A3FF', fontSize: '0.875rem' }}>
              {company.products_count}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Current product catalog and offerings from {company.name}.
          Each product's details and status are shown below.
        </Typography>
      </Box>

      {/* Products Summary */}
      <Box sx={{ 
        mb: 3,
        p: 2,
        borderRadius: 1,
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CategoryIcon sx={{ color: '#00A3FF' }} />
          <Typography sx={{ color: 'white', fontWeight: 500 }}>
            Product Portfolio
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {company.products.map(product => (
            <Chip
              key={product.id}
              label={product.name}
              sx={{
                bgcolor: 'rgba(0, 163, 255, 0.1)',
                color: '#00A3FF',
                border: '1px solid rgba(0, 163, 255, 0.2)',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Products List */}
      {company.products.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center',
          py: 4,
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            No products added yet
          </Typography>
          <Typography variant="body2">
            Products will appear here once they are added to the catalog
          </Typography>
        </Box>
      ) : (
        <List sx={{ mx: -3 }}>
          {company.products.map((product, index) => (
            <React.Fragment key={product.id}>
              <ListItem sx={{ px: 3, py: 2 }}>
                <ListItemIcon>
                  <ProductsIcon sx={{ color: '#00A3FF' }} />
                </ListItemIcon>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: 'white', fontWeight: 500, mb: 0.5 }}>
                    {product.name}
                  </Typography>
                  {product.description && (
                    <Typography 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}
                    >
                      {product.description}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Edit Product">
                    <IconButton 
                      onClick={() => onEditProduct(product.id)}
                      sx={{ color: '#00A3FF' }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Product">
                    <IconButton 
                      onClick={() => onDeleteProduct(product.id)}
                      sx={{ color: '#ff6347' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
              {index < company.products.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default CompanyProducts;
