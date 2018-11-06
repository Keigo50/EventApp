import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity
} from "react-native";
import { RkButton, RkTextInput, RkTheme, RkText } from "react-native-ui-kitten";
import { Constants } from "expo";
import Entypo from "react-native-vector-icons/Entypo";

export default class AccountNewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{ paddingLeft: 20 }}
      >
        <Entypo name="chevron-left" size={40} color="black" />
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.sub}>
            <RkText rkType="text">姓</RkText>
            <RkTextInput
              autoFocus={true}
              returnKeyType="done"
              rkType="textInput"
              onChangeText={text => this.setState({ todoText: text })}
            />
          </View>

          <View style={styles.sub2}>
            <RkText rkType="text">名</RkText>
            <RkTextInput returnKeyType="done" rkType="textInput" />
          </View>
        </View>

        <RkText rkType="text">メールアドレス</RkText>
        <RkTextInput
          returnKeyType="done"
          rkType="textInput"
          onChangeText={text => this.setState({ todoText: text })}
        />

        <RkText rkType="text">パスワード</RkText>
        <RkTextInput returnKeyType="done" rkType="textInput" />

        <RkButton rkType="btn">送信</RkButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 25
  },
  sub: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    paddingRight: 10,
    paddingTop: 10
  },
  sub2: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingTop: 10
  },

  main: {
    flexDirection: "row",
    backgroundColor: "#fff"
  }
});

RkTheme.setType("RkTextInput", "textInput", {
  marginBottom: 30,
  underlineWidth: 0,
  underlineColor: "#000",
  borderRadius: 50,
  borderWidth: 1,
  borderBottomWidth: 1,
  borderColor: "#000",
  input: {
    paddingHorizontal: 10,
    marginVertical: 15,
    marginLeft: 5,
    fontSize: 20,
    height: 25
  }
});

RkTheme.setType("RkButton", "btn", {
  marginTop: 10,
  width: "100%",
  height: 60,
  color: "#fff",
  fontSize: 25,
  marginBottom: 10
});

RkTheme.setType("RkText", "text", {
  fontSize: 25
});
