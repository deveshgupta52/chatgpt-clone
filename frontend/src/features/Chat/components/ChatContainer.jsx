import React from 'react';
import MessageBubble from './MessageBubble';

export default function ChatContainer() {
  const messages = [
    {
      id: 1,
      type: 'user',
      content: 'Can you help me design a brand identity for a high-end digital architecture firm?',
      timestamp: 'Just Now',
    },
    {
      id: 2,
      type: 'ai',
      content: 'I\'d be happy to help! For a high-end digital architecture firm, we should focus on a visual language that balances transparency and structural integrity.',
      images: [
        {
          alt: 'Architecture',
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwv2Zw6py_G4Uzb5iyoSYSOYCIQKfNQST2wDKT76Cqx0e_MDEwpBXVwXQPrdN2B-qQRZxDN4h0uwh0qB335oAnStEkK3a65JpUM2p0tGF3Fhhha7LFYrpWMJYxT4lGCsXUt29C_huZSimOEG0Sd-_z0N1O4iKOGZulra38qyU9ziWz_Jpg9QeGYFKczUeJZwvR-WWCAHRVVr7_E-OaMKThGKNkpDbkueVw9lz0izH9c3Kuv-n0uQU3RFoEM-uLmhB0W_tFopyhcmaJ',
          label: 'Modern Architecture',
          glow: 'purple',
        },
        {
          alt: 'Tech',
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf-cKQ3Dvtw3a-6kKNp3f6AZRIWEOECO0Cm77vLPBQQpJBUbqDYdv8LHGpLDdvdvOITI6pWd2n53kxSIZClm1zznfzqk9lJcobgfXCxr3FD0sdEnXNRgHszJyyTpZ_zHy0q_x6nepuI-p6mB_goFwPXCfEgoeNr7LLF4ZIvhsr9djoeCHqMZE-m5-fT72G6Uityr763RUlFqFmFTrY9IyEqMgnFyWzdlyPBOChyH4KXkdCG2e0-VDmgzJzy_2MwPnv7-OwCe8BpcQP',
          label: 'Digital DNA',
          glow: 'cyan',
        },
      ],
    },
    {
      id: 3,
      type: 'ai',
      content: 'What aspect would you like to explore first - the color palette, typography, or logo concepts?',
    },
  ];

  return (
    <div className="chat-container px-8 py-12 pb-16 space-y-8 max-w-3xl mx-auto w-full">
      {messages.length === 0 ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">chat</span>
            </div>
            <h2 className="text-xl font-semibold text-on-surface mb-2">Start a new conversation</h2>
            <p className="text-on-surface/60">Ask me anything or describe what you need help with</p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
    </div>
  );
}

