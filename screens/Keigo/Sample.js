import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  PropTypes,
  ScrollView
} from "react-native";
import { RkButton, RkTextInput, RkTheme, RkText } from "react-native-ui-kitten";
import Entypo from "react-native-vector-icons/Entypo";

export default class AccountLoginScreen extends React.Component {
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
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <ScrollView>
          <View style={styles.main}>
            <RkText rkType="text">メールアドレス</RkText>
            <RkTextInput
              returnKeyType="next"
              placeholder="sample@gmail.com"
              textContentType="emailAddress"
              autoFocus={true}
              rkType="textInput"
              keyboardType="email-address"
            />

            <RkText rkType="text">パスワード</RkText>
            <RkTextInput
              placeholder="password"
              rkType="textInput"
              textContentType="password"
              keyboardType="email-address"
            />
            <RkButton rkType="btn">ログイン</RkButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  },
  main: {
    marginTop: 500,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    paddingTop: Platform.OS === "ios" ? 10 : 30,
    paddingLeft: 25,
    paddingRight: 25
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
  width: "100%",
  fontSize: 25,
  height: 60,
  color: "#fff",
  marginBottom: 10
});

RkTheme.setType("RkText", "text", {
  fontSize: 25
});
