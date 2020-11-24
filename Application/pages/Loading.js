import React from "react";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import firebase from "../firebase.js";

class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  async componentDidMount() {
    this.props.fetchResults(await this.fetchData("results"))
    this.props.fetchEvents(await this.fetchData("events"))
    this.props.fetchStories(await this.fetchData("stories"))
    this.props.fetchCalendar(await this.fetchDataTemp("calendarEvents"))
    this.props.fetchNews(await this.fetchData("news"))
    setTimeout(() => this.props.toggleLoading(), 4000)
    //console.log(this.props.redux)
  }

  fetchData = async (val) => {
    var snapshotArr = []
    await firebase.database().ref(val).once("value").then(snapshot => {
      snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val()
        snapshotArr.push(item)
      })
    })
    return snapshotArr
  }

  fetchDataTemp = async (val) => {
    var snapshotArr = []
    await firebase.database().ref("calendarEvents").once("value").then((snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val()
        item.marked = true
        snapshotArr.push(item)
      })
    })
    return snapshotArr
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/loadinggator.png")} style={styles.image} />
        <ActivityIndicator size="large" color="#FA4616" style={styles.loadingIndication} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#0021A5",
    justifyContent: "center"
  },
  image: {
    alignSelf: "center",
    resizeMode: "contain"
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
    fetchResults: (input) => dispatch({ type: "FETCH_RESULTS", payload: input }),
    fetchEvents: (input) => dispatch({ type: "FETCH_EVENTS", payload: input }),
    fetchStories: (input) => dispatch({ type: "FETCH_STORIES", payload: input }),
    fetchCalendar: (input) => dispatch({ type: "FETCH_CALENDAR", payload: input }),
    fetchNews: (input) => dispatch({ type: "FETCH_NEWS", payload: input })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);