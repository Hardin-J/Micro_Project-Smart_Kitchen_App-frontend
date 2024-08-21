import React, { useEffect } from 'react';
import { Drawer, Typography, Button, Stack, Divider } from '@mui/material';
import { Settings, ExitToApp, People, AdminPanelSettings, Kitchen } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Custom styles for the drawer
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}));

const DrawerContainer = styled('div')({
    width: 240,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // This ensures that the last elements stay at the bottom
});


const AdminNav = () => {
    const isLog = sessionStorage.getItem('isLog');
    const user = sessionStorage.getItem('user');

    useEffect(() => {
        if (isLog === 'no') {
            nav('/')
        }
    })
    useEffect(() => {
        if (user !== 'admin') {
            nav('/404NotFound')
        }
    })

    const nav = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        sessionStorage.setItem('isLog', 'no')
        nav('/');
    };
    const handleUser = () => {
        nav('/dashboard');
    };
    const handleRecipe = () => {
        nav('/manageRecipe');
    };
    const handleAdmin = () => {
        nav('/manageAdmin');
    };
    const handleNav = () => {
        nav('/dashboard');
    };

    return (
        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
            <DrawerContainer>
                <div>
                    <DrawerHeader>
                        <Button color="inherit" onClick={handleNav} sx={{ justifyContent: 'flex-start' }}>
                            <Stack spacing={1} sx={{ padding: 2 }}>
                                <Typography variant="h4" component="div">
                                    Smart Kitchen App
                                </Typography> <br />
                                <Typography variant="h6" component="div">
                                    Admin Panel
                                </Typography>
                            </Stack>
                        </Button>
                    </DrawerHeader>
                    <Stack spacing={2} sx={{ padding: 2 }}>
                        <hr />
                        <Button color="inherit" startIcon={<People />} onClick={handleUser} sx={{ justifyContent: 'flex-start' }}>
                            Manage Users
                        </Button>
                        <Button color="inherit" startIcon={<Kitchen />} onClick={handleRecipe} sx={{ justifyContent: 'flex-start' }}>
                            Manage Recipes
                        </Button>
                        <Button color="inherit" startIcon={<AdminPanelSettings />} onClick={handleAdmin} sx={{ justifyContent: 'flex-start' }}>
                            Manage Admins
                        </Button>
                    </Stack>
                </div>
                <div>
                    <Stack spacing={2} sx={{ padding: 2 }}>
                        <hr />
                        <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout} sx={{ justifyContent: 'flex-start' }}>
                            Logout
                        </Button>
                    </Stack>
                </div>
            </DrawerContainer>
        </Drawer>
    );
};

export default AdminNav;
