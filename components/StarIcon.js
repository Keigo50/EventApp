import React from "react";
import { Icon } from "expo";

import Colors from "../constants/Colors";

export default class StarIcon extends React.Component {
  render() {
    return (
      <Icon.AntDesign
        name={this.props.name}
        size={this.props.size}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected2 : Colors.tabIconDefault2
        }
      />
    );
  }
}
