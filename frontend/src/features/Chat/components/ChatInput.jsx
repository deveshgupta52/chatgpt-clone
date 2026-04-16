import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleSend = () => {
        if (!message.trim()) return;
        onSend(message);
        setMessage('');
        // Reset height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
        
        // Auto-resize textarea
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    };

    useEffect(() => {
        // Initial focus and height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, []);

    return (
        <div className='w-full flex items-end bg-black rounded-3xl p-3 pl-4 focus-within:bg-black transition-colors border border-transparent shadow-lg'>
            <textarea 
                ref={textareaRef}
                
                className='w-full  bg-transparent text-neutral-100 focus:outline-none placeholder:text-neutral-400 py-1 resize-none overflow-y-auto max-h-[200px] leading-relaxed text-[15px]' 
                placeholder='Message ChatGPT...' 
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button 
                onClick={handleSend}
                disabled={!message.trim()}
                className='bg-white text-black disabled:bg-neutral-600 disabled:text-neutral-400 p-1.5 rounded-full transition-colors shrink-0 ml-2 shadow-sm mb-1'
            >
               <ArrowUp className='w-5 h-5' strokeWidth={3} />
            </button>
        </div>
    );
};

export default ChatInput;
