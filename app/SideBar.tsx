import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useLogin } from './hooks/login/useLogin';
import LoanCollection from './loan/LoanCollection';


export type StateProps = {
    counter: {
        user: string | null,
        mainheader: string,
        authToken: {
            access: string
        }
    }
}

type RootStackParamList = {
    Login: undefined;
    LoanCollection:undefined
};


export default function SideBar(props: DrawerContentComponentProps) {
    const { user } = useSelector((state: StateProps) => state.counter)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const {handleLogout} =useLogin()


    return (
        <DrawerContentScrollView {...props}>
            <View style={{ margin: 14 }}>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>{user}</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem label='Logout' onPress={handleLogout} />
            <DrawerItem label='LoanCollection'  onPress={()=>navigation.navigate('LoanCollection')} />
        </DrawerContentScrollView>
    );
}
