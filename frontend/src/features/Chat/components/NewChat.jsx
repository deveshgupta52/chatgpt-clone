import React from 'react';
import ChatInput from './ChatInput';

const NewChat = ({ onSendMessage }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center pt-[10vh]">
            <div className="flex flex-col items-center w-full px-4 max-w-3xl">
                {/* Logo/Icon can go here, but a title is fine */}
                <h1 className="text-3xl font-semibold text-neutral-100 mb-8 tracking-tight">
                    What can I help with?
                </h1>
                
                <div className="w-[85%]">
                    <ChatInput onSend={(msg) => onSendMessage(msg)} />
                </div>
            </div>
            {/* We could add some suggestion pills here like ChatGPT */}
        </div>
    );
};

export default NewChat;
