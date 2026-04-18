import React, { useEffect, useState, useRef } from 'react'
import { useChat } from '../hooks/useChat.js'
import { Plus, ArrowUp, History, MessageSquare, MoreHorizontal, Menu, X, MoreVertical, Trash2, LogOut } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../../auth/hooks/useAuth.js'
import MessageItem from '../components/MessageItem'
import NewChat from '../components/NewChat'
import ChatInput from '../components/ChatInput'
import { setCurrentChatId, setCurrentMessages } from '../chat.slice'
import DeleteModal from '../components/DeleteModal'


const Dashboard = () => {

    const [isRecentOpen, setIsRecentOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [selectedModel, setSelectedModel] = useState("mistral")
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
    const [activeMenuId, setActiveMenuId] = useState(null)
    const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false)
    const [deleteModalConfig, setDeleteModalConfig] = useState({ isOpen: false, chatId: null, chatTitle: '' })
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null)
    const scrollContainerRef = useRef(null)

    const scrollToBottom = (behavior = "auto") => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior })
        }
    }


    const { initializeSocketConnection, handleGetChats, handleGetMessages, handleSendMessage, handleDeleteChat } = useChat()
    const { handleLogout } = useAuth()
    const { chats, currentMessages, currentChatId } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 150

        if (isAtBottom) {
            scrollToBottom("auto")
        }
    }, [currentMessages])
    const handleStartNewChat = () => {
        dispatch(setCurrentChatId(null))
        dispatch(setCurrentMessages({ messages: [] }))
        if (window.innerWidth < 768) setIsSidebarOpen(false)
    }

    const handleSend = (msg, searchDepth, topic) => {
        handleSendMessage({ message: msg, chatId: currentChatId, model: selectedModel, searchDepth, topic });
    }

    useEffect(() => {
        initializeSocketConnection()
        handleGetChats()
    }, [])

    function GetMessages(chatId) {
        handleGetMessages(chatId)
        if (window.innerWidth < 768) setIsSidebarOpen(false)
    }

    const confirmDelete = () => {
        if (deleteModalConfig.chatId) {
            handleDeleteChat(deleteModalConfig.chatId);
            setDeleteModalConfig({ ...deleteModalConfig, isOpen: false });
        }
    };
    return (
        <main className='flex h-screen bg-neutral-900 overflow-hidden relative'>
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300'
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-neutral-950/95 backdrop-blur-xl border-r border-white/5 p-4 flex flex-col gap-4 
        transform transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:w-1/5 md:bg-neutral-950 md:backdrop-blur-none
      `}>
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-2 px-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary-dim/2 bg-neutral-800 flex items-center justify-center ">
                        <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                    </div>

                </div>

                {/* Close Button - Mobile Only */}
                <div className='absolute top-4 right-4 md:hidden'>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className='p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-all'
                    >
                        <X className='w-5 h-5' />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <div
                        onClick={handleStartNewChat}
                        className='flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors group'
                    >
                        <Plus className='text-neutral-300 w-5 h-5 group-hover:scale-110 transition-transform' />
                        <h1 className='text-sm font-medium text-neutral-300'>New Chat</h1>
                    </div>

                    <div
                        className='flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors'
                        onClick={() => setIsRecentOpen(!isRecentOpen)}
                    >
                        <History className='text-neutral-300 w-5 h-5' />
                        <h1 className='text-sm font-medium text-neutral-300'>Recent</h1>
                    </div>
                </div>

                {isRecentOpen && (
                    <div className='flex flex-col gap-1 mt-2 overflow-y-auto max-h-[60vh] custom-scrollbar'>
                        {chats?.chats?.map((chat) => (
                            <div
                                key={chat._id}
                                className='group relative flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors'
                            >
                                <div className='flex items-center gap-2 flex-1 min-w-0' onClick={() => GetMessages(chat._id)}>
                                    <MessageSquare className='text-neutral-400 w-4 h-4 shrink-0' />
                                    <span className='text-sm text-neutral-300 truncate'>{chat.title?.replace(/^["']+|["']+$/g, '')}</span>
                                </div>

                                <div className='relative'>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(activeMenuId === chat._id ? null : chat._id);
                                        }}
                                        className={`p-1 rounded-md hover:bg-neutral-700 transition-opacity ${activeMenuId === chat._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                    >
                                        <MoreVertical className='w-4 h-4 text-neutral-400' />
                                    </button>

                                    {activeMenuId === chat._id && (
                                        <>
                                            <div className='fixed inset-0 z-40' onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }} />
                                            <div className='absolute right-0 mt-1 w-32 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden z-50 ring-1 ring-white/10'>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeleteModalConfig({
                                                            isOpen: true,
                                                            chatId: chat._id,
                                                            chatTitle: chat.title?.replace(/^["']+|["']+$/g, '') || 'this chat'
                                                        });
                                                        setActiveMenuId(null);
                                                    }}
                                                    className='flex items-center gap-2 w-full text-left px-3 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all'
                                                >
                                                    <Trash2 className='w-3.5 h-3.5' />
                                                    Delete Chat
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* User Profile & Logout Section */}
                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between gap-3 px-2 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 shadow-inner group/user">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <span className="text-primary text-xs font-bold uppercase leading-none">
                                    {user?.username?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-[13px] font-semibold text-neutral-100 truncate leading-tight">
                                    {user?.username || 'User'}
                                </span>
                                <span className="text-[11px] text-neutral-500 truncate leading-tight">
                                    {user?.email || 'user@example.com'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all active:scale-90"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className='flex-1 relative flex flex-col h-screen w-full'>
                <div className='shrink-0 flex justify-between items-center p-4'>
                    <div className='flex items-center gap-4'>
                        {/* Premium Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className='md:hidden bg-neutral-800/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-700/50 active:scale-95 transition-all outline-none'
                        >
                            <Menu className='w-5 h-5' />
                        </button>
                        <h1 className='text-lg font-medium text-white tracking-wide'>ChatGPT</h1>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='relative'>
                            <button
                                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                className='flex items-center justify-between bg-black hover: text-xs font-medium text-neutral-400 hover:text-neutral-300 py-1.5 px-3 rounded-lg border border-neutral-800 shadow-sm focus:outline-none transition-all w-32 cursor-pointer'
                            >
                                <span>{selectedModel === 'mistral' ? 'Mistral' : 'Gemini Flash'}</span>
                                <svg className={`fill-current h-3.5 w-3.5 ml-2 transition-transform duration-200 ${isModelDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </button>

                            {isModelDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsModelDropdownOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-1 w-32 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl overflow-hidden z-50">
                                        <button
                                            onClick={() => {
                                                setSelectedModel('mistral');
                                                setIsModelDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${selectedModel === 'mistral' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'}`}
                                        >
                                            Mistral
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedModel('gemini');
                                                setIsModelDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${selectedModel === 'gemini' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'}`}
                                        >
                                            Gemini Flash
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className='relative'>
                            <button
                                onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
                                className='text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-lg focus:outline-none'
                            >
                                <MoreHorizontal className='w-6 h-6' />
                            </button>

                            {isHeaderMenuOpen && currentChatId && (
                                <>
                                    <div className='fixed inset-0 z-40' onClick={() => setIsHeaderMenuOpen(false)} />
                                    <div className='absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200'>
                                        <button
                                            onClick={() => {
                                                setDeleteModalConfig({
                                                    isOpen: true,
                                                    chatId: currentChatId,
                                                    chatTitle: chats?.chats?.find(c => c._id === currentChatId)?.title?.replace(/^["']+|["']+$/g, '') || 'this chat'
                                                });
                                                setIsHeaderMenuOpen(false);
                                            }}
                                            className='flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all'
                                        >
                                            <Trash2 className='w-4 h-4' />
                                            Delete Chat
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className='flex-1 overflow-y-auto pb-30 scroll-smooth'
                >
                    {(!currentChatId && (!currentMessages?.messages || currentMessages.messages.length === 0)) ? (
                        <NewChat onSendMessage={handleSend} />
                    ) : (
                        <div className='w-full md:w-[80%] mx-auto flex flex-col gap-6 mt-6 px-4 md:px-0'>
                            {currentMessages?.messages?.map((msg) => (
                                <MessageItem key={msg._id || msg.id} msg={msg} />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {(currentChatId || (currentMessages?.messages && currentMessages.messages.length > 0)) && (
                    <div className='absolute bottom-0 w-full bg-neutral-900/80 backdrop-blur-sm'>
                        <div className='w-full p-4 pt-2 pb-6'>
                            <div className='w-full md:w-[80%] mx-auto max-w-3xl px-4 md:px-0'>
                                <ChatInput onSend={handleSend} />
                            </div>
                        </div>
                    </div>
                )}

                <DeleteModal
                    isOpen={deleteModalConfig.isOpen}
                    onClose={() => setDeleteModalConfig({ ...deleteModalConfig, isOpen: false })}
                    onConfirm={confirmDelete}
                    chatTitle={deleteModalConfig.chatTitle}
                />
            </div>
        </main>
    )
}

export default Dashboard
