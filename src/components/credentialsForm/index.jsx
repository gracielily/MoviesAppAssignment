import { Button, TextField, Typography, Box, Alert } from "@mui/material";
import { Controller } from "react-hook-form";

export default function CredentialsForm(props) {
    return (
        <form autoComplete="off" onSubmit={props.onSubmit}>
        {props.authMsg ? (<Alert severity="error">{props.authMsg}</Alert>) : null}
        <Controller
          name="username"
          control={props.control}
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
        {props.errors.username && (
          <Typography variant="h6" component="p">
            {props.errors.username.message}
          </Typography>
        )}
        <Controller
          name="password"
          control={props.control}
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
        {props.errors.password && (
          <Typography variant="h6" component="p">
            {props.errors.password.message}
          </Typography>
        )}
        <Button variant="outlined" color="secondary" type="submit">
          {props.submitBtnLabel}
        </Button>
      </form>
    )
}