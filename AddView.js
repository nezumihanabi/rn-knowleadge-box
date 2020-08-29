import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Realm from "realm";
import base64 from "react-native-base64";
import { headerStyle } from "./constant/style.js";
import { Text, TextInput, View, Button, Image } from "react-native";

export default function AddView() {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState("");
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync(
        Permissions.CAMERA_ROLL
      );
      if (status !== "granted") {
        alert("カメラの許可が必要です");
      }
    }
  };

  const submit = () => {
    Realm.open({
      schema: [
        {
          name: "Know",
          properties: { key: "string", memo: "string", image: "string" },
        },
      ],
    }).then((realm) => {
      realm.write(() => {
        const current = new Date();
        realm.create("Know", {
          key: current.toString(),
          memo: value,
          image: base64.encode(image),
        });
      });
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      this.onSave(result.uri);
    }
  };
  useEffect(() => {
    getPermissionAsync();
  }, []);
  return (
    <View>
      <Text style={headerStyle}>投稿</Text>
      <TextInput
        style={{ height: "80px", margin: "10px" }}
        placeholder={"メモ"}
        value={value}
        onChangeText={(val) => setValue(val)}
      />
      <Button
        linearGradientProps={{ color: "red" }}
        onPress={pickImage}
        title="ファイルを選択"
      />
      <br />
      <Button onPress={submit} title="送信" />
      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}
    </View>
  );
}
