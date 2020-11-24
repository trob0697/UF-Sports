import React, { Component } from "react"
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import moment from "moment"
import { connect } from "react-redux";

class CalendarPopup extends Component {
  render() {
    return (
      <View style={this.props.darkModeIsEnabled ? styles.darkCenteredView : styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.isModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.")
          }}
        >
          <View style={styles.centeredView}>
            <View style={this.props.darkModeIsEnabled ? styles.darkModalView : styles.modalView}>
              {this.props.events.map((elem, i) => (
                <View key={i}>
                  <Text style={this.props.darkModeIsEnabled ? styles.darkModalText : styles.modalText}>
                    {moment(elem.date).format("MMM Do[,] YYYY")}
                  </Text>
                  <Text style={this.props.darkModeIsEnabled ? styles.darkModalText : styles.modalText}>{elem.title}</Text>
                  <Text style={this.props.darkModeIsEnabled ? styles.darkModalText : styles.modalText}>{elem.location}</Text>
                  {!!elem.time && (
                    <Text style={this.props.darkModeIsEnabled ? styles.darkModalText : styles.modalText}>{elem.time}</Text>
                  )}
                </View>
              ))}
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => this.props.close()}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    backgroundColor: '#444444',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  darkModalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'white'
  },
})

function mapStateToProps(state) {
  return {
    darkModeIsEnabled: state.darkModeIsEnabled
  }
}

export default connect(mapStateToProps)(CalendarPopup);