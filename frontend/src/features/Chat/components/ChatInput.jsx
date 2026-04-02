import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput() {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log('Sending:', inputValue);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-auto pointer-events-none">
      {/* Floating Input Container - Positioned relative within main area */}
      <div className="pointer-events-auto h-auto px-8 py-6 bg-gradient-to-t from-black/95 via-[#0A0A0A]/90 to-transparent">
        <div className="max-w-3xl mx-auto">
          {/* Floating Input Box */}
          <div
            className={`relative transition-all duration-300 ${
              isFocused
                ? 'bg-surface-container/95 border-primary/40 shadow-[0_0_24px_rgba(221,183,255,0.25)] scale-[1.01]'
                : 'bg-surface-container/85 border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
            } backdrop-blur-lg border rounded-2xl flex items-center gap-3 px-5 py-3.5 hover:border-white/20 transition-all duration-200`}
          >
            {/* Glow Effect Background (Optional accent) */}
            {isFocused && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
            )}

            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => console.log('Attachment clicked')}
              className="shrink-0 relative z-10 p-2 text-on-surface/40 hover:text-on-surface/60 hover:bg-white/5 rounded-lg transition-all duration-150 active:scale-95"
              title="Attach file"
            >
              <span className="material-symbols-outlined text-lg">attach_file</span>
            </button>

            {/* Text Textarea */}
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Message"
              className="input-textarea flex-1 relative z-10 bg-transparent border-0 focus:ring-0 focus:outline-none text-on-surface placeholder-white/35 resize-none max-h-36 min-h-9 font-body text-sm leading-relaxed px-0"
              rows="1"
              spellCheck="true"
            />

            {/* Right Actions Container */}
            <div className="flex items-center gap-2 shrink-0 relative z-10">
              {/* Voice Button */}
              <button
                type="button"
                onClick={() => console.log('Voice input clicked')}
                className="p-2 text-on-surface/40 hover:text-on-surface/60 hover:bg-white/5 rounded-lg transition-all duration-150 active:scale-95"
                title="Voice input (Shift+M)"
              >
                <span className="material-symbols-outlined text-lg">mic</span>
              </button>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`shrink-0 p-2 rounded-lg transition-all duration-200 active:scale-95 ${
                  inputValue.trim()
                    ? 'bg-primary/90 hover:bg-primary text-on-primary shadow-[0_2px_12px_rgba(221,183,255,0.2)] hover:shadow-[0_4px_16px_rgba(221,183,255,0.3)]'
                    : 'bg-primary/20 text-on-primary/30 cursor-not-allowed'
                }`}
                title="Send (Enter)"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
