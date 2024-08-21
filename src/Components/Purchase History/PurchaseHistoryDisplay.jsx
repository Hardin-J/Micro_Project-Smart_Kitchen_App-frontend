import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import PurchaseHistory from './PurchaseHistory';
import axios from 'axios';
import UserNav from '../User/UserNav';

function PurchaseHistoryDisplay() {

    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const uid = sessionStorage.getItem('id');
    useEffect(() => {
        axios
            .get(`http://localhost:1310/purchaseHistories/${uid}`)
            .then(response => setPurchaseHistory(response.data))
            .catch(err => console.log(err));
    }, [uid]);

    return (
        <div className="container-fluid">
            <UserNav />
            <div className="container mt-5">
                <Container maxWidth="xl" style={{ marginTop: '90px' }}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h3" gutterBottom align="center">
                            Purchase History
                        </Typography>
                    </Paper> <br />
                    <PurchaseHistory data={purchaseHistory} />
                </Container>
            </div>
        </div>
    );
}

export default PurchaseHistoryDisplay;
