import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import { Constants } from "expo";
import Icon from "react-native-vector-icons/FontAwesome";

export default class SearchHomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "検索",
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

  constructor(props) {
    super(props);

    this.state = {
      showHistory: true
    };
  }

  render() {
    const showHistory = this.state.showHistory;
    let a;

    if (!showHistory) {
      a = (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text
            style={{
              fontSize: 25
            }}
          >
            該当なし
          </Text>
        </View>
      );
    } else {
      a = (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text
            style={{
              fontSize: 25
            }}
          >
            該当するぞ！！！
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <SearchBar
            inputStyle={{ color: "black" }}
            clearIcon
            placeholder="検索"
            lightTheme
            cancelIcon={{ type: "font-awesome", name: "chevron-left" }}
          />
        </View>
        {a}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start"
  }
});
