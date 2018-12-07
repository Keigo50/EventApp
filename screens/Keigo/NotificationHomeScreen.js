import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { RkButton, RkTheme } from "react-native-ui-kitten";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { Constants } from "expo";

export default class NotificationHomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sub3}>
          <View style={styles.sub}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Details');
              }}>
              <Icon
                name="plus-circle"
                size={30}
              />
            </TouchableOpacity>

          </View>
          <View style={styles.sub4}>
            <SearchBar
              containerStyle={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
                borderTopColor: "#fff",
                backgroundColor: "#fff",
              }}
              round
              lightTheme
              showLoading
              platform="ios"
              cancelButtonTitle="Cancel"
              onChangeText={someMethod => this.setState({ todoText: someMethod })}
              onClearText={someMethod => this.setState({ todoText: someMethod })}
              placeholder='Search' />
          </View>
          <View style={styles.sub2}>
            <Button
              onPress={() => {
                this.props.navigation.navigate('App');
              }}
              title="ログイン" />
          </View>
        </View>
        <Text>Notification</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight
  },
  sub: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10

  },
  sub2: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  sub4: {
    flex: 9,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  sub3: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "stretch"
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
