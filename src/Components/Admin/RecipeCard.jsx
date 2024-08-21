import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, IconButton, Tooltip, Box, Button, Modal, Icon } from '@mui/material';
import { FaStar, FaClock, FaUtensils, FaTimes } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import { blue, orange, grey } from '@mui/material/colors';

// Styled components with MUI
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
  minHeight: 500,
  backgroundColor: grey[400],
  padding: theme.spacing(2),
}));

const RecipeTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: grey[800],
  marginBottom: theme.spacing(1),
}));

const RatingStyled = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: orange[600],
  },
  '& .MuiRating-iconEmpty': {
    color: grey[300],
  },
});

const ViewDetailsButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: orange[600],
  color: '#fff',
  '&:hover': {
    backgroundColor: orange[700],
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  maxWidth: 500,
  margin: 'auto',
  outline: 'none',
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 10,
  right: 10,
  color: grey[600],
});

const RecipeCard = ({ recipe }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledCard>
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
          <ViewDetailsButton onClick={handleOpen}>
            View Details
          </ViewDetailsButton>
        </CardContentStyled>
      </StyledCard>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="recipe-details-title"
        aria-describedby="recipe-details-description"
      >
        <ModalContent>
          <CloseButton onClick={handleClose}>
            <FaTimes />
          </CloseButton>
          <Typography variant="h6" align='center' component="h2" id="recipe-details-title">
            {recipe.recipeName}
          </Typography> 
          <Box mt={2} display="flex" justifyContent="center">
            <RatingStyled
              name="read-only"
              value={parseFloat(recipe.ratings)}
              precision={0.1}
              readOnly
            />{recipe.ratings}
          </Box> <hr />

          <Typography variant="body1" color="text.primary" paragraph>
          Ingredients
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            {recipe.ingredients}
          </Typography>

          <hr />
          <Typography variant="body1" color="text.primary" paragraph>
            Instructions:
          </Typography> 
          <Typography variant="body1" color="text.primary" paragraph>
            {recipe.instruction}
          </Typography> <hr />
          
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecipeCard;
