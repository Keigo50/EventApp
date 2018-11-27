import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { RkText, RkTheme } from "react-native-ui-kitten";
import { SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/EvilIcons";

export default class SearchHomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "イベント検索",
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
    let data = [];
    for (let i = 1; i < 50; i++) {
      data.push(`No.${i}`);
    }
    const list = [
      {
        title: "Appointments",
        icon: "av-timer"
      }
    ];

    const showHistory = this.state.showHistory;
    let decision;

    if (!showHistory) {
      decision = (
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
      decision = (
        <View
          style={{
            alignItems: "stretch",
            justifyContent: "flex-start",
            flex: 1
          }}
        >
          <View style={styles.container}>
            <View style={styles.detail}>
              <RkText
                rkType="common"
                style={{
                  fontSize: 25
                }}
              >
                検索履歴
              </RkText>
            </View>
            <View style={styles.space}>
              {list.map((item, i) => (
                <ListItem
                  rightIcon={
                    <TouchableOpacity>
                      <Icons name="close" size={28} />
                    </TouchableOpacity>
                  }
                  key={i}
                  title={item.title}
                  leftIcon={{ name: item.icon }}
                />
              ))}
            </View>
            <View style={styles.test}>
              <RkText
                rkType="common"
                style={{
                  fontSize: 25
                }}
              >
                検索結果
              </RkText>
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
                      flex: 2,
                      marginBottom: 5,
                      flexDirection: "row",
                      borderWidth: 1,
                      height: 90,
                      borderColor: "gray"
                    }}
                  >
                    <View
                      style={{
                        flex: 2,
                        padding: 3,
                        alignItems: "flex-start"
                      }}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => `list-${index}`}
              />
            </View>
          </View>
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
        {decision}
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
  },
  detail: {
    width: "100%",
    height: 40,
    padding: 5,
    borderWidth: 1
  },
  space: {
    flex: 1
  },
  test: {
    width: "100%",
    height: 40,
    padding: 5,
    borderWidth: 1
  },
  main: {
    flex: 2,
    padding: 5
  }
});
