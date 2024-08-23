import React from 'react';
import { Typography, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Category as CategoryIcon } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';

function PurchaseItem({ purchase }) {
  const { product, quantity } = purchase;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        <ShoppingCartIcon /> {product.productName}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <DescriptionIcon /> {product.description}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Quantity:</strong> {quantity}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <CategoryIcon /> Category: {product.category.categoryName}
      </Typography>
      
    </Box>
  );
}

export default PurchaseItem;
