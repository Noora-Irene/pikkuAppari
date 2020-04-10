import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';


const Navi= createStackNavigator({
    Main: MainScreen,
    Map: MapScreen
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