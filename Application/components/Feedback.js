import React from "react";
import { Dimensions, StyleSheet, View, TextInput, Alert, Button } from "react-native";
import email from "react-native-email";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

class Feedback extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    submitFeedback = () => {
        email("trtnufsports@gmail.com", {
            subject: "User Feedback",
            body: this.state.value
        })
        this.setState({value: ""})
        Alert.alert("Message Sent", " Thank you for your feedback!")
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={this.props.darkModeIsEnabled ? styles.textInputDark : styles.textInput}
                    multiline={true}
                    padding={10}
                    onChangeText={(e) => this.setState({value: e})}
                    value={this.state.value}
                />
                <Button title="Submit" onPress={() => this.submitFeedback()} disabled={this.state.value.length === 0}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: "5%"
    },
    textInput: {
        height: SCREEN_HEIGHT*0.25, 
        borderRadius: 10,
        color: "black",
        backgroundColor: "white",
        borderColor: "#FA4616",
        borderWidth: 1
    },
    textInputDark: {
        height: SCREEN_HEIGHT*0.25, 
        borderRadius: 10,
        color: "white",
        backgroundColor: "#878683",
        borderColor: "#FA4616",
        borderWidth: 1
    }
})

export default Feedback;