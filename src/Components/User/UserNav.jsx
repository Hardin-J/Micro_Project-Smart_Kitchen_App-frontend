import React, { useEffect, useState } from 'react';
import { Button, Menu, MenuItem, Badge, IconButton, Drawer, List, ListItem, ListItemText, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../Cart/ShoppingListSlice';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import axios from 'axios';

function UserNav() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState('');
  const [notifications, setNotifications] = useState([]);
  const uid = sessionStorage.getItem('id');
  const nav = useNavigate();

  const isLog = sessionStorage.getItem('isLog');
  const user = sessionStorage.getItem('user');


  useEffect(() => {
    axios
      .get(`http://localhost:1310/notifications/${uid}`)
      .then(response => setNotifications(response.data))
      .catch(err => console.log(err));
  }, [uid]);

  useEffect(() => {
    if (isLog === 'no') {
      nav('/')
    }
  })
  
  useEffect(() => {
    if (user !== 'user') {
      nav('/PageNotFound')
    }
  })
  

  const shoppingList = useSelector((state) => state.ShoppingList.items);
  const dispatch = useDispatch();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleBottomDrawer = (open) => () => {
    setBottomDrawerOpen(open);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      dispatch(addItem(newItem));
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    dispatch(removeItem(itemToRemove));
  };

  const handleDeleteNotification = (notificationId) => {
    console.log(`Delete notification with ID: ${notificationId}`);
    // Implement delete logic here
    axios.delete("http://localhost:1310/notifications/" + notificationId).then((res) => {
      window.location.reload();
    }).catch((err) => alert("unable to delete"));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">Smart Kitchen App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inventory">Inventory</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recipes">Recipes</Link>
              </li>
              <li className="nav-item">
                <IconButton onClick={toggleDrawer(true)} color="primary">
                  <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsNoneSharpIcon />
                  </Badge>
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                  sx={{ '& .MuiDrawer-paper': { width: 360, padding: 2 } }}
                >
                  <List>
                    <ListItem>
                      <ListItemText primary="Notifications" primaryTypographyProps={{ variant: 'h6' }} />
                    </ListItem>
                    {notifications.map((notification) => (
                      <React.Fragment key={notification.notificationId}>
                        <ListItem
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNotification(notification.notificationId)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={notification.product.productName}
                            secondary={notification.message}
                          />
                        </ListItem>
                        <hr />
                      </React.Fragment>
                    ))}
                  </List>
                </Drawer>
              </li>
              <li className="nav-item">
                <IconButton onClick={toggleBottomDrawer(true)} color="primary">
                  <Badge badgeContent={shoppingList.length} color="success">
                    <AddShoppingCartSharpIcon />
                  </Badge>
                </IconButton>
                <Drawer
                  anchor="bottom"
                  open={bottomDrawerOpen}
                  onClose={toggleBottomDrawer(false)}
                  sx={{ '& .MuiDrawer-paper': { height: '50%', padding: 2, overflow: 'auto' } }}
                >
                  <List>
                    <ListItem>
                      <ListItemText primary="Shopping List" primaryTypographyProps={{ variant: 'h6' }} />
                    </ListItem>
                    {shoppingList.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item} />
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(item)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItem>
                    ))}
                    <ListItem>
                      <TextField
                        label="Add Item"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                      />
                      <IconButton onClick={handleAddItem} color="primary">
                        <AddIcon />
                      </IconButton>
                    </ListItem>
                  </List>
                </Drawer>
              </li>
              <li className="nav-item">
                <BasicMenu />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

function BasicMenu() {
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.clear();
    sessionStorage.setItem('isLog', 'no')
    nav('/');
  };
  const handleProfile = () => {
    setAnchorEl(null);
    nav("/profilePage");
  };
  const handlePurchaseHistory = () => {
    setAnchorEl(null);
    nav("/purchaseHistory");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'inherit', transition: 'all 0.3s ease' }}
      >
        <SettingsSharpIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ '& .MuiMenu-paper': { borderRadius: 1 } }}
      >
        <MenuItem onClick={handleProfile}> <PersonOutlineSharpIcon /> Profile</MenuItem>
        <MenuItem onClick={handlePurchaseHistory}> <InventorySharpIcon /> Purchase History</MenuItem>
        <MenuItem onClick={handleLogout}> <LogoutSharpIcon /> Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default UserNav;
