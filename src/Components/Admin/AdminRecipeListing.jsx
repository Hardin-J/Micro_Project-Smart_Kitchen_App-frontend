// AdminRecipeListing.jsx
import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Button,
    Stack,
    Snackbar,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';


const AdminRecipeListing = () => {

    const nav = useNavigate();
    const [filter, setFilter] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:1310/recipes/all`)
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleDelete = (recipeId) => {
        const conf = window.confirm("Do you want to Remove");
        if (conf) {
            axios
                .delete("http://localhost:1310/recipes/" + recipeId)
                .then((res) => {
                    setSnackMsg(res.data);
                    setSeverity("error");
                    setOpen(true); // Show Snackbar
                    setTimeout(() => {
                        setOpen(false)
                        window.location.reload();
                    }, 3000);
                })
                .catch((err) => console.log(err));
        }
        setRecipes(recipes.filter(recipe => recipe.recipeId !== recipeId));
    };

    const handleEdit = (rid) => {
        // const editR = recipes.filter(rec => rec.recipeId === rid)
        // console.log(editR)
        // const recip = JSON.stringify(editR); 
        // console.log(recip)   
        // sessionStorage.setItem("editR",JSON.stringify(editR))   
        nav(`/editRecipe/${rid}`)
    };

    const handleAddRecipe = (recipeId) => {
        nav("/addRecipe")
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <AdminNav />
            </Grid>
            <Grid item xs={10} sx={{ mt: 5 }} >
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Recipe Management
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Filter by name"
                            variant="outlined"
                            value={filter}
                            onChange={handleFilterChange}
                        />
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "black" }}
                            startIcon={<AddIcon />}
                            onClick={handleAddRecipe}
                        >
                            Add Recipe
                        </Button>
                    </Stack>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Ingredients</TableCell>
                                    <TableCell>Instructions</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Ratings</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRecipes.map((recipe) => (
                                    <TableRow key={recipe.recipeId}>
                                        <TableCell>{recipe.recipeId}</TableCell>
                                        <TableCell>{recipe.recipeName}</TableCell>
                                        <TableCell>{recipe.ingredients}</TableCell>
                                        <TableCell>{recipe.instruction}</TableCell>
                                        <TableCell>
                                            <img src={recipe.imageUrl} alt={recipe.recipeName} style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'contain', // Ensures the image maintains its aspect ratio
                                                // backgroundSize: 'contain', // Not necessary for img, but useful for background images
                                                display: 'block',
                                            }} />
                                        </TableCell>
                                        <TableCell>{recipe.ratings}</TableCell>
                                        <TableCell className='d'>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(recipe.recipeId)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton
                                                alignItems={"center"}
                                                color="primary"
                                                onClick={() => handleEdit(recipe.recipeId)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
                        {snackMsg}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
};

export default AdminRecipeListing;
