import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert, Grid, Paper, Box } from '@mui/material';
import { AddCircleOutline as AddIcon, Error as ErrorIcon } from '@mui/icons-material';
import UserNav from './UserNav';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function AddCategory() {
    const [categoryName, setCategoryName] = useState('');
    const [dataStatus, setDataStatus] = useState('');
    const [dataMessage, setDataMessage] = useState('');
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryName) {
            axios.post("http://localhost:1310/categories", { categoryName })
                .then(() => nav("/addProduct"))
                .catch(err => console.log(err));
        } else {
            setTimeout(() => {
                setDataStatus(true)
                setDataMessage("Category name cannot be empty!");
            }, 3000);
            setDataStatus(false);
        }
    };

    const handleGoBack = () => {
        nav("/addProduct");
    };

    return (
        <div className="container">
            <UserNav />

            <Container maxWidth="sm" sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                    <Typography variant="h4" gutterBottom color="primary" align="center">
                        <AddIcon /> Add Category
                    </Typography>
                    {dataStatus === false && <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 2 }}>{dataMessage}</Alert>}
                    
                    <Box sx={{ mb: 3 }}>
                        <Grid container spacing={2} alignItems="right" display={"flex"} justifyContent={"space-between"}>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleGoBack}
                                    startIcon={<ArrowBackIcon />}
                                >
                                    Back
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Category Name"
                                    variant="outlined"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    startIcon={<AddIcon />}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default AddCategory;
