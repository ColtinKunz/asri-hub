import { connect } from "react-redux";
import React from "react";
import {
  Platform,
  StatusBar,
  Image,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";

function Header() {
  const MyStatusBar = () => {
    if (Platform.OS === "ios") {
      return (
        <>
          <SafeAreaView
            style={{
              flex: 0,
              backgroundColor: "black",
            }}
          />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: "black",
            }}
          >
            <StatusBar barStyle="light-content" />
          </SafeAreaView>
        </>
      );
    } else {
      return <StatusBar backgroundColor="black" barStyle="light-content" />;
    }
  };

  return (
    <View>
      <MyStatusBar />
      <View style={styles.header}>
        <View style={styles.logo}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  offlineBadge: {
    backgroundColor: "#FDBC02",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default connect(null, null)(Header);
