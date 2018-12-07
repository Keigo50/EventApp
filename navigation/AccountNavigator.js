import { createStackNavigator } from "react-navigation";

import GoogleLoginScreen from "../screens/Keigo/GoogleLoginScreen";

const AccountHomeStack = createStackNavigator({
  Home: GoogleLoginScreen
});

AccountHomeStack.navigationOptions = {
  header: null
};

export default createStackNavigator({
  AccountHomeStack
});
