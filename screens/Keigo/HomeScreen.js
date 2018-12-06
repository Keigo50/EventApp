import React from "react";
import {
  Image,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { RkCard, RkTheme, RkButton } from "react-native-ui-kitten";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Constants } from "expo";
import firebase from "firebase";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ["ジョビフェス", "いしがきMS", "よさこいさんさ", "街中ハロウィン"],
      date: ["2018/7/30", "2018/6/20", "2018/5/21", "2018/10/31"]
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headernull: (
      <Icon
        name="bell"
        size={24}
        onPress={() => {
          navigation.navigate("App");
        }}
        style={{ paddingLeft: 20 }}
      />
    ),
    headernull: (
      <SearchBar
        round
        onChangeText={someMethod => this.setState({ todoText: someMethod })}
        onClearText={someMethod => this.setState({ todoText: someMethod })}
        placeholder='Type Here...' />
    ),
    headernull: (
      <Icon
        name="star"
        size={24}
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{ paddingRight: 20 }}
      />
    ),
    header: null
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sub3}>
          <View style={styles.sub}>
            <Icon
              name="plus-circle"
              size={30}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          </View>
          <View style={styles.sub4}>
            <SearchBar
              containerStyle={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
                borderTopColor: "#fff",
                backgroundColor: "#fff",
              }}
              round
              lightTheme
              showLoading
              platform="ios"
              cancelButtonTitle="Cancel"
              onChangeText={someMethod => this.setState({ todoText: someMethod })}
              onClearText={someMethod => this.setState({ todoText: someMethod })}
              placeholder='Search' />
          </View>
          <View style={styles.sub2}>
            <Button
              onPress={() => {
                navigation.navigate('App');
              }}
              title="ログイン" />
          </View>
        </View>
        <ScrollableTabView style={styles.main}>
          <Tab1 tabLabel="すべて" />
          <Tab2 tabLabel="参加中" />
          <Tab3 tabLabel="Myイベント" />
          <Tab4 tabLabel="お気に入り" />
        </ScrollableTabView>
      </View >
    );
  }
}

export class Tab1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ["ジョビフェス", "いしがきMS", "よさこいさんさ", "町中ハロウィン"],
      date: ["2018/7/30", "2018/6/20", "2018/5/21", "2018/10/31"],
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
      ]
    };
  }

  render() {
    console.log(this.props);
    let data = [];
    for (let i = 0; i < 4; i++) {
      let events;
      events = (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
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
              <Image rkCardImg source={this.state.img[i]} />
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
