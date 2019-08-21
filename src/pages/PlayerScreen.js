import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
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
        <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 10 }}>
          {this.state.data.club}
        </Text>

        <View
          style={{
            width: "60%",
            borderTopColor: "#61C946",
            borderTopWidth: 3,
            paddingTop: 10
          }}
        >
          <View style={styles.statBox}>
            <Text style={[styles.stats, { fontWeight: "700" }]}>
              Note Moyenne
            </Text>
            <Text style={[styles.stats]}>{this.state.data.stats.avgRate}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.stats, { fontWeight: "700" }]}>Cote</Text>
            <Text style={[styles.stats]}>{this.state.data.quotation}</Text>
          </View>
          {this.state.data.ultraPosition !== 10 && (
            <View style={styles.statBox}>
              <Text style={[styles.stats, { fontWeight: "700" }]}>Buts</Text>
              <Text style={[styles.stats]}>
                {this.state.data.stats.sumGoals}
              </Text>
            </View>
          )}
          {this.state.data.ultraPosition === 10 && (
            <View style={styles.statBox}>
              <Text style={[styles.stats, { fontWeight: "700" }]}>
                Buts concédés
              </Text>
              <Text style={[styles.stats]}>
                {this.state.data.stats.goalsConcededByMatch}
              </Text>
            </View>
          )}
          <View style={styles.statBox}>
            <Text style={[styles.stats, { fontWeight: "700" }]}>
              Titularisations
            </Text>
            <Text style={[styles.stats]}>
              {this.state.data.stats.appearances.starter}
            </Text>
          </View>
        </View>
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
  },
  stats: {
    textAlign: "center",
    fontSize: 17
  },
  statBox: {
    borderWidth: 2,
    marginVertical: 5
  }
});

export default PlayerScreen;
