import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from "react-native";
import { RkButton, RkTextInput, RkTheme, RkText } from "react-native-ui-kitten";
import {
  changeEmail,
  changePassword,
  submitLogin,
  loginCheck
} from "../../app/actions";
import Entypo from "react-native-vector-icons/Entypo";
import firebase from "firebase";
class AccountLoginScreen extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().signOut();
    this._onButtonPress = this._onButtonPress.bind(this);
    // this.loadSpinner = this.loadSpinner.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    title: "ログイン画面",
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={{ paddingLeft: 20 }}
      >
        <Entypo name="chevron-left" size={40} color="black" />
      </TouchableOpacity>
    )
  });

  _onButtonPress = async () => {
    // console.log(this.props);

    const { email, password } = this.props;
    await this.props.submitLogin({ email, password });

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // サインインしていない状態
        console.log("サインインしてません");
        let beforeRoot = this.props.navigation.getParam("before", "");

        if (String(beforeRoot) === "Profile") {
          return this.props.navigation.navigate("Main");
        }
      } else {
        // サインイン済み
        console.log("サインインしてます");
      }
    });
  };

  loadSpinner = () => {
    if (this.props.loading) {
      return <ActivityIndicator size="small" />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <RkText rkType="text">メールアドレス</RkText>
          <RkTextInput
            returnKeyType="next"
            placeholder="sample@gmail.com"
            textContentType="emailAddress"
            autoFocus={true}
            rkType="textInput"
            keyboardType="email-address"
            onChangeText={email => this.props.changeEmail(email)}
          />

          <RkText rkType="text">パスワード</RkText>
          <RkTextInput
            secureTextEntry
            placeholder="password"
            rkType="textInput"
            textContentType="password"
            keyboardType="email-address"
            onChangeText={password => this.props.changePassword(password)}
          />
          <RkButton rkType="btn" onPress={this._onButtonPress}>
            ログイン
          </RkButton>
        </View>
      </View>
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

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  };
};

export default connect(
  mapStateToProps,
  { changeEmail, changePassword, submitLogin }
)(AccountLoginScreen);
