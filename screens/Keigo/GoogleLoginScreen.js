import React from "react";
import firebase from "firebase";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  AlertIOS,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Expo from "expo";
import { Icon } from "expo";
import * as Actions from "../../app/actions";
import { SocialIcon } from "react-native-elements";
import "firebase/storage";

class GoogleLoginScreen extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().signOut();
    this.state = {
      email: "",
      password: "",
      loggedIn: null,
      text: "",
      result: null
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
        await this.props.checkLogin();

        this.setState({ result: result });
        console.log(result.user.email);
      }
    } catch (err) {
      console.log("Googleトークン取得エラー");
      return;
    }
  }

  //確定のボタンをした場合
  _Decide = text => {
    console.log(text);
    this.setState({ text });
    this.onLoginButtonPress();
  };

  _onPressOk = async () => {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    let result = this.state.result;

    let uid = firebase.auth().currentUser.uid;
    //TODO:学籍番号から学科、コースなどを判定する。
    await firestore
      .collection("students")
      .doc(uid)
      .set({
        email: result.user.email,
        snumber: this.state.text,
        course: "システムエンジニアコース",
        department: "情報システム科",
        firstname: result.user.familyName,
        lastname: result.user.givenName,
        name: result.user.name,
        glade: 2,
        fvevents: [],
        madeevents: [],
        paevents: []
      });

    this.props.navigation.navigate("Main");
  };

  _onPressAlertIOS = () => {
    AlertIOS.prompt(
      "学籍番号を入力してください",
      null,
      [
        {
          text: "確定",
          onPress: text => this._Decide(text)
        },
        {
          text: "キャンセル",
          onPress: () => console.log("キャンセルされました"),
          style: "cancel"
        }
      ],
      "plain-text",
      "",
      "numeric"
    );
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
          onPress={this._onPressAlertIOS.bind(this)}
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
