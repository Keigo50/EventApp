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
  Platform,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Expo from "expo";
import { Icon } from "expo";
import * as Actions from "../../app/actions";
import { SocialIcon } from "react-native-elements";
import "firebase/storage";
import Dialog from "react-native-dialog";

class GoogleLoginScreen extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().signOut();
    this.state = {
      email: "",
      password: "",
      loggedIn: null,
      text: "",
      result: null,
      box: [],
      promptValue: "",
      visiblePrompt: false,
      promptUser: "",
      pushCheck: false
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

        await this.setState({ result: result });
        console.log(result.user.email);
        this.props.navigation.navigate("Main");
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

    var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function(profile) {
        this.props.change_Email(profile.email);
        this.props.change_Name(profile.displayName);
        this.props.change_Snumber(this.state.snumber);
      });
    }
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

    await this.props.navigation.navigate("Main");
  };

  _onPressAlertAll() {
    console.log("Android");
    if (Platform.OS === "ios") {
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
    } else {
      this.setState({
        pushCheck: true
      });
    }
  }
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
        {this.state.pushCheck && (
          <Dialog.Container visible={true}>
            <Dialog.Title>学籍番号</Dialog.Title>
            <Dialog.Description>学籍番号を入力してください</Dialog.Description>
            <Dialog.Input
              label="例）4174201"
              onChangeText={text => this.setState({ text })}
            />
            <Dialog.Button
              label="確定"
              onPress={() => {
                console.log(this.state.username);
                this.setState({ promptUser: false });
                this.setState({ pushCheck: false });
                this._Decide(this.state.text);
              }}
            />
          </Dialog.Container>
        )}
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
          onPress={() => this._onPressAlertAll()}
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
