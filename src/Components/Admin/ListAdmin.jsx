import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
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
    TablePagination,
    TextField,
    IconButton,
    Button,
    Stack,
    Alert,
    Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


const ListAdmin = () => {
    const [filter, setFilter] = useState('');
    const [users, setUsers] = useState([]);
    const nav = useNavigate();

    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:1310/admins/all`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    const handleAddAdmin = (event) => {
        event.preventDefault();
        nav("/addAdmin")
    };

    const handleDelete = (userId) => {
        // setUsers(users.filter(user => user.userId !== userId));
        const conf = window.confirm("Do you want to Remove");
        if (conf) {
            axios
                .delete("http://localhost:1310/admins/" + userId)
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
    };
    const handleEdit = (userId) => {
        nav(`/editAdmin/${userId}`)
    };

    const filteredUsers = users.filter(user =>
        user.adminName.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Grid container>
            <Grid item xs={2}>
                <AdminNav />
            </Grid>
            <Grid item xs={10} sx={{ padding: 3, mt: 5 }}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Admin Management
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>

                        <Grid item xs={3}>
                            <TextField
                                label="Filter by name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={filter}
                                onChange={handleFilterChange}
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "black" }}
                            startIcon={<AddIcon />}
                            onClick={handleAddAdmin}
                        >
                            Add Admin
                        </Button>
                    </Stack>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.adminId}>
                                        <TableCell>{user.adminId}</TableCell>
                                        <TableCell>{user.adminName}</TableCell>
                                        <TableCell>{user.emailId}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(user.adminId)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(user.adminId)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                        <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
                            {snackMsg}
                        </Alert>
                    </Snackbar>
                </Container>
            </Grid>
        </Grid>
    );
};

export default ListAdmin;