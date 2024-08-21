import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, MenuItem, Button, Typography, Alert, Grid, Paper, Box } from '@mui/material';
import { AddCircleOutline as AddIcon, Error as ErrorIcon, Category as CategoryIcon } from '@mui/icons-material';
import UserNav from './UserNav';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AddProducts() {
    const [records, setRecords] = useState([]);
    const [inputData, setInputData] = useState({
        productName: "",
        description: "",
        price: '',
        quantity: '',
        category: {
            categoryId: '',
            categoryName: ""
        },
        user: {
            userId: '',
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
        }
    });
    const [dataStatus, setDataStatus] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();
    const uid = sessionStorage.getItem("id");

    useEffect(() => {
        axios.get("http://localhost:1310/users/" + uid)
            .then(response => {
                setInputData(prev => ({ ...prev, user: response.data }));
            })
            .catch(err => console.log(err));
    }, [uid]);

    useEffect(() => {
        axios.get("http://localhost:1310/categories/all")
            .then(response => {
                setRecords(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validateValues(inputData);
        if (result) {
            axios.post("http://localhost:1310/products", inputData)
                .then(() => nav("/home"))
                .catch(err => console.log(err));
        } else {
            setDataStatus(false)
            // setDataMessage("Please Enter Valid Inputs!");
        }
    };

    const handleSelectChange = (e) => {
        const selectedCat = e.target.value;
        if (selectedCat) {
            axios.get(`http://localhost:1310/categories/` + selectedCat)
                .then(response => {
                    setInputData(prev => ({ ...prev, category: response.data }));
                })
                .catch(err => console.log(err));
        }
    };

    const handleAddCategory = () => {
        nav("/addCategory");
    };
    const handleGoBack = () => {
        nav("/inventory");
    };

    const validateValues = (data) => {
        let isValid = true;
    
        if (data.productName === "") {
          setError('Please enter a product name');
          isValid = false;
        }
    
        if (data.description === "") {
          setError('Please enter a description');
          isValid = false;
        }
    
        if (data.price === "") {
          setError('Please enter a price');
          isValid = false;
        } else if (isNaN(data.price) || data.price <= 0) {
          setError('Invalid price');
          isValid = false;
        }
    
        if (data.quantity === "") {
          setError('Please enter a quantity');
          isValid = false;
        } else if (isNaN(data.quantity) || data.quantity <= 0) {
          setError('Invalid quantity');
          isValid = false;
        }
    
        if (data.category.categoryName === "") {
          setError('Please select a category');
          isValid = false;
        }
    
        return isValid;
      };

    return (
        <div className="container">
            <UserNav/>

        <Container maxWidth="sm" sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                <Typography variant="h4" gutterBottom color="primary" align="center">
                    <AddIcon /> Add Product
                </Typography>
                {dataStatus === false && <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 2 }}>{error}</Alert>}
                
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
                             back
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleAddCategory}
                                startIcon={<AddIcon />}
                            >
                                Add Category
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                variant="outlined"
                                value={inputData.productName}
                                onChange={(e) => setInputData({ ...inputData, productName: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                value={inputData.description}
                                onChange={(e) => setInputData({ ...inputData, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                variant="outlined"
                                value={inputData.price}
                                onChange={(e) => setInputData({ ...inputData, price: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                type="number"
                                variant="outlined"
                                value={inputData.quantity}
                                onChange={(e) => setInputData({ ...inputData, quantity: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Category"
                                variant="outlined"
                                value={inputData.category.categoryName}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="" disabled>Select Category</MenuItem>
                                {records.map((category, index) => (
                                    <MenuItem key={index} value={category.categoryName}>
                                        {category.categoryName}
                                    </MenuItem>
                                ))}
                            </TextField>
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

export default AddProducts;
