import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, IconButton, Box, InputAdornment } from '@mui/material';

import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Card, CardMedia, CardContent, Rating, Button, Modal } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import { grey, blue } from '@mui/material/colors';
import UserNav from '../User/UserNav';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 300,
    margin: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[10],
    },
}));

const RecipeImage = styled(CardMedia)({
    height: 200,
    objectFit: 'cover',
    transition: 'opacity 0.3s',
    '&:hover': {
        opacity: 0.85,
    },
});

const CardContentStyled = styled(CardContent)(({ theme }) => ({
    textAlign: 'center',
    backgroundColor: grey[300],
    padding: theme.spacing(2),
}));

const RecipeTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: grey[800],
    marginBottom: theme.spacing(1),
}));

const RatingStyled = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: blue[600],
    },
    '& .MuiRating-iconEmpty': {
        color: grey[300],
    },
});

const ViewDetailsButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(1),
    backgroundColor: blue[600],
    color: '#fff',
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

const ModalContent = styled(Box)(({ theme }) => ({
    position: 'absolute',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    maxWidth: 500,
    outline: 'none',
}));

const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: 10,
    right: 10,
    color: grey[600],
});

// Main component
function ListRecipes() {
    const [open, setOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [ingredientFilter, setIngredientFilter] = useState('');
    const [modalStyle, setModalStyle] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:1310/recipes/all`)
            .then(response => setRecipes(response.data))
            .catch(err => console.log(err));
    }, [nameFilter, ingredientFilter]);

    const handleNameChange = (event) => setNameFilter(event.target.value);
    const handleIngredientChange = (event) => setIngredientFilter(event.target.value);
    const handleClearFilters = () => {
        setNameFilter('');
        setIngredientFilter('');
    };

    const handleOpen = (recipe, cardRef) => {
        const rect = cardRef.current.getBoundingClientRect();
        setModalStyle({
            top: `25%`,
            left: `25%`,
            margin: '0'
            // transform: 'translate(-20%, 0)', // Center the modal near the card
        });
        setSelectedRecipe(recipe);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedRecipe(null);
        setOpen(false);
    };

    const filteredItems = recipes.filter(item =>
        item.recipeName.toLowerCase().includes(nameFilter.toLowerCase()) && item.ingredients.toLowerCase().includes(ingredientFilter.toLowerCase())
    );

    return (
        <div className="container">
            <UserNav />
            <Container sx={{ mt: 10 }}>
                <Box mb={4} display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" gutterBottom>
                        Recipe List
                    </Typography>
                    <Box display="flex" justifyContent="center" mb={2} gap={2}>
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            size="small"
                            value={nameFilter}
                            onChange={handleNameChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Search by Ingredient"
                            variant="outlined"
                            size="small"
                            value={ingredientFilter}
                            onChange={handleIngredientChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton onClick={handleClearFilters} color="primary">
                            <ClearIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Grid container spacing={2} justifyContent="center">
                    {filteredItems.map(recipe => {
                        const cardRef = React.createRef();
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.recipeId}>
                                <StyledCard ref={cardRef}>
                                    <RecipeImage
                                        component="img"
                                        alt={recipe.recipeName}
                                        image={recipe.imageUrl}
                                    />
                                    <CardContentStyled>
                                        <RecipeTitle variant="h6" component="div">
                                            {recipe.recipeName}
                                        </RecipeTitle>
                                        <RatingStyled
                                            name="read-only"
                                            value={parseFloat(recipe.ratings)}
                                            precision={0.1}
                                            readOnly
                                        />
                                        <ViewDetailsButton onClick={() => handleOpen(recipe, cardRef)}>
                                            View Details
                                        </ViewDetailsButton>
                                    </CardContentStyled>
                                </StyledCard>
                            </Grid>
                        );
                    })}
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    BackdropProps={{
                        style: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
                            backdropFilter: 'blur(5px)', // blur effect
                        },
                    }}
                >
                    <ModalContent style={modalStyle}>
                        <CloseButton onClick={handleClose}>
                            <FaTimes />
                        </CloseButton>
                        {selectedRecipe && (
                            <>
                                <Typography variant="h6" align='center' component="h2" id="recipe-details-title">
                                    {selectedRecipe.recipeName}
                                </Typography>
                                <Box mt={2} display="flex" justifyContent="center">
                                    <RatingStyled
                                        name="read-only"
                                        value={parseFloat(selectedRecipe.ratings)}
                                        precision={0.1}
                                        readOnly
                                    />{selectedRecipe.ratings}
                                </Box>
                                <hr />
                                <Typography variant="body1" color="text.primary" paragraph>
                                    Ingredients
                                </Typography>
                                <Typography variant="body1" color="text.primary" paragraph>
                                    {selectedRecipe.ingredients}
                                </Typography>
                                <hr />
                                <Typography variant="body1" color="text.primary" paragraph>
                                    Instructions:
                                </Typography>
                                <Typography variant="body1" color="text.primary" paragraph>
                                    {selectedRecipe.instruction}
                                </Typography>
                                <hr />
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </Container>
        </div>
    );
}

export default ListRecipes;
