import React from "react";
import { StyleSheet, View, Text, FlatList, Image, SafeAreaView } from "react-native";
import firebase from "../firebase"
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'

class Rosters extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rosterList: [],
      selectedRoster: null
    }
  }

  async componentDidMount(){

    await firebase
    .database()
    .ref('rosters')
    .once("value")
    .then((snapshot) => {
      var snapshotArr = []
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val()
        snapshotArr.push(item)
      })
    this.setState({ rosterList: snapshotArr})
    })

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
        
        <View style = {{flex: 1, flexDirection: 'row', alignContent: 'center', padding: 5}}>
          <View style = {{marginRight: 5}}>
            <Image source={{uri: item.image}} style = {{width: 75, height: 100, resizeMode: 'contain'}}></Image>
          </View>

          <View style = {{flex: 1, flexDirection: 'column', alignContent: 'center'}}>
            <Text>{item.number}, {item.name}, {item.position}</Text>
            <Text>{item.hometown}, {item.year}</Text>
          </View>
        </View>

      
    );
  
    return (
      <SafeAreaView style={styles.container}>
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
                style = {{inputIOS: {
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  color: 'black',
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
        data={this.state.rosterList[this.state.selectedRoster]}
        renderItem={renderItem}
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        keyExtractor={item => item.name}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  item: {
    padding: 10,

    height: 44,
    justifyContent: 'center',

  },
})

export default Rosters;