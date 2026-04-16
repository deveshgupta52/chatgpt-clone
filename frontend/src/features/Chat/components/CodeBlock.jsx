import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const [isCopied, setIsCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (!inline && match) {
        return (
            <div className="rounded-md overflow-hidden my-4 bg-[#1E1E1E] text-sm w-full">
                <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 text-xs text-neutral-400">
                    <span>{match[1]}</span>
                    <button 
                        onClick={handleCopy} 
                        className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
                    >
                        {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Copied!' : 'Copy code'}</span>
                    </button>
                </div>
                <div className="overflow-x-auto w-full">
                    <SyntaxHighlighter
                        {...props}
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    }
    return (
        <code {...props} className="bg-neutral-800 rounded px-1.5 py-0.5 text-sm font-mono text-neutral-200">
            {children}
        </code>
    );
};

export default CodeBlock;
