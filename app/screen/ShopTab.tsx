import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { createDrawerNavigator, } from '@react-navigation/drawer'
import HomrScreen from './HomrScreen';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Login from '../auth/login/Login';



type DrawerParamList = {
    Home: undefined;
    Details: undefined;
};

type RootStackParamList = {
    Login: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>()

export default function ShopTab() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    return (

        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomrScreen} options={{ headerRight: () => <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>Login</Text></TouchableWithoutFeedback> }} />

        </Drawer.Navigator>
    )
}