import React from "react";
import { Dimensions, StyleSheet, View, Text, Switch, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { connect } from "react-redux";

import Feedback from "../components/Feedback.js";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={keyboardVerticalOffset}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={this.props.darkModeIsEnabled ? styles.containerDark : styles.container}>
            <View>
              <Text style={styles.headerText}>Version 1.1</Text>
            </View>

            <View style={styles.line}/>

            <View>
              <View style={styles.containerWithButton}>
                <Text style={styles.headerText}>Push Notifications</Text>
                <Switch
                  trackColor={{false: "#767577", true: "#008000"}}
                  onValueChange={() => {}}
                  value={false}
                  style={{alignSelf: "flex-end"}}
                />
              </View>
            </View>

            <View style={styles.line}/>

            <View>
              <View style={styles.containerWithButton}>
                <Text style={styles.headerText}>Dark Mode</Text>
                <Switch
                  trackColor={{false: "#767577", true: "#008000"}}
                  onValueChange={() => this.props.toggleDarkMode()}
                  value={this.props.darkModeIsEnabled}
                  style={{alignSelf: "flex-end"}}
                />
              </View>
            </View>

            <View style={styles.line}/>

            <View>
              <Text style={styles.headerText}>About</Text>
              <View style={{height: SCREEN_HEIGHT*0.25}}>
                <Text style={styles.about}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
              </View>
            </View>

            <View style={styles.line}/>

            <View>
              <Text style={styles.headerText}>Submit Feedback</Text>
              <Feedback darkModeIsEnabled={this.props.darkModeIsEnabled}/>
            </View> 
          </View>
        </TouchableWithoutFeedback>  
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: "5%"
  },
  containerDark: {
    padding: "5%",
    backgroundColor: "#444444"
  },
  containerWithButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18 * scale,
    alignSelf: "flex-start",
    color: "#FA4616",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5"
  },
  about: {
    margin: 10,
    color: "#FA4616",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5"
  },
  line: {
    height: 1,
    backgroundColor: "#FA4616",
    marginVertical: 10
  }
})

function mapStateToProps(state) {
  return {
    darkModeIsEnabled: state.darkModeIsEnabled
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleDarkMode: () => dispatch({ type: "TOGGLE_DARK_MODE" }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);