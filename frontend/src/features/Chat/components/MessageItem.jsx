import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

const MessageItem = ({ msg }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(msg.content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} group w-full mb-2`}>
            <div className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-xl max-w-[80%] ${msg.role === 'user' ? 'bg-neutral-800 text-neutral-100 font-body' : 'bg-transparent text-neutral-300 font-body font-light overflow-hidden'}`}>
                    <Markdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code: CodeBlock,
                            p: ({children}) => <p className="mb-4 last:mb-0 leading-7 text-[16px] tracking-wide">{children}</p>,
                            ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                            li: ({children}) => <li className="leading-7 text-[16px] tracking-wide">{children}</li>,
                            h1: ({children}) => <h1 className="text-2xl font-semibold font-headline text-neutral-200 mb-4 mt-6">{children}</h1>,
                            h2: ({children}) => <h2 className="text-xl font-semibold font-headline text-neutral-200 mb-3 mt-5">{children}</h2>,
                            h3: ({children}) => <h3 className="text-lg font-semibold font-headline text-neutral-200 mb-3 mt-4">{children}</h3>,
                            blockquote: ({children}) => <blockquote className="border-l-4 border-neutral-600 pl-4 italic text-neutral-400 my-4">{children}</blockquote>,
                            a: ({children, href}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{children}</a>,
                            table: ({children}) => <div className="overflow-x-auto my-6 rounded-lg font-body"><table className="w-full text-left border-collapse text-sm">{children}</table></div>,
                            thead: ({children}) => <thead className="bg-neutral-800 text-neutral-200">{children}</thead>,
                            tbody: ({children}) => <tbody className="divide-y divide-neutral-700 bg-neutral-900/30">{children}</tbody>,
                            tr: ({children}) => <tr className="hover:bg-neutral-800/30 transition-colors">{children}</tr>,
                            th: ({children}) => <th className="px-4 py-3 font-semibold border border-neutral-700">{children}</th>,
                            td: ({children}) => <td className="px-4 py-3 border border-neutral-700">{children}</td>
                        }}
                    >
                        {msg.content}
                    </Markdown>
                </div>
            </div>
            <div className={`opacity-0 group-hover:opacity-100 transition-opacity mt-1 px-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-300 p-1 bg-neutral-800/30 rounded transition-colors"
                    title="Copy this message"
                >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            </div>
        </div>
    );
};

export default MessageItem;
