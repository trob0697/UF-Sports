import React from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

class LiveScores extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      live: false
    }
  }

  online = () => {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Live Scores</Text>
          <Ionicons name='md-radio-button-on' size={12 * scale} style={styles.live} />
        </View>
        <Text style={styles.subHeading}>Unavailable</Text>
        <Text style={styles.subHeadingTime}>0:00</Text>
        <View style={styles.scoring}>
          <Image source={require('../assets/uflogo.png')} style={styles.teamLogo} />
          <Text style={styles.teamName}>UF</Text>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreValues}>0 - 0</Text>
          </View>
          <Text style={styles.teamName}>???</Text>
          <Image source={require('../assets/unknown.png')} style={styles.teamLogo} />
        </View>
      </View>
    )
  }

  offline = () => {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Live Scores</Text>
          <Ionicons name='md-radio-button-off' size={15} style={styles.live} />
        </View>
        <Text style={styles.subHeading}>Unavailable</Text>
        <Text style={styles.subHeadingTime}>0:00</Text>
        <View style={styles.scoring}>
          <Image source={require('../assets/uflogo.png')} style={styles.teamLogo} />
          <Text style={styles.teamName}>UF</Text>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreValues}>0 - 0</Text>
          </View>
          <Text style={styles.teamName}>???</Text>
          <Image source={require('../assets/unknown.png')} style={styles.teamLogo} />
        </View>
      </View>
    )
  }

  render() {
    return (
      this.state.live ?
        this.online()
        :
        this.offline()
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
    paddingBottom: 0
  },
  title: {
    fontSize: 14 * scale,
    color: '#0021A5'
  },
  live: {
    alignSelf: 'center',
    paddingLeft: 5,
    color: '#ff1a1a'
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 10 * scale,
    color: '#FA4616',
    textShadowRadius: 0.5,
    textShadowColor: '#0021A5'
  },
  subHeadingTime: {
    textAlign: 'center',
    fontSize: 8 * scale,
    color: '#FA4616',
    textShadowRadius: 0.5,
    textShadowColor: '#0021A5'
  },
  scoring: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  scoreBox: {
    flex: 2,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA4616',
    height: 25 * scale,
    borderColor: '#0021A5',
    borderWidth: 0.5
  },
  scoreValues: {
    textAlign: 'center',
    fontSize: 16 * scale,
    color: '#F5F5F5',
    textShadowRadius: 2,
    textShadowColor: '#0021A5'
  },
  teamLogo: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'contain',
    height: 28 * scale
  },
  teamName: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20 * scale,
    color: '#FA4616',
    textShadowRadius: 0.5,
    textShadowColor: '#0021A5'
  }
})

export default LiveScores;