import { createStackNavigator } from "react-navigation";

import AccountHomeScreen from "../screens/Keigo/AccountHomeScreen";
import AccountLoginScreen from "../screens/Taiki/AccountLoginScreen";
import AccountNewScreen from "../screens/Taiki/AccountNewScreen";

const AccountHomeStack = createStackNavigator({
  Home: AccountHomeScreen,
  Create: AccountNewScreen,
  Login: AccountLoginScreen
});

AccountHomeStack.navigationOptions = {
  header: null
};

export default createStackNavigator({
  AccountHomeStack
});
