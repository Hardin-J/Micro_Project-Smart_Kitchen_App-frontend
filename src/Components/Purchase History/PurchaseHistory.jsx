import React from 'react';
import { Grid, Paper } from '@mui/material';
import PurchaseItem from './PurchaseItem';

function PurchaseHistory({ data }) {
  return (
    <Grid container spacing={3}>
      {data.map((purchase) => (
        <Grid item xs={12} md={4} key={purchase.purchaseHistoryId}>
          <Paper elevation={5} style={{ padding: '20px' }}>
            <PurchaseItem purchase={purchase} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default PurchaseHistory;
