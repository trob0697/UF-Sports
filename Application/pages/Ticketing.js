import React from "react";
import { Dimensions, StyleSheet, View, ImageBackground, Text, TouchableHighlight } from "react-native";

import WebViewer from "../components/WebViewer.js";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

class Ticketing extends React.Component {
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
      <View style={styles.container}>
      {this.state.webViewerVisible ?
        <WebViewer url={this.state.url} closeWebViewer={this.closeWebViewer}/>
      :
        <>
          <View style={styles.imageContainer} >
            <ImageBackground source={require("../assets/ticketing1.jpg")} borderRadius={11.5*scale} style={styles.image}>
              <TouchableHighlight onPress={() => this.openWebViewer("https://floridagators.com/sports/2015/12/10/_students_.aspx")}>
                <Text style={styles.text}>Student Tickets</Text>
              </TouchableHighlight>
            </ImageBackground>
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground source={require("../assets/ticketing2.jpg")} borderRadius={11.5*scale} style={styles.image}>
              <TouchableHighlight onPress={() => this.openWebViewer("https://floridagators.com/sports/2015/12/10/_tickets_.aspx")}>
                <Text style={styles.text}>Regular Tickets</Text>
              </TouchableHighlight>
            </ImageBackground>
          </View>
        </>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: SCREEN_WIDTH*0.8,
    height: SCREEN_HEIGHT*0.35,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: "center",
    fontSize: 30*scale,
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 20
  }
})

export default Ticketing;