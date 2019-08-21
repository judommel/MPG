import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from "react-native";
import axios from "axios";

class PlayerScreen extends React.Component {
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
    // axios
    //   .get("https://api.monpetitgazon.com/stats/championship/1/2018")
    //   .then(response => {
    //     this.setState({ data: response.data });
    //   });
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PlayerScreen;
