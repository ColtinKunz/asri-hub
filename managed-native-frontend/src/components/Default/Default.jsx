import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  Button,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as actions from "../../actions";

const logo = require("./logo.svg");

function Default({ navigation, logout, isLoggedIn }) {
  if (!isLoggedIn) {
    navigation.navigate("Login");
  }
  return (
    <View style={styles.app}>
      <View style={styles.appHeader}>
        <Image source={logo} style={styles.appLogo} alt="logo" />
        <Text>Edit src/App.js and save to reload.</Text>
        <Text
          style={styles.appLink}
          onPress={() =>
            Linking.openURL("https://reactnative.dev/docs/tutorial")
          }
        >
          Learn React
        </Text>
      </View>
      <Button
        testID="logoutButton"
        style={styles.button}
        onPress={logout}
        title="Logout"
      />
      <Button
        onClick={() =>
          window.open(
            "https://visimo.freshdesk.com/support/tickets/new",
            "_blank"
          )
        }
        style={styles.button}
        title="Submit Bug Report"
      />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

const styles = StyleSheet.create({
  app: {
    textAlign: "center",
  },
  appLogo: {
    height: 40,
  },
  appHeader: {
    minHeight: 0.8 * Dimensions.get("window").height,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  appLink: {
    color: "#61dafb",
  },
  button: {
    paddingTop: 10,
  },
});

export default connect(mapStateToProps, actions)(Default);
