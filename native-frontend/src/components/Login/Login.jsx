import React from "react";
import { connect } from "react-redux";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as actions from "../../actions";

function Login({ navigation, authenticate, verifyAccessToken }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const showLoginError = () => {
    Alert.alert(
      "Login Error",
      "Invalid username or password.",
      [{ text: "OK", style: "cancel" }],
      { cancelable: true }
    );
  };

  const sendLogin = () => {
    if (username === "") {
      Alert.alert(
        "Login Error",
        "Username cannot be blank.",
        [{ text: "OK", style: "cancel" }],
        { cancelable: true }
      );
      return;
    }
    if (password === "") {
      Alert.alert(
        "Login Error",
        "Password cannot be blank.",
        [{ text: "OK", style: "cancel" }],
        { cancelable: true }
      );
      return;
    }
    authenticate(username, password, navigation, showLoginError);
    setUsername("");
    setPassword("");
  };

  return (
    <View style={styles.root}>
      <View style={styles.loginBox}>
        <TextInput
          testID="username"
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          testID="password"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
        <Button testID="button" onPress={sendLogin} title="Login" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get("window").width,
    display: "flex",
    alignItems: "center",
  },
  loginBox: {
    paddingTop: 40,
    width: 0.75 * Dimensions.get("window").width,
  },
  input: {
    marginVertical: 15,
    padding: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default connect(null, actions)(Login);
