import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSelector } from 'react-redux';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const [searchDepth, setSearchDepth] = useState('basic');
    const [searchLabel, setSearchLabel] = useState('Basic (Default)');
    const [topic, setTopic] = useState('general');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const textareaRef = useRef(null);
    const { isGenerating } = useSelector((state) => state.chat);

    const handleSend = () => {
        if (!message.trim()) return;
        onSend(message, searchDepth, topic);
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

    const depthOptions = [
        { label: 'Ultra Fast', value: 'basic' },
        { label: 'Fast', value: 'basic' },
        { label: 'Basic (Default)', value: 'basic' },
        { label: 'Advanced', value: 'advanced' }
    ];

    const toggleTopic = (selectedTopic) => {
        setTopic(prev => prev === selectedTopic ? 'general' : selectedTopic);
    };

    return (
        <div className='w-full flex flex-col bg-black rounded-3xl p-2 border border-neutral-700/50 focus-within: shadow-lg relative'>
            <textarea
                ref={textareaRef}
                className='w-full bg-transparent text-neutral-100 focus:outline-none placeholder:text-neutral-400 px-3 py-2 resize-none overflow-y-auto max-h-[200px] leading-relaxed text-[15px] disabled:opacity-50'
                placeholder={isGenerating ? 'AI is thinking...' : 'Message ChatGPT...'}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                
            />

            <div className='flex justify-between items-center mt-1 px-1'>
                <div className='flex items-center gap-2'>
                    <div className='relative'>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='flex items-center gap-1.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 text-xs font-medium py-1.5 px-3 rounded-full shadow-sm transition-all focus:outline-none'
                        >
                            <span>{searchLabel}</span>
                            <svg className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                                <div className="absolute bottom-full left-0 mb-2 w-40 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden z-50 py-1">
                                    {depthOptions.map((opt, i) => (
                                        <button
                                            key={opt.label + i}
                                            onClick={() => {
                                                setSearchDepth(opt.value);
                                                setSearchLabel(opt.label);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-[13px] text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => toggleTopic('news')}
                        className={`text-xs font-medium py-1.5 px-3 rounded-full border border-neutral-700/50 shadow-sm transition-all focus:outline-none ${topic === 'news' ? 'bg-white text-black border-white' : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900'}`}
                    >
                        News
                    </button>
                    <button
                        onClick={() => toggleTopic('finance')}
                        className={`text-xs font-medium py-1.5 px-3 rounded-full border border-neutral-700/50 shadow-sm transition-all focus:outline-none ${topic === 'finance' ? 'bg-white text-black border-white' : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900'}`}
                    >
                        Finance
                    </button>
                </div>

                <button
                    onClick={handleSend}
                    disabled={isGenerating || !message.trim()}
                    className='bg-white text-black disabled:bg-neutral-600 disabled:text-neutral-400 p-1.5 rounded-full transition-colors shrink-0 shadow-sm'
                >
                    <ArrowUp className='w-5 h-5' strokeWidth={3} />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
