import React from "react";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import firebase from "../firebase.js";

class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
    setTimeout(() => this.props.toggleLoading(), 4000)
    //console.log(this.props.redux)
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);