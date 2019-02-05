import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../app/actions";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList
} from "react-native";
import { SearchBar, Avatar, List, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Constants } from "expo";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";

class NotificationHomeScreen extends React.Component {
  //正式版ではAppをNotificationHomeScreenに
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ["KS", "JH", "SH", "TN"],
      isNow: moment().format("YYYY/MM/DD"),
      isPast: "2018-12-10",
      allData: new Array("foo", "bar", "piyo"),
      nowData: true,
      pastData: true,
      nameData: [], //名前入ってるデータ
      sendNowData: [
        "佐藤 慶吾さんがハロウィンのイベントを作成しました！",
        "平澤 惇哉さんがハロウィンのイベントに参加しました！",
        "畑江 生也さんがハロウィンのイベントに参加しました！",
        "沼田 大樹さんがハロウィンのイベントに参加しました！"
      ], //今日送られてきたテキスト
      sendPastData: [
        "佐藤 慶吾さんがジョビフェスのイベントを編集しました。",
        "平澤 惇哉さんがジョビフェスのイベントを辞退しました。",
        "畑江 生也さんがジョビフェスのイベントに参加しました！",
        "沼田 大樹さんがジョビフェスのイベントに参加しました！",
        "平澤 惇哉さんがジョビフェスのイベントに参加しました！",
        "佐藤 慶吾さんがジョビフェスのイベントを作成しました！"
      ], //過去送られたテキスト
      sendNow: "",

