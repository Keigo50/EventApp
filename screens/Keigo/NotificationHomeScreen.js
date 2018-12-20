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
import { SearchBar, Avatar } from "react-native-elements";
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
      isNow: moment().format("YYYY/MM/DD"),
      isPast: "2018/12/10",
      allData: new Array("foo", "bar", "piyo"),
      nowData: true,
      pastData: true
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

  render() {
    /*
    moment().format("YYYY/MM/DD");
    今日の日付けがとれる
    */

    let createbutton = this.props.loggedIn;

    //両方
    console.log(
      this.state.nowData &
        moment(`${this.state.isNow}`, "YYYY/MM/DD").isBefore(
          `${this.state.isPast}`,
          "YYYY/MM/DD"
        )
    );

    let nowData = [];
    for (let i = 0; i < 50; i++) {
      nowData.push(`No.${i}`);
    }

    let pastData = [];
    for (let i = 0; i < 25; i++) {
      pastData.push(`No.${i}`);
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
              paddingBottom: 50
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
              paddingBottom: 50
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
              paddingBottom: 50
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
              paddingBottom: 50
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
                  this.props.navigation.navigate("Details");
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
              round
              lightTheme
              showLoading
              platform="ios"
              cancelButtonTitle="Cancel"
              onChangeText={someMethod =>
                this.setState({ todoText: someMethod })
              }
              onClearText={someMethod =>
                this.setState({ todoText: someMethod })
              }
              placeholder="Search"
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
    alignItems: "stretch"
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
