import { View, Text,Button } from 'react-native'
import React, { useState } from 'react'
import { useRegisterUserMutation } from '../../../services/userAuthApi'
import { useNavigation,NavigationProp } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'





export default function Signup() {
    const [registration, setRegistration] = useState({
        email: '',
        name: '',
        password: '',
        password2: '',
        tc: false,
    })

   

    

  return (
    <SafeAreaView>
       <Text>Signup page</Text>

    </SafeAreaView>
    
  )
}