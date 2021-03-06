import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RkButton, RkTheme } from "react-native-ui-kitten";

import { Constants, Icon } from "expo";

export default class AccountHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  render() {
    let a = this.props.navigation.state.params;
    console.log(a);

    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "flex-start",
            position: "absolute",
            top: 20,
            left: 20
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Main")}
          >
            <Icon.Ionicons name="ios-close" size={50} />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <RkButton
            rkType="success create"
            onPress={() => this.props.navigation.navigate("Create")}
          >
            新規作成
          </RkButton>
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
          <RkButton
            rkType="danjer create"
            onPress={() => this.props.navigation.navigate("Main")}
          >
            ログイン
          </RkButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
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
