import { generateChatTitle, generateResponse } from "../services/ai.service.js"
import ChatModel from "../models/chat.model.js";
import MessageModel from "../models/message.model.js";
export const sendMessageController = async (req, res) => {
    try {
        const { message,chatId} = req.body;
       
        let chatTitle;
        let chat;
        let finalChatId;
        if(!chatId){
            chatTitle=await generateChatTitle(message)

         chat = await ChatModel.create({
                user: req.user.id,
                title: chatTitle
        });
       
    }

     const userMessage = await MessageModel.create({
            chat: chatId || chat._id,
            content: message,
            role: "user"
        })

    const messages=await MessageModel.find({chat:chatId || chat._id})
     
          const result = await generateResponse(messages);

        const aiMessage = await MessageModel.create({
            chat: chatId || chat._id,
            content: result,
            role: "ai"
        })
        if (chatId) {
            await ChatModel.findByIdAndUpdate(chatId, { updatedAt: new Date() });
        }

        res.status(201).json({
            chatTitle:chatTitle,
            aiMessage:aiMessage,
            userMessage:userMessage,
            chat:chat
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate AI response",
            error: error.message 
        });
    }
}

export const getChats=async(req,res)=>{
    try {
        const chats=await ChatModel.find({user:req.user.id}).sort({updatedAt:-1})
        res.status(200).json({
            success:true,
            message:"Chats fetched successfully",
            chats
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get chats",
            error: error.message 
        });
    }
}

export const getMessages=async(req,res)=>{
    try {
        const {chatId}=req.params

        const chat=await ChatModel.findOne({
            _id:chatId,
            user:req.user.id
        })
        if(!chat){
            return res.status(404).json({
                success:false,
                message:"Chat not found"
            })
        }
        const messages=await MessageModel.find({chat:chatId})
        res.status(200).json({
            success:true,
            message:"Messages fetched successfully",
            messages
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get messages",
            error: error.message 
        });
    }
}

export const deleteChat=async(req,res)=>{
    try {
        const {chatId}=req.params

        const chat=await ChatModel.findOne({
            _id:chatId,
            user:req.user.id
        })
        if(!chat){
            return res.status(404).json({
                success:false,
                message:"Chat not found"
            })
        }
        await ChatModel.deleteOne({_id:chatId})
        await MessageModel.deleteMany({chat:chatId})
        res.status(200).json({
            success:true,
            message:"Chat deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete chat",
            error: error.message 
        });
    }
}