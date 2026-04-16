import {Server} from 'socket.io'

let io;
export function initSocket(httpServer){
     io=new Server(httpServer,{
        cors:{
            origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
            credentials:true
        }

    })

    console.log("socket server is running")

    io.on("connection",(socket)=>{
        console.log("New User Connected: "+socket.id)
})
}

export function getIo(){
    if(!io){
        throw new Error("socket.io is not initialized")
    }
    return io
}