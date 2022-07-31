import React from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import logo from "./logo.svg";
import useStyles from "./styles";
import * as actions from "../../actions";

function Default({ logout }) {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <img src={logo} className={classes.appLogo} alt="logo" />
        <p>
          Edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <a
          className={classes.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Button
        id="logout-button"
        color="secondary"
        variant="contained"
        onClick={logout}
      >
        Logout
      </Button>
      <Button
        onClick={() =>
          window.open(
            "https://visimo.freshdesk.com/support/tickets/new",
            "_blank"
          )
        }
        color="secondary"
        variant="contained"
      >
        Submit Bug Report
      </Button>
    </div>
  );
}

export default connect(null, actions)(Default);
