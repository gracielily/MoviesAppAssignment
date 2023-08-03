import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "../reviewForm/styles";
import CredentialsForm from "../credentialsForm";
export default function LoginPageTemplate() {
  const [msg, setMsg] = useState("");
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
    const error = await onLogin({ username: credentials.username, password: credentials.password });
    if(error) {
      setMsg(error.message)
  }
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
        <CredentialsForm submitBtnLabel="Login" control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} authMsg={msg} />
      </Box>
  );
}
