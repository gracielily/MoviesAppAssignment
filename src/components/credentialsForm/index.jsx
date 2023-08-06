import { Button, TextField, Typography, Alert, Grid, Paper } from "@mui/material";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";

export default function CredentialsForm(props) {
    return (
      <>
      <Grid container xs={12} justifyContent="center">
      <Paper sx={{padding: "20px"}}>
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
              sx={{ mb: 3, mt: 3 }}
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
            />
          )}
        />
        {props.errors.password && (
          <Typography variant="h6" component="p">
            {props.errors.password.message}
          </Typography>
        )}
        <Button variant="outlined" color="secondary" type="submit" sx={{mb: 3}} fullWidth>
          {props.submitBtnLabel}
        </Button>
      </form>
      </Paper>
      <Grid item xs={12}>
      <Link to={props.isLogin ? "/signup" : "/login"} variant="body2" style={{textDecoration: 'none'}}>
        <Typography variant="p" component="p" textAlign="center" marginTop="20px" color="secondary">{props.isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}</Typography>
      </Link>
    </Grid>
    </Grid>
    </>
    )
}