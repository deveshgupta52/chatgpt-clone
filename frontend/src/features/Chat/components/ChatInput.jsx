import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paperclip, X, Plus, FileText, Image as ImageIcon, Loader2, ArrowUp } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const [searchDepth, setSearchDepth] = useState('basic');
    const [searchLabel, setSearchLabel] = useState('Basic (Default)');
    const [topic, setTopic] = useState('general');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const { isGenerating } = useSelector((state) => state.chat);
    const { handleUploadFiles } = useChat();

    const [isUploading, setIsUploading] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);

    const handleSend = () => {
        if (!message.trim() && attachedFiles.length === 0) return;
        onSend(message, searchDepth, topic, attachedFiles);
        setMessage('');
        setAttachedFiles([]);
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

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        try {
            setIsUploading(true);
            const response = await handleUploadFiles(files);
            if (response.success) {
                // response.files contains the ImageKit results
                setAttachedFiles(prev => [...prev, ...response.files]);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeFile = (fileId) => {
        setAttachedFiles(prev => prev.filter(f => f.fileId !== fileId));
    };

    return (
        <div className='w-full flex flex-col bg-black rounded-3xl p-2 border border-neutral-700/50 focus-within:shadow-lg relative'>
            {/* File Previews */}
            {attachedFiles.length > 0 && (
                <div className='flex flex-wrap gap-2 px-3 py-2 border-b border-neutral-800/50 mb-1'>
                    {attachedFiles.map((file) => (
                        <div key={file.fileId} className='relative flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl group'>
                            {file.fileType === 'image' ? <ImageIcon className='w-4 h-4 text-emerald-500' /> : <FileText className='w-4 h-4 text-blue-500' />}
                            <span className='text-xs text-neutral-300 max-w-[120px] truncate'>{file.name}</span>
                            <button 
                                onClick={() => removeFile(file.fileId)}
                                className='absolute -top-1.5 -right-1.5 bg-neutral-800 text-neutral-400 hover:text-white rounded-full p-0.5 border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity'
                            >
                                <X className='w-3 h-3' />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className='flex items-start gap-1'>
                <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className='hidden' 
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isGenerating || isUploading}
                    className='mt-2 ml-1 p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-2xl transition-all disabled:opacity-50 shrink-0'
                >
                    {isUploading ? <Loader2 className='w-5 h-5 animate-spin' /> : <Plus className='w-5 h-5' />}
                </button>

                <textarea
                    ref={textareaRef}
                    className='w-full bg-transparent text-neutral-100 focus:outline-none placeholder:text-neutral-400 px-3 py-2 pt-3 resize-none overflow-y-auto max-h-[200px] leading-relaxed text-[15px] disabled:opacity-50'
                    placeholder={isGenerating ? 'AI is thinking...' : (isUploading ? 'Uploading files...' : 'Message ChatGPT...')}
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={isGenerating || isUploading}
                />
            </div>

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
                    disabled={isGenerating || isUploading || (!message.trim() && attachedFiles.length === 0)}
                    className='bg-white text-black disabled:bg-neutral-600 disabled:text-neutral-400 p-1.5 rounded-full transition-colors shrink-0 shadow-sm'
                >
                    <ArrowUp className='w-5 h-5' strokeWidth={3} />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
