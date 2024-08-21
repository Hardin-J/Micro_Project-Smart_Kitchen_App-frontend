import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import UpdateIcon from '@mui/icons-material/Update';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Paper, TablePagination, Snackbar, Alert } from '@mui/material';
import UserNav from './UserNav';

function ListInventory() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [incPro, setIncPro] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);

    const uid = sessionStorage.getItem("id");

    useEffect(() => {
        axios
            .get(`http://localhost:1310/products/${uid}`)
            .then((response) => {
                setRows(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [uid, rows.quantity]);

    const handleDelete = (id) => {
        const conf = window.confirm("Do you want to Remove");
        if (conf) {
            axios.delete(`http://localhost:1310/products/${id}`).then((res) => {
                console.log(res.data);                
                alert("Record has been deleted");
                setRows(rows.filter(row => row.productId !== id));
            }).catch((err) => alert("Unable to delete"));
        }
    };

    const handleIncrement = (id) => {
        setRows(rows.map(pro =>
            pro.productId === id ? { ...pro, quantity: pro.quantity + 1 } : pro
        ));
    };

    const handleUpdate = (id) => {
        const updatedProduct = rows.find(pro => pro.productId === id);
        if (updatedProduct) {
            setIncPro(updatedProduct);
            axios
                .put("http://localhost:1310/products", updatedProduct)
                .then((res) => {
                    console.log(res.data);
                    setOpen(true); // Show Snackbar
                    setTimeout(() => setOpen(false), 3000); // Hide Snackbar after 3 seconds
                })
                .catch((err) => console.error(err));
        }
    };

    const filteredItems = rows.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{ backgroundColor: '#f2f2f5' }} className='vh-100'>
            <UserNav />
            <section id="view-list">
                <br /> <br />
                <div className="container-fluid  pt-24">
                    <div className="container mt-5">
                    <div className="container mt-5">

                    <Typography variant="h4" gutterBottom component="div" align="left">
                        Product Inventory
                    </Typography>
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                        <TextField
                            variant="outlined"
                            placeholder="Search Products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: 300 }}
                        />
                        <Link to="/addProduct" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                            >
                                Add Product
                            </Button>
                        </Link>
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
                                    <TableCell align="center"><Typography variant="subtitle1">Delete Action</Typography></TableCell>
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
                                                    onClick={() => handleIncrement(d.productId)}
                                                    color="primary"
                                                    size="small"
                                                    aria-label="increment quantity"
                                                >
                                                    <AddCircleIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleUpdate(d.productId)}
                                                    color="secondary"
                                                    size="small"
                                                    aria-label="update product"
                                                >
                                                    <UpdateIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => handleDelete(d.productId)}
                                                color="error"
                                                size="small"
                                                aria-label="delete product"
                                            >
                                                <DeleteForeverSharpIcon />
                                            </IconButton>
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

                    <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                        <Alert onClose={() => setOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                            Product Added Successfully!!!
                        </Alert>
                    </Snackbar>

                    <style>
                        {`
                            #view-list {
                                bottom: -100px;
                            }
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
                </div>
            </section>
        </div>
    );
}

export default ListInventory;
