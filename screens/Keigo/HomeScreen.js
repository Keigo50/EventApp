import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  AsyncStorage,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../app/actions";
import { RkCard, RkTheme, RkButton } from "react-native-ui-kitten";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Constants } from "expo";
import firebase from "firebase";
import { Image as ExpoImage } from "react-native-expo-image-cache";
import TabBarIcon from "../../components/TabBarIcon";
import Colors from "../../constants/Colors";
import Tab1 from "../../components/Tab1";
import Tab2 from "../../components/Tab2";
import Tab3 from "../../components/Tab3";
import Tab4 from "../../components/Tab4";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };
    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
    this.state = {
      title: ["ジョビフェス", "いしがきMS", "よさこいさんさ", "街中ハロウィン"],
      date: ["2018/7/30", "2018/6/20", "2018/5/21", "2018/10/31"],
      user: null,
      refreshing: false,
      todoText: ""
    };
  }
  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentWillMount() {
    this.props.checkLogin();
  }

  render() {
    //TODO ログイン状態を確認し作成ボタンを表示・非表示する処理
    console.log(this.props.loggedIn);
    let createbutton = this.props.loggedIn;
    let tabdisplay = this.props.loggedIn;
    return (
      <View style={styles.container}>
        <View style={styles.sub3}>
          <View style={styles.sub}>
            {createbutton && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Create");
                }}
              >
                <Icon name="plus-circle" size={30} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.sub4}>
            <SearchBar
              containerStyle={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
                borderTopColor: "#fff",
                backgroundColor: "#fff"
              }}
              keyboardType="default"
              round
              inputStyle={{ color: "black" }}
              returnKeyType="search"
              lightTheme
              ref={search => (this.search = search)}
              // searchIcon={<CustomComponent />}
              onChangeText={someMethod =>
                this.setState({ todoText: someMethod })
              }
              onClearText={someMethod =>
                this.setState({ todoText: someMethod })
              }
              placeholder="Search"
            />
          </View>
          <View style={styles.sub2}>
            {!createbutton && (
              <Button
                onPress={() => {
                  this.props.navigation.navigate("App");
                }}
                title="ログイン"
              />
            )}
          </View>
        </View>
        {tabdisplay ? (
          <ScrollableTabView style={styles.main}>
            <Tab1 tabLabel="すべて" {...this.props} />
            <Tab2 tabLabel="参加中" {...this.props} />
            <Tab3 tabLabel="お気に入り" {...this.props} />
            <Tab4 tabLabel="作成済み" {...this.props} />
          </ScrollableTabView>
        ) : (
          <ScrollableTabView style={styles.main}>
            <Tab1 tabLabel="すべて" {...this.props} />
          </ScrollableTabView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight
  },

  main: {
    backgroundColor: "#fff"
  },
  sub: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10
  },
  sub2: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  sub4: {
    flex: 9,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  sub3: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "stretch"
  }
});

RkTheme.setType("RkCard", "events", {
  img: {
    height: "100%"
  },
  header: {
    alignSelf: "flex-start"
  },
  content: {
    alignSelf: "flex-start"
  },
  marginVertical: 5
});

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
)(HomeScreen);
