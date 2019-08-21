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

  static navigationOptions = {
    title: "Détails du joueur",
    headerStyle: {
      backgroundColor: "#61C946"
    },
    headerTintColor: "#FFFFFF"
  };

  render() {
    if (this.state.data === null) {
      return <ActivityIndicator size="large" color="#61C946" />;
    }

    const positions = {
      10: "Gardien",
      20: "Défenseur",
      21: "Latéral",
      31: "Milieu Déf.",
      32: "Milieu Off.",
      40: "Attaquant"
    };

    return (
      <View style={styles.main}>
        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "700" }}>
          {this.state.data.firstname} {this.state.data.lastname}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>
          {positions[this.state.data.ultraPosition]}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>
          {this.state.data.club}
        </Text>

        <View style={{ borderBottomColor: "#F5F6F8" }} />
      </View>
    );
  }

  componentDidMount() {
    let player = this.props.navigation.state.params.name.slice(7);

    axios
      .get(`https://api.monpetitgazon.com/stats/player/${player}?season=2018`)
      .then(response => {
        this.setState({ data: response.data });
      });
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PlayerScreen;
