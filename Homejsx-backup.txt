import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardActions, Box, Snackbar, Alert, } from '@mui/material';
import { AddCircleOutline as AddIcon, Inventory2 as InventoryIcon, Info as InfoIcon } from '@mui/icons-material';
// import UserNav from './UserNav';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Paper, TablePagination } from '@mui/material';
import axios from 'axios';
import UpdateIcon from '@mui/icons-material/Update';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link as RouterLink } from 'react-router-dom';
import {
  CardMedia,
  Modal,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { grey, blue } from '@mui/material/colors';
import UserNav from './UserNav'; // Adjust path as needed
import { FaTimes } from 'react-icons/fa';

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
    color: blue[500],
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

const Footer = styled('footer')(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: grey[800],
  color: '#fff',
  textAlign: 'center',
}));

const HeroCard = ({ icon: Icon, title, description, onClick }) => (
  <Card elevation={6} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
    <CardContent>
      <Typography variant="h5" component="div" color="primary">
        <Icon sx={{ fontSize: 40 }} /> {title}
      </Typography>
      <Typography variant="body2" color="black" mt={2}>
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={onClick}
        endIcon={<AddIcon />}
      >
        {title}
      </Button>
    </CardActions>
  </Card>
);

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [incPro, setIncPro] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const uid = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:1310/recipes/all`)
      .then(response => setRecipes(response.data.slice(0,3))) // Limit to 3 recipes
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:1310/products/${uid}`)
      .then(response => setProducts(response.data))
      .catch(err => console.log(err));
  }, [uid]);

  // const nonZero = products.filter( item => item.quantity > 0)
  const nonZero = products.sort((a, b) => b.quantity - a.quantity)

  const filteredItems = nonZero.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableProductNames = products
    .filter(product => product.quantity > 0)
    .map(product => product.productName.toLowerCase());

  const filteredRecipes = recipes.filter(recipe => {
    const ingredients = recipe.ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());
    return ingredients.some(ingredient => availableProductNames.some(item => ingredient.includes(item.toLowerCase())));
  });

  const handleDecrement = (id) => {
    setProducts(products.map(pro =>
      pro.productId === id ? { ...pro, quantity: Math.max(pro.quantity - 1, 0) } : pro
    ));
  };


  const handleUpdate = (id) => {
    const updatedProduct = products.find(pro => pro.productId === id);
    if (updatedProduct) {
      setIncPro(updatedProduct);
      axios
        .put("http://localhost:1310/products", updatedProduct)
        .then((res) => {
          console.log(res.data);
          setSOpen(true); // Show Snackbar
          setTimeout(() => {
            setSOpen(false)
            window.location.reload()
          }, 3000);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [sOpen, setSOpen] = useState(false);

  const handleSOpen = () => {
    setSOpen(true);
  }
  const handleSClose = () => {
    setSOpen(false);
  }

  const handleOpen = (recipe, cardRef) => {
    // const rect = cardRef.current.getBoundingClientRect();
    setModalStyle({
      top: `25%`,
      left: `25%`,
      margin: '0'
    });
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedRecipe(null);
    setOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#f2f2f5' }}>
      <UserNav />
      <Container maxWidth="lg" sx={{ mt: 7 }}>
        {/* Hero Cards Section */}
        <div className="container mt-5">

          <Typography variant="h2" align="center" color="primary" gutterBottom gutterTop>
            Welcome to Smart Kitchen App
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph gutterBottom>
            Manage your kitchen inventory, add new products, and explore various features to make your cooking experience smarter and more efficient.
          </Typography>
        </div>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <HeroCard
              icon={InventoryIcon}
              title="Inventory"
              description="Keep your kitchen organized  inventory tracking, manage stock levels, and optimize to reduce waste."
              onClick={() => handleNavigate('/inventory')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <HeroCard
              icon={AddIcon}
              title="Add Products"
              description="Add new products to your inventory and keep your kitchen up-to-date."
              onClick={() => handleNavigate('/addProduct')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <HeroCard
              icon={InfoIcon}
              title="View Recipes"
              description="Effortlessly cook with personalized recipes and smart technology."
              onClick={() => handleNavigate('/recipes')}
            />
          </Grid>
        </Grid>


        {/* old table content */}
        <section id="view-emp" className="mt-5">
          <div className="container mt-5">
            <Typography variant="h4" gutterBottom component="div" align="left">
              Available Products
            </Typography>
            <div className="d-flex justify-content-start mb-4">
              <TextField
                variant="outlined"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 300 }}
              />
            </div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><Typography variant="subtitle1">Product Name</Typography></TableCell>
                    <TableCell align="center"><Typography variant="subtitle1">Description</Typography></TableCell>
                    <TableCell align="center"><Typography variant="subtitle1">Price</Typography></TableCell>
                    <TableCell align="center"><Typography variant="subtitle1">Quantity</Typography></TableCell>
                    <TableCell align="center"><Typography variant="subtitle1">Category</Typography></TableCell>
                    <TableCell align="center" style={{ minWidth: 120 }}><Typography variant="subtitle1">Update Action</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d) => (
                    <TableRow key={d.productId} className="hover-row">
                      <TableCell align="center">{d.productName}</TableCell>
                      <TableCell align="center">{d.description}</TableCell>
                      <TableCell align="center">{d.price}</TableCell>
                      <TableCell align="center">{d.quantity}</TableCell>
                      <TableCell align="center">{d.category.categoryName}</TableCell>
                      <TableCell align="center" className="update-actions">
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <IconButton
                            onClick={() => handleDecrement(d.productId)}
                            color="primary"
                            size="small"
                            aria-label="increment quantity"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleUpdate(d.productId)}
                            color="secondary"
                            size="small"
                            aria-label="update product"
                          >
                            <UpdateIcon /> Use
                          </IconButton>
                        </div>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={filteredItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
            <Snackbar open={sOpen} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSOpen(false)}>
              <Alert onClose={() => setSOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                Product has been Used!!!
              </Alert>
            </Snackbar>

            <style>
              {`
                          .hover-row {
                              position: relative;
                          }

                          .update-actions {
                              opacity: 0; /* Hide by default */
                              transition: opacity 0.3s ease;
                          }

                          .hover-row:hover .update-actions {
                              opacity: 1; /* Show on row hover */
                          }
                      `}
            </style>
          </div>
        </section>

        {/* Suggested Recipes Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Suggested Recipes
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {filteredRecipes.map(recipe => {
              const cardRef = React.createRef();
              return (
                <Grid item xs={12} sm={6} md={4} key={recipe.recipeId}>
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
                      <ViewDetailsButton onClick={() => handleOpen(recipe, cardRef)}>
                        View Details
                      </ViewDetailsButton>
                    </CardContentStyled>
                  </StyledCard>
                </Grid>
              )
            })}
          </Grid>
          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/recipes"
            >
              Show More Recipes
            </Button>
          </Box>
        </Box>



        {/* Recipe Details Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          BackdropProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)',
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
                  />
                  {selectedRecipe.ratings}
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
      {/* Footer */}
      <Footer sx={{ width: "100%" }}>
        <Typography variant="body2" color="inherit">
          © 2024 Smart Kitchen App. All rights reserved.
        </Typography>
        <Typography variant="body2" color="inherit">
          "The only real stumbling block is fear of failure. In cooking, you can’t fail – just get better!"
        </Typography>
      </Footer>
    </div>
  );
}

export default Home;
