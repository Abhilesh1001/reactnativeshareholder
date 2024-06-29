import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { baseurl } from '../../alldata/basedata'
import Toast from 'react-native-toast-message'
import { jwtDecode } from "jwt-decode";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken, getUser, getUserId, clearAuthToken, clearUser, getMainheader } from '../../../redux/slice';
import { StateProps } from '../../../type/user'
import { storeAccessToken, getAccessToken, removeToken, storeRefreshToken, getRefreshToken } from '../../../services/AsyncStorageService';


export type RootStackParamList = {
    Registration: undefined;
    Login: undefined;
    Signup: undefined;
    ShopTab: undefined;
    UserPanelTab: undefined,
};

export const useLogin = () => {
    const { authToken } = useSelector((state: StateProps) => state.counter)
    const dispatch = useDispatch()
    // console.log(authToken?.access)


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);



    const handleSubmit = async () => {
        setLoading(true);
        const data = {
            email: email,
            password: password
        }
        try {

            const response = await axios.post(`${baseurl}cus/authlogin/`, data)
            navigation.navigate('UserPanelTab');
            const res = response.data
            const tokenRefresh = res.token.refresh;
            const tokenAcess = res.token.access;
            console.log(tokenAcess)
            await storeAccessToken(tokenAcess)
            await storeRefreshToken(tokenRefresh)
            dispatch(getAuthToken({ 'refresh': tokenRefresh, 'access': tokenAcess }));
            const userToken: { name: string, user_id: number } = jwtDecode(tokenAcess)
            dispatch(getUser(userToken.name));
            dispatch(getUserId(userToken.user_id));
            setLoading(false);

            Toast.show({
                type: 'success',
                text1: 'You are successfully login',
                position: 'top',
                topOffset: 0,

            });

        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'warning',
                text1: 'Error occured',
                position: 'top',
                topOffset: 0,

            });
            setLoading(false);
        }
    }

    // updatetoken 

    const updataToken = async () => {
        console.log('refrehtoken', authToken?.refresh)

        try {
            const data: { data: { access: string }, status: number } = await axios.post(`${baseurl}cus/api/token/refresh/`, { 'refresh': authToken?.refresh });
            if (data.status === 200 && authToken?.refresh !== undefined) {
                const tokenAcess = data.data.access
                dispatch(getAuthToken({ 'refresh': authToken?.refresh, 'access': tokenAcess }))
                await storeAccessToken(tokenAcess);
                await storeAccessToken(authToken.refresh)
                const userToken: { name: string, user_id: number } = jwtDecode(tokenAcess)
                dispatch(getUser(userToken.name))
                dispatch(getUserId(userToken.user_id))
            } else {
                handleLogout()
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const time = 1000 * 60;

        const initializeAuth = async () => {
            const tokenAccess = await getAccessToken();
            // console.log('checked', tokenAccess);

            if (tokenAccess) {
                const userToken: { name: string; user_id: number } = jwtDecode(tokenAccess);
                dispatch(getUser(userToken.name));
                dispatch(getUserId(userToken.user_id));

                // Clear any existing interval
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }

                intervalRef.current = setInterval(() => {
                    updataToken();
                }, time);
            }
        };

        initializeAuth();

        // Cleanup function to clear the interval
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [authToken?.access, dispatch]);

    //   handlelogout 

    const handleLogout = async () => {
        navigation.navigate('Login');
        await removeToken();
        dispatch(clearAuthToken(''));
        dispatch(clearUser(''));
    };

    return { email, setEmail, password, setPassword, handleSubmit, handleLogout }
}