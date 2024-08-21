import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Copyright } from '../../Components/Login';
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

    const [data, setData] = React.useState({
        name: '',
        email: '',
        password: '',
        phoneNumber:'',
    })
    console.log(data);
    
  
  const nav = useNavigate();

    let handleSubmit = (e) => {
        e.preventDefault();
        let result = validateValues(data);

        if (result === true && confPass === true) {
            axios
                .post("http://localhost:1310/users", data)
                .then((res) => {
                    // console.log(data);
                    console.log(res.data);
                    // alert("User added Successfully");
                    nav("/");
                })
                .catch((err) => console.log(err));
        } else {
            setDataMessage("Please Enter the Valid Inputs!!!");
        }
    };
    const [dataStatus, setDataStatus] = React.useState('');
    const [dataMessage, setDataMessage] = React.useState('');
    
    const validateValues = (data) => {
        
        if (data.name === "") {            
            setDataStatus(false);
            return false;
        } else if (data.email === "") {
            setDataStatus(false);
            return false;
        } else if (data.password === "") {
            setDataStatus(false);
            return false;
        } else if (confPass === "") {
            setDataStatus(false);
            return false;
        } else if (data.phoneNumber === "") {
            setDataStatus(false);
            return false;
        } else {
            setDataStatus(true);
            return true;
        }
    };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              {(dataStatus === false) && <div className="alert alert-danger">
                    {dataMessage}
                </div>
                }
              </Grid>
              <Grid item xs={12} >
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  autoFocus
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}