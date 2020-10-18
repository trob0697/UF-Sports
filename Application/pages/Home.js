import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';

import LiveScores from '../components/LiveScores.js';
import UpcomingEvents from '../components/UpcomingEvents.js';
import RecentNews from '../components/RecentNews.js';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image source={require('../assets/gatorlogo.jpg')} style={styles.gatorLogo} />
        </View>
        <LiveScores/>
        <UpcomingEvents/>
        <RecentNews/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subHeader: {
    flex: 2,
    backgroundColor: '#0021A5',
    borderColor: '#FA4616',
    borderWidth: 2
  },
  gatorLogo: {
    resizeMode: 'contain',
    width: '100%',
    height: 150 * scale - 10
  }
})

export default Home;