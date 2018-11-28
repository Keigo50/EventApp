import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { RkButton, RkTheme } from "react-native-ui-kitten";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome";

export default class FavoriteHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ["ジョビフェス", "いしがきMS"],
      date: ["2018/7/30", "2018/6/20"]
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "お気に入り一覧",
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
    let data = [];
    for (let i = 0; i < 2; i++) {
      let contents;
      contents = (
        <View
          style={{
            paddingLeft: 5,
            justifyContent: "flex-start"
          }}
        >
          <Text style={{ fontSize: 25, paddingBottom: 5 }}>
            {this.state.title[i]}
          </Text>
          <Text style={{ alignSelf: "flex-end", fontSize: 20 }}>
            {this.state.date[i]}
          </Text>
        </View>
      );
      data.push(contents);
    }
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: "100%" }}
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
              <View style={{ flex: 9 }}>
                {/*イベントタイトルと開催日時を以下に記載*/}
                <Text style={styles.text1}>{item}</Text>
              </View>
              <Text />
              <View style={{ flex: 1, justifyContent: "center" }}>
                {/*遷移マークを以下に配置*/}
                <TouchableOpacity>
                  <Entypo name="chevron-right" size={40} color="black"
                    onPress={() => {
                      this.props.navigation.navigate("Details");
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => `list-${index}`}
        />
      </View>
    );
  }
}

RkTheme.setType("RkButton", "delete", {
  width: 67,
  height: 38,
  color: "#fff",
  fontSize: 20,
  marginBottom: 2,
  marginTop: 2,
  backgroundColor: "red"
});

RkTheme.setType("RkButton", "editing", {
  width: 67,
  height: 38,
  color: "#fff",
  fontSize: 20,
  marginBottom: 2,
  marginTop: 2,
  backgroundColor: "green"
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start"
  },
  main: {
    marginBottom: 5,
    borderWidth: 1,
    height: 90,
    borderColor: "gray"
  },
  text1: {
    fontSize: 20
  }
});
