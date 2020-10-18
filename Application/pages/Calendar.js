import React from "react"
import { Dimensions, StyleSheet, View, Text, Image, ScrollView } from "react-native"
import firebase from "../firebase"
import { Calendar } from "react-native-calendars"
import CalendarPopup from "../components/CalendarPopup"
import { TouchableOpacity } from "react-native-gesture-handler"
import moment from "moment"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const scale = SCREEN_WIDTH / 320

const colorArray = ["#FA4616", "#0021A5",];

class CalendarPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarEvents: [],
      modalVisible: false,
      selectedDate: "",
      showEvents: false,
      selectedEventID: 0,
    }
  }

  async componentDidMount() {
    await firebase
      .database()
      .ref("calendarEvents")
      .once("value")
      .then((snapshot) => {
        var snapshotArr = []
        snapshot.forEach(function (childSnapshot) {
          var item = childSnapshot.val()
          var newItem = {
            ...item,
            marked: true,
          }
          snapshotArr.push(newItem)
        })

        // const testItem = {
        //   date: "2020-09-05",
        //   id: "11111",
        //   title: "Test Title",
        //   location: "Test Location",
        //   marked: true,
        // }
        // const testItem2 = {
        //   date: "2020-09-05",
        //   id: "11112",
        //   title: "Test Title2",
        //   location: "Test Location",
        //   marked: true,
        // }
        // const testItem3 = {
        //   date: "2020-09-05",
        //   id: "11113",
        //   title: "Test Title3",
        //   location: "Test Location",
        //   marked: true,
        // }
        // snapshotArr.push(testItem)
        // snapshotArr.push(testItem2)
        // snapshotArr.push(testItem3)


        this.setState({ calendarEvents: snapshotArr })
      })
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
    var filteredEvents = this.state.calendarEvents.filter((calendarEvents) => {
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
      <ScrollView>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Calendar</Text>
          <Image
            source={require("../assets/gatorlogo.jpg")}
            style={styles.gatorLogo}
          />
        </View>
        <View>
          <Calendar
            onDayPress={(day) => {
              if (
                this.state.calendarEvents.some(
                  (event) => event.date === day.dateString
                )
              )
                this.setState({
                  selectedDate: day.dateString,
                  showEvents: true,
                })
            }}
            markedDates={this.convertArrayToObject(
              this.state.calendarEvents,
              "date"
            )}
          />
          <CalendarPopup
            events={this.state.calendarEvents.filter((calendarEvents) => {
              return calendarEvents.id == this.state.selectedEventID
            })}
            selectedDate={this.state.selectedDate}
            isModalVisible={this.state.modalVisible}
            close={() => this.setState({ modalVisible: false })}
          />
        </View>
        <View>
          <Text style={{textAlign: 'center', fontSize: 15, textDecorationLine: 'underline'}}>{this.state.showEvents ? moment(this.state.selectedDate).format("MMMM Do[,] YYYY") : ""}</Text>
        </View>
        {this.state.showEvents && this.displayEvents()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#0021A5",
    height: SCREEN_HEIGHT * 0.12,
  },
  headerImage: {
    alignSelf: "center",
    resizeMode: "contain",
    width: SCREEN_HEIGHT * 0.11,
  },
  headerRefresh: {
    paddingRight: 25,
    color: "#FA4616",
  },
  container: {
    flex: 1,
  },
  subHeader: {
    backgroundColor: "#0021A5",
    borderColor: "#FA4616",
    borderWidth: 2,
  },
  subHeaderText: {
    textAlign: "center",
    color: "#F5F5F5",
    fontSize: 20 * scale,
  },
  gatorLogo: {
    resizeMode: "contain",
    width: "100%",
    height: 125 * scale - 10,
  },
})

export default CalendarPage;