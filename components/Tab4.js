import React from "react";
import { Text, View, TouchableOpacity, FlatList, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../app/actions";
import { RkCard } from "react-native-ui-kitten";
import firebase from "firebase";
import { Image as ExpoImage } from "react-native-expo-image-cache";
import TabBarIcon from "../components/TabBarIcon";
import Colors from "../constants/Colors";

class Tab4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eimage: "",
      eventData: [],
      eventIdName: [],
      paeventsArray: [],
      refreshing: false
    };
  }

  getFirebaseData = async () => {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    const userUid = firebase.auth().currentUser.uid;
    const madeeventRef = firestore.collection("students").doc(userUid);
    let madeeventsID = [];
    await madeeventRef.get().then(doc => {
      madeeventsID.push(doc.data().madeevents);
    });

    let uriEimage = [];
    let docId = [];
    await firestore
      .collection("events")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          if (-1 != madeeventsID[0].indexOf(doc.id)) {
            uriEimage.push(doc.data());
            docId.push(doc.id);
          }
        });
      });
    this.setState({ eventData: uriEimage });
    this.setState({ eventIdName: docId });
  };

  componentWillMount() {
    this.getFirebaseData();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getFirebaseData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  onPressIcon = async (focusedBool, eventId) => {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    // const paeventRef = firestore.collection("students").doc(userUid);
    // let paeventsID = [];
    // await paeventRef.get().then(doc => {
    //   paeventsID.push(doc.data().paevents);
    // });
    const { focused = focusedBool } = this.props;

    console.log("eventID  " + eventId);
    if (!this.props.focused) {
      await this.props.returnFocused_true({
        focused
      });

      const pass = eventId;
      await firestore
        .collection("events")
        .doc(pass)
        .update({ focused: this.props.focused });
      this._onRefresh();
    } else {
      const { focused = focusedBool } = this.props;
      await this.props.returnFocused_false({
        focused
      });
      console.log("eventID  " + eventId);
      const pass = eventId;
      await firestore
        .collection("events")
        .doc(pass)
        .update({ focused: this.props.focused });
      this._onRefresh();
    }
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // サインインしていない状態
        console.log("サインインしてません");
        this.props.navigation.navigate("App");
      } else {
        // サインイン済
        console.log("サインインしてます");
      }
    });
  };

  render() {
    const preview = {
      uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    };
    console.log(this.state.eventIdName);
    let data = [];
    for (let i = 0; i < this.state.eventData.length; i++) {
      console.log("focused" + this.state.eventData[i].focused);
      const uri = this.state.eventData[i].eimage;

      events = (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Details", {
              event: this.state.eventData[i],
              eventId: this.state.eventIdName[i]
            })
          }
        >
          <RkCard rkType="shadowed  events">
            <View rkCardHeader>
              <Text style={{ fontSize: 20 }}>
                {this.state.eventData[i].ename}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 180
              }}
            >
              <ExpoImage rkCardImg {...{ preview, uri }} />
            </View>
            <View rkCardContent>
              <Text>{this.state.eventData[i].details}</Text>
            </View>
            <View rkCardFooter>
              <Text>{this.state.eventData[i].date}</Text>
              {/* <TouchableOpacity
                onPress={() =>
                  this.onPressIcon(
                    (focusedBool = this.state.eventData[i].focused),
                    (eventId = this.state.eventIdName[i])
                  )
                }
              >
                <TabBarIcon
                  size={35}
                  name={
                    Platform.OS === "ios"
                      ? `ios-star${
                          this.state.eventData[i].focused ? "" : "-outline"
                        }`
                      : "ios-star"
                  }
                  color={
                    this.state.eventData[i].focused
                      ? Colors.tabIconSelected2
                      : Colors.tabIconDefault
                  }
                />
              </TouchableOpacity> */}
            </View>
          </RkCard>
        </TouchableOpacity>
      );
      data.push(events);
    }
    return (
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        style={{ backgroundColor: "#ccc", paddingTop: 10 }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 1,
              paddingBottom: 10
            }}
          >
            {item}
          </View>
        )}
        keyExtractor={(item, index) => `list-${index}`}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn,
    fvEvents: state.auth.fvEvents
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
)(Tab4);
