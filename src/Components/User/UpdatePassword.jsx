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
import { Copyright } from '../../Components/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UpdatePassword() {

  const [data, setData] = React.useState({
    email: sessionStorage.getItem('email'),
    password: '',
    cnPass: ''
  })

  const nav = useNavigate();

  const [dataStatus, setDataStatus] = React.useState('');
  const [dataMessage, setDataMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = validateValues(data);
    if (result === true && confPass === true) {
      // axios
      // .put(`http://localhost:1310/users/${id}/${data.password}`)
      // .then((res) => {
      //   // console.log(data);
      //   console.log(res.data);
      //   // alert("User added Successfully");
      setTimeout(() => {
        setDataMessage('Profile updated successfully!');
          nav("/");
      }, 2000);
      // })
      // .catch((err) => console.log(err));
    } else {
      setDataMessage("Please Enter the Valid Inputs!!!");
    }
  };
  console.log(data);

  const [confPass, setConfPass] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleConfirmPassword = (e) => {
    setData({ ...data, cnPass: e.target.value })
    if (data.password === e.target.value) {
      setConfPass(true);
      setAlertMessage('Password matches!');
    } else {
      setConfPass(false);
      setAlertMessage('Password does not match!');
    }
  }
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

  const validateValues = (data) => {
    let isValid = true;

    if (data.password === "") {
      setPasswordError('Please enter a new password');
      isValid = false;
    } else if (data.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (data.cnPass === "") {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (data.cnPass !== data.password) {
      setConfirmPasswordError('Password does not match!');
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
            Update Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="newPswd"
              label="New Password"
              name="newPswd"
              type="password"
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              autoFocus
            />
            {passwordError && (
              <div style={{ color: 'red' }}>{passwordError}</div>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confPswd"
              label="Confirm Password"
              type="password"
              id="confPswd"
              onChange={(e) =>
                handleConfirmPassword(e)
              }
            />
            <Grid item xs={12}>
              {confirmPasswordError && (
                <div style={{ color: 'red' }}>{confirmPasswordError}</div>
              )}
              {(confPass === false) && <div className="alert alert-danger">
                {alertMessage}
              </div>
              }
              {(confPass === true) && <div className="alert alert-success">
                {alertMessage}
              </div>
              }

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}