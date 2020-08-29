import React from "react";
import { detailStyle } from "./constant/style.js";
import { Image, Text, View } from "react-native";

export default function DetailView(props) {
  const item = props.navigation.state.params;
  return (
    <View>
      <Text style={detailStyle}>メモ : {item.memo}</Text>
      <Image source={item.image} />
    </View>
  );
}
