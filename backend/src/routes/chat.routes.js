import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js'
import { deleteChat, getChats, getMessages, sendMessageController } from '../controllers/chat.controller.js'

const chatRouter=express.Router()


chatRouter.post('/message',authUser,sendMessageController)
chatRouter.get('/chats',authUser,getChats)
chatRouter.get('/messages/:chatId',authUser,getMessages)
chatRouter.delete('/delete-chat/:chatId',authUser,deleteChat)

export default chatRouter