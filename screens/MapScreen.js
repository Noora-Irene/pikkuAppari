import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import OwnLocation from '../components/OwnLocation';

export default function MapScreen(props) {

  const [address, setAddress] = useState({latitude: 68.3188098, longitude: 24.8331068});
  const { params} = props.navigation.state;

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress= () => {
    const url= 'http://www.mapquestapi.com/geocoding/v1/address?key=ko2vICghErBgA2Gp1yIqYBw6fZjfuhLK&location=' + params.input;
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setAddress({
          latitude: responseJson.results[0].locations[0].latLng.lat,
          longitude: responseJson.results[0].locations[0].latLng.lng
        });
        console.log(address);
        console.log(responseJson.results[0].locations[0].latLng);
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
          latitude: 60.6399,
          longitude: 26.1286,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
          }} 
        region={{ 
          latitude: address.latitude, 
          longitude: address.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
          }}
          >
            <OwnLocation navigation= {props.navigation} />
         
           { address !== undefined && address !== null ?
            <Marker
              coordinate={{
                latitude: address.latitude,
                longitude: address.longitude 
              }}
              title= {params.input}
            /> :
            <Marker
              coordinate={{
                latitude: 60.1750, 
                longitude: 24.9316
                }}
                title='Kansallismuseo'
            /> }
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
 wholeScreen: {
    flex: 1
  }
});