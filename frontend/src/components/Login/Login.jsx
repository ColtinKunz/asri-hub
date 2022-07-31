import React from "react";
import { connect } from "react-redux";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as actions from "../../actions";
import useStyles from "./styles";

function Login({ authenticate }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const classes = useStyles();

  /* istanbul ignore next */
  const redirectScreen = (path) => {
    navigate(path);
  };

  const sendLogin = (event) => {
    event.preventDefault();
    if (username === "") {
      alert("Username cannot be blank.");
      return;
    }
    if (password === "") {
      alert("Password cannot be blank.");
      return;
    }
    authenticate(username, password, redirectScreen);
    setUsername("");
    setPassword("");
  };

  return (
    <div className={classes.loginBox}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} sm={10} md={8} lg={6} xl={4}>
          <Paper elevation={10}>
            <form onSubmit={sendLogin}>
              <TextField
                id="username"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                variant="outlined"
                label="Username"
                placeholder="Enter username"
                fullWidth
                required
              />
              <TextField
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                variant="outlined"
                label="Password"
                placeholder="Enter password"
                fullWidth
                required
                type="password"
              />
              <Button
                id="login-button"
                onClick={sendLogin}
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(null, actions)(Login);