      todoText: "",
      submitText: "",
      keyCheck: false,
      listBox: [
        {
          keyword: "佐藤"
        },
        {
          keyword: "平澤"
        }
      ]
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // サインインしていない状態
        console.log("サインインしてません");
        this.props.navigation.navigate("App");
      } else {
        // サインイン済
        console.log("サインインしてます");
        this.props.checkLogin();
      }
    });
  }

  displayHistry = () => {
    this.setState({ keyCheck: true });
  };
  initText = someMethod => {
    this.setState({ todoText: someMethod });
    if (someMethod == "") {
      this.setState({ keyCheck: false });
    }
  };
  render() {
    /*
    moment().format("YYYY/MM/DD");
    今日の日付けがとれる
    */

    let authenticity = this.state.keyCheck;
    let createbutton = this.props.loggedIn;

    console.log("keyCheck" + authenticity);
    //両方
    console.log(
      this.state.nowData &
        moment(`${this.state.isNow}`, "YYYY/MM/DD").isBefore(
          `${this.state.isPast}`,
          "YYYY/MM/DD"
        )
    );

    let nowData = [];
    for (let i = 0; i < 4; i++) {
      nowData.push(this.state.sendNowData[i]);
    }

    let pastData = [];
    for (let i = 0; i < 6; i++) {
      pastData.push(this.state.sendPastData[i]);
    }

    let check =
      this.state.nowData &
      !moment(`${this.state.isNow}`, "YYYY/MM/DD").isBefore(
        `${this.state.isPast}`,
        "YYYY/MM/DD"
      ) ? (
        <ScrollView>
          <View
            style={{
              flexDirection: "column",
              paddingVertical: 5,
              width: "100%",
              height: 55,
              justifyContent: "center",
              borderWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0
            }}
          >
            <Text style={styles.now}>今日</Text>
          </View>

          <FlatList
            style={{
              width: "100%",
              paddingTop: 5,
              paddingBottom: 5
            }}
            data={nowData}
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
                  // source={{
                  //   uri:
                  //     "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                  // }}
                  title={item.slice().substr(0, 2)}
                  onPress={() => console.log(item)}
                  activeOpacity={0.7}
                />
                <View
                  style={{
                    flex: 2,
                    padding: 3,
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18
                    }}
                  >
                    {item}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => `list-${index}`}
          />

          <View
            style={{
              paddingVertical: 5,
              width: "100%",
              height: 55,
              flexDirection: "column",
              justifyContent: "center",
              borderWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0
            }}
          >
            <Text style={styles.now}>過去</Text>
          </View>

          <FlatList
            style={{
              width: "100%",
              paddingTop: 5,
              paddingBottom: 5
            }}
            data={pastData}
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
                  // source={{
                  //   uri:
                  //     "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                  // }}
                  title={item.slice().substr(0, 2)}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
                <View
                  style={{
                    flex: 2,
                    padding: 3,
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18
                    }}
                  >
                    {item}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => `list-${index}`}
          />
        </ScrollView>
      ) : //両方

      //過去のみ
      this.state.pastData &
        moment(`${this.state.isNow}`, "YYYY/MM/DD").isBefore(
          `${this.state.isPast}`,
          "YYYY/MM/DD"
        ) ? (
        <ScrollView>
          <View
            style={{
              paddingVertical: 5,
              width: "100%",
              height: 55,
              flexDirection: "column",
              justifyContent: "center",
              borderWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0
            }}
          >
            <Text style={styles.now}>過去</Text>
          </View>

          <FlatList
            style={{
              width: "100%",
              paddingTop: 5,
              paddingBottom: 5
            }}
            data={pastData}
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
        </ScrollView>
      ) : (
        //過去のみ

        //今日のみ
        <ScrollView>
          <View
            style={{
              flexDirection: "column",
              paddingVertical: 5,
              width: "100%",
              height: 55,
              justifyContent: "center",
              borderWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0
            }}
          >
            <Text style={styles.now}>今日</Text>
          </View>

          <FlatList
            style={{
              width: "100%",
              paddingTop: 5,
              paddingBottom: 5
            }}
            data={nowData}
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
                    佐
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => `list-${index}`}
          />
        </ScrollView>
      );
    //今日のみ

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchCreate}>
            {createbutton && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Create");
                }}
              >
                <Icon name="plus-circle" size={30} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.searchBar}>
            <SearchBar
              containerStyle={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
                borderTopColor: "#fff",
                backgroundColor: "#fff"
              }}
              keyboardType="default"
              round
              inputStyle={{ color: "black" }}
              returnKeyType="search"
              lightTheme
              ref={search => (this.search = search)}
              // searchIcon={<CustomComponent />}
              onChangeText={someMethod => this.initText(someMethod)}
              onKeyPress={e => {
                if (e.nativeEvent.key) {
                  this.displayHistry();
                }
              }}
              onSubmitEditing={event => {
                if (event.nativeEvent.key === undefined) {
                  this.state.listBox.push({
                    keyword: this.state.todoText
                  });
                  // console.log("チェンジ" + chenge);
                  // this.setState({ listBox: chenge });
                  console.log(this.state.listBox);
                  this.props.navigation.navigate("SearchNf", {
                    searchText: this.state.todoText,
                    nfData: this.state.nfDataArray,
                    sendNowData: this.state.sendNowData,
                    sendPastData: this.state.sendPastData
                  });
                }
                console.log(event.nativeEvent.key);
              }}
              // onClearText={someMethod =>
              //   this.setState({ todoText: someMethod })
              // }
              placeholder="苗字を入力　例）平澤"
            />
          </View>
          <View style={styles.searchLogin}>
            {!createbutton && (
              <Button
                onPress={() => {
                  this.props.navigation.navigate("App");
                }}
                title="ログイン"
              />
            )}
          </View>
        </View>
        {authenticity && (
          <View style={styles.history2}>
            <List containerStyle={{ marginBottom: 20 }}>
              {this.state.listBox.map(l => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("SearchNf", {
                      searchText: l.keyword,
                      nfData: this.state.nfDataArray,
                      sendNowData: this.state.sendNowData,
                      sendPastData: this.state.sendPastData
                    })
                  }
                >
                  <ListItem
                    leftIcon={<Icon name="search" size={20} />}
                    key={l.keyword}
                    title={l.keyword}
                  />
                </TouchableOpacity>
              ))}
            </List>
          </View>
        )}
        {check}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight
  },
  searchCreate: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10
  },
  searchLogin: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  searchBar: {
    flex: 9,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "stretch",
    position: "relative"
  },

  button: {
    alignItems: "center",
    backgroundColor: "#fff"
  },

  select: {
    flexDirection: "row",
    height: 40
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center"
  },
  now: {
    fontSize: 30,
    textAlign: "left",
    paddingLeft: 30
  },
  past: {
    fontSize: 30,
    textAlign: "left",
    paddingLeft: 30
  },
  history2: {
    position: "absolute",
    top: 68,
    left: 0,
    zIndex: 100000,
    backgroundColor: "#E6E6E6",
    alignItems: "stretch",
    flex: 1,
    width: "100%",
    height: "100%"
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
)(NotificationHomeScreen);
