import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import * as actions from "./actions";
import AuthorizationProtectedRoute from "./AuthorizationProtectedRoute";
import LoggedInRedirection from "./LoggedInRedirection";
import Login from "./components/Login";
import Default from "./components/Default";

class App extends React.Component {
  // { showLoadingWheel, refreshAccessToken }

  componentDidMount() {
    const { refreshAccessToken } = this.props;
    refreshAccessToken(true);
    const interval = 4 * 60 * 1000; // every 4 minutes
    setInterval(refreshAccessToken, interval);
  }

  render() {
    const { showLoadingWheel } = this.props;

    if (showLoadingWheel) {
      return (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      );
    }
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<AuthorizationProtectedRoute />}>
              <Route exact path="/" element={<Default />} />
            </Route>
            <Route exact path="/login" element={<LoggedInRedirection />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showLoadingWheel: state.showLoadingWheel,
  };
}

export default connect(mapStateToProps, actions)(App);
