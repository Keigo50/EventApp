import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  RkButton,
  RkGalleryImage,
  RkText,
  RkTheme
} from "react-native-ui-kitten";
import { ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import Entypo from "react-native-vector-icons/Entypo";

export default class EventMoreDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "イベント詳細",
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={{ paddingLeft: 20 }}
      >
        <Entypo name="chevron-left" size={40} color="black" />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      changeButton: false
    };
    this._changeButton = this._changeButton.bind(this);
    this._changeBtn = this._changeBtn.bind(this);
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
    console.log("最強");
    const changeDecision = this.state.changeButton;
    let changeBtn;

        if (!changeDecision) {
            changeBtn = (
                <RkButton
                    onPress={this._changeButton}
                    rkType="rounded"
                    style={{
                        width: "100%",
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20
                    }}
                >
                    取り消す
        </RkButton>
            );
        } else {
            changeBtn = (
                <RkButton
                    onPress={this._changeBtn}
                    rkType="rounded"
                    style={{
                        backgroundColor: "red",
                        width: "100%",
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20
                    }}
                >
                    参加する

        </RkButton>
      );
    }


    let data = [];
    for (let i = 1; i < 50; i++) {
      data.push(`No.${i}`);
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.sub}>
            <Image
              style={{
                width: "100%",
                height: 180
              }}
              source={require("../../assets/images/MSfes.png")}
            />
            <Text style={{ fontSize: 25 }}>いしがきMS</Text>
            <Text style={{ fontSize: 25 }}>日時：9/24 9:00</Text>
            <Text style={{ fontSize: 25 }}>場所：盛岡城跡公園</Text>
          </View>
          <View style={styles.detail}>
            <RkText
              rkType="common"
              style={{
                fontSize: 40,
                justifyContent: "center"
              }}
            >
              詳細
            </RkText>
          </View>
          <Text style={{ fontSize: 25 }}>
            いしがきミュージックフェスティバルの設営・撤去
          </Text>
          <View style={styles.space} />
          <View style={styles.test}>
            <RkText
              rkType="common"
              style={{
                fontSize: 40
              }}
            >
              参加者
            </RkText>
                    </View>
                    <View style={styles.main}>
                        <FlatList
                            style={{
                                width: "100%"
                            }}
                            data={data}
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
                                        source={{
                                            uri:
                                                "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                                        }}
                                        onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}
                                    />
                                    <View
                                        style={{
                                            flex: 2,
                                            padding: 3,
                                            alignItems: "flex-start"
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 50
                                            }}>佐藤慶吾</Text>

                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => `list-${index}`}
                        />
                        {changeBtn}
                    </View>

                </View>
              )}
              keyExtractor={(item, index) => `list-${index}`}
            />
            {changeBtn}
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
  sub: {
    width: "100%",
    height: 300,
    borderWidth: 1
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
