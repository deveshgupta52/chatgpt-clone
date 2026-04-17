import { getChats,deleteChat,getMessages,sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setCurrentChatId, setLoading, setCurrentMessages, setError } from "../chat.slice";

export const useChat=()=>{

const dispatch=useDispatch()
const { currentMessages, currentChatId } = useSelector(state => state.chat);

const handleGetChats=async()=>{
    try {
        dispatch(setLoading(true))
        const response=await getChats()
        dispatch(setChats(response))
    } catch (error) {
        dispatch(setError(error.message))
    }finally{
        dispatch(setLoading(false))
    }
}

const handleGetMessages=async(chatId)=>{
    try {
        dispatch(setLoading(true))
        const response=await getMessages(chatId)
        dispatch(setCurrentChatId(chatId))
        dispatch(setCurrentMessages(response))
    } catch (error) {
        dispatch(setError(error.message))
    }finally{
        dispatch(setLoading(false))
    }
}

    const handleSendMessage=async({message,chatId, model, searchDepth, topic})=>{
        try {
            // Optimistically update UI so user sees message instantly
            const optimisticUserMessage = { _id: Date.now().toString(), content: message, role: "user" };
            dispatch(setCurrentMessages({
                messages: [...(currentMessages?.messages || []), optimisticUserMessage]
            }));

            dispatch(setLoading(true))
            const response=await sendMessage({message,chatId, model, searchDepth, topic})
            const {chat,aiMessage,userMessage}=response
              dispatch(setCurrentMessages({
                messages: [...(currentMessages?.messages || []),userMessage, aiMessage]
            }));

            
            // Re-fetch everything to ensure accurate state & IDs
            handleGetChats()
            const finalChatId = (chat && chat._id) || chatId;
            await handleGetMessages(finalChatId)
            dispatch(setCurrentChatId(finalChatId))
    } catch (error) {
        dispatch(setError(error.message))
    }finally{
        dispatch(setLoading(false))
    }
}

const handleDeleteChat=async(chatId)=>{
    try {
        dispatch(setLoading(true))
        await deleteChat(chatId)
        // Re-fetch chats to update sidebar
        await handleGetChats()
        
        // If the deleted chat was the current one, reset state
        if (chatId === currentChatId) {
            dispatch(setCurrentChatId(null))
            dispatch(setCurrentMessages({ messages: [] }))
            await handleGetChats()
        }
    } catch (error) {
        dispatch(setError(error.message))
    }finally{
        dispatch(setLoading(false))
    }
}

    return {initializeSocketConnection,handleGetChats,handleSendMessage,handleDeleteChat,handleGetMessages}
}