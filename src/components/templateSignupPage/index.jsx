import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
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
    const error = await onSignup({
      username: credentials.username,
      password: credentials.password,
    });
    if (error) {
      setMsg(error.message);
    }
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>
        Signup to TMDB Client
      </Typography>
      <Typography
        variant="h6"
        textAlign="center"
        color="textSecondary"
        sx={{ mb: 3 }}
      >
        Enter your credentials below to signup.
      </Typography>
      {signupError && <Alert severity="error">{signupError}</Alert>}
      <CredentialsForm
        submitBtnLabel="Signup"
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        authMsg={msg}
      />
    </>
  );
}
