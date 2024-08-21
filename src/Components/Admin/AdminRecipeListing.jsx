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
    Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminRecipeListing = () => {

    const nav = useNavigate();
    const [filter, setFilter] = useState('');
    const [recipes, setRecipes] = useState([]);

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
        setRecipes(recipes.filter(recipe => recipe.recipeId !== recipeId));
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
                                        <TableCell>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(recipe.recipeId)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Grid>
        </Grid>
    );
};

export default AdminRecipeListing;
