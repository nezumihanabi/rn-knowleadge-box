import React from "react";
import AddView from "./AddView";
import Icon from "react-native-vector-icons/FontAwesome";
import ListView from "./ListView";
import LoginView from "./LoginView";
import DetailView from "./DetailView";
import ProfileView from "./ProfileView";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { getStorage, setStorage } from "./util/storage.js";

export default function App() {
  const [localUser, setLocalUser] = React.useState(undefined);
  const [user, setUser] = React.useState(undefined);
  try {
    getStorage("user", setLocalUser);
  } catch (e) {
    console.log(e);
  }
  if (!localUser) {
    if (!user) {
      return <LoginView setUser={setUser} />;
    } else {
      setStorage("user", user);
    }
  }
  return <AppContainer />;
}

const TableStack = createStackNavigator({
  一覧: ListView,
  詳細: DetailView,
});

const TabNavigator = createBottomTabNavigator(
  {
    Tab1: {
      screen: ProfileView,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => tabBarIconContent(tintColor, "home"),
        title: "マイページ",
      },
    },
    Tab2: {
      screen: TableStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => tabBarIconContent(tintColor, "list"),
        title: "一覧",
      },
    },
    Tab3: {
      screen: AddView,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => tabBarIconContent(tintColor, "plus"),
        title: "登録",
      },
    },
  },
  {
    initialRouteName: "Tab1",
  }
);

function tabBarIconContent(tintColor, name) {
  return <Icon name={name} size={26} style={{ color: tintColor }} />;
}

const AppContainer = createAppContainer(TabNavigator);
