import { createStackNavigator } from "react-navigation";

import AccountHomeScreen from "../screens/Keigo/AccountHomeScreen";
import AccountLoginScreen from "../screens/Taiki/AccountLoginScreen";
import AccountNewScreen from "../screens/Taiki/AccountNewScreen";
import GoogleLoginScreen from "../screens/Keigo/GoogleLoginScreen";

const AccountHomeStack = createStackNavigator({
  Home: GoogleLoginScreen,
  // Home: { screen: AccountHomeScreen, mode: "modal" },
  Create: AccountNewScreen,
  Login: AccountLoginScreen
});

AccountHomeStack.navigationOptions = {
  header: null
};

export default createStackNavigator({
  AccountHomeStack
});
