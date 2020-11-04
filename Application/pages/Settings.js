import React from "react";
import { Dimensions, StyleSheet, View, Text, Switch, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

import Feedback from "../components/Feedback.js";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pushNotificationsIsEnabled: false,
      darkModeIsEnabled: false
    }
  }

  togglePushNotifications = () => {
    this.setState({
      ...this.state,
      pushNotificationsIsEnabled: !this.state.pushNotificationsIsEnabled
    })
  }

  toggleDarkMode = () => {
    this.setState({
      ...this.state,
      darkModeIsEnabled: !this.state.darkModeIsEnabled
    })
  }

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={keyboardVerticalOffset}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View>
              <Text style={styles.headerText}>Version 1.1</Text>
            </View>

            <View style={styles.line}/>

            <View>
              <View style={styles.containerWithButton}>
                <Text style={styles.headerText}>Push Notifications</Text>
                <Switch
                  trackColor={{false: "#767577", true: "#008000"}}
                  onValueChange={this.togglePushNotifications}
                  value={this.state.pushNotificationsIsEnabled}
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
                  onValueChange={this.toggleDarkMode}
                  value={this.state.darkModeIsEnabled}
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
              <Feedback/>
            </View> 
          </View>
        </TouchableWithoutFeedback>  
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: "5%",
  },
  containerWithButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18 * scale,
    alignSelf: "flex-start"
  },
  about: {
    margin: 10
  },
  line: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10
  }
})

export default Settings;