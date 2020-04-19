import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Button, TextInput} from 'react-native';
import MapView, {Marker} from 'react-native-maps';


export default function App() {

  const [address, setAddress] = useState({latitude: 68.3188098, longitude: 24.8331068});
  const [input, setInput] = useState('');


  const getAddress= () => {
    const url= 'http://www.mapquestapi.com/geocoding/v1/address?key=ko2vICghErBgA2Gp1yIqYBw6fZjfuhLK&location=' + input;
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setAddress(responseJson.results[0].locations[0].latLng);
        console.log('Array: ', responseJson.results[0].locations[0].latLng);
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  return (
    <View style={styles.wholeScreen}>
      <MapView
        style={{flex: 5}}
        initialRegion= {{
          latitude: 60.1699,
          longitude: 24.9384,
          latitudeDelta: 0.4360,
          longitudeDelta: 0.4260,
          }} >
          <Marker
            coordinate={{
              latitude: address.lat,
              longitude: address.lng
            }} 
            pinColor= 'yellow'
          />
      </MapView>
      <View style={styles.action}>
        <TextInput value={input} placeholder="Enter address" onChangeText={input => setInput(input)}/>
        <Button title="FIND" onPress={getAddress} /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 wholeScreen: {
    flex: 1
  },
  action: {
    flex: 1
  },
});
