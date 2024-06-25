import AsyncStorage from "@react-native-async-storage/async-storage";


const storeToken = async (value:any)=>{
    try {
        const new_Value = JSON.stringify(value)
        await AsyncStorage.setItem('token',new_Value)

    }catch(error){
        console.log(error)
    }
}


const getToken = async ()=>{
    try {
      
        const token = await AsyncStorage.getItem('token')
        if(token !==null){
            return token
        }

    }catch(error){
        console.log(error)
    }
}

const removeToken = async() =>{
    try {
      
        const token = await AsyncStorage.removeItem('token')

    }catch(error){
        console.log(error)
    }

}

export {storeToken,getToken,removeToken}