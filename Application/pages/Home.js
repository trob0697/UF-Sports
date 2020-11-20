import React from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";

import WebViewer from "../components/WebViewer.js";
import LiveScores from "../components/LiveScores.js";
import UpcomingEvents from "../components/UpcomingEvents.js";
import RecentNews from "../components/RecentNews.js";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        webViewerVisible: false,
        url: ""
    }
  }

  openWebViewer = (inputUrl) => {
    this.setState({
      webViewerVisible: true,
      url: inputUrl
    })
  }

  closeWebViewer = () => {
    this.setState({
      webViewerVisible: false,
      url: ""
    })
  }

  render() {
    return (
      <View style={this.props.darkModeIsEnabled ? styles.containerDark : styles.container}>
      {this.state.webViewerVisible ?
        <WebViewer url={this.state.url} closeWebViewer={this.closeWebViewer}/>
      :
        <>
          <View style={styles.subHeader}>
            <Image source={require("../assets/gatorlogo.jpg")} style={styles.gatorLogo} />
          </View>
          <LiveScores darkModeIsEnabled={this.props.darkModeIsEnabled}/>
          <UpcomingEvents darkModeIsEnabled={this.props.darkModeIsEnabled}/>
          <RecentNews darkModeIsEnabled={this.props.darkModeIsEnabled} openWebViewer={this.openWebViewer}/>
        </>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#444444"
  },
  subHeader: {
    flex: 2,
    backgroundColor: "#0021A5",
    borderColor: "#FA4616",
    borderWidth: 2
  },
  gatorLogo: {
    resizeMode: "contain",
    width: "100%",
    height: 150 * scale - 10
  }
})

function mapStateToProps(state) {
  return {
    darkModeIsEnabled: state.darkModeIsEnabled
  }
}

export default connect(mapStateToProps)(Home);