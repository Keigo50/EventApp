import React from "react";
import { createSwitchNavigator } from "react-navigation";

import MainNavigator from "./MainNavigator";
import AccountNavigator from "./AccountNavigator";

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainNavigator,
  App: AccountNavigator
});
