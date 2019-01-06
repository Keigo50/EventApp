import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  CustomComponent
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../app/actions";
import { RkCard, RkTheme, RkButton } from "react-native-ui-kitten";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Constants } from "expo";
import firebase from "firebase";
import { Image as ExpoImage } from "react-native-expo-image-cache";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };
    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
    this.state = {
      title: ["ジョビフェス", "いしがきMS", "よさこいさんさ", "街中ハロウィン"],
      date: ["2018/7/30", "2018/6/20", "2018/5/21", "2018/10/31"],
      user: null
    };
  }
  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentWillMount() {
    this.props.checkLogin();
  }

  render() {
    //TODO ログイン状態を確認し作成ボタンを表示・非表示する処理
    console.log(this.props.loggedIn);
    let createbutton = this.props.loggedIn;
    let tabdisplay = this.props.loggedIn;
    return (
      <View style={styles.container}>
        <View style={styles.sub3}>
          <View style={styles.sub}>
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
          <View style={styles.sub4}>
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
              onChangeText={someMethod =>
                this.setState({ todoText: someMethod })
              }
              onClearText={someMethod =>
                this.setState({ todoText: someMethod })
              }
              placeholder="Search"
            />
          </View>
          <View style={styles.sub2}>
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
        {tabdisplay ? (
          <ScrollableTabView style={styles.main}>
            <Tab1 tabLabel="すべて" {...this.props} />
            <Tab2 tabLabel="参加中" {...this.props} />
            <Tab3 tabLabel="お気に入り" {...this.props} />
            <Tab4 tabLabel="作成済み" {...this.props} />
          </ScrollableTabView>
        ) : (
          <ScrollableTabView style={styles.main}>
            <Tab1 tabLabel="すべて" {...this.props} />
          </ScrollableTabView>
        )}
      </View>
    );
  }
}

class Tab1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ["ジョビフェス", "いしがきMS", "よさこいさんさ", "町中ハロウィン"],
      date: ["2018/7/30", "2018/6/20", "2018/5/21", "2018/10/31"],
      eimage: "",
      img: [
        require("../../assets/images/jyobifes.jpg"),
        require("../../assets/images/MSfes.png"),
        require("../../assets/images/yosakoi.jpg"),
        require("../../assets/images/Halloween.jpg")
      ],
      details: [
        "ジョビフェス開催！是非お越しください！！",
        "いしがきMSに是非お越しください",
        "よさこいで地域を盛り上げましょう！！",
        "ハロウィンのボランティアメンバー募集中！"
      ],
      uri: []
    };
  }

  getFirebaseData = async () => {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    let uriEimage = [];
    await firestore
      .collection("events")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          uriEimage.push(doc.data().eimage);

          // firestore
          //   .collection("events")
          //   .doc(`${doc.id}`)
          //   .update({ grade: 4 });
        });
      });
    this.setState({ uri: uriEimage });

    // console.log(this.state.uri);
  };

  componentWillMount() {
    this.getFirebaseData();
  }

  render() {
    const preview = {
      uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    };

    let data = [];
    for (let i = 0; i < this.state.uri.length; i++) {
      const uri = this.state.uri[i];
      events = (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Details")}
        >
          <RkCard rkType="shadowed  events">
            <View rkCardHeader>
              <Text style={{ fontSize: 20 }}>{this.state.title[i]}</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 180
              }}
            >
              <ExpoImage rkCardImg {...{ preview, uri }} />
            </View>
            <View rkCardContent>
              <Text>{this.state.details[i]}</Text>
            </View>
            <View rkCardFooter>
              <Text>{this.state.date[i]}</Text>
            </View>
          </RkCard>
        </TouchableOpacity>
      );
      data.push(events);
    }
    return (
      <FlatList
        style={{ backgroundColor: "#ccc", paddingTop: 10 }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 1,
              paddingBottom: 10
            }}
          >
            {item}
          </View>
        )}
        keyExtractor={(item, index) => `list-${index}`}
      />
    );
  }
}

class Tab2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ["石垣マラソン"],
      date: ["2018/5/20"],
      img: [require("../../assets/images/isigaki.jpg")]
    };
  }
  render() {
    let data = [];
    for (let i = 0; i < 1; i++) {
      let events;
      events = (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Details")}
        >
          <RkCard rkType="shadowed  events">
            <View rkCardHeader>
              <Text>{this.state.title[i]}</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 180
              }}
            >
              <Image rkCardImg source={this.state.img[i]} />
            </View>
            <View rkCardContent>
              <Text>石垣マラソンのボランティアメンバー募集しています。</Text>
            </View>
            <View rkCardFooter>
              <Text>{this.state.date}</Text>
            </View>
          </RkCard>
        </TouchableOpacity>
      );
      data.push(events);
    }
    return (
      <FlatList
        style={{ backgroundColor: "#ccc", paddingTop: 10 }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 1,
              paddingBottom: 10
            }}
          >
            {item}
          </View>
        )}
        keyExtractor={(item, index) => `list-${index}`}
      />
    );
  }
}

class Tab3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ["ゲームサークル部員募集中"],
      date: ["2019/4/27"],
      img: [require("../../assets/images/game.jpg")]
    };
  }
  render() {
    let data = [];
    for (let i = 0; i < 1; i++) {
      let events;
      events = (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Details")}
        >
          <RkCard rkType="shadowed  events">
            <View rkCardHeader>
              <Text>{this.state.title[i]}</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 180,
                borderColor: "red",
                borderWidth: 1
              }}
            >
              <Image rkCardImg source={this.state.img[i]} />
            </View>
            <View rkCardContent>
              <Text>ゲームサークル部員募集中！！</Text>
            </View>
            <View rkCardFooter>
              <Text>{this.state.date}</Text>
            </View>
          </RkCard>
        </TouchableOpacity>
      );
      data.push(events);
    }
    return (
      <FlatList
        style={{ backgroundColor: "#ccc", paddingTop: 10 }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 1,
              paddingBottom: 10
            }}
          >
            {item}
          </View>
        )}
        keyExtractor={(item, index) => `list-${index}`}
      />
    );
  }
}

class Tab4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ["ジョビフェス", "いしがきMS", "よさこいさんさ", "街中ハロウィン"],
      date: ["2018/7/30", "2018/6/20", "2018/5/21", "2018/10/31"]
    };
  }
  render() {
    let data = [];
    for (let i = 0; i < 3; i++) {
      let events;
      events = (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Details")}
        >
          <RkCard rkType="shadowed  events">
            <View rkCardHeader>
              <Text>{this.state.title[i]}</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 180,
                borderColor: "red",
                borderWidth: 1
              }}
            />
            <View rkCardContent>
              <Text> quick brown fox jumps over the lazy dog</Text>
            </View>
            <View rkCardFooter>
              <Text>Footer</Text>
            </View>
          </RkCard>
        </TouchableOpacity>
      );
      data.push(events);
    }

    return (
      <FlatList
        style={{ backgroundColor: "#ccc", paddingTop: 10 }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 1,
              paddingBottom: 10
            }}
          >
            {item}
          </View>
        )}
        keyExtractor={(item, index) => `list-${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight
  },

  main: {
    backgroundColor: "#fff"
  },
  sub: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10
  },
  sub2: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  sub4: {
    flex: 9,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  sub3: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "stretch"
  }
});

RkTheme.setType("RkCard", "events", {
  img: {
    height: "100%"
  },
  header: {
    alignSelf: "flex-start"
  },
  content: {
    alignSelf: "flex-start"
  },
  marginVertical: 5
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
)(HomeScreen);
