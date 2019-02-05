import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/Keigo/HomeScreen";
import ProfileHomeScreen from "../screens/Keigo/ProfileHomeScreen";
import EventCreateScreen from "../screens/Keigo/EventCreateScreen";
import EventMoreDetailScreen from "../screens/Taiki/EventMoreDetailScreen";
import MyEventEditingScreen from "../screens/Seiya/MyEventEditingScreen";
import NotificationHomeScreen from "../screens/Keigo/NotificationHomeScreen";
import SearchResultsScreen from "../screens/Keigo/SearchResultsScreen";
import SearchNotificationResultsScreen from "../screens/Keigo/SearchNotificationResults";

import Colors from "../constants/Colors";

/*ホーム画面*/
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: EventMoreDetailScreen,
  Search: SearchResultsScreen,
  SearchNf: SearchNotificationResultsScreen,
  Create: EventCreateScreen,
  Editing: MyEventEditingScreen
});

HomeStack.navigationOptions = {
  header: null,
  title: "ホーム",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      size={26}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "ios-home"
      }
    />
  )
};

/*プロフィール画面*/

const ProfileHomeStack = createStackNavigator({
  Home: ProfileHomeScreen
});

ProfileHomeStack.navigationOptions = {
  header: null,
  title: "プロフィール",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      size={26}
      name={
        Platform.OS === "ios"
          ? `ios-contact${focused ? "" : "-outline"}`
          : "ios-contact"
      }
    />
  )
};

/*通知画面*/
const NotificationHomeStack = createStackNavigator(
  {
    Home: NotificationHomeScreen
  },
  {
    mode: "modal"
  }
);

NotificationHomeStack.navigationOptions = {
  header: null,
  title: "通知",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      size={26}
      name={
        Platform.OS === "ios"
          ? `ios-notifications${focused ? "" : "-outline"}`
          : "ios-notifications"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  NotificationHomeStack,
  ProfileHomeStack
});
