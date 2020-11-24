import React from "react";
import { StyleSheet, View, Text, FlatList, Image, SafeAreaView } from "react-native";
import firebase from "../firebase"
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'
import { connect } from "react-redux";

class Rosters extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedRoster: null
    }
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  
  render() {
    
    const renderItem = ({ item }) => (
        
        <View style = {{flex: 1, flexDirection: 'row', alignContent: 'center', padding: 5, backgroundColor: this.props.darkModeIsEnabled ? '#444444' : 'white'}}>
          <View style = {{marginRight: 5}}>
            <Image source={{uri: item.image}} style = {{width: 75, height: 100, resizeMode: 'contain'}}></Image>
          </View>

          <View style = {{flex: 1, flexDirection: 'column', alignContent: 'center'}}>
            <Text style = {{color: this.props.darkModeIsEnabled ? 'white' : 'black'}}>{item.number}, {item.name}, {item.position}</Text>
            <Text style = {{color: this.props.darkModeIsEnabled ? 'white' : 'black'}}>{item.hometown}, {item.year}</Text>
          </View>
        </View>

      
    );
  
    return (
      
      <SafeAreaView style={this.props.darkModeIsEnabled ? styles.containerDark : styles.container}>
        <View style = {{alignContent: 'center', justifyContent: 'center'}}>
          <RNPickerSelect
                onValueChange={(value) => this.setState({selectedRoster: value})}
                placeholder={{
                  label: 'Select a sport..',
                  value: null
                }}
                items={[
                    { label: 'Football', value: '0' },
                    { label: 'Men\'s Basketball', value: '1' },
                    { label: 'Women\'s Basketball', value: '2'},
                    { label: 'Women\'s Lacrosse', value: '3'},
                    { label: 'Women\'s Soccer', value: '4'}
                ]}
                style = {{
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    color: this.props.darkModeIsEnabled ? 'white' : 'black',
                    paddingRight: 30,
                },
                iconContainer: {
                  top: 10,
                  right: 12,
                },}
              }
                Icon={() => {
                  return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                }}
            />
        </View>

        <FlatList
        data={this.props.rosters[this.state.selectedRoster]}
        renderItem={renderItem}
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        keyExtractor={item => item.name}
        />
      </SafeAreaView>
    )
  }
}
function mapStateToProps(state) {
  return {
    rosters: state.rosters,
    darkModeIsEnabled: state.darkModeIsEnabled
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#444444"
  },
  item: {
    padding: 10,

    height: 44,
    justifyContent: 'center',

  },
})

export default connect(mapStateToProps)(Rosters);