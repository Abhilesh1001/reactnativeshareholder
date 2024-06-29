import AsyncStorage from "@react-native-async-storage/async-storage";


const storeAccessToken = async (value:any)=>{
    try {
        const new_Value = JSON.stringify(value)
        await AsyncStorage.setItem('access',new_Value)

    }catch(error){
        console.log(error)
    }
}

const storeRefreshToken = async (value:any)=>{
    try{
        const ref_token = JSON.stringify(value)
        await AsyncStorage.setItem('refresh',ref_token)
    }catch(error){
        console.log(error)
    }
}

const getAccessToken = async ()=>{
    try {
      
        const token = await AsyncStorage.getItem('access')
        console.log('tokenget',token)
        if(token !==null){
            return token
        }

    }catch(error){
        console.log(error)
    }
}

const removeToken = async() =>{
    try {
      
        const access = await AsyncStorage.removeItem('access')
        const refresh = await AsyncStorage.removeItem('refresh')

    }catch(error){
        console.log(error)
    }

}




const getRefreshToken = async ()=>{
    try {
      
        const token = await AsyncStorage.getItem('refresh')
        // console.log('tokenget',token)
        if(token !==null){
            return token
        }

    }catch(error){
        console.log(error)
    }
}

export {storeAccessToken,getAccessToken,removeToken,storeRefreshToken,getRefreshToken}