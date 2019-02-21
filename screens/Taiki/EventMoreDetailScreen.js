import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
  Button
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

    let initArray2 = [];
    for (let i = 0; i < 5; i++) {
      initArray2[i] = "";
    }
    this.state = {
      changeButton: false,
      focused: false,
      userPhoto: "",
      eventIdArray: initArray,
      eventIdArray2: initArray,
      madeEventIdArray: initArray2,
      name: "",
      madeCheck: false,
      photo: "",
      mix: ""
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
        const providerUser = firebase.auth().currentUser;

        let userName = providerUser.displayName;
        this.setState({ name: userName });
        let userP = providerUser.photoURL;
        this.setState({ photo: userP });
        console.log(userName);

        let mixArray = [];
        mixArray.push(userName);

        this.setState({ mix: mixArray });
        console.log("mix" + this.state.mix);

        const userUid = firebase.auth().currentUser.uid;
        const eventID = this.props.navigation.state.params.eventId;
        console.log(eventID);

        const docRef = firestore.collection("students").doc(userUid);

        docRef.get().then(doc => {
          if (-1 != doc.data().madeevents.indexOf(eventID)) {
            this.setState({ madeCheck: true });
          }
        });

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

    let funcT = this.props.navigation.state.params.func;
    console.log(funcT);
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
          // const photoURL = firebase.auth().currentUser.photoURL;
          // const myName = firebase.auth().currentUser.displayName;
          const eventID = this.props.navigation.state.params.eventId;
          console.log(eventID);

          // firestore
          //   .collection("events")
          //   .doc(eventID)
          //   .update({
          //     paevents: {
          //       participant: myName,
          //       photoURL
          //     }
          //   });

          console.log("サインインしてます");
          const userUid = await firebase.auth().currentUser.uid;

          const docR = firestore.collection("students").doc(userUid);
          await docR.get().then(doc => {
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
          return docR
            .update({
              paevents: this.state.eventIdArray
            })
            .then(() => {
              console.log("firebaseにデータ到着！");
              console.log(this.props.pmethod);
            })
            .catch(error => {
              console.error("firebaseにデータ来てないぞ！！ ", error);
            });
        } else {
          const eventID = this.props.navigation.state.params.eventId;
          console.log("e" + eventID);
          // const refC = firestore.collection("events").doc(eventID);
          // await refC.update({
          //   paevents: firebase.firestore.paevents.delete()
          // });

          const userUid = firebase.auth().currentUser.uid;

          const docB = firestore.collection("students").doc(userUid);

          await docB.get().then(doc => {
            this.setState({ eventIdArray: doc.data().paevents });
            console.log("get" + this.state.eventIdArray);
          });

          const eventIdArray_copy = this.state.eventIdArray.slice();
          let index = eventIdArray_copy.indexOf(eventID);
          eventIdArray_copy[index] = "";

          this.setState({ eventIdArray: eventIdArray_copy });
          return docB
            .update({
              paevents: this.state.eventIdArray
            })
            .then(() => {
              console.log("firebaseにデータ到着！");
              console.log(this.props);
            })
            .catch(error => {
              console.error("firebaseにデータ来てないぞ！！ ", error);
            });
        }
      }
    });
  };

  _onPressOk = async () => {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    let madeEventID = this.props.navigation.state.params.eventId;

    await firestore
      .collection("events")
      .doc(madeEventID)
      .delete();

    let uid = firebase.auth().currentUser.uid;

    const docRef2 = firestore.collection("students").doc(uid);

    await docRef2.get().then(doc => {
      this.setState({ madeEventIdArray: doc.data().madeevents });
      console.log("get" + this.state.madeEventIdArray);
    });
    const eventIdArray_copy2 = this.state.madeEventIdArray.slice();
    if (eventIdArray_copy2.indexOf(madeEventID) !== -1) {
      console.log("ここです！" + eventIdArray_copy2.indexOf(madeEventID));
      console.log("イベントID" + madeEventID);
      let index = eventIdArray_copy2.indexOf(madeEventID);
      eventIdArray_copy2[index] = "";
    }
    if (eventIdArray_copy2.length < 5) {
      for (let i = 0; i < 5 - eventIdArray_copy2.length; i++) {
        eventIdArray_copy2.push("");
      }
    }

    await this.setState({ madeEventIdArray: eventIdArray_copy2 });
    return docRef2
      .update({
        madeevents: this.state.madeEventIdArray
      })
      .then(() => {
        console.log("firebaseにデータ到着！");
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        console.error("firebaseにデータ来てないぞ！！ ", error);
      });
  };

  deleteButton = () => {
    return Alert.alert("本当に削除しますがよろしいですか？", "", [
      {
        text: "はい",
        onPress: () => this._onPressOk()
      },
      {
        text: "いいえ",
        style: "cancel"
      }
    ]);
  };

  render() {
    console.log("最強");
    console.log(this.props);
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

    // for (var i = this.state.name.length - 1; i > 0; i--) {
    //   var r = Math.floor(Math.random() * (i + 1));
    //   var tmp = this.state.name[i];
    //   this.state.name[i] = this.state.name[r];
    //   this.state.name[r] = tmp;
    // }
    // let val = Math.round(Math.random() * (5 - 1) + 1);
    // console.log(val);
    // for (let i = 1; i < val; i++) {
    //   data.push(this.state.name[i - 1]);
    // }

    const nav = this.props.navigation.state.params.event;
    const preview = {
      uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    };
    const uri = nav.eimage;
    let check = this.state.madeCheck;

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
              {check && (
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}
                >
                  <Button
                    title="削除"
                    color="red"
                    onPress={this.deleteButton}
                  />
                </View>
              )}
              {/* <TouchableOpacity onPress={this.onPressIcon}>
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
              </TouchableOpacity> */}
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
            {changeDecision && (
              <FlatList
                style={{
                  width: "100%"
                }}
                data={this.state.mix}
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
                      // title={item.slice().substr(0, 2)}

                      source={{
                        // uri: providerUser.photoURL
                        //TODO:firebaseとの接続
                        uri: this.state.photo
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
                        {item}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => `list-${index}`}
              />
            )}
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
    height: "100%"
  },
  sub2: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  sub4: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 5
  },
  sub3: {
    flex: 1,
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
    height: "auto"
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
