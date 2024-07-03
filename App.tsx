import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './app/auth/signup/Signup';
import Login from './app/auth/login/Login';
import ShopTab from './app/screen/ShopTab';
import UserPanelTab from './app/screen/UserPanelTab';
import LoanCollection from './app/loan/LoanCollection';
import LoanCollectionView from './app/loan/LoanCollectionView';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { StateProps } from './type/user';


export type RootStackParamList = {
  ShopTab: undefined;
  Login: undefined;
  Signup: undefined;
  UserPanelTab: undefined;
  LoanCollection: undefined;
  LoanCollectionView: undefined;
};
const queryClient = new QueryClient()

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const {user} = useSelector((state:StateProps)=>state.counter)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* first child for this create drawer navigater */}
        <Stack.Screen name="ShopTab" component={ShopTab} options={{ headerShown: false }} />
       <Stack.Screen name="Login" component={Login} options={{}} />
        <Stack.Screen name="UserPanelTab" component={UserPanelTab} options={{ headerShown: false }} />

        <Stack.Screen name="Signup" component={Signup} options={{}} />
        <Stack.Screen name="LoanCollection" component={LoanCollection} />
        <Stack.Screen name="LoanCollectionView" component={LoanCollectionView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
