import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert
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
import { Image as ExpoImage } from "react-native-expo-image-cache";
import { Constants } from "expo";
import "firebase/firestore";

export default class EventMoreDetailScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    let initArray = [];
    for (let i = 0; i < 10; i++) {
      initArray[i] = "";
    }

    this.state = {
      changeButton: false,
      focused: false,
      userPhoto: "",
      eventIdArray: initArray,
      eventIdArray2: initArray
    };
    this._changeButton = this._changeButton.bind(this);
    this.onPressIcon = this.onPressIcon.bind(this);
  }

  componentWillMount() {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // サインインしていない状態
      } else {
        const userUid = firebase.auth().currentUser.uid;
        const eventID = this.props.navigation.state.params.eventId;
        console.log(eventID);

        const docRef = firestore.collection("students").doc(userUid);
        docRef.get().then(doc => {
          if (-1 != doc.data().paevents.indexOf(eventID)) {
            this.setState({ changeButton: true });
          }
        });
      }
    });
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

    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    this.state.changeButton
      ? this.setState({
          changeButton: false
        })
      : this.setState({
          changeButton: true
        });

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        // サインインしていない状態
        console.log("サインインしてません");
        this.props.navigation.navigate("App");
      } else {
        // サインイン済
        if (this.state.changeButton) {
          console.log("サインインしてます");
          const userUid = firebase.auth().currentUser.uid;
          const eventID = this.props.navigation.state.params.eventId;
          console.log(eventID);

          const docRef = firestore.collection("students").doc(userUid);
          await docRef.get().then(doc => {
            this.setState({ eventIdArray: doc.data().paevents });
            console.log("get" + this.state.eventIdArray);
          });
          const eventIdArray_copy = this.state.eventIdArray.slice();
          for (let i = 0; i < 10; i++) {
            if (
              eventIdArray_copy[i] == "" &&
              -1 == eventIdArray_copy.indexOf(eventID)
            ) {
              eventIdArray_copy[i] = eventID;
              break;
            }
            if (eventIdArray_copy.length < 10) {
              for (let i = 0; i < 10 - eventIdArray_copy.length; i++) {
                eventIdArray_copy.push("");
              }
            }
          }

          this.setState({ eventIdArray: eventIdArray_copy });
          return docRef
            .update({
              paevents: this.state.eventIdArray
            })
            .then(() => {
              console.log("firebaseにデータ到着！");
            })
            .catch(error => {
              console.error("firebaseにデータ来てないぞ！！ ", error);
            });
        } else {
          const userUid = firebase.auth().currentUser.uid;
          const eventID = this.props.navigation.state.params.eventId;
          console.log(eventID);

          const docRef = firestore.collection("students").doc(userUid);
          const eventIdArray_copy = this.state.eventIdArray.slice();
          let index = eventIdArray_copy.indexOf(eventID);
          console.log(index);
          eventIdArray_copy[index] = "";

          this.setState({ eventIdArray: eventIdArray_copy });
          return docRef
            .update({
              paevents: this.state.eventIdArray
            })
            .then(() => {
              console.log("firebaseにデータ到着！");
            })
            .catch(error => {
              console.error("firebaseにデータ来てないぞ！！ ", error);
            });
        }
      }
    });
  };

  render() {
    console.log("最強");
    console.log(this.props);
    const changeDecision = this.state.changeButton;
    let changeBtn;

    const providerUser = firebase.auth().currentUser;

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

    const nav = this.props.navigation.state.params.event;
    const preview = {
      uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    };
    const uri = nav.eimage;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.sub5}>
            <View style={styles.back}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon name="angle-left" size={40} color="white" />
              </TouchableOpacity>
            </View>
            <ExpoImage width="100%" height={200} {...{ preview, uri }} />
          </View>
          <View style={styles.sub3}>
            <View style={styles.sub}>
              <Text style={{ fontSize: 25 }}>{nav.ename}</Text>
              <Text style={{ fontSize: 20 }}>
                締切日：{nav.deadlineDate} 9: 00
              </Text>
              <Text style={{ fontSize: 20 }}>開催日時：{nav.date} 9: 00 </Text>
              <Text style={{ fontSize: 20 }}>場所：{nav.place}</Text>
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
          <Text style={{ fontSize: 20 }}>{nav.details}</Text>
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
                      // uri: providerUser.photoURL
                      //TODO:firebaseとの接続
                      uri:
                        "https://firebasestorage.googleapis.com/v0/b/eventapp-888ac.appspot.com/o/images%2Fevent_img1547086874488.jpg?alt=media&token=62bf8ef5-4246-4c38-8083-22a16429fd6f"
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
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
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
