import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RkButton, RkTheme } from "react-native-ui-kitten";

import { Constants } from "expo";

export default class NotificationHomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Notification</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "stretch",
    paddingTop: Constants.statusBarHeight
  },

  button: {
    alignItems: "center",
    backgroundColor: "#fff"
  },

  select: {
    flexDirection: "row",
    height: 40
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center"
  }
});

RkTheme.setType("RkButton", "create", {
  width: "100%",
  height: 60,
  color: "#fff",
  fontSize: 25,
  marginBottom: 10
});

RkTheme.setType("RkButton", "danjer", {
  backgroundColor: "red",
  marginTop: 10
});
