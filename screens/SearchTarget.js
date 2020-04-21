import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ThemeProvider, Input, Button, Overlay, Picker } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SearchTarget() {

  const [location, setLocation] = useState({latitude: 68.3188098, longitude: 24.8331068});
  const [target, setTarget] = useState({latitude: 68.3188098, longitude: 24.8331068});
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [pcs, setPcs] = useState('');
  const [info, setInfo] = useState('');

  const input = text => {   
    setTarget(text);
  };

  const input1 = text => {   
    setAddress(text);
  };
  const input2 = text => {   
    setZip(text);
  };
  const input3 = text => {   
    setPcs(text);
  };

 const addToList = () => {
  setVisible(!visible);
  };

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
    const url= 'http://www.mapquestapi.com/geocoding/v1/address?key=ko2vICghErBgA2Gp1yIqYBw6fZjfuhLK&location=' + target;
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setTarget({
            latitude: responseJson.results[0].locations[0].latLng.lat,
            longitude: responseJson.results[0].locations[0].latLng.lng
          });
          console.log(target);
          console.log(responseJson.results[0].locations[0].latLng);
        })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  return (
    <View style={styles.wholeScreen}>
      <Overlay isVisible={visible} onBackdropPress={addToList}>
                <View style={styles.inputAreaOverlay}>
                  <Input placeholder= 'Katuosoite & paikkakunta' label='OSOITE' onChangeText={input1} value={address} 
                  />
                  <Input placeholder= '' label='POSTINRO' keyboardType='numeric' onChangeText={input2} value={zip} 
                  />
                  <Input placeholder= 'Laatikoiden lukumäärä' label='KPL' keyboardType='numeric' onChangeText={input3} value={pcs} 
                  />
                {/*    <Picker
                      selectedValue={info}
                      style={{ height: 80, width: '80%', color: 'grey' }}
                      onValueChange={(itemValue, itemIndex) => 
                        setInfo(itemValue)}
                    >
                      <Picker.Item label="Valitse koko" itemStyle={{color: 'grey'}}/> 
                      <Picker.Item label="ISO" itemStyle={{color: 'grey'}} value="ISO" />
                      <Picker.Item label="PIENI" value="PIENI" />
                      </Picker>*/}
                      <Button
                          icon={ <Icon
                                    name="arrow-circle-o-right"
                                    size={25}
                                    color="white"
                                  />
                                }
                                iconRight
                                title="Valmis"
                                //onPress={addToDatabase}
                        />
                </View>
              </Overlay>
      <MapView
        style={{flex: 5}}
        initialRegion= {{
          latitude: 60.6399,
          longitude: 26.1286,
          latitudeDelta: 0.4360,
          longitudeDelta: 0.4360,
          }} 
        region={{
          latitude: target.latitude,
          longitude: target.longitude,
          latitudeDelta: 0.4360,
          longitudeDelta: 0.4360,
          }} >
            <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }} 
            pinColor='blue'
            title='Olet tässä' 
          />
          { target !== undefined && target !== null ?  <Marker
            coordinate={{
              latitude: target.latitude,
              longitude: target.longitude 
            }}
            title=''
            pinColor= 'yellow'
            onPress={addToList}
          /> :
            <Marker
              coordinate={{
                latitude: 60.1750, 
                longitude: 24.9316
              }}
              title='Kansallismuseo'
            /> }
      </MapView>
      <ThemeProvider theme={theme}>
        <View style={styles.action}>
          <Input placeholder= 'Syötä katuosoite & paikkakunta' label='OSOITE' onChangeText={input} value={target} 
          />
            <Button
                icon={ <Icon
                          name="arrow-circle-o-right"
                          size={25}
                          color="white"
                        />
                      }
                      iconRight
                      title="Hae osoite"
                      onPress={getAddress}
                      />
        </View>
      </ThemeProvider>
    </View>
  );
}
SearchTarget.navigationOptions={
  headerTitle: 'Etsi kohde'
};
const theme = {
Button: {
  containerStyle: {
  marginVertical: 5
  },
  titleStyle: {
    color: '#fffafa'
  },
},
};
const styles = StyleSheet.create({
 wholeScreen: {
    flex: 1
  },
  action: {
    flex: 2
  },
});
