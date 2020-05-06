import React, { useState, useEffect } from 'react';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function OwnLocation(props) {

    const [location, setLocation] = useState({latitude: 68.3188098, longitude: 24.8331068});

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
        return (
            <Marker
                coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
                }} 
                title='Olet tässä'
                pinColor='blue'
            />
            /*  <View>
                    <Icon
                      name='truck-fast'
                      size={25}
                      color='mediumblue' 
                    />
                </View>
            </Marker>*/
    );
};