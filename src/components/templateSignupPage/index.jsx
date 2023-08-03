import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "../reviewForm/styles";
import CredentialsForm from "../credentialsForm";

export default function SignupPageTemplate() {
  const [msg, setMsg] = React.useState("");
  const { onSignup, token, signupError } = useContext(AuthContext);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ username: "", password: "" });

  const navigate = useNavigate();
  if (token) {
    navigate("/");
  }
  const onSubmit = async (credentials) => {
    const error = await onSignup({ username: credentials.username, password: credentials.password });
    if(error) {
        setMsg(error.message)
    }
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h1" variant="h2">
        Signup
      </Typography>
      <Typography component="h5" variant="h6">
        Enter your credentials below
      </Typography>
      {signupError && (
          <Alert severity="error">{signupError}</Alert>
        )}
      <CredentialsForm submitBtnLabel="Signup" control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} authMsg={msg} />
    </Box>
  );
}
