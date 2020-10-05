import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading Here!</Text>
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

export default Loading;