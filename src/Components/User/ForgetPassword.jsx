import * as React from 'react';
import { useState } from 'react';
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
import { Copyright } from '../../Components/Login';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Modal } from 'react-bootstrap/Modal';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgetPassword() {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');


  const nav = useNavigate();

  console.log(email);

  const sendOtp = () => {
    axios
      .get(`http://localhost:1310/mailServices/${email}`)
      .then((response) => {
        console.log(response.data);
        // sessionStorage.setItem('otp',response.data)
      })
      .catch(err => console.log(err));
  }

  const [dataStatus, setDataStatus] = React.useState('');
  const [dataMessage, setDataMessage] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = validateEmail(email);
    if (isValid) {
      sendOtp()
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("otpLink", "/updatePassword");
      nav("/otp")
    } else {
      setDataStatus(false);
      // setDataMessage("Please Enter a valid Email");
    }
  };
  const validateEmail = (email) => {
    let isValid = true;
    if (email === "") {
      setEmailError('Please enter your email address');
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }
    return isValid;
  };

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
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid item xs={12} sx={{ mt: 5 }}>
              {emailError && <div className="alert alert-danger">
                {emailError}
              </div>
              }
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>
            <Grid container>
              <Grid item >
                <Link to="/" variant="body2">
                  {"remember password!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}