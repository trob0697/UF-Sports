import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class About extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>About Here!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})

export default About;