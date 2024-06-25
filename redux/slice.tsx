import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    logindata :{},
    authToken: { refresh: string; access: string }| null,
    user : string,
    userId : number|null,
    mainheader :string,
    alerthidden : string
  } 

  const initialState: CounterState = {
    logindata : {},
    authToken : null,
    user : "",
    userId:null,
    mainheader: 'mainPage',
    alerthidden :'hidden'
  }
 

  export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      getLogindata: (state, action: PayloadAction<{}>) => {
        state.logindata = action.payload
      },
      getAuthToken : (state,action:PayloadAction<{ refresh: string; access: string }| null>)=>{
          state.authToken = action.payload
      },
      getUser : (state,action:PayloadAction<string>) =>{
          state.user = action.payload
      },
      clearAuthToken : (state,action:PayloadAction<string>)=>{
          state.authToken=null 
      },
      clearUser :(state,action:PayloadAction<string>) =>{
          state.user =  action.payload
      },
      getUserId :(state,action:PayloadAction<number|null>) =>{
        state.userId = action.payload
      },
      clearUserId : (state,action:PayloadAction<number|null>) =>{
        state.userId = null 
      },
      getMainheader: (state,action:PayloadAction<string>)=>{
        localStorage.setItem('mainHeader',action.payload)
        state.mainheader = action.payload
      },

      
    },
  
  })
  
  // Action creators are generated for each case reducer function
  export const { getLogindata,getAuthToken,getUser,clearAuthToken,clearUser,getUserId,clearUserId,getMainheader} = counterSlice.actions
  
  export default counterSlice.reducer