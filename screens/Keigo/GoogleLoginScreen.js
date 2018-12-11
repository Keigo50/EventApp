import React from "react";
import firebase from "firebase";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import * as Expo from "expo";
import { Icon } from "expo";
import { SocialIcon } from "react-native-elements";
export default class GoogleLoginScreen extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().signOut();
    this.state = { email: "", password: "", loggedIn: null };
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
        console.log(result.user.email);
      }
    } catch (err) {
      console.log("Googleトークン取得エラー");
      return;
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        const a = firebase.auth().currentUser;
        console.log(a);
        this.setState({ loggedIn: true });
        console.log(this.state.loggedIn);
        this.props.navigation.navigate("Main");
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
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
          title="Google+でログイン"
          button
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
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 25
  }
});
