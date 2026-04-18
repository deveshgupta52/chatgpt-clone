import React, { useState } from 'react';
import { Check, Copy, FileText, Image as ImageIcon } from 'lucide-react';
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
                <div className={`p-4 rounded-xl md:max-w-[85%] ${msg.role === 'user' ? 'bg-neutral-800 text-neutral-100 font-body' : 'bg-transparent text-neutral-300 font-body hover:bg-white/[0.02] font-light overflow-hidden pb-40'}`}>
                    {msg.role === 'ai' && !msg.content ? (
                        <div className="flex items-center gap-1.5 py-2 px-1">
                            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></div>
                        </div>
                    ) : (
                        <>
                            {msg.content && (
                                <Markdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: CodeBlock,
                                        p: ({ children }) => <p className="mb-4 last:mb-0 leading-7 text-[16px] tracking-wide">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                                        li: ({ children }) => <li className="leading-7 text-[16px] tracking-wide">{children}</li>,
                                        h1: ({ children }) => <h1 className="text-2xl font-medium font-headline text-neutral-200 mb-4 mt-6">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-xl font-medium font-headline text-neutral-200 mb-3 mt-5">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-lg font-medium font-headline text-neutral-200 mb-3 mt-4">{children}</h3>,
                                        blockquote: ({ children }) => <blockquote className="border-l-4 border-neutral-600 pl-4 italic text-neutral-400 my-4">{children}</blockquote>,
                                        a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{children}</a>,
                                        table: ({ children }) => <div className="overflow-x-auto my-6 rounded-lg font-body"><table className="w-full text-left border-collapse text-sm">{children}</table></div>,
                                        thead: ({ children }) => <thead className="bg-neutral-800 text-neutral-200">{children}</thead>,
                                        tbody: ({ children }) => <tbody className="divide-y divide-neutral-700 bg-neutral-900/30">{children}</tbody>,
                                        tr: ({ children }) => <tr className="hover:bg-neutral-800/30 transition-colors">{children}</tr>,
                                        th: ({ children }) => <th className="px-4 py-3 font-semibold border border-neutral-700">{children}</th>,
                                        td: ({ children }) => <td className="px-4 py-3 border border-neutral-700">{children}</td>
                                    }}
                                >
                                    {msg.content}
                                </Markdown>
                            )}
                            {!msg.content && msg.attachments && msg.attachments.length > 0 && msg.role === 'user' && (
                                <p className="text-xs text-neutral-500 italic mb-2">Sent {msg.attachments.length} attachment(s)</p>
                            )}
                        </>
                    )}

                    {/* Show Attachments */}
                    {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                            {msg.attachments.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-neutral-900/50 border border-white/5 px-2.5 py-1.5 rounded-lg">
                                    {file.fileType === 'image' ? (
                                        <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
                                    ) : (
                                        <FileText className="w-3.5 h-3.5 text-blue-500" />
                                    )}
                                    <span className="text-[11px] text-neutral-400 font-medium truncate max-w-[150px]">
                                        {file.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
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
