import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import HomeScreen from "./src/pages/HomeScreen";
import PlayerScreen from "./src/pages/HomeScreen";
import { StyleSheet, Text, View } from "react-native";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Player: {
    screen: PlayerScreen
  }
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! It works!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

/*export default createAppContainer(AppNavigator);*/
