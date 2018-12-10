import React from "react";
import firebase from "firebase";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import * as Expo from "expo";
import { Icon } from "expo";
import { SocialIcon } from "react-native-elements";
export default class GoogleLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", loggedIn: "ログイン" };
  }
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

        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword;
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

        <Button
          title="Google認証"
          onPress={this.onLoginButtonPress.bind(this)}
        />

        <Text style={{ fontSize: 20 }}>{this.state.loggedIn}</Text>
        {/* <SocialIcon
            type="google-plus-official"
            title="Google+でログイン"
            button
            onPress={this.onLoginButtonPress.bind(this)}
          /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 25
  }
});
