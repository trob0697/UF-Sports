import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0
    }
  }

  renderItem = ({ item, index }) => {
    var date = new Date(item.date)
    var dateString = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " "
    return (
      <View key={index}>
        <Text style={styles.eventText}>{item.sport}</Text>
        <Text style={styles.eventSubText1}>UF{item.location == "H" ? " vs " : " at "}{item.opponent}</Text>
        <Text style={styles.eventSubText2}>{dateString}{item.time}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Upcoming Events</Text>
        <Carousel
          data={this.props.events}
          renderItem={this.renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          onSnapToItem={(index) => this.setState({ currentIndex: index })}
        />
        <Pagination
          dotsLength={this.props.events.length}
          activeDotIndex={this.state.currentIndex}
          dotStyle={{ backgroundColor: "#FA4616" }}
          containerStyle={styles.pagination}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 15,
    paddingBottom: 0
  },
  title: {
    paddingLeft: 15,
    fontSize: 14 * scale,
    color: "#0021A5"
  },
  eventText: {
    paddingTop: 5,
    textAlign: "center",
    fontSize: 12 * scale,
    color: "#FA4616",
    textShadowRadius: 0.5,
    textShadowColor: "#0021A5"
  },
  eventSubText1: {
    textAlign: "center",
    fontSize: 14 * scale,
    color: "#FA4616",
    textShadowRadius: 0.5,
    textShadowColor: "#0021A5"
  },
  eventSubText2: {
    textAlign: "center",
    fontSize: 8 * scale,
    color: "#FA4616",
    textShadowRadius: 0.5,
    textShadowColor: "#0021A5"
  },
  pagination: {
    paddingTop: 4 * scale,
    paddingBottom: 0
  }
})

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(UpcomingEvents);