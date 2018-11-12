import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator
} from "react-native";
import { changeEmail, changePassword, submitLogin } from "../../app/actions";

class LoginForm extends Component {
  onButtonPress() {
    console.log(this.props);
    const { email, password } = this.props;
    this.props.submitLogin({ email, password });
  }

  loadSpinner() {
    if (this.props.loading) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <TouchableOpacity
        onPress={this.onButtonPress.bind(this)}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>ログイン</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.wrap}>
          <TextInput
            placeholder="user@gmail.com"
            autoCorrect={false}
            value={this.props.email}
            onChangeText={email => this.props.changeEmail(email)}
            style={styles.inputStyle}
          />
        </View>
        <View style={styles.wrap}>
          <TextInput
            secureTextEntry
            placeholder="password"
            autoCorrect={false}
            value={this.props.password}
            onChangeText={password => this.props.changePassword(password)}
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.wrap}>{this.loadSpinner()}</View>

        <Text>{this.props.loggedIn}</Text>
      </View>
    );
  }
}

const styles = {
  wrap: {
    padding: 10
  },
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    height: 30,
    borderWidth: 1,
    borderColor: "#333"
  }
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  };
};

export default connect(
  mapStateToProps,
  { changeEmail, changePassword, submitLogin }
)(LoginForm);
