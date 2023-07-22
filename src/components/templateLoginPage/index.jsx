import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import styles from "../reviewForm/styles";
export default function LoginPageTemplate() {
  const { onLogin, token, loginError } = useContext(AuthContext);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ username: "", password: "" });

  const navigate = useNavigate();
  if (token) {
    navigate("/movies");
  }
  const onSubmit = async (credentials) => {
    console.log(credentials)
    onLogin({ username: credentials.username, password: credentials.password });
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h1" variant="h2">
        Login
      </Typography>
      <Typography component="h5" variant="h6">
        Enter your login details below
      </Typography>
      {loginError && (
          <Alert severity="error">{loginError}</Alert>
        )}
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{ required: "Username is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Email"
              onChange={onChange}
              required
              variant="outlined"
              color="secondary"
              type="email"
              sx={{ mb: 3 }}
              fullWidth
              value={value}
              autoFocus
            />
          )}
        />
        {errors.username && (
          <Typography variant="h6" component="p">
            {errors.username.message}
          </Typography>
        )}
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Password"
              onChange={onChange}
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={value}
              fullWidth
              sx={{ mb: 3 }}
              autoFocus
            />
          )}
        />
        {errors.password && (
          <Typography variant="h6" component="p">
            {errors.password.message}
          </Typography>
        )}
        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
}
