import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import kitchen from '../Assets/smart-kitchen.png'

export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link className='text-muted' color="inherit" to="/">
        Smart Kitchen App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

export default function Login() {

    const [email, setEmail] = React.useState(''); 
    const [password, setPassword] = React.useState('')
    const [user,setUser] = React.useState('');
    // console.log(user);
    
    // console.log(email+"\n"+password);

    const [data, setData] = React.useState({});
    
    
    const nav = useNavigate();
    // const [otp, setOtp] = React.useState('');

    const sendOtp = () => {
        axios
          .get(`http://localhost:1310/mailServices/${email}`)
          .then((response) => {
                console.log(response.data);
                // sessionStorage.setItem('otp',response.data)
              })
          .catch(err => console.log(err));        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let result = validateValues(email, password);
        sessionStorage.setItem("user",user);
        if (result === true) {
            if(user === "user"){
                axios 
                .get(`http://localhost:1310/users/${email}/${password}`).then((res) => {
                    setData(res.data);
                    // console.log(res.data);
                    sessionStorage.setItem("id",res.data.userId);
                    sessionStorage.setItem("name", res.data.name);
                    sessionStorage.setItem("email", res.data.email);
                    sessionStorage.setItem("isLog", "yes");
                    sessionStorage.setItem("home", "/home");
                    nav("/home");
                  }).catch((err) =>{
                    if(err.response.status !== 200){
                      setDataStatus(false);
                      setDataMessage("Invalid Credentials!");
                    }
                  });
                } else {
                  axios 
                  .get(`http://localhost:1310/admins/${email}/${password}`).then((res) => {
                    setData(res.data);
                    sendOtp();
                    // console.log(res.status);
                    sessionStorage.setItem("name", res.data.adminName);
                    sessionStorage.setItem("email", res.data.emailId);
                    sessionStorage.setItem("otpLink","/dashboard");
                    sessionStorage.setItem("home", "/dashboard");
                    sessionStorage.setItem("isLog", "yes");
                        // console.log(otp);                        
                        nav("/otp");
                    }).catch((err) => {
                        if (err.response) {
                        if(err.response.status !== 200){
                            setDataStatus(false);
                            setDataMessage("Invalid Credentials!");
                        }} else {
                            console.error(err);
                            setDataStatus(false);
                            setDataMessage("An error occurred. Please try again.");
                        }
                    });                 
                }
                
            } else {
                setDataMessage("Please Enter the Valid Inputs!!!");
            }        
    }

    const [dataStatus, setDataStatus] = React.useState('');
    const [dataMessage, setDataMessage] = React.useState('');
    
    const validateValues = (email, password) => {        
        if (email === "") {
            setDataStatus("false");
            return false;
        } else if (password === "") {
            setDataStatus("false");
            return false;
        } else {
            setDataStatus("true");
            return true;
        }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url("${kitchen}")`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat:"no-repeat"
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                {(dataStatus === false) && <div className="alert alert-danger">
                        {dataMessage}
                    </div>
                    }
                </Grid>
                <Grid container >
                    <Grid item display={"flex"}>
                        <div className="container">
                            log in as:
                        </div>
                        <div className="container d-flex">
                            <div class="form-check text-start justify-content-between">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="userType"
                                    id="user"
                                    checked={user === 'user'}
                                    onChange={() => setUser('user')}
                                    />
                                <label className="form-check-label" htmlFor="user">
                                    User
                                </label>
                            </div> 
                            <div class="form-check justify-content-between">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="userType"
                                    id="admin"
                                    checked={user === 'admin'}
                                    onChange={() => setUser('admin')}
                                    />
                                <label className="form-check-label" htmlFor="admin">
                                    Admin
                                </label>
                            </div>
                        </div>
                    </Grid>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={(e) =>
                    setPassword( e.target.value )
                }
                id="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgetPswd" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}