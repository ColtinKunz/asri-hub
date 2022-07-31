import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInRedirection = ({ isLoggedIn }) => {
  /*
   * If the user is signed in then redirect the user to default page.
   * Else render the login page.
   */

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps, null)(LoggedInRedirection);
