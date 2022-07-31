import React from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthorizationProtectedRoute = ({ isLoggedIn }) => {
  /*
   * If the user is signed in then return the child route.
   * Else redirect the user to login page.
   */

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps, null)(AuthorizationProtectedRoute);
