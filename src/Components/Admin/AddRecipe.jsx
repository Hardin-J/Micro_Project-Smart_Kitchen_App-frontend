import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, InputAdornment, Grid, Container } from '@mui/material';
import { AiOutlineFileImage, AiOutlineStar } from 'react-icons/ai';
import { GiCookingPot } from 'react-icons/gi';
import AdminNav from './AdminNav';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AddRecipe() {
    const nav = useNavigate();

    const [inputData, setInputData] = useState({
        recipeName: "",
        instruction: "",
        ingredients: '',
        imageUrl: '',
        ratings: ""
    });

    const [dataStatus, setDataStatus] = useState('');
    const [dataMessage, setDataMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let result = validateValues(inputData);
        if (result === true) {
            axios
                .post("http://localhost:1310/recipes", inputData)
                .then(() => {
                    nav("/manageRecipe");
                })
                .catch((err) => console.log(err));
        } else {
            setDataMessage("Please Enter the Valid Inputs!!!");
        }
    }

    console.log(inputData);

    const handleGoBack = ()=> {
        nav("/manageRecipe");
    }


    const validateValues = (inputData) => {
        if (!inputData.recipeName || !inputData.instruction || !inputData.ingredients || !inputData.imageUrl || !inputData.ratings) {
            setDataStatus(false);
            return false;
        } else {
            setDataStatus(true);
            return true;
        }
    };

    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    <AdminNav />
                </Grid>
                <Grid item xs={10} sx={{ padding: 2, mt: 1 }}>
                    <Container>
                        <div className="container">
                            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                                <div className="w-50 w-sm-75 w-md-50 w-lg-40 p-4 vh-50 bg-white border rounded shadow">
                                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                                        <GiCookingPot /> Add Recipe
                                    </Typography>
                                    <Grid item xs={3}>
                                        <Button
                                            variant="contained"                                
                                            fullWidth
                                            sx={{bgcolor:"black"}}
                                            onClick={handleGoBack}
                                            startIcon={<ArrowBackIcon />}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            {dataStatus === false &&
                                                <Alert severity="error" icon={false}>
                                                    {dataMessage}
                                                </Alert>
                                            }
                                            {dataStatus === true &&
                                                <Alert severity="success" icon={false}>
                                                    Recipe added successfully!
                                                </Alert>
                                            }
                                        </div>
                                        <TextField
                                            label="Recipe Name"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={inputData.recipeName}
                                            onChange={(e) => setInputData({ ...inputData, recipeName: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AiOutlineStar />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <TextField
                                            label="Instruction"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={inputData.instruction}
                                            onChange={(e) => setInputData({ ...inputData, instruction: e.target.value })}
                                            multiline
                                            rows={4}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AiOutlineStar />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <TextField
                                            label="Ingredients"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={inputData.ingredients}
                                            onChange={(e) => setInputData({ ...inputData, ingredients: e.target.value })}
                                            multiline
                                            rows={4}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AiOutlineStar />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <TextField
                                            label="Image URL"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={inputData.imageUrl}
                                            onChange={(e) => setInputData({ ...inputData, imageUrl: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AiOutlineFileImage />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <TextField
                                            label="Ratings"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={inputData.ratings}
                                            onChange={(e) => setInputData({ ...inputData, ratings: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AiOutlineStar />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{bgcolor:"black",mt: 3 }}
                                            fullWidth                                           
                                        >
                                            Submit
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </Container>
                </Grid>
            </Grid>

        </>
    );
}

export default AddRecipe;
