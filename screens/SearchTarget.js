import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, Picker, Text} from 'react-native';
import {Overlay, Input} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import OwnLocation from '../components/OwnLocation';
import * as firebase from 'firebase';

export default function SearchTarget(props) {

  const [target, setTarget] = useState({ latitude: 60.1750, longitude: 24.9316});
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [pcs, setPcs] = useState('');
  const [info, setInfo] = useState('');

  const [addressList, setOnList] = useState([]);

  const input = text => {   
    setTarget(text);
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
    getAddress();
  }, []);

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
  useEffect(() => {
    firebase.database().ref('addressList/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setOnList(prods);
    });
  }, []);

  saveItem = () => {
    firebase.database().ref('addressList/').push(
      {'address': address, 'zip': zip, 'pcs': pcs, 'info': info}
    );
    setZip('');
    setPcs('');
    setInfo('');
  }

  return (
    <View style={styles.wholeScreen}>
      <Overlay isVisible={visible} onBackdropPress={addToList}>
        <Input 
          placeholder= 'Katuosoite & paikkakunta' 
          label='OSOITE' 
          value={address} 
        />
        <Input 
          placeholder= '' 
          label='POSTINRO' 
          keyboardType='numeric' 
          onChangeText={input2} 
          value={zip} 
          />
        <Input 
          placeholder= 'Laatikoiden lukumäärä'
          label='KPL' 
          keyboardType='numeric' 
          onChangeText={input3} 
          value={pcs} 
        />
          <Text
            style={styles.pickerHeader} >
            LAATIKON KOKO
          </Text>
            <Picker
              style={{ height: 80, width: '80%', color: 'grey' }}
              selectedValue={info}
              onValueChange={(itemValue, itemIndex) => 
                setInfo(itemValue)}
            >
              <Picker.Item 
                label="Valitse" 
                itemStyle={{color: 'grey'}}
              /> 
              <Picker.Item
                label="ISO"
                itemStyle={{color: 'grey'}}
                value="ISO" 
              />
              <Picker.Item 
                label="PIENI" 
                value="PIENI"
              />
            </Picker>
            <View style={styles.overlay}>
              <TouchableOpacity style={styles.overlayButton} onPress={saveItem}>
                <Text
                  style={styles.buttonText}>
                  Valmis
                </Text>
              </TouchableOpacity>
            </View>
      </Overlay>
        <MapView
          style={{flex: 7}}
          initialRegion= {{
            latitude: 60.1750, 
            longitude: 24.9316,
            latitudeDelta: 0.4360,
            longitudeDelta: 0.4360,
            }} 
          region={{
            latitude: 60.1750, 
            longitude: 24.9316,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
            }} >
              <OwnLocation navigation= {props.navigation} />
              
              { target !== undefined && target !== null ? 
                <Marker
                  coordinate={{
                    latitude: target.latitude,
                    longitude: target.longitude 
                  }}
                  title=''
                  pinColor= 'blue'
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
        <View style={styles.action}>
          <Input
            placeholder= 'Syötä katuosoite & paikkakunta'
            label='OSOITE'
            onChangeText={input} 
            value={target} 
          />
            <TouchableOpacity style={styles.button} onPress={getAddress}>
              <Text
                style={styles.buttonText}>
                Hae osoite
              </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
 wholeScreen: {
    flex: 1
  },
  action: {
    flex: 2,
    alignItems: 'center'
  },
  overlay: {
    alignItems: 'center'
  },
  overlayButton: {
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  pickerHeader: {
    marginLeft: 10,
    marginTop: 10,
    color: '#b22222',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
},
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff8dc'
}
});
