import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

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

/*ホーム画面*/
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: EventMoreDetailScreen,
  Favorite: FavoriteHomeScreen,
  Profile: ProfileHomeScreen,
  Event: EventCreateScreen,
  MyEvent: MyEventHomeScreen,
  Search: SearchHomeScreen
});

HomeStack.navigationOptions = {
  header: null,
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

/*イベント作成画面*/
const EventCreateStack = createStackNavigator({
  Home: EventCreateScreen
});

EventCreateStack.navigationOptions = {
  title: "イベント作成"
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

export default createDrawerNavigator({
  HomeStack,
  EventCreateStack,
  SearchHomeStack,
  MyEventHomeStack,
  FavoriteHomeStack,
  ProfileHomeStack
});
