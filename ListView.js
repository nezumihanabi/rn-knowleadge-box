import React, { useEffect, useState } from "react";
import Realm from "realm";
import { FlatList, View } from "react-native";
import { ListItem } from "react-native-elements";

export default function ListView(props) {
  const [realm, setRealm] = useState([]);
  useEffect(() => {
    Realm.open({
      schema: [
        {
          name: "Know",
          properties: { key: "string", memo: "string", image: "string" },
        },
      ],
    }).then((realm) => {
      setRealm(realm);
    });
  }, []);
  const list = realm ? realm.objects("Know") : [];
  return (
    <View>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.id}
            subtitle={item.memo}
            // eslint-disable-next-line react/prop-types
            onPress={() => props.navigation.navigate("Detail", item)}
          />
        )}
      />
    </View>
  );
}
