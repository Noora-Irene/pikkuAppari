import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function MapScreen(props) {

  const [location, setLocation] = useState({latitude: 68.3188098, longitude: 24.8331068});
  const [address, setAddress] = useState({latitude: 68.3188098, longitude: 24.8331068});
  const { params} = props.navigation.state;

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } =  await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
    }
    getAddress();
  };

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
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
          }} 
        region={{ 
          latitude: address.latitude, 
          longitude: address.longitude,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
          }}
          >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }} 
            pinColor='blue'
            title='Olet tässä' 
          />
           { address !== undefined && address !== null ? <Marker
            coordinate={{
              latitude: address.latitude,
              longitude: address.longitude 
            }}
            title= {params.input}
          /> :
            <Marker
              coordinate={{
                latitude: 60.200692, 
                longitude: 24.934302
              }}
              title='Haaga-Helia'
            /> }
      </MapView>
    </View>
  );
}
MapScreen.navigationOptions={
  headerTitle: 'Kohde'
};
const styles = StyleSheet.create({
 wholeScreen: {
    flex: 1
  }
});