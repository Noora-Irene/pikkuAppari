import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Button, Text} from 'react-native';
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
  };

  const getAddress= () => {
    const url= 'http://www.mapquestapi.com/geocoding/v1/address?key=ko2vICghErBgA2Gp1yIqYBw6fZjfuhLK&location=' + params.input;
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setAddress(responseJson.results[0].locations[0].latLng);
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
          latitude: 60.1699,
          longitude: 24.9384,
          latitudeDelta: 0.4360,
          longitudeDelta: 0.4260,
          }} >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }} 
            pinColor='green'
            title='Sijaintini' 
          />
           { address !== null ? <Marker
            coordinate={{
              latitude: address.lat,
              longitude: address.lng 
            }}
            title= 'Haettu osoite'
            pinColor= 'yellow' 
          /> :
            <Marker
              coordinate={{
                latitude: 60.200692, 
                longitude: 24.934302
              }}
              title='Haaga-Helia'
            /> }
      </MapView>
      <View style={styles.action}>
        <Button title="SHOW ADDRESS" onPress={getAddress} />
          <Text> {params.input} </Text>
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