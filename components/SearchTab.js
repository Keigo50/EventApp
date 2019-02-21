import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../app/actions";
import { RkCard, RkTheme, RkButton } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { Image as ExpoImage } from "react-native-expo-image-cache";
import TabBarIcon from "../components/TabBarIcon";
import Colors from "../constants/Colors";

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eimage: "",
      eventData: [],
      eventIdName: [],
      starArray: [],
      refreshing: false
    };
  }

  getFirebaseData = async () => {
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    let search = this.props.navigation.state.params.searchText;
    let uriEimage = [];
    let docId = [];
    await firestore
      .collection("events")
      .where("ename", "==", search)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          uriEimage.push(doc.data());
          docId.push(doc.id);
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
  // componentWillMount() {
  //   const fs = new ActiveXObject("Scripting.FileSystemObject");
  //   const file = fs.OpenTextFile("../../base64.txt");

  //   /* 1行目のみ読み込む */
  //   text[0] = file.ReadLine();
  // }
  render() {
    const preview = {
      uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABkCAIAAADrOV6nAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABPVJREFUeNrsndlW4kAQhiGGJGwBjuj7P503gqxCEiGZ37TDQWfGEaWqq9P1X3iEg5L017X1km4/PDy0VO91PB53u93z83NZlngZBO1utxdHUdLtCrzaUIF90KbW+TtlWT3X6uV5mqZBEIi64ECZnWu5XH7gdy6Y5nw+N6apCCUKdgZIn3/m5eXlE8aK0HL8+yKbr5BWhBaU5/nXPWRRFIpQnOAhiT6sCCWqqipFKJGLo9etCE/pzAWlws3NjZb2UoTcMq91UbXXlTRME/pqc69DaBB+udhxBUGv11OENjPPnxR27XZ7MBiIuqPQH3LAtt/vfzI8Bn7T6bTT6ShC7mi3XCzQ/D/8P3Ecp2kqjV+TER7gME9m911+w+HQBL8kSURloQ1ECE5FUcBbHmohSbnKfIJBKFxuIwQ22BnIiRq0VIT/F7CBWZZl3ygJLtJyuYw6nV6/rwivVsyZeoBt0nVXFx/rzaZfS9p8vUsIAW+73YKfrUC72Wzw7aAoMDpKR4jmM+tWrC93MCBhlpPJOIpiRfglgdx6vRY1swN/MJvNoyiaTCZCygyhMxVIMh8fH1erlSh+55kwLk9IGiwRYZ7naCBRM+N/9auz2cxWeJbrSE27oDZ3JUmGn4AtwqmqFb7xm8/nDvE7FakoHxXhGz/hzvOT8tEiRRGOFOQErpK+lCISVCtVo30rhOd0nZ+RqRq9Qwhyi8WiAfyM4E75Y0Fgl5+78e9f4s/IAt/6LEO/3KzXXiBE2MiyrNVE7bOMs2vaQXg8HuFwWs3V09MTW4APbN2h2KUo1+qjbGNvFhAuF4vmhcA/" +
        "BYQ8t8mNsCiK3X7f8kBmprOBCCUM7fPlNSydlRUhHMveDxM0qqqKIetmRbjmLZgkaLVaNQchomCe574hNFuoGoLQQxM89d0mICxq+YmQeuFroCbIINKkhgdh5fOeB2pfGrD0wbzlt0jzOA6E2+3Wc4TX2ixnByEu3blFaRSiawRyhAgDjVlXIdOXkiNs6rzupaKbtVCEXAjJktKAuuupF33LaMqSqCloEXpeDvJkNLQIqffCazgkR6jlxIf6Sh2p8wW+YwhLyiEJRciBsFJoDXCkKrfTGZlPOmieKGNhqRWF4whVirBpInocLSHCdlv7x/u2pnkKX+DcFavUkVpT5JwjbfYOwu+FFvesUH2p2+lMS9jBONaVJIl7CAWe6mBLdGcEBdT9Tn2pEd2zvchjYV/24+V5hIBCl9yRmwgQln4vvzgcDmmaOlwXwhDv7u99RjidTknrK45AFcexqAP/OAUnRH3vTLnGeDz2kCIS8tFoRO7n2O7HN4rgd3t7y/BFrBk/KPb9oGj48RRU3EXbaDymDu/WFUURG7+WlZkK3OHd3R3ifJtm2NeigG0wGKCPcg5ohLZuFXF+OBwKOY/pWl1zMOgnCfewcGi3z4IizNF1kIh8SS0rY8L2DzkwIKEsy/I8ZzhY8rrwkGZ3u12LQ8GCDvwxHRkO1jxtD5LMMo5jdDs4T+tXEsrs2lCapkBo7BJQheCUYHYOIDwJtUevVqtezQ6cVfX6FCLzk+cCgArYYG34PQxDgeWQM2f5GtP88Ca4mmX/sFGzlxEvz7cunHaKw+99Ho+B561FfnMyb+LPhU95un0oOkMGKH/KWqfU3R9P0CZQhCpFqFKEilClCFWKUKUIFaFKEaos6pcAAwCkSvWwNLIPbwAAAABJRU5ErkJggg=="
      // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    };

    console.log(this.state.eventIdName);
    let data = [];
    for (let i = 0; i < this.state.eventData.length; i++) {
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
)(SearchTab);
