import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Picker
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";

class HomeScreen extends React.Component {
  state = {
    data: null,
    player: null,
    position: null
  };

  static navigationOptions = {
    title: "MPG",
    headerStyle: {
      backgroundColor: "#61C946"
    },
    headerTintColor: "#FFFFFF"
  };

  filterData = () => {
    if (this.state.data) {
      let filteredData;

      if (this.state.player === null && this.state.position === null) {
        filteredData = this.state.data;
      } else {
        if (this.state.player !== null && this.state.position === null) {
          filteredData = this.state.data.filter(item =>
            item.lastname.startsWith(this.state.player)
          );
        } else if (this.state.position !== null && this.state.player === null) {
          filteredData = this.state.data.filter(
            item => item.ultraPosition == this.state.position
          );
        } else {
          filteredData = this.state.data.filter(
            item =>
              item.lastname.startsWith(this.state.player) &&
              item.ultraPosition == this.state.position
          );
        }
      }

      return filteredData;
    }
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

    const positionArray = Object.entries(positions);

    let positionPicker = [];

    for (let i = 0; i < positionArray.length; i++) {
      positionPicker.push(
        <Picker.Item
          key={i}
          value={positionArray[i][0]}
          label={positionArray[i][1]}
        />
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.main}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TextInput
            placeholder="Nom joueur"
            style={[
              styles.customInputs,
              {
                width: "40%",
                borderColor: "#F5F6F8",
                borderWidth: 2,
                marginRight: 10
              }
            ]}
            value={this.state.player}
            onChangeText={text => this.setState({ player: text })}
          />
          <Picker
            onValueChange={itemValue => this.setState({ position: itemValue })}
            placeholder="Poste"
            selectedValue={this.state.position}
            style={{ width: "40%" }}
          >
            <Picker.Item key="placeholder" value={null} label="-- Poste --" />
            {positionPicker}
          </Picker>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#61C946",
            borderTopColor: "#61C946",
            borderTopWidth: 2,
            borderBottomWidth: 2,
            paddingVertical: 5
          }}
        >
          <Text style={[styles.tableHeader, { width: "30%" }]}>Joueur</Text>
          <Text style={[styles.tableHeader, { width: "25%" }]}>Poste</Text>
          <Text style={[styles.tableHeader, { width: "25%" }]}>Club</Text>
          <Text style={[styles.tableHeader, { width: "15%" }]}>Cote</Text>
        </View>
        <FlatList
          data={this.filterData()}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 7,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: "#F5F6F8"
                }}
                onPress={() =>
                  this.props.navigation.navigate("Player", {
                    name: item.id
                  })
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    marginHorizontal: 5,
                    width: "30%"
                  }}
                >
                  {item.lastname}
                </Text>
                <Text style={{ marginHorizontal: 5, width: "25%" }}>
                  {positions[item.ultraPosition]}
                </Text>
                <Text style={{ marginHorizontal: 5, width: "25%" }}>
                  {item.club}
                </Text>
                <Text
                  style={{
                    marginHorizontal: 5,
                    width: "10%",
                    textAlign: "center"
                  }}
                >
                  {item.quotation}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    );
  }

  componentDidMount() {
    axios
      .get("https://api.monpetitgazon.com/stats/championship/1/2018")
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
  tableHeader: {
    fontSize: 20,
    marginHorizontal: 5,
    textAlign: "center"
  },
  customInputs: {
    height: 50,
    fontSize: 17
  }
});

export default HomeScreen;
