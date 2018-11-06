import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import AccountHomeScreen from "../screens/keigo/AccountHomeScreen";
import AccountLoginScreen from "../screens/Taiki/AccountLoginScreen";
import AccountNewScreen from "../screens/Taiki/AccountNewScreen";
import FavoriteHomeScreen from "../screens/Taiki/FavoriteHomeScreen";
import ProfileHomeScreen from "../screens/Keigo/ProfileHomeScreen";
import EventCreateScreen from "../screens/Keigo/EventCreateScreen";
import MyEventHomeScreen from "../screens/Seiya/MyEventHomeScreen";
import Sample from "../screens/Keigo/Sample";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  title: "ホーム",
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const AccountHomeStack = createStackNavigator({
  Settings: AccountHomeScreen
});

AccountHomeStack.navigationOptions = {
  title: "新規登録・ログイン画面"
};

const AccountLoginStack = createStackNavigator({
  Settings: AccountLoginScreen
});

AccountLoginStack.navigationOptions = {
  title: "ログイン画面"
};

const AccountNewStack = createStackNavigator({
  Settings: AccountNewScreen
});

AccountNewStack.navigationOptions = {
  title: "アカウント新規作成画面"
};

const FavoriteHomeStack = createStackNavigator({
  Settings: FavoriteHomeScreen
});

FavoriteHomeStack.navigationOptions = {
  title: "お気に入り一覧画面"
};

const ProfileHomeStack = createStackNavigator({
  Settings: ProfileHomeScreen
});

ProfileHomeStack.navigationOptions = {
  title: "プロフィール画面"
};

const EventCreateStack = createStackNavigator({
  Settings: EventCreateScreen
});

EventCreateStack.navigationOptions = {
  title: "イベント作成画面"
};

const MyEventHomeStack = createStackNavigator({
  Settings: MyEventHomeScreen
});

MyEventHomeStack.navigationOptions = {
  title: "Myイベント一覧画面"
};

const SampleStack = createStackNavigator({
  Settings: Sample
});

SampleStack.navigationOptions = {
  title: "Sample"
};

export default createDrawerNavigator({
  HomeStack,
  LinksStack,
  AccountHomeStack,
  AccountLoginStack,
  AccountNewStack,
  FavoriteHomeStack,
  ProfileHomeStack,
  EventCreateStack,
  SampleStack
});
