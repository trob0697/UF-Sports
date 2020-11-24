import React from "react"
import { Dimensions, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import { connect } from "react-redux";
import { Calendar } from "react-native-calendars"
import moment from "moment"

import CalendarPopup from "../components/CalendarPopup"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const scale = SCREEN_WIDTH / 320

const colorArray = ["#FA4616", "#0021A5",];

class CalendarPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      selectedDate: "",
      showEvents: false,
      selectedEventID: 0,
    }
  }

  // https://dev.to/afewminutesofcode/how-to-convert-an-array-into-an-object-in-javascript-25a4#
  // :~:text=To%20convert%20an%20array%20into%20an%20object%20we%20will%20create,key%20we%20have
  // %20passed%20in.
  convertArrayToObject = (array, key) => {
    const initialValue = {}
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      }
    }, initialValue)
  }

  displayEvents = () => {
    var filteredEvents = this.props.calendar.filter((calendarEvents) => {
      return calendarEvents.date == this.state.selectedDate 
    })
    return filteredEvents.map((event, i) => (
      <View key={i}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              modalVisible: true,
              selectedEventID: event.id,
            })
          }
          style={{backgroundColor: colorArray[i % colorArray.length], margin: 15, padding: 15, borderRadius: 10}}
        >
          <View>
            <Text style={{textAlign: 'left', color: 'white'}} >{event.title}</Text>
          </View>  
        </TouchableOpacity>
      </View>
    ))
  }

  render() {
    return (
      <ScrollView style={this.props.darkModeIsEnabled ? styles.darkContainer : styles.container}>
        <View style={styles.subHeader}>
          <Image
            source={require("../assets/gatorlogo.jpg")}
            style={styles.gatorLogo}
          />
        </View>
        <View>
          <Calendar

            onDayPress={(day) => {
              if(this.props.calendar.some((event) => event.date === day.dateString))
                this.setState({
                  selectedDate: day.dateString,
                  showEvents: true,
                })
            }}
            markedDates={this.convertArrayToObject(this.props.calendar,"date")}
          />
          <CalendarPopup
            events={this.props.calendar.filter((item) => {
              return item.id == this.state.selectedEventID
            })}
            selectedDate={this.state.selectedDate}
            isModalVisible={this.state.modalVisible}
            close={() => this.setState({ modalVisible: false })}
          />
        </View>
        <View style = {{paddingTop: 10}}>
          <Text style={{textAlign: 'center', fontSize: 15, textDecorationLine: 'underline'}}>{this.state.showEvents ? moment(this.state.selectedDate).format("MMMM Do[,] YYYY") : ""}</Text>
        </View>
        {this.state.showEvents && this.displayEvents()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#E0E0E0'
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
    calendar: state.calendar,
    darkModeIsEnabled: state.darkModeIsEnabled
  }
}

export default connect(mapStateToProps)(CalendarPage);