import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

class Browser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            browserRef: null,
            canGoForward: false,
            canGoBack: false,
        }
      }

    goBack = () => {
        if(this.state.browserRef && this.state.canGoBack){
            this.state.browserRef.goBack();
        }
    }

    goForward = () => {
        if(this.state.browserRef && this.state.canGoForward){
            this.state.browserRef.goForward();
        }
    }

    setBrowserRef = (browser) => {
        if(!this.state.browserRef){
            this.setState({
                ...this.state,
                browserRef: browser
            })
        }
    }

    onBrowserError = (syntheticEvent) => {
        const {nativeEvent} = syntheticEvent;
        console.warn("WebView error: ", nativeEvent)
    }

    onBrowserLoad = (syntheticEvent) => {
        this.setState({
            ...this.state,
            canGoForward: syntheticEvent.nativeEvent.canGoForward,
            canGoBack: syntheticEvent.nativeEvent.canGoBack
        })
    }

    onNavigationStateChange = (navState) => {
        this.setState({
            ...this.state,
            canGoForward: navState.canGoForward,
            canGoBack: navState.canGoBack
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.browserBar}>
                    <Ionicons
                        name="md-arrow-back"
                        size={23*scale}
                        style={this.state.canGoBack ? {} : {opacity: 0.3}}
                        onPress={this.goBack}
                    />
                    <Ionicons
                        name="md-exit"
                        size={23*scale}
                        onPress={this.props.closeWebViewer}
                    />

                    <Ionicons
                        name="md-arrow-forward"
                        size={23*scale}
                        style={this.state.canGoForward ? {} : {opacity: 0.3}}
                        onPress={this.goForward}
                    />
                </View>
                <WebView
                    ref={this.setBrowserRef}
                    originWhitelist={["*"]}
                    source={{uri: this.props.url}}
                    onLoad={this.onBrowserLoad}
                    onError={this.onBrowserError}
                    onNavigationStateChange={this.onNavigationStateChange}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    browserBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: 25*scale,
    },
    disabled: {
        opacity: 0.3
    }
})

export default Browser;