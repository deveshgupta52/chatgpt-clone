import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js'
import { deleteChat, fileUploadController, getChats, getMessages, sendMessageController } from '../controllers/chat.controller.js'
import multer from 'multer'
const storage=multer.memoryStorage()
const upload=multer({storage:storage})
const chatRouter=express.Router()


chatRouter.post('/message',authUser,sendMessageController)
chatRouter.get('/chats',authUser,getChats)
chatRouter.get('/messages/:chatId',authUser,getMessages)
chatRouter.delete('/delete-chat/:chatId',authUser,deleteChat)
chatRouter.post('/file',authUser,upload.array('files'),fileUploadController)

export default chatRouter