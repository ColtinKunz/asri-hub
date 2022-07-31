import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import { View, ActivityIndicator, Dimensions } from "react-native";
import Default from "./components/Default";
import Login from "./components/Login";
import * as actions from "./actions";

const Stack = createNativeStackNavigator();

function App({ showLoading, refreshAccessToken, isLoggedIn }) {
  React.useEffect(() => {
    refreshAccessToken(true);

    const interval = 4 * 60 * 1000; // every 4 minutes
    setInterval(refreshAccessToken, interval);
  }, []);

  if (showLoading) {
    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator testID="loading" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={Default} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    showLoading: state.showLoading,
  };
}

export default connect(mapStateToProps, actions)(App);
