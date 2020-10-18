import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../firebase.js';

class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  async componentDidMount() {
    this.props.fetchEvents(await this.fetchData('events'))
    this.props.fetchStories(await this.fetchData('stories'))
    setTimeout(() => this.props.toggleLoading(), 4000)
    //console.log(this.props.redux)
  }

  fetchData = async (val) => {
    var snapshotArr = [];
    await firebase.database().ref(val).once('value').then(snapshot => {
      snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();
        snapshotArr.push(item);
      })
    })
    return snapshotArr
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

function mapStateToProps(state) {
  return {
    redux: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: (input) => dispatch({ type: 'FETCH_EVENTS', payload: input }),
    fetchStories: (input) => dispatch({ type: 'FETCH_STORIES', payload: input })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);