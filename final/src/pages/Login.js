import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';
import React from 'react';
import { useState, useContext } from "react";
import { AppContext } from "../Context";

const Login = () => {
  const { setloginUsers,searchorder,searchsale } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              id: '00004',
              phone: '02-3779968'
            }}
            validationSchema={Yup.object().shape({
              id: Yup.string().max(255).required('Email is required'),
              phone: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(e) => {
              fetch("http://localhost/php-react/login-check.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                async: false,
                body: JSON.stringify(e),
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  if (data.loginusers.idcheck == true && data.loginusers.passcheck == true) {
                    setloginUsers(e.id)
                    searchorder(e.id)
                    searchsale(e.id)
                    navigate('/app/dashboard', { replace: true });
                  }
                  else {
                    console.log(data)
                    alert(data.msg)
                  }
                })
                .catch((err) => {
                  console.log(err);
                });

            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with id address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="Email Address"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.id}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Password"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.phone}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </div>
  );
};

export default Login;
