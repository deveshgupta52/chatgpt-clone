import React, { useState, useRef, useEffect } from 'react';
import SideNavBar from '../../components/SideNavBar';
import TopNavBar from '../../components/TopNavBar';
import ChatContainer from '../../components/ChatContainer';
import ChatInput from '../../components/ChatInput';
import FloatingChips from '../../components/FloatingChips';

/**
 * Enhanced Chat Component with Backend Integration
 * 
 * To integrate with your backend:
 * 1. Replace the static messages in ChatContainer with state management
 * 2. Connect to your backend API for messages
 * 3. Implement real-time updates using WebSockets or polling
 */

export default function ChatWithIntegration() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: 'Can you help me design a brand identity for a high-end digital architecture firm?',
      timestamp: 'Just Now',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (message) => {
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: 'Just Now',
    };
    
    setMessages([...messages, userMessage]);
    setIsLoading(true);

    try {
      // Example: Call your AI service endpoint
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message }),
      // });
      // const data = await response.json();

      // For now, simulate AI response
      setTimeout(() => {
        const aiMessage = {
          id: messages.length + 2,
          type: 'ai',
          content: 'This is a simulated AI response. Connect to your backend API here.',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Side Navigation */}
      <SideNavBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <TopNavBar />

        {/* Chat Area */}
        <main className="lg:ml-64 pt-16 h-screen flex flex-col relative bg-black flex-1">
          {/* Messages with improved state management */}
          <div className="flex-1 overflow-y-auto chat-container p-8 pb-32 space-y-10">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.type === 'user' ? (
                  <div className="flex flex-col items-end w-full">
                    <div className="max-w-[70%] bg-[#1A1A1A] text-primary border border-primary/20 px-6 py-4 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl neon-glow-purple">
                      <p className="leading-relaxed font-body">{msg.content}</p>
                      <span className="text-[10px] text-[#E2E2E2]/40 font-bold tracking-widest uppercase mt-2 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-start gap-4 max-w-[85%]">
                      <div className="w-10 h-10 rounded-xl bg-[#0E0E0E] flex-shrink-0 flex items-center justify-center border border-primary/30 neon-glow-purple">
                        <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                      </div>
                      <div className="message-bubble text-on-surface px-7 py-6 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-white/5">
                        <p className="leading-relaxed font-body">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-10 h-10 rounded-xl bg-[#0E0E0E] flex items-center justify-center border border-primary/30 neon-glow-purple">
                  <span className="material-symbols-outlined text-primary text-xl animate-pulse">auto_awesome</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 pointer-events-none">
            <div className="pointer-events-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-full blur-xl opacity-40 group-focus-within:opacity-80 transition-opacity"></div>
              <div className="relative bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full h-16 flex items-center px-4 shadow-2xl">
                <button className="p-2 text-primary hover:text-secondary transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <input
                  type="text"
                  placeholder="Initiate synthesis sequence..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder-white/30 px-4 font-body"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleSendMessage(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <div className="flex items-center gap-2">
                  <button className="p-2 text-[#E2E2E2]/40 hover:text-secondary">
                    <span className="material-symbols-outlined">mic</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-black shadow-[0_0_20px_rgba(221,183,255,0.5)] hover:shadow-[0_0_30px_rgba(221,183,255,0.7)] active:scale-90 transition-all">
                    <span className="material-symbols-outlined font-bold">arrow_upward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Chips */}
          <FloatingChips />
        </main>
      </div>
    </div>
  );
}
