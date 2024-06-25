import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashBoardScree from './DashBoardScree'
import SideBar from '../SideBar'


const Drawer = createDrawerNavigator()

export default function UserPanelTab() {
    
  return (
    <Drawer.Navigator drawerContent={props=><SideBar {...props} />} screenOptions={{headerStyle:{backgroundColor:'gray'},headerTintColor:'white'}}>
        <Drawer.Screen name='Dashboard' component={DashBoardScree} />
        {/* <Drawer.Screen name='' component={} /> */}

    </Drawer.Navigator>
  )
}