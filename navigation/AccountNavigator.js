import { createStackNavigator } from "react-navigation";

import GoogleLoginScreen from "../screens/Keigo/GoogleLoginScreen";

const AccountHomeStack = createStackNavigator(
  {
    Home: GoogleLoginScreen
  },
  {
    mode: "modal"
  }
);

AccountHomeStack.navigationOptions = {
  header: null
};

export default createStackNavigator({
  AccountHomeStack
});
