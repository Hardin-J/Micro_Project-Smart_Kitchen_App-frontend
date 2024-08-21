import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField, InputAdornment, Typography, Avatar, CircularProgress, Snackbar, IconButton, Grid } from '@mui/material';
import { Edit, Email, Phone, Lock, Save, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import UserNav from './UserNav';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [cnPass, setCnPass] = useState();

  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [actPass, setActPass] = useState('');

  const theme = useTheme();
  const uid = sessionStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:1310/users/${uid}`)
      .then(response => {
        setFormData(response.data);
        setActPass(response.data.password)
      })
      .catch(err => console.log(err));
  }, [uid]);

  useEffect(() => {
    if (formData.password === actPass) {
      setPasswordChanged(false)
    }
  }, [formData.password]);

  const [confPass, setConfPass] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleConfirmPassword = (e) => {
    if (formData.password === e.target.value) {
      setCnPass(e.target.value)
      setConfPass(true);
      setAlertMessage('Password matches!');
    } else {
      setConfPass(false);
      setAlertMessage('Password does not match!');
    }
  }
  const [dataStatus, setDataStatus] = useState('');
  const [dataMessage, setDataMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let result = validateValues(formData);
    if (result === true && confPass === true) {
      axios
        .put("http://localhost:1310/users", formData)
        .then((res) => {
          // console.log(data);
          console.log(res.data);
          // alert("User added Successfully");
          setTimeout(() => {
            setSuccess('Profile updated successfully!');
            setOpenSnackbar(true);
            nav("/home");
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };


  const validateValues = (data) => {
    let isValid = true;

    if (data.name === "") {
      setDataStatus(false);
      setDataMessage("Name is required!");
      isValid = false;
    }
    if (data.name !== "") {
      if (!/^[a-zA-Z ]+$/.test(data.name)) {
        setDataStatus(false);
        setDataMessage("Name should only contain letters and spaces!");
        isValid = false;
      }
    }

    if (data.email === "") {
      setDataStatus(false);
      setDataMessage("Email is required!");
      isValid = false;
    }

    if (data.email !== "") {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
        setDataStatus(false);
        setDataMessage("Invalid email address!");
        isValid = false;
      }
    }

    if (data.password === "") {
      setDataStatus(false);
      setDataMessage("Password is required!");
      isValid = false;
    }

    if (data.password !== "") {
      if (data.password.length < 8) {
        setDataStatus(false);
        setDataMessage("Password should be at least 8 characters long!");
        isValid = false;
      }
    }

    if (passwordChanged) {
      if (confPass === "") {
        setDataStatus(false);
        setDataMessage("Confirm password is required!");
        isValid = false;
      }
    }
    if (passwordChanged) {
      if (data.password !== cnPass) {
        setDataStatus(false);
        setDataMessage("Confirm password doesnt match with password!");
        isValid = false;

      }
    }

    if (data.phoneNumber === "") {
      setDataStatus(false);
      setDataMessage("Phone number is required!");
      isValid = false;
    }

    if (data.phoneNumber !== "") {
      if (!/^[0-9]+$/.test(data.phoneNumber)) {
        setDataStatus(false);
        setDataMessage("Phone number should only contain numbers!");
        isValid = false;
      }
    }

    return isValid;
  };


  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="container">
      <UserNav />
      <Container fluid className="my-4">
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8} lg={6}>
            <div className="text-center my-4">
              <Avatar
                sx={{ width: 100, height: 100, margin: 'auto', backgroundColor: theme.palette.primary.main }}
              >
                <Typography variant="h5" color="white">
                  {formData.name.charAt(0)}
                </Typography>
              </Avatar>
              <Typography variant="h4" className="mt-3">{formData.name}</Typography>
            </div>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Profile updated successfully!"
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                  <VisibilityOff />
                </IconButton>
              }
            />
            <Form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                {(dataStatus === false) && <div className="alert alert-danger">
                  {dataMessage}
                </div>
                }
              </Grid>
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="User Id"
                  name="userId"
                  value={formData.userId}
                  disabled
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Edit />
                      </InputAdornment>
                    ),
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Edit />
                      </InputAdornment>
                    ),
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setPasswordChanged(true);
                  }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(prev => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Form.Group>
              {passwordChanged && (
                <Form.Group className="mb-3">
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    // value={confPass}
                    onChange={handleConfirmPassword}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  /> <br />
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
                </Form.Group>
              )}
              <Button
                type="submit"
                variant="contained"
                style={{ width: '100%', backgroundColor: "grey", color: 'whitesmoke' }}
              >
                <SaveIcon />
                {'Save Changes'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
