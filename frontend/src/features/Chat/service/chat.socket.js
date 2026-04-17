import { io } from "socket.io-client";



import { updateMessageChunk } from "../chat.slice";

let socket;
let savedDispatch;

export const initializeSocketConnection=(dispatch)=>{
    if (dispatch) savedDispatch = dispatch;
    
    if (socket) return socket;
    
    socket = io((import.meta.env.VITE_API_URL || "http://localhost:3000").trim(),{
        withCredentials:true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 99999
    });

    socket.on("connect",()=>{
        console.log("socket.io client is connected to server")
    })

    socket.on("chat-message-chunk", (data) => {
        console.log("chat-message-chunk", data);
        if (savedDispatch && data.chunk) {
            savedDispatch(updateMessageChunk({ chunk: data.chunk, chatId: data.chatId }));
        }
    });

    return socket;
}

export const joinChatRoom = (chatId) => {
    if (!socket) {
        socket = initializeSocketConnection();
    }
    if (chatId) {
        socket.emit("join-chat", chatId);
        console.log(`Joining room: ${chatId}`);
    }
}
