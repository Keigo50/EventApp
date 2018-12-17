import React from "react";
import firebase from "firebase";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Expo from "expo";
import { Icon } from "expo";
import * as Actions from "../../app/actions";
import { SocialIcon } from "react-native-elements";
class GoogleLoginScreen extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().signOut();
    this.state = {
      email: "",
      password: "",
      loggedIn: null
    };
    this._onPressLogInAlert = this._onPressLogInAlert.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  async onLoginButtonPress() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "1067680483596-j9kggqg2v80sbugda4luc3437t5qvquo.apps.googleusercontent.com",
        iosClientId:
          "1067680483596-cir3ak0j5cfr5fk79cpma2m86b8fs8ni.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        );
        const response = firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential);
        // ログイン後の処理
        this.props.checkLogin();
        console.log(result.user.email);
      }
    } catch (err) {
      console.log("Googleトークン取得エラー");
      return;
    }
  }

  _onPressOk = () => {
    this.props.navigation.navigate("Main");
  };

  _onPressLogInAlert = () => {
    return Alert.alert(
      "ログインしました",
      "",
      [
        {
          text: "はい",
          onPress: () => this._onPressOk()
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    if (this.props.loggedIn) {
      console.log(this.props.loggedIn);
      this._onPressLogInAlert();
    }
    console.log(`loading${this.props.loading}`);
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
        <SocialIcon
          type="google-plus-official"
          title="Googleでログイン"
          button
          onPress={this.onLoginButtonPress.bind(this)}
          loading={this.props.loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 25
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(Actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleLoginScreen);
