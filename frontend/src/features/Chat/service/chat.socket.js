import { io } from "socket.io-client";



export const initializeSocketConnection=()=>{
const socket = io(import.meta.env.VITE_API_URL || "http://localhost:3000",{
    withCredentials:true
});

socket.on("connect",()=>{
    console.log("socket.io client is connected to server")
})
}
