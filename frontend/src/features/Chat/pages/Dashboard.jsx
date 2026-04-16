import React, { useEffect, useState, useRef } from 'react'
import { useChat } from '../hooks/useChat'
import { Plus, ArrowUp, History, MessageSquare, MoreHorizontal } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import MessageItem from '../components/MessageItem'
import NewChat from '../components/NewChat'
import ChatInput from '../components/ChatInput'
import { setCurrentChatId, setCurrentMessages } from '../chat.slice'


const Dashboard = () => {

    const [isRecentOpen, setIsRecentOpen] = useState(false)
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    
    const {initializeSocketConnection, handleGetChats, handleGetMessages, handleSendMessage} = useChat()
    const {chats, currentMessages, currentChatId} = useSelector((state) => state.chat)

    useEffect(() => {
        scrollToBottom()
    }, [currentMessages])
    const handleStartNewChat = () => {
        dispatch(setCurrentChatId(null))
        dispatch(setCurrentMessages({ messages: [] }))
    }

    const handleSend = (msg) => {
        handleSendMessage({ message: msg, chatId: currentChatId });
    }

    useEffect(()=>{
        initializeSocketConnection()
        handleGetChats()
    },[])

    function GetMessages(chatId){
        handleGetMessages(chatId)
    }
    console.log(currentMessages.messages)
  return (
    <main className='flex h-screen bg-neutral-900'>
      <div className='w-1/5 border-r border-neutral-800 bg-neutral-950 p-2 flex flex-col gap-2'>
           <div 
               onClick={handleStartNewChat} 
               className='flex items-center gap-1 p-3 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors'
           >
               <Plus className='text-neutral-300 w-5 h-5' />
               <h1 className='text-sm font-medium text-neutral-300'>New Chat</h1>
           </div>

           <div 
             className='flex items-center gap-1 p-3 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors'
             onClick={() => setIsRecentOpen(!isRecentOpen)}
           >
               <History className='text-neutral-300 w-5 h-5' />
               <h1 className='text-sm font-medium text-neutral-300'>Recent</h1>
           </div>

           {isRecentOpen && (
             <div className='flex flex-col gap-1 mt-2'>
                {chats?.chats?.map((chat) => (
                    <div onClick={()=>GetMessages(chat._id)} key={chat._id} className='flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors'>
                        <MessageSquare className='text-neutral-400 w-4 h-4' />
                        <span className='text-sm text-neutral-300 truncate'>{chat.title?.replace(/^["']+|["']+$/g, '')}</span>
                    </div>
                ))}
             </div>
           )}
      </div>
      <div className='w-4/5 relative flex flex-col h-screen'>
          <div className='shrink-0 flex justify-between items-center p-4'>
            <h1 className='text-lg font-medium text-white tracking-wide'>ChatGPT</h1>
            <button className='text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-lg focus:outline-none'>
                <MoreHorizontal className='w-6 h-6' />
            </button>
          </div>
          
          <div className='flex-1 overflow-y-auto pb-24'>
              {(!currentChatId && (!currentMessages?.messages || currentMessages.messages.length === 0)) ? (
                  <NewChat onSendMessage={handleSend} />
              ) : (
                  <div className='w-[80%] mx-auto flex flex-col gap-6 mt-6'>
                     {currentMessages?.messages?.map((msg) => (
                        <MessageItem key={msg._id || msg.id} msg={msg} />
                     ))}
                     <div ref={messagesEndRef} />
                  </div>
              )}
          </div>
          
          {(currentChatId || (currentMessages?.messages && currentMessages.messages.length > 0)) && (
            <div className='absolute bottom-0 w-full bg-neutral-900'>
              <div className='w-full p-4 pt-2 pb-6'>
                <div className='w-[80%] mx-auto max-w-3xl'>
                    <ChatInput onSend={handleSend} />
                </div>
              </div>
            </div>
          )}
      </div>
    </main>
  )
}

export default Dashboard
