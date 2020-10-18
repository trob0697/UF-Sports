import React from "react";
import { Dimensions, StyleSheet, View, Text, ImageBackground } from "react-native";
import { connect } from "react-redux";
import Carousel from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class RecentNews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderItem = ({ item, index }) => {
    var date = new Date(item.date)
    var dateString = monthNames[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear()
    return (
      <ImageBackground key={index} source={{ uri: item.image }} style={styles.image} imageStyle={{ borderRadius: 25 }}>
        <View style={styles.imageContainer}>
          <View style={styles.textContainer}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.contentTitle}>{item.title}</Text>
              <Text style={styles.contentDate}>{dateString}</Text>
            </View>
            <Ionicons name="md-open" onPress={() => this.props.openWebViewer(item.url)} size={16 * scale} style={styles.open} />
          </View>
        </View>
      </ImageBackground>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recent News</Text>
        <Carousel
          data={this.props.stories}
          renderItem={this.renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH * 0.8}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: "#F5F5F5",
    paddingTop: 7.5
  },
  title: {
    paddingHorizontal: 15,
    fontSize: 14 * scale,
    color: "#0021A5"
  },
  image: {
    resizeMode: "contain",
    marginTop: 20,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.325
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 25
  },
  textContainer: {
    flexDirection: "row",
    padding: 5,
    width: SCREEN_WIDTH * 0.7,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#F5F5F5"
  },
  contentTitle: {
    maxWidth: SCREEN_WIDTH * 0.6,
    fontSize: 8 * scale,
    color: "#FA4616",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5",
  },
  contentDate: {
    textAlign: "center",
    fontSize: 6 * scale,
    color: "#FA4616",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5",
  },
  open: {
    alignSelf: "center",
    paddingHorizontal: 10,
    color: "#FA4616"
  }
})

function mapStateToProps(state) {
  return {
    stories: state.stories
  }
}

export default connect(mapStateToProps)(RecentNews);