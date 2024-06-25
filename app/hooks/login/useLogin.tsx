import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { baseurl } from '../../alldata/basedata'
import Toast from 'react-native-toast-message'
import { jwtDecode } from "jwt-decode";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { getAuthToken,getUser,getUserId,clearAuthToken,clearUser,getMainheader } from '../../../redux/slice';
import {StateProps} from '../../../type/user'
import { storeToken,getToken,removeToken } from '../../../services/AsyncStorageService';


export type RootStackParamList = {
    Registration: undefined;
    Login: undefined;
    Signup : undefined;
    ShopTab :undefined;
    UserPanelTab:undefined,
  };

export const useLogin=()=>{
    const { authToken } = useSelector((state: StateProps) => state.counter)
    const dispatch = useDispatch()

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const handleSubmit= async ()=>{
        setLoading(true);
        const data = {
            email : email,
            password : password 
        }
        try{
            console.log('ok')
            const response = await axios.post(`${baseurl}cus/authlogin/`, data)
            navigation.navigate('UserPanelTab');
            const res = response.data
            const tokenRefresh = res.token.refresh;
            const tokenAcess = res.token.access;
            await storeToken(res.token)
            dispatch(getAuthToken({ 'refresh': tokenRefresh, 'access': tokenAcess }));
            const userToken: { name: string, user_id: number } = jwtDecode(tokenAcess)
            dispatch(getUser(userToken.name));
            dispatch(getUserId(userToken.user_id));
            setLoading(false);
            console.log(userToken)
            // console.log(res)
            Toast.show({
                type: 'success',
                text1: 'You are successfully login',
                position:'top',
                topOffset:0,

              });

        }catch(error){
            console.log(error)
            Toast.show({
                type: 'warning',
                text1: 'Error occured',
                position:'top',
                topOffset:0,

              });
              setLoading(false);
        }
    }

    // updatetoken 

    const updataToken = async () => {
        const tokenJson:any = await getToken();
        const token = JSON.parse(tokenJson)
        const tokenRefresh = token.refresh
        const data = await axios.post(`${baseurl}cus/api/token/refresh/`, { 'refresh': tokenRefresh });
        
        if (data.status === 200 && authToken?.refresh !== undefined) {
            const token = data.data
            dispatch(getAuthToken(token))
            await storeToken(token);
            const userToken: { name: string, user_id: number } = jwtDecode(token.access)
            dispatch(getUser(userToken.name))
            dispatch(getUserId(userToken.user_id))
        } else {
            handleLogout()
        }
    }


    useEffect(() => {
        const time = 1000 * 4 * 60;
        const initializeAuth = async () => {
            const tokenJson:any = await getToken();
            const token = JSON.parse(tokenJson)
             const tokenAcess = token.access
            if (tokenAcess) {
                const userToken: { name: string, user_id: number } = jwtDecode(tokenAcess);
                dispatch(getUser(userToken.name));
                dispatch(getUserId(userToken.user_id));

                const interval = setInterval(() => {
                    updataToken();
                }, time);
                return () => clearInterval(interval);
            }
        };
        initializeAuth();
    }, [authToken?.access]);

//   handlelogout 

const handleLogout = async () => {
    navigation.navigate('Login');
    await removeToken();
    dispatch(clearAuthToken(''));
    dispatch(clearUser(''));
};

    return {email,setEmail,password,setPassword,handleSubmit,handleLogout}
}