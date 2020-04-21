import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';
import SearchTarget from '../screens/SearchTarget';

const Navi= createStackNavigator({
    Main: MainScreen,
    Map: MapScreen,
    Search: SearchTarget
},
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'midnightblue'
            },
            headerTintColor: 'white'
        }
    }
);

export default createAppContainer(Navi);