import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Button,
  Text,
  Image,
  KeyboardAvoidingView
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RkButton, RkTextInput, RkTheme, RkText } from "react-native-ui-kitten";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";

import {
  returnSubmit,
  returnEname,
  returnDetails,
  returnPlace,
  returnDate
} from "../../app/actions";
import PropTypes from "prop-types";
class EventCreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarDecision: false
    };
  }


  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ paddingLeft: 20 }}
      >
        <Entypo name="chevron-left" size={40} color="black" />
      </TouchableOpacity>
    )
  });

  _onPressSubmit = () => {
    console.log("aaaaaaa");
    /*決まったコード*/
    const { date, details, eimage, ename, place, rnumbers } = this.props;
    this.props.returnSubmit({ date, details, eimage, ename, place, rnumbers });

    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    onCalendarPress = () => {
      if (!this.state.calendarDecision) {
        console.log(this.state.calendarDecision);
        this.setState({
          calendarDecision: true
        });
      } else {
        console.log(this.state.calendarDecision);
        this.setState({
          calendarDecision: false
        });
      }
    };

    let docRef = firestore.collection("events");

    return docRef
      .add({
        ename: this.props.ename,
        place: this.props.place,
        details: this.props.details
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
  render() {
    console.log(this.props);
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate() + 1;
    const now = `${year}/${month}/${date}`;
    let data = [
      {
        value: "Banana"
      },
      {
        value: "Mango"
      },
      {
        value: "Pear"
      },
      {
        value: "apple"
      }
    ];

    let people = [
      {
        value: "１～５人"
      },
      {
        value: "５～１０人"
      },
      {
        value: "１０～１５人"
      },
      {
        value: "１５人以上"
      }
    ];

    let calendar = this.state.calendarDecision;
    if (this.state.calendarDecision) {
      calendar = (
        <Calendar
          hideExtraDays={true}
          minDate={now}
          onDayPress={day => this.props.returnDate(day.dateString)}
        />
      );
    }

    console.log(this.props);

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 80 })}
        behavior="padding"
        enabled
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.main}>
            <View
              style={{
                width: "100%",
                height: 70,
                marginVertical: 10
              }}
            >
              <Dropdown
                itemCount={3}
                dropdownPosition={1}
                label="カテゴリー"
                data={data}
              />
            </View>
            <View
              style={{
                width: "100%",
                height: 70,
                marginVertical: 10
              }}
            >
              <Dropdown
                itemCount={5}
                dropdownPosition={1}
                label="人数"
                data={people}
              />
            </View>
            <View style>
              <RkText rkType="text">イベントタイトル</RkText>
            </View>
            <RkTextInput
              autoFocus={true}
              rkType="textInput"
              keyboardType="default"
              onChangeText={ename => this.props.returnEname(ename)}
            />

            <RkText rkType="text">画像</RkText>

            <View
              style={{
                justifyContent: "center",
                width: "100%",
                borderWidth: 1,
                borderColor: "#0000003B",
                height: 217,
                marginBottom: 10
              }}
            >
              <Image
                style={{ width: "100%", height: 180 }}
                source={require("../../assets/images/icon.png")}
              />
              <Button title="画像の編集" onPress={this._sample.bind(this)} />
            </View>

            <View>
              <RkText rkType="text">開催日時</RkText>
            </View>

            <View style={{ flex: 1, flexDirection: "row", marginVertical: 30 }}>
              <View
                style={{
                  flex: 8,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View>
                  <RkText style={{ fontSize: 20 }}>{this.props.day}</RkText>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity onPress={this.onCalendarPress.bind(this)}>
                  <Icon name="calendar" size={24} />
                </TouchableOpacity>
              </View>
            </View>
            {calendar}
            <View>
              <RkText rkType="text">開催場所</RkText>
            </View>
            <RkTextInput
              rkType="textInput"
              textContentType="password"
              keyboardType="default"
              onChangeText={place => this.props.returnPlace(place)}
            />

            <View>
              <RkText rkType="text">詳細</RkText>
            </View>
            <RkTextInput
              rkType="details"
              multiline
              onChangeText={details => this.props.returnDetails(details)}
            />

            
            <RkButton
              rkType="btn"
              onPress={this._onPressSubmit}
              style={{ backgroundColor: "#5cb85c" }}
            >
              作成
            </RkButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

MyEventEditingScreen.propTypes = {
  day: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  main: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25
  }
});

RkTheme.setType("RkTextInput", "details", {
  marginBottom: 30,
  underlineWidth: 0,
  borderWidth: 1,
  borderBottomWidth: 1,
  borderBottomColor: "#000",
  borderColor: "#000",
  height: "auto",
  input: {
    alignSelf: "baseline",
    paddingHorizontal: 10,
    marginVertical: 10,
    marginLeft: 5,
    fontSize: 20,
    height: 100
  }
});

RkTheme.setType("RkTextInput", "textInput", {
  marginBottom: 30,
  underlineWidth: 0,
  underlineColor: "#000",
  borderRadius: 50,
  borderWidth: 1,
  borderBottomWidth: 1,
  borderColor: "#000",

  input: {
    paddingHorizontal: 10,
    marginVertical: 15,
    marginLeft: 5,
    fontSize: 20,
    height: 25
  }
});

RkTheme.setType("RkText", "text", {
  fontSize: 25
});

const mapStateToProps = state => {
  return {
    date: state.create.date,
    details: state.create.details,
    eimage: state.create.eimage,
    ename: state.create.ename,
    place: state.create.place,
    rnumbers: state.create.rnumbers
    day: state.editing.day
  };
};

export default connect(
  mapStateToProps,
  { returnDate, returnSubmit, returnDetails, returnEname, returnPlace }
)(EventCreateScreen);
