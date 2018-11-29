import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
  Alert
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RkText } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";

export default class ProfileHomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mailAddress: "sample@gmail.com",
      image: null,
      hasCameraRollPermission: null
    };
    this.onPressOk = this.onPressOk.bind(this);
    this._onPressLogoutAlert = this._onPressLogoutAlert.bind(this);
  }

  async componentWillMount() {
    // カメラロールに対するPermissionを許可
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: status === "granted" });
  }

  _camera = async () => {
    let result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,

      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "プロフィール",
    headerLeft: (
      <Icon
        name="bars"
        size={24}
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{ paddingLeft: 20 }}
      />
    )
  });

  onPressOk = () => {
    console.log("発動しました！");
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // サインインしていない状態
        console.log("サインインしてません");
      } else {
        // サインイン済み
        console.log("サインインしてます");
        firebase.auth().signOut();
        return this.props.navigation.navigate("App");
      }
    });
  };

  _onPressLogoutAlert = () => {
    return Alert.alert(
      "ログアウトしますか？",
      "",
      [
        {
          text: "はい",
          onPress: () => this.onPressOk()
        },
        {
          text: "いいえ",
          style: "cancel",
          onPress: () => console.log("キャンセル")
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <View style={styles.thumbnail}>
            {image && (
              <Avatar
                xlarge
                rounded
                source={{
                  uri: image
                }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
            )}
          </View>

          <View style={styles.button}>
            <Button title="プロフィール画像の編集" onPress={this._pickImage} />
          </View>
        </View>
        <View>
          <RkText style={styles.mailAddress}>メールアドレス</RkText>
          <RkText style={styles.mailAddress}>{this.state.mailAddress}</RkText>
        </View>
        <View
          style={{
            width: "100%",
            height: 40,
            borderColor: "red",
            borderWidth: 1,
            justifyContent: "center"
          }}
        >
          <Button
            title="参加イベントの確認"
            onPress={() => {
              this.props.navigation.navigate("Details");
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            height: 40,
            borderColor: "red",
            borderWidth: 1,
            justifyContent: "center"
          }}
        >
          <Button title="ログアウト" onPress={this._onPressLogoutAlert} />
        </View>
        <View style={{ borderTopWidth: 1, borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 25, paddingLeft: 25 }}>通知</Text>
        </View>
        <ScrollView style={{ paddingLeft: 25 }}>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
          <Text>aaaaaa</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#fff"
  },
  imgContainer: {
    width: "100%",
    height: 200,
    borderColor: "red",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  thumbnail: {
    position: "absolute",
    zIndex: 9999,
    top: 7
  },
  button: {
    position: "absolute",
    zIndex: 9999,
    top: 158,
    justifyContent: "flex-end"
  },
  mailAddress: {
    alignItems: "flex-start",
    fontSize: 25,
    paddingLeft: 25
  }
});
