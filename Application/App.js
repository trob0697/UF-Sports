import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Loading from "./pages/Loading.js";
import HomeStack from "./navigators/HomeStack.js";
import CalendarStack from "./navigators/CalendarStack.js";
import RostersStack from "./navigators/RostersStack.js";
import TicketingStack from "./navigators/TicketingStack.js";
import SettingsStack from "./navigators/SettingsStack.js";
import AboutStack from "./navigators/AboutStack.js";


const Drawer = createDrawerNavigator()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.isLoading ?
          <Loading toggleLoading={this.toggleLoading} />
        :
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Calendar" component={CalendarStack} />
            <Drawer.Screen name="Rosters" component={RostersStack} />
            <Drawer.Screen name="Ticketing" component={TicketingStack} />
            <Drawer.Screen name="Settings" component={SettingsStack} />
            <Drawer.Screen name="About" component={AboutStack} />
          </Drawer.Navigator>
        }
      </NavigationContainer>
    )
  }
}

export default App;