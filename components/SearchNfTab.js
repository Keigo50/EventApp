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
import { Avatar } from "react-native-elements";
import { RkCard, RkTheme, RkButton } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { Image as ExpoImage } from "react-native-expo-image-cache";
import TabBarIcon from "./TabBarIcon";
import Colors from "../constants/Colors";

class SearchNfTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eimage: "",
      eventData: [],
      eventIdName: [],
      starArray: [],
      refreshing: false,
      nfData: null,
      allData: null,
      noSearch: false
    };
  }

  componentWillMount() {
    let nf = this.props.navigation.state.params.nfData;
    let sendNowData = this.props.navigation.state.params.sendNowData;
    let sendPastData = this.props.navigation.state.params.sendPastData;

    console.log("今" + sendNowData);
    console.log("過去" + sendPastData);

    let all = sendNowData.concat(sendPastData);
    console.log("全" + all);

    this.setState({
      allData: all
    });

    this.setState({
      nfData: nf
    });
  }

  render() {
    let allSearchData = [];
    for (let i = 0; i < this.state.allData.length; i++) {
      let searchText = this.props.navigation.state.params.searchText;
      console.log(
        this.state.allData[i]
          .slice()
          .substr(0, 2)
          .indexOf(searchText)
      );
      console.log("リザルト" + searchText);
      if (
        -1 !==
        this.state.allData[i]
          .slice()
          .substr(0, 2)
          .indexOf(searchText)
      ) {
        // this.setState({
        //   noSearch: false
        // });
        allSearchData.push(this.state.allData[i]);
      }

      if (
        -1 ===
        this.state.allData[i]
          .slice()
          .substr(0, 2)
          .indexOf(searchText)
      ) {
        noSearch2 = (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30 }}>検索結果がありません</Text>
          </View>
        );
        // this.setState({ noSearch: true });
      }
    }
    return (
      <FlatList
        style={{
          width: "100%",
          paddingTop: 5,
          paddingBottom: 5
        }}
        data={allSearchData}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 5,
              flex: 2,
              flexDirection: "row",
              borderWidth: 1,
              height: 90,
              borderColor: "gray"
            }}
          >
            {/* アイコンを以下に配置*/}
            <Avatar
              large
              rounded
              // source={{
              //   uri:
              //     "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
              // }}
              title={item}
              onPress={() => console.log(item)}
              activeOpacity={0.7}
            />
            <View
              style={{
                flex: 2,
                padding: 3,
                alignItems: "flex-start",
                justifyContent: "flex-start"
              }}
            >
              <Text
                style={{
                  fontSize: 18
                }}
              >
                {item}
              </Text>
            </View>
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
)(SearchNfTab);
