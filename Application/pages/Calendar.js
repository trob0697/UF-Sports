import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Calendar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Calendar Here!</Text>
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

export default Calendar;