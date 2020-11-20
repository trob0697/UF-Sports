import React from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class RecentResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    var date = new Date(this.props.results[0].date)
    var dateString = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    return(
      <View style={this.props.darkModeIsEnabled ? styles.containerDark : styles.container}>
        <Text style={styles.title}>Recent Results</Text>
        <Text style={styles.subHeadingSport}>{this.props.results[0].sport}</Text>
        <Text style={styles.subHeadingDate}>{dateString}</Text>
        <View style={styles.scoring}>
          <Image source={require("../assets/uflogo.png")} style={styles.teamLogo} />
          <Text style={styles.teamName}>UF</Text>
          <View style={styles.scoreBox}>
          <Text style={this.props.darkModeIsEnabled ? styles.scoreValuesDark : styles.scoreValues}>{this.props.results[0].team_score} - {this.props.results[0].opponent_score}</Text>
          </View>
          <Text style={styles.teamName}>{this.props.results[0].opponent_short_name}</Text>
          <Image source={{uri: this.props.results[0].opponent_image}} style={styles.teamLogo} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "#F5F5F5"
  },
  containerDark: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "#444444"
  },
  title: {
    fontSize: 14 * scale,
    color: "#FA4616",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5"
  },
  subHeadingSport: {
    textAlign: "center",
    fontSize: 10 * scale,
    color: "#FA4616",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5"
  },
  subHeadingDate: {
    textAlign: "center",
    fontSize: 8 * scale,
    color: "#FA4616",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5"
  },
  scoring: {
    flexDirection: "row",
    paddingTop: 5,
  },
  scoreBox: {
    flex: 2,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FA4616",
    height: 25 * scale,
    borderColor: "#0021A5",
    borderWidth: 0.5
  },
  scoreValues: {
    textAlign: "center",
    fontSize: 16 * scale,
    color: "#F5F5F5",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5"
  },
  scoreValuesDark: {
    textAlign: "center",
    fontSize: 16 * scale,
    color: "#444444",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5"
  },
  teamLogo: {
    flex: 1,
    flexDirection: "column",
    resizeMode: "contain",
    height: 28 * scale
  },
  teamName: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20 * scale,
    color: "#FA4616",
    textShadowRadius: 0.25,
    textShadowColor: "#0021A5"
  }
})

function mapStateToProps(state) {
  return {
    results: state.results
  }
}

export default connect(mapStateToProps)(RecentResults);