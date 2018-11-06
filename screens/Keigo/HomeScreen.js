import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { RkCard, RkTheme } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import ScrollableTabView from "react-native-scrollable-tab-view";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "ホーム",
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
    return (
      <View style={styles.container}>
        <ScrollableTabView style={styles.main}>
          <Tab1 tabLabel="Tab1" />
          <Tab1 tabLabel="Tab2" />
          <Tab1 tabLabel="Tab3" />
          <Tab1 tabLabel="Tab4" />
          <Tab1 tabLabel="Tab5" />
        </ScrollableTabView>
      </View>
    );
  }
}

class Tab1 extends React.Component {
  render() {
    return (
      <ScrollView
        style={{
          paddingTop: 25,
          paddingLeft: 25,
          paddingRight: 25
        }}
      >
        <Text>Tab1</Text>
        <RkCard rkType="shadowed  events">
          <View rkCardHeader>
            <Text>Header</Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 200,
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

        <RkCard rkType="shadowed events">
          <View rkCardHeader>
            <Text>Header</Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 200,
              borderColor: "red",
              borderWidth: 1
            }}
          >
            <Image
              rkCardImg
              source={require("../../assets/images/robot-dev.png")}
            />
          </View>
          <View rkCardContent>
            <Text> quick brown fox jumps over the lazy dog</Text>
          </View>
          <View rkCardFooter>
            <Text>Footer</Text>
          </View>
        </RkCard>

        <RkCard rkType="shadowed  events">
          <View rkCardHeader>
            <Text>Header</Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 200,
              borderColor: "red",
              borderWidth: 1
            }}
          >
            <Image
              rkCardImg
              source={require("../../assets/images/robot-dev.png")}
            />
          </View>
          <View rkCardContent>
            <Text> quick brown fox jumps over the lazy dog</Text>
          </View>
          <View rkCardFooter>
            <Text>Footer</Text>
          </View>
        </RkCard>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  main: {
    backgroundColor: "#fff"
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
    alignSelf: "center"
  },
  marginVertical: 5
});
