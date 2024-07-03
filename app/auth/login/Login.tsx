import { View, Text,Button,TextInput,StyleSheet } from 'react-native'


import Toast from 'react-native-toast-message'
import { toastConfig,styles } from '../../style'
import { useLogin } from '../../hooks/login/useLogin';





export default function Login() {

   const {email,setEmail,password,setPassword,handleSubmit} = useLogin()

  return (
<View>
    <Toast config={toastConfig}  />
       <View style={styles.container}>
       <View style={styles.inputWithlabel} >
        <Text style={styles.labelText}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={(text:any)=>setEmail(text)} keyboardType='email-address' placeholder='Write your Email' />
       </View>

       <View style={styles.inputWithlabel} >
        <Text style={styles.labelText}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={(text:any)=>setPassword(text)} secureTextEntry={true} placeholder='Write your Email' />
       </View>

       <View>
        <Button title='Login' onPress={handleSubmit} color='green'  />
       </View>

       </View>

    </View>
  )
}


  
  