import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {MARKERS} from '../data/Data';
import OwnLocation from '../components/OwnLocation';

export default function AllTargets(props) {

  console.log(MARKERS);

  const changeColor = () => {
    pinColor= 'grey';
    };

  return (
    <View style={styles.wholeScreen}>
        <MapView
          style={{flex: 5}}
          initialRegion= {{
            latitude: 60.1750, 
            longitude: 24.9316,
            latitudeDelta: 0.4360,
            longitudeDelta: 0.4360
            }} 
        >
          <OwnLocation navigation= {props.navigation} />

          {MARKERS.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
               latitude: marker.latitude,
               longitude: marker.longitude
              }}
              title={marker.title}
              pinColor={marker.pinColor}
              onPress = {changeColor }
            />
          ))}
        </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
 wholeScreen: {
    flex: 1
  }
});