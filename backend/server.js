import dotenv from "dotenv"
dotenv.config()

import app from "./src/app.js"
import connectDB from "./src/config/database.js"
import { createServer } from "http";
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer=createServer(app)
initSocket(httpServer)

connectDB()

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})