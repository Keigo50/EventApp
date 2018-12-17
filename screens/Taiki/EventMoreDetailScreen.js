import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  RkButton,
  RkGalleryImage,
  RkText,
  RkTheme
} from "react-native-ui-kitten";
import { ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import Entypo from "react-native-vector-icons/Entypo";
import TabBarIcon from "../../components/TabBarIcon";
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";

export default class EventMoreDetailScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      changeButton: false,
      focused: false
    };
    this._changeButton = this._changeButton.bind(this);
    this._changeBtn = this._changeBtn.bind(this);
    this.onPressIcon = this.onPressIcon.bind(this);
  }

  onPressIcon = () => {
    if (!this.state.focused) {
      this.setState({
        focused: true
      });
    } else {
      this.setState({
        focused: false
      });
    }
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // サインインしていない状態
        console.log("サインインしてません");
        this.props.navigation.navigate("App");
      } else {
        // サインイン済
        console.log("サインインしてます");
      }
    });
    console.log(this.state.focused);
  };

  _changeButton = async () => {
    console.log(`参加するを押したとき${this.state.changeButton}`);

    this.state.changeButton
      ? this.setState({
          changeButton: false
        })
      : this.setState({
          changeButton: true
        });

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // サインインしていない状態
        console.log("サインインしてません");
        this.props.navigation.navigate("App");
      } else {
        // サインイン済
        console.log("サインインしてます");
      }
    });
  };
  _changeBtn = () => {
    console.log(`取り消すを押したとき${this.state.changeButton}`);
    this.setState({
      changeButton: false
    });
  };

  render() {
    console.log("最強");
    const changeDecision = this.state.changeButton;
    let changeBtn;

    if (changeDecision) {
      changeBtn = (
        <RkButton onPress={this._changeButton} rkType="rounded">
          取り消す
        </RkButton>
      );
    } else {
      changeBtn = (
        <RkButton
          onPress={this._changeButton}
          rkType="rounded"
          style={{ backgroundColor: "red" }}
        >
          参加する
        </RkButton>
      );
    }
    let data = [];
    for (let i = 1; i < 50; i++) {
      data.push(`No.${i}`);
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.sub5}>
            <View style={styles.back}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon name="angle-left" size={40} />
              </TouchableOpacity>
            </View>
            <Image
              style={{
                width: "100%",
                height: 180
              }}
              source={require("../../assets/images/MSfes.png")}
            />
          </View>
          <View style={styles.sub3}>
            <View style={styles.sub}>
              <Text style={{ fontSize: 25 }}>いしがきMS </Text>
              <Text style={{ fontSize: 25 }}>日時： 9 / 24(月) 9: 00 </Text>
              <Text style={{ fontSize: 25 }}>場所： 盛岡城跡公園 </Text>
            </View>
            <View style={styles.sub4}>
              <TouchableOpacity onPress={this.onPressIcon}>
                <TabBarIcon
                  size={35}
                  name={
                    Platform.OS === "ios"
                      ? `ios-star${this.state.focused ? "" : "-outline"}`
                      : "ios-star"
                  }
                  color={
                    this.state.focused
                      ? Colors.tabIconSelected2
                      : Colors.tabIconDefault
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detail}>
            <RkText rkType="common">詳細</RkText>
          </View>
          <Text style={{ fontSize: 25 }}>
            いしがきミュージックフェスティバルの設営・ 撤去
          </Text>
          <View style={styles.space} />
          <View style={styles.test}>
            <RkText rkType="common">参加者</RkText>
          </View>
          <View style={styles.main}>
            <FlatList
              style={{
                width: "100%"
              }}
              data={data}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 5,
                    flex: 2,
                    flexDirection: "row",
                    borderWidth: 1,
                    height: 90,
                    borderColor: "gray"
                  }}
                >
                  {/* アイコンを以下に配置*/}
                  <Avatar
                    large
                    rounded
                    source={{
                      uri:
                        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                    }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                  <View
                    style={{
                      flex: 2,
                      padding: 3,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30
                      }}
                    >
                      佐藤慶吾
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => `list-${index}`}
            />
            {changeBtn}
          </View>
        </View>
      </ScrollView>
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
  sub5: {
    position: "relative",
    width: "100%",
    height: 200,
    borderWidth: 1
  },
  sub: {
    flex: 7,
    width: "100%",
    height: 100
  },
  sub2: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  sub4: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  sub3: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "stretch"
  },
  detail: {
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderWidth: 1
  },
  space: {
    width: "100%",
    height: 250
  },
  test: {
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderWidth: 1
  },
  main: {
    width: "100%",
    height: 350
  },
  back: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 9999
  }
});

RkTheme.setType("RkText", "common", {
  alignItems: "center",
  justifyContent: "flex-start",
  fontSize: 25
});

RkTheme.setType("RkButton", "rounded", {
  width: "100%",
  marginTop: 10,
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20
});
