import React from "react";
import firebase from "firebase";
import { View, StyleSheet, Button } from "react-native";
import * as Expo from "expo";
export default class GoogleLoginScreen extends React.Component {
  state = { email: "", password: "", loggedIn: null };

  static navigationOptions = {
    header: null
  };

  async onLoginButtonPress() {
    // ①Expoの機能でGoogleにログインする（トークン取得のため）
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "1067680483596-j9kggqg2v80sbugda4luc3437t5qvquo.apps.googleusercontent.com",
        iosClientId:
          "1067680483596-cir3ak0j5cfr5fk79cpma2m86b8fs8ni.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
    } catch (err) {
      console.log("Googleトークン取得エラー");
      return;
    }

    // ②トークン取得できたら、firebaseでGoogle認証する
    try {
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
      }
    } catch (err) {
      console.log("firebase Google認証エラー");
    }
  }

  // ③アプリが起動したらfirebaseに接続するように
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* ④Google認証するボタンを表示し、作成したGoogle認証処理をonPressに設定する */}
        <Button
          title="Google認証"
          onPress={this.onLoginButtonPress.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});