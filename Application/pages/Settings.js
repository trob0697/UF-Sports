import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Here!</Text>
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

export default Settings;