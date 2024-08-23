import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { Copyright } from '../Login';
import axios from 'axios';
import AdminNav from './AdminNav';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Snackbar } from '@mui/material';

const defaultTheme = createTheme();

function EditAdmin() {
    const { id } = useParams();
    const [data, setData] = React.useState({
        adminId: "",
        adminName: '',
        emailId: '',
        password: '',
    });

    React.useEffect(() => {
        axios
            .get("http://localhost:1310/admins/" + id)
            .then((response) => setData(response.data))
            .catch((err) => console.log(err));
    }, [id]);

    const nav = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [snackMsg, setSnackMsg] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    const [dataStatus, setDataStatus] = React.useState('');
    const [dataMessage, setDataMessage] = React.useState('');

    let handleSubmit = (e) => {
        e.preventDefault();
        let result = validateValues(data);

        if (result === true && confPass === true) {
            axios
                .put("http://localhost:1310/admins", data)
                .then((res) => {
                    setSnackMsg("Admin Details Updated!!!");
                    setSeverity("success");
                    setOpen(true); // Show Snackbar
                    setTimeout(() => {
                        setOpen(false);
                        nav("/manageAdmin");
                    }, 3000);
                })
                .catch((err) => console.log(err));
        } else {
            setDataMessage("Please Enter the Valid Inputs!!!");
        }
    };
    const validateValues = (data) => {
        if (data.adminName === "") {
            setDataStatus(false);
            return false;
        } else if (data.emailId === "") {
            setDataStatus(false);
            return false;
        } else if (data.password === "") {
            setDataStatus(false);
            return false;
        } else if (confPass === "") {
            setDataStatus(false);
            return false;
        } else {
            setDataStatus(true);
            return true;
        }
    };
    const handleGoBack = () => {
        nav(-1);
    }
    const [confPass, setConfPass] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState('');

    const handleConfirmPassword = (e) => {
        if (data.password === e.target.value) {
            setConfPass(true);
            setAlertMessage('Password matches!');
        } else {
            setConfPass(false);
            setAlertMessage('Password does not match!');
        }
    }
    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    <AdminNav />
                </Grid>
                <Grid item xs={10} sx={{ padding: 2, mt: 1 }}>
                    <Container>
                        <ThemeProvider theme={defaultTheme}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                                        {/* <LockOutlinedIcon /> */}
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Edit Admin
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                {(dataStatus === false) && <div className="alert alert-danger">
                                                    {dataMessage}
                                                </div>
                                                }
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    sx={{ bgcolor: "black" }}
                                                    onClick={handleGoBack}
                                                    startIcon={<ArrowBackIcon />}
                                                >
                                                    Back
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    name="name"
                                                    required
                                                    fullWidth
                                                    id="firstName"
                                                    // label="Full Name"
                                                    autoFocus
                                                    value={data.adminName}
                                                    onChange={(e) =>
                                                        setData({ ...data, adminName: e.target.value })
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    value={data.emailId}
                                                    id="email"
                                                    // label="Email Address"
                                                    name="email"
                                                    onChange={(e) =>
                                                        setData({ ...data, emailId: e.target.value })
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    // label="Password"
                                                    value={data.password}
                                                    type="password"
                                                    id="password"
                                                    onChange={(e) =>
                                                        setData({ ...data, password: e.target.value })
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="cnf-pswd"
                                                    label="Confirm Password"
                                                    type="password"
                                                    id="cnf-pswd"
                                                    onChange={(e) =>
                                                        handleConfirmPassword(e)
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                {(confPass === false) && <div className="alert alert-danger">
                                                    {alertMessage}
                                                </div>
                                                }
                                                {(confPass === true) && <div className="alert alert-success">
                                                    {alertMessage}
                                                </div>
                                                }
                                            </Grid>

                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, bgcolor: "black" }}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Box>
                                <Copyright sx={{ mt: 5 }} />
                            </Container>
                            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                                <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
                                    {snackMsg}
                                </Alert>
                            </Snackbar>
                        </ThemeProvider>
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}

export default EditAdmin
