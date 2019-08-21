import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import HomeScreen from "./src/pages/HomeScreen";
import PlayerScreen from "./src/pages/PlayerScreen";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Player: {
    screen: PlayerScreen
  }
});

export default createAppContainer(AppNavigator);
