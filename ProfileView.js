import React from "react";
import { headerStyle, profStyle } from "./constant/style.js";
import { Text, View } from "react-native";
import { getStorage } from "./util/storage.js";

export default function ProfileView() {
  const [localUser, setLocalUser] = React.useState(undefined);

  React.useEffect(() => {
    getStorage("user", setLocalUser);
  }, []);

  return (
    <View>
      <Text style={headerStyle}>マイページ</Text>
      <Text style={profStyle}>ユーザーID : {localUser}</Text>
    </View>
  );
}
