import {createSlice} from "@reduxjs/toolkit"


const chatSlice = createSlice({
    name:"chat",
    initialState:{
        chats:[],
        currentChatId:null,
        currentMessages:[],
        loading:false,
        error:null,
        isGenerating:false,

    },
    reducers:{
        setGenerating: (state, action) => {
            state.isGenerating = action.payload;
        },
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
        },
        updateMessageChunk: (state, action) => {
            const { chunk } = action.payload;
            if (!state.currentMessages.messages) {
                state.currentMessages.messages = [];
            }
            
            const messages = state.currentMessages.messages;
            const lastMessage = messages[messages.length - 1];

            if (lastMessage && lastMessage.role === "ai") {
                // Correctly append to existing AI message content
                lastMessage.content += chunk;
            } else {
                // First chunk of a new AI response
                messages.push({
                    _id: "loading-" + Date.now(),
                    content: chunk,
                    role: "ai"
                });
            }
        }
    }
})

export const {setChats,setCurrentChatId,setLoading,setError,setCurrentMessages, updateMessageChunk, setGenerating}=chatSlice.actions

export default chatSlice.reducer