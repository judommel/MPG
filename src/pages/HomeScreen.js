import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from "react-native";

class HomeScreen extends React.Component {
  state = {
    data: null
  };

  render() {
    if (this.state.data === null) {
      return <ActivityIndicator size="large" color="#61C946" />;
    }

    return (
      <View style={styles.main}>
        <Text>Hello MPG!</Text>
      </View>
    );
  }

  componentDidMount() {
    axios
      .get("https://airbnb-api.now.sh/api/room?city=paris")
      .then(response => {
        this.setState({ data: response.data.rooms });
      });
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeScreen;
