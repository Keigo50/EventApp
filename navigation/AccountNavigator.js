import { createStackNavigator } from "react-navigation";

import AccountHomeScreen from "../screens/Keigo/AccountHomeScreen";
import GoogleLoginScreen from "../screens/Keigo/GoogleLoginScreen";

const AccountHomeStack = createStackNavigator({
  Home: GoogleLoginScreen
  // Home: { screen: AccountHomeScreen, mode: "modal" },

});

AccountHomeStack.navigationOptions = {
  header: null
};

export default createStackNavigator({
  AccountHomeStack
});
