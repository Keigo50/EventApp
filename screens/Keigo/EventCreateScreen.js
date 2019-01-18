import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Button,
  Text,
  Image,
  CameraRoll,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RkButton, RkTextInput, RkTheme, RkText } from "react-native-ui-kitten";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import { ImagePicker, Permissions } from "expo";
import * as Actions from "../../app/actions";
import PropTypes from "prop-types";
import moment from "moment";
import ActionSheet from "react-native-zhb-actionsheet";
class EventCreateScreen extends Component {
  constructor(props) {
    super(props);

    const atob = require("base-64").decode;
    window.atob = atob;

    this.defaultTitles = [
      {
        title: "カメラ",
        action: this._takePhoto
      },
      {
        title: "ライブラリー",
        action: this._pickImage
      },
      //テスト

      {
        title: "キャンセル",
        actionStyle: "cancel",
        action: () => {
          console.log("click Cancel");
        }
      }
    ];
    this.state = {
      calendarDecision: false,
      deadlineDecision: false,
      image: null,
      hasCameraRollPermission: null,
      hasCameraPermission: null,
      titles: this.defaultTitles,
      name: ""
    };

    this._onEditingImage = this._onEditingImage.bind(this);
    this._onCalendarPress = this._onCalendarPress.bind(this);
    this._onPressSubmit = this._onPressSubmit.bind(this);
    this._onDeadlinePress = this._onDeadlinePress.bind(this);
    this._takePhoto = this._takePhoto.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "イベント作成",
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon name="angle-left" size={40} style={{ paddingLeft: 20 }} />
      </TouchableOpacity>
    )
  });

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
    this.setState({ hasCameraRollPermission: status2 === "granted" });
  }

  _onEditingImage = () => {
    console.log("Pushされました。");
  };

  //firebaseに画像をアップロードする
  uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let time = String(new Date().getTime());
    const name1 = `event_img${time}.jpg`;
    console.log(this.state.name1);
    this.setState({ name: name1 });
    const ref = firebase
      .storage()
      .ref()
      .child(`images/${name1}`);
    return ref.put(blob);
  };

  //アップロードが完了した後にurlを取得する
  uploadEnd = async () => {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    const ref = firebase
      .storage()
      .ref()
      .child(`images/${this.state.name}`);
    ref.getDownloadURL().then(eimg => {
      this.props.returnEimage(eimg);
      const {
        ename,
        details,
        eimage,
        place,
        rnumbers,
        deadlineDate
      } = this.props;
      console.log(this.props);
      this.props.returnSubmit({
        ename,
        details,
        eimage,
        place,
        rnumbers,
        deadlineDate
      });
      let docRef = firestore.collection("events");
      return docRef
        .add({
          date: this.props.date,
          deadlineDate: this.props.deadlineDate,
          ename: this.props.ename,
          eimage: this.props.eimage,
          place: this.props.place,
          details: this.props.details,
          rnumbers: this.props.rnumbers,
          focused: this.props.focused
        })
        .then(() => {
          console.log("firebaseにデータ到着！");
          Alert.alert("作成しました！");
          this.props.eventClearState();
          this.props.navigation.navigate("Home");
        })
        .catch(error => {
          console.error("firebaseにデータ来てないぞ！！ ", error);
          Alert.alert("作成に失敗しました。");
        });
    });
  };

  _onPressSubmit = async () => {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    await this.uploadImage(this.state.image)
      .then(() => {
        // Alert.alert("アップロードに成功しました！");
        this.uploadEnd();
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  _onCalendarPress = () => {
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

  _onDeadlinePress = () => {
    if (!this.state.deadlineDecision) {
      console.log(this.state.deadlineDecision);
      this.setState({
        deadlineDecision: true
      });
    } else {
      console.log(this.state.deadlineDecision);
      this.setState({
        deadlineDecision: false
      });
    }
  };

  // カメラを起動
  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      // this.uploadImage(result.uri, "test-image");
    }

    CameraRoll.saveToCameraRoll(result.uri);
  };

  // カメラロールから選択
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [16, 9]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;
    const now = moment()
      .add({ days: 1 })
      .format("YYYY/MM/DD");

    let calendar = this.state.calendarDecision;
    if (this.state.calendarDecision) {
      calendar = (
        <Calendar
          hideExtraDays={true}
          minDate={now}
          onDayPress={date => this.props.returnDate(date.dateString)}
        />
      );
    }

    let deadline = this.state.deadlineDecision;
    if (this.state.deadlineDecision) {
      //締切日は現在日時から開催日時より一日前までの期間が選択可能
      let period = moment(`${this.props.date}`)
        .subtract({ days: 1 })
        .format("YYYY/MM/DD");

      deadline = (
        <Calendar
          hideExtraDays={true}
          minDate={now}
          maxDate={period}
          onDayPress={deadlineDate =>
            this.props.returnDeadlineDate(deadlineDate.dateString)
          }
        />
      );
    }

    // console.log(this.props);

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 80 })}
        behavior="padding"
        enabled
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.main}>
            <View>
              <RkText rkType="text">イベントタイトル</RkText>
            </View>

            <RkTextInput
              autoFocus={true}
              rkType="textInput"
              keyboardType="default"
              onChangeText={ename => this.props.returnEname(ename)}
            />

            <View>
              <RkText rkType="text">募集定員</RkText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <RkTextInput
                style={{ flex: 1 }}
                rkType="member"
                keyboardType="numeric"
                maxLength={4}
                multiline
                onChangeText={rnumbers => this.props.returnRnumbers(rnumbers)}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  marginBottom: 30,
                  marginLeft: 9
                }}
              >
                <RkText style={{ fontSize: 25 }}>人</RkText>
              </View>
            </View>

            <RkText rkType="text">画像</RkText>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                borderWidth: 1,
                borderColor: "#0000003B",
                height: 217,
                marginBottom: 10
              }}
            >
              <ActionSheet
                ref="picker"
                titles={this.state.titles}
                separateHeight={3}
                separateColor="#dddddd"
                backgroundColor="rgba(0, 0, 0, 0.3)"
                containerStyle={{ margin: 10, borderRadius: 5 }}
                onClose={obj => {
                  console.log(
                    "action sheet closed! clicked:" + JSON.stringify(obj)
                  );
                }}
              />
              ;
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "93%" }}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  this.setState({ titles: this.defaultTitles }, () => {
                    this.refs.picker.show();
                  });
                }}
              >
                <Text style={styles.choiceFont}>画像の選択</Text>
              </TouchableOpacity>
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
                  <RkText style={{ fontSize: 20 }}>{this.props.date}</RkText>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity onPress={this._onCalendarPress}>
                  <Icon name="calendar" size={24} />
                </TouchableOpacity>
              </View>
            </View>
            {calendar}

            <View>
              <RkText rkType="text">締切日</RkText>
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
                  <RkText style={{ fontSize: 20 }}>
                    {this.props.deadlineDate}
                  </RkText>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity onPress={this._onDeadlinePress}>
                  <Icon name="calendar" size={24} />
                </TouchableOpacity>
              </View>
            </View>
            {deadline}

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

// EventCreateScreen.propTypes = {
//   member: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   ename: PropTypes.string.isRequired,
//   eimage: PropTypes.string.isRequired,
//   rnumbers: PropTypes.string.isRequired,
//   place: PropTypes.string.isRequired,
//   details: PropTypes.string.isRequired
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  choiceFont: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    color: "#007AFF"
  },
  main: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
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

RkTheme.setType("RkButton", "btn", {
  width: "100%",
  fontSize: 25,
  height: 60,
  color: "#fff",
  marginBottom: 10
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

RkTheme.setType("RkTextInput", "member", {
  marginBottom: 30,
  underlineWidth: 0,
  borderWidth: 1,
  borderBottomWidth: 1,
  borderBottomColor: "#000",
  borderColor: "#000",
  height: "auto",
  input: {
    paddingHorizontal: 10,
    marginVertical: 10,
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
    deadlineDate: state.create.deadlineDate,
    details: state.create.details,
    eimage: state.create.eimage,
    ename: state.create.ename,
    place: state.create.place,
    rnumbers: state.create.rnumbers,
    focused: state.favorite.focused
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(Actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCreateScreen);
