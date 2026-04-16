import {createSlice} from "@reduxjs/toolkit"


const chatSlice = createSlice({
    name:"chat",
    initialState:{
        chats:[],
        currentChatId:null,
        currentMessages:[],
        loading:false,
        error:null

    },
    reducers:{
        setChats:(state,action)=>{
            state.chats=action.payload
        },
        setCurrentMessages:(state,action)=>{
            state.currentMessages=action.payload
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const {setChats,setCurrentChatId,setLoading,setError,setCurrentMessages}=chatSlice.actions

export default chatSlice.reducer