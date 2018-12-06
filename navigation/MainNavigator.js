import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";

import HomeScreen from "../screens/Keigo/HomeScreen";
import FavoriteHomeScreen from "../screens/Taiki/FavoriteHomeScreen";
import ProfileHomeScreen from "../screens/Keigo/ProfileHomeScreen";
import EventCreateScreen from "../screens/Keigo/EventCreateScreen";
import MyEventHomeScreen from "../screens/Seiya/MyEventHomeScreen";
import Sample from "../screens/Keigo/Sample";
import EventMoreDetailScreen from "../screens/Taiki/EventMoreDetailScreen";
import SearchHomeScreen from "../screens/Seiya/SearchHomeScreen";
import LoginFormScreen from "../screens/Keigo/LoginFormScreen";
import MyEventEditingScreen from "../screens/Seiya/MyEventEditingScreen";
import NotificationHomeScreen from "../screens/Keigo/NotificationHomeScreen";

/*ホーム画面*/
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: EventMoreDetailScreen,
  Favorite: FavoriteHomeScreen,
  Profile: ProfileHomeScreen,
  Event: EventCreateScreen,
  Notification: NotificationHomeScreen,
  MyEvent: MyEventHomeScreen,
  Search: SearchHomeScreen
});

HomeStack.navigationOptions = {
  header: null,
  title: "ホーム",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

/*お気に入り一覧画面*/
const FavoriteHomeStack = createStackNavigator({
  Home: FavoriteHomeScreen,
  Details: EventMoreDetailScreen
});

FavoriteHomeStack.navigationOptions = {
  title: "お気に入り"
};

/*プロフィール画面*/

const ProfileHomeStack = createStackNavigator({
  Home: ProfileHomeScreen,
  Details: EventMoreDetailScreen
});

ProfileHomeStack.navigationOptions = {
  title: "プロフィール"
};

ProfileHomeStack.navigationOptions = {
  header: null,
  title: "プロフィール",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-contact${focused ? "" : "-outline"}`
          : "ios-contact"
      }
    />
  )
};

/*通知画面*/
const NotificationHomeStack = createStackNavigator({
  Home: NotificationHomeScreen
});

NotificationHomeStack.navigationOptions = {
  header: null,
  title: "通知",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-notifications${focused ? "" : "-outline"}`
          : "ios-notifications"
      }
    />
  )
};

/*Myイベント一覧画面*/
const MyEventHomeStack = createStackNavigator({
  Home: MyEventHomeScreen,
  Editing: MyEventEditingScreen,
  Details: EventMoreDetailScreen
});

MyEventHomeStack.navigationOptions = {
  title: "Myイベント"
};

/*検索画面*/
const SearchHomeStack = createStackNavigator({
  Home: SearchHomeScreen
});

SearchHomeStack.navigationOptions = {
  title: "イベント検索"
};

const SampleStack = createStackNavigator({
  Home: Sample
});

SampleStack.navigationOptions = {
  title: "Sample"
};

const LoginFormStack = createStackNavigator({
  Home: LoginFormScreen
});

LoginFormStack.navigationOptions = {
  title: "ログインフォーム画面"
};

export default createBottomTabNavigator({
  HomeStack,
  NotificationHomeStack,
  ProfileHomeStack
});
