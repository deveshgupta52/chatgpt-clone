import axios from "axios";

const api=axios.create({
    baseURL: `${(import.meta.env.VITE_API_URL || 'http://localhost:3000').trim()}/api/chat`,
    withCredentials:true
})

export const getChats=async()=>{
    const response=await api.get("/chats")
    return response.data
}

export const getMessages=async(chatId)=>{
    const response=await api.get(`/messages/${chatId}`)
    return response.data
}

export const deleteChat=async(chatId)=>{
    const response=await api.delete(`/delete-chat/${chatId}`)
    return response.data
}

export const sendMessage=async({message,chatId})=>{
    const response=await api.post("/message",{message,chatId})
    return response.data
}

