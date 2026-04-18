import { getChats,deleteChat,getMessages,sendMessage } from "../service/chat.api";
import { initializeSocketConnection, joinChatRoom } from "../service/chat.socket";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setCurrentChatId, setLoading, setCurrentMessages, setError, setGenerating } from "../chat.slice";

export const useChat=()=>{

const dispatch=useDispatch()
const { currentMessages, currentChatId } = useSelector(state => state.chat);

    const handleInitializeSocket = () => {
        initializeSocketConnection(dispatch);
    };

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
        joinChatRoom(chatId) 
    } catch (error) {
        dispatch(setError(error.message))
    }finally{
        dispatch(setLoading(false))
    }
}

    const handleSendMessage=async({message,chatId, model, searchDepth, topic})=>{
        try {
            // Optimistically update UI so user sees message instantly
            const optimisticUserMessage = { _id: "opt-user-" + Date.now(), content: message, role: "user" };
            const optimisticAiMessage = { _id: "opt-ai-" + Date.now(), content: "", role: "ai" };
            
            // Set generating to true to lock input
            dispatch(setGenerating(true));
            
            dispatch(setCurrentMessages({
                messages: [...(currentMessages?.messages || []), optimisticUserMessage, optimisticAiMessage]
            }));

            dispatch(setLoading(true))
            
            // Generate temporary ID for streaming (especially for new chats)
            const requestId = "req-" + Date.now();
            joinChatRoom(requestId);

            const response=await sendMessage({message,chatId, model, searchDepth, topic, requestId})
            const {chat,aiMessage,userMessage}=response
            
            // Re-fetch chats to update sidebar
            handleGetChats()
            
            const finalChatId = (chat && chat._id) || chatId;
            if (!chatId && finalChatId) {
                // If it was a new chat, join the room now
                joinChatRoom(finalChatId);
                dispatch(setCurrentChatId(finalChatId));
            }
    } catch (error) {
        dispatch(setError(error.message))
        dispatch(setGenerating(false));
    }finally{
        dispatch(setLoading(false))
        
        // Safety timeout: Re-enable after 60s if socket signal misses
        setTimeout(() => {
            dispatch(setGenerating(false));
        }, 60000);
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

    return {initializeSocketConnection: handleInitializeSocket,handleGetChats,handleSendMessage,handleDeleteChat,handleGetMessages,joinChatRoom}
}