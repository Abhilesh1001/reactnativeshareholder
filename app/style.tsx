import {StyleSheet,View,Text} from 'react-native'
import Toast from 'react-native-toast-message'
import { ToastConfigParams } from 'react-native-toast-message';

interface ToastProps extends ToastConfigParams<any> {
    text1?: string; // text1 can be undefined
    props: {
      uuid: string;
    };
  }


const styles = StyleSheet.create({
    container: {
      marginHorizontal: 30,
      padding: 10,
      marginTop:20
    },
    labelText: {
      fontSize: 20,
      fontWeight:'bold',
      color: 'black',
    },
    input :{
        height:40,
        borderWidth:1,
        paddingHorizontal:15,
        borderRadius :15,   
        
    },
    inputWithlabel : {
        marginBottom:10,
        marginTop:5
        
    }
  });


export const toastConfig = {
    warning: ({ text1, props }: ToastProps) => (
      <View style={{width: '100%', backgroundColor: 'orange' }}>
        <Text style={{paddingLeft:4,fontSize:15}} >{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
    success: ({ text1, props }: ToastProps) => (
      <View style={{width: '100%', backgroundColor: 'green',display:'flex',alignItems:'center',justifyContent:'center' }}>
        <Text style={{paddingLeft:4,fontSize:15,color:'white'}} >{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
    error: ({ text1, props }: ToastProps) => (
      <View style={{width: '100%', backgroundColor: 'green',display:'flex',alignItems:'center',justifyContent:'center' }}>
        <Text style={{paddingLeft:4,fontSize:15,color:'red'}} >{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
    
  };



export {styles}