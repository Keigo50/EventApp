import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
  CameraRoll
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import ActionSheet from "react-native-zhb-actionsheet";

export default class ProfileHomeScreen extends React.Component {
  state = {
    hasCameraRollPermission: null,
    hasCameraPermission: null,
    defaultImg: [require("../../assets/images/profile.jpg")],
    image: null
  };


import { changeEmail, changePassword, submitLogin } from "../../app/actions";

import { FlatList } from "react-native-gesture-handler";

class ProfileHomeScreen extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // サインインしていない状態
        console.log("サインインしてません");
        this.props.navigation.setParams({ before: "Profile" });
        return this.props.navigation.navigate("App");
      } else {
        // サインイン済
        console.log("サインインしてます");
      }
    });

    this.state = {
      image: null,
      hasCameraRollPermission: null
    };
    this.onPressOk = this.onPressOk.bind(this);
    this._onPressLogoutAlert = this._onPressLogoutAlert.bind(this);
  }


  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
    this.setState({ hasCameraRollPermission: status2 === "granted" });
  }
  // カメラを起動
  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    CameraRoll.saveToCameraRoll(result.uri);
  };

  // カメラロールから選択
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  constructor(props) {
    super(props);

    this.defaultTitles = [
      {
        title: "カメラ",
        action: this._takePhoto
      },
      {
        title: "ライブラリー",
        action: this._pickImage
      },

      {
        title: "キャンセル",
        actionStyle: "cancel",
        action: () => {
          console.log("click Cancel");
        }
      }
    ];

    this.state = {
      titles: this.defaultTitles
    };
    this._takePhoto = this._takePhoto.bind(this);
    this.onPressOk = this.onPressOk.bind(this);
    this._onPressLogoutAlert = this._onPressLogoutAlert.bind(this);
  }

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
    // console.log("発動しました！");
    // firebase.auth().onAuthStateChanged(user => {
    //   if (!user) {
    //     // サインインしていない状態
    //     console.log("サインインしてません");
    //   } else {
    //     // サインイン済み
    //     console.log("サインインしてます");
    //     firebase.auth().signOut();
    //     return this.props.navigation.navigate("App");
    //   }
    // });
    this.props.navigation.navigate(App);
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
    console.log(this.props);
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <ActionSheet
            ref="picker"
            titles={this.state.titles}
            separateHeight={3}
            separateColor="#dddddd"
            backgroundColor="rgba(0, 0, 0, 0.3)"
            containerStyle={{ margin: 10, borderRadius: 5 }}
            onClose={obj => {
              console.log(
                "action sheet closed! clicked:" + JSON.stringify(obj)
              );
            }}
          />

          {image ? (
            <Avatar
              xlarge
              rounded
              source={{ uri: image }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          ) : (
            <Avatar
              xlarge
              rounded
              source={require("../../assets/images/profile.jpg")}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          )}
          <View style={styles.button}>
            <Button
              title="プロフィール画像の編集"
              onPress={() => {
                this.setState({ titles: this.defaultTitles }, () => {
                  this.refs.picker.show();
                });
              }}
            />
          </View>
        </View>

        <View
          style={{
            paddingVertical: 5,
            width: "100%",
            height: 55,
            justifyContent: "center"
          }}
        >
          <Button title="ログアウト" onPress={this._onPressLogoutAlert} />
        </View>
        <View style={{ borderTopWidth: 1 }} />
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
    height: 280,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: "center"
  },
  main: {
    width: "100%",
    height: 350
  }
});
