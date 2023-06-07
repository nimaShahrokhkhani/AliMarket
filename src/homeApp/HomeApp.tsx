import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '../home/HomeScreen';
import { Category } from '../../utils/types';
import { SettingsScreen } from '../settings/SettingsScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useLayoutEffect } from 'react';
import { Colors } from '../../assets/colors/Colors';
import { Image } from 'react-native';
import { FavouriteScreen } from '../favourite/FavouriteScreen';

export type RootBottomTabParamList = {
    Home: { category?: Category };
    Settings: undefined;
    Favourites: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootBottomTabParamList>();

export const HomeApp = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'HomeApp'>) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={Colors.white}
            inactiveColor={'black'}
            barStyle={{ backgroundColor: Colors.balck }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Image source={require('../../assets/images/home.png')} style={{width: 25, height: 25}} />
                  ),
            }} />
            <Tab.Screen name="Favourites" component={FavouriteScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Image source={require('../../assets/images/wish-list.png')} style={{width: 25, height: 25}} />
                  ),
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Image source={require('../../assets/images/setting.png')} style={{width: 25, height: 25}} />
                  ),
            }} />
        </Tab.Navigator>
    );
}