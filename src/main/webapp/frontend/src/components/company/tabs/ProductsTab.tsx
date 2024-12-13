import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Product } from '../../../types/models';

interface ProductsTabProps {
  products: Product[];
}

const ProductsTab: React.FC<ProductsTabProps> = ({ products }) => {
  if (!products.length) return <Typography>No products available</Typography>;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} key={product.productId}>
          <Card>
            <CardContent>
              <Typography variant="h6">{product.productName}</Typography>
              <Typography color="textSecondary">{product.productDescription}</Typography>
              <Box mt={2}>
                <Typography variant="body2">Type: {product.type}</Typography>
                <Typography variant="body2">Status: {product.status}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsTab; 