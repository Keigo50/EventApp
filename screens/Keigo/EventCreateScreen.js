import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { RkButton, RkTextInput, RkTheme, RkText } from "react-native-ui-kitten";
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-material-dropdown";
import Entypo from "react-native-vector-icons/Entypo";

export default class EventCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{ paddingLeft: 20 }}
      >
        <Entypo name="chevron-left" size={40} color="black" />
      </TouchableOpacity>
    )
  });

  render() {
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
        value: " "
      },
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
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <ScrollView>
          <View style={styles.main}>
            <View style={{ width: "100%", height: 70, marginVertical: 10 }}>
              <Dropdown
                itemCount={3}
                dropdownPosition={1}
                label="カテゴリー"
                data={data}
              />
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
            </View>
            <View style={{ padding: 40 }} />
            <View>
              <RkText rkType="text">イベントタイトル</RkText>
              <RkTextInput
                autoFocus={true}
                rkType="textInput"
                keyboardType="default"
              />
            </View>
            <View>
              <RkText rkType="text">画像</RkText>
            </View>
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
              <Button title="画像の編集" />
            </View>
            <View>
              <RkText rkType="text">開催日時</RkText>
              <RkTextInput
                rkType="textInput"
                textContentType="password"
                keyboardType="default"
              />
            </View>
            <View>
              <RkText rkType="text">開催場所</RkText>
              <RkTextInput
                rkType="textInput"
                textContentType="password"
                keyboardType="default"
              />
            </View>
            <View>
              <RkText rkType="text">詳細</RkText>
              <View
                style={{
                  marginTop: 10,
                  paddingLeft: 10,
                  borderWidth: 0.8,
                  width: "100%",
                  alignItems: "flex-start"
                }}
              >
                <RkTextInput
                  rkType="myEvent"
                  keyboardType="default"
                  multiline
                  numberOflines={4}
                />
              </View>
            </View>
            <RkButton rkType="btn">作成</RkButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

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

RkTheme.setType("RkTextInput", "myEvent", {
  input: {
    underLineColor: "white",
    backgroundColor: "white",
    height: 100,
    fontSize: 20,
    marginHorizontal: 0,
    marginVertical: 0,
    marginLeft: 0
  },
  container: {
    underlineColor: "red",
    underlineWidth: 0
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

RkTheme.setType("RkButton", "btn", {
  marginTop: 10,
  width: "100%",
  height: 60,
  color: "#fff",
  fontSize: 25,
  marginBottom: 10,
  backgroundColor: 
});

RkTheme.setType("RkText", "text", {
  fontSize: 25
});
