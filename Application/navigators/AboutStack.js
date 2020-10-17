import React from "react";
import { NativeModules, Dimensions, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import Hamburger from "../components/Hamburger";
import About from "../pages/About.js";

const Stack = createStackNavigator()
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

export default class AboutStack extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="About"
          component={About}
          options={{
            headerLeft: () => <Hamburger />,
            headerTitle: () => <Text style={styles.text}>About</Text>,
            headerRight: () => <Ionicons name="md-refresh" onPress={() => NativeModules.DevSettings.reload()} size={32 * scale} style={styles.headerRefresh} />,
            headerStyle: styles.headerContainer,
          }}
        />
      </Stack.Navigator>
    )
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#0021A5',
    height: SCREEN_HEIGHT * 0.12
  },
  text: {
    color: '#FA4616',
    fontSize: 25 * scale
  },
  headerRefresh: {
    paddingRight: 25,
    color: '#FA4616'
  }
})