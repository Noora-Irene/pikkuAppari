import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from'react-navigation-tabs';
import {FontAwesome5} from '@expo/vector-icons';
import MainScreen from '../screens/MainScreen';
import AllTargets from '../screens/AllTargets';
import SearchTarget from '../screens/SearchTarget';
import MapScreen from '../screens/MapScreen';

const Navi = createBottomTabNavigator({
    Lista: MainScreen,
    Kohteet: AllTargets,
    Etsi: SearchTarget,
    l: MapScreen
},
{
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const {routeName} = navigation.state;
            if (routeName === 'Lista') {
                return <FontAwesome5 name= 'list' size={15} color='coral' />;
            } else if  (routeName === 'Kohteet') {
                return <FontAwesome5 name= 'map' size={15} color='coral' />;
            } else if (routeName === 'Etsi') {
                return <FontAwesome5 name= 'searchengin' size={15} color='coral' />;
            }
        },
        tabBarOptions: {
            activeTintColor: '#b22222',
            inactiveTintColor: '#dcdcdc',
            activeBackgroundColor: '#000000',
            inactiveBackgroundColor: '#b22222'
          }
    })
}
);

export default createAppContainer(Navi);