import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { RkButton, RkTheme } from "react-native-ui-kitten";
import { Constants } from "expo";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome";

export default class MyEvents extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Myイベント",
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
    for (let i = 1; i < 50; i++) {
      data.push(`No.${i}`);
    }

    return (
      <View style={styles.container}>
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
              <View
                style={{
                  flex: 7
                }}
              >
                {/* イベントタイトルと開催日時を以下に記載*/}
                <Text style={styles.text1}> {item} </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  padding: 3,
                  alignItems: "center"
                }}
              >
                {/* 編集・削除ボタンを以下に配置*/}
                <RkButton
                  rkType="editing"
                  onPress={() => {
                    this.props.navigation.navigate("Editing");
                  }}
                >
                  編集
                </RkButton>
                <RkButton rkType="delete"> 削除 </RkButton>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center"
                }}
              >
                {/*遷移マークを以下に配置*/}
                <TouchableOpacity>
                  <Entypo name="chevron-right" size={40} color="black" />
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
  width: "100%",
  height: 38,
  color: "#fff",
  fontSize: 20,
  marginBottom: 2,
  marginTop: 2,
  backgroundColor: "green"
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    paddingTop: Constants.statusBarHeight
  },
  text1: {
    fontSize: 20
  }
});
