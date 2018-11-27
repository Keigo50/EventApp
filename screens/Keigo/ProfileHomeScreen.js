import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RkText } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";

export default class ProfileHomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mailAddress: "sample@gmail.com",
      img: null
    };
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={require("../../assets/images/icon.png")} />
          <View style={styles.thumbnail}>
            <Avatar
              xlarge
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
              }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>

          <View style={styles.button}>
            <Button title="プロフィール画像の編集" />
          </View>
        </View>
        <View>
          <RkText style={styles.mailAddress}>メールアドレス</RkText>
          <RkText style={styles.mailAddress}>{this.state.mailAddress}</RkText>
        </View>
        <View
          style={{
            width: "100%",
            height: 60,
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
    zIndex: 9999
  },
  button: {
    position: "absolute",
    zIndex: 9999,
    top: 140,
    justifyContent: "flex-end"
  },
  mailAddress: {
    alignItems: "flex-start",
    fontSize: 25,
    paddingLeft: 25
  }
});
