import React from "react";
import {
  Image,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { RkCard, RkTheme, RkButton } from "react-native-ui-kitten";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Constants } from "expo";
import firebase from "firebase";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headernull: (
      <Icon
        name="bell"
        size={24}
        onPress={() => {
          navigation.openDrawer();
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
          <Tab1 tabLabel="Tab1" />
          <Tab1 tabLabel="Tab2" />
          <Tab1 tabLabel="Tab3" />
          <Tab1 tabLabel="Tab4" />
          <Tab1 tabLabel="Tab5" />
        </ScrollableTabView>
      </View >
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
    alignSelf: "center"
  },
  marginVertical: 5
});
