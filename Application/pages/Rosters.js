import React from "react";
import { StyleSheet, View, Text } from "react-native";

class Rosters extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Rosters Here!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
})

export default Rosters;