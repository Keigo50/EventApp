import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RkButton, RkTheme } from "react-native-ui-kitten";

import { Constants } from "expo";

export default class AccountHomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <RkButton rkType="success create">新規作成</RkButton>
        </View>
        <View style={styles.select}>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              height: 20,
              justifyContent: "flex-start"
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text style={styles.text}>または</Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 20,
              borderBottomWidth: 1,
              justifyContent: "flex-end"
            }}
          />
        </View>
        <View style={styles.button}>
          <RkButton rkType="danjer create">サインイン</RkButton>
        </View>
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
