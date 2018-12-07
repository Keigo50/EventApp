import React from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Platform } from "react-native";
import { RkButton, RkGalleryImage, RkText, RkTheme } from "react-native-ui-kitten";
import { ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import Entypo from "react-native-vector-icons/Entypo";
import TabBarIcon from "../../components/TabBarIcon";
import Icon from "react-native-vector-icons/FontAwesome";

export default class EventMoreDetailScreen extends React.Component {
  static navigationOptions = ({
    navigation
  }) => ({
    title: "イベント詳細"
  });

  constructor(props) {
    super(props);
    this.state = {
      changeButton: false,
      focused: false
    };
    this._changeButton = this._changeButton.bind(this);
    this._changeBtn = this._changeBtn.bind(this);
    this.onPressIcon = this.onPressIcon.bind(this);
  }


  onPressIcon = () => {
    console.log(this.state.focused);
    if (!this.state.focused) {
      this.setState({
        focused: true
      });
    } else {
      this.setState({
        focused: false
      });
    }
  }



  _changeButton = () => {
    console.log(`参加するを押したとき${this.state.changeButton}`);
    this.setState({
      changeButton: true
    });
  };
  _changeBtn = () => {
    console.log(`取り消すを押したとき${this.state.changeButton}`);
    this.setState({
      changeButton: false
    });
  };

  render() {
    console.log('最強');
    const changeDecision = this.state.changeButton;
    let changeBtn;

    if (!changeDecision) {
      changeBtn = (<RkButton onPress={
        this._changeButton
      }
        rkType="rounded"
        style={{
          width: "100%",
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20
        }}>取り消す </RkButton>
      );
    } else {
      changeBtn = (<RkButton onPress={
        this._changeBtn
      }
        rkType="rounded"
        style={{
          backgroundColor: "red",
          width: "100%",
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20
        }}>参加する </RkButton>
      );
    }
    let data = [];
    for (let i = 1; i < 50; i++) {
      data.push(`No.${i}`);
    }

    return (
      <ScrollView >
        <View style={styles.container}>
          <View style={styles.sub5}>
            <Image style={{
              width: "100%",
              height: 180
            }} source={require("../../assets/images/MSfes.png")} />
          </View>
          <View style={styles.sub3}>
            <View style={styles.sub}>
              <Text style={{ fontSize: 25 }}>
                いしがきMS </Text>
              <Text style={{ fontSize: 25 }}>
                日時： 9 / 24(月) 9: 00 </Text>
              <Text style={{ fontSize: 25 }}>
                場所： 盛岡城跡公園 </Text>
            </View>
            <View style={styles.sub2}>
              <TouchableOpacity onPress={this._onCalendarPress}>
                <Icon name="star" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.sub4}>
              <TouchableOpacity onPress={this.onPressIcon}>
                <TabBarIcon
                  size={30}
                  name={
                    Platform.OS === "ios"
                      ? `ios-star${this.state.focused ? "" : "-outline"}`
                      : "ios-star"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detail}>
            <RkText rkType="common"
              style={
                {
                  fontSize: 40,
                  justifyContent: "center"
                }
              }>詳細 </RkText> </View>
          <Text style={{ fontSize: 25 }}>
            いしがきミュージックフェスティバルの設営・ 撤去 </Text>
          <View style={styles.space} />
          <View style={styles.test}>
            <RkText rkType="common"
              style={{
                fontSize: 40
              }}>参加者 </RkText>
          </View>
          <View style={
            styles.main
          }>
            <FlatList style={{
              width: "100%"
            }}
              data={
                data
              }
              renderItem={
                ({
                  item
                }) => (<View style={
                  {
                    marginBottom: 5,
                    flex: 2,
                    flexDirection: "row",
                    borderWidth: 1,
                    height: 90,
                    borderColor: "gray"
                  }
                } >
                  { /* アイコンを以下に配置*/} <
                    Avatar large rounded source={
                      {
                        uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                      }
                    }
                    onPress={
                      () => console.log("Works!")
                    }
                    activeOpacity={
                      0.7
                    }
                  /> <View style={{
                    flex: 2,
                    padding: 3,
                    alignItems: "flex-start"
                  }} >
                    <Text style={{
                      fontSize: 50
                    }}>
                      佐藤慶吾 </Text> </View> </View>
                  )
              }
              keyExtractor={(item, index) => `list-${index}`} /> {changeBtn}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  },
  sub5: {
    width: "100%",
    height: 200,
    borderWidth: 1
  },
  sub: {
    flex: 7,
    width: "100%",
    height: 100
  },
  sub2: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  sub4: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  sub3: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "stretch"
  },
  detail: {
    width: "100%",
    height: 50,
    borderWidth: 1
  },
  space: {
    width: "100%",
    height: 250
  },
  test: {
    width: "100%",
    height: 50,
    borderWidth: 1
  },
  main: {
    width: "100%",
    height: 350
  }
});

RkTheme.setType("RkText", "common", {
  alignItems: "center"
});