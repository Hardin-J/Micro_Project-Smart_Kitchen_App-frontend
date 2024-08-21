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
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AdminDashboard = () => {
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:1310/users/all`)
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

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.userId !== userId));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Grid container>
      <Grid item xs={2}>
        <AdminNav />
      </Grid>
      <Grid item xs={10} sx={{ padding: 3, mt: 5 }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <Grid item xs={4} sx={{ padding: 3 }}>
            <TextField
              label="Filter by name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={filter}
              onChange={handleFilterChange}
            />
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.userId)}
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

export default AdminDashboard;
