import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

class Loading extends React.Component {
  componentDidMount() {
    setTimeout(() => this.props.toggleLoading(), 4000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/loadinggator.png')} style={styles.image} />
        <ActivityIndicator size='large' color='#FA4616' style={styles.loadingIndication} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#0021A5',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  loadingIndication: {
    padding: 15
  }
})

export default Loading;