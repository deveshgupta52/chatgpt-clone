import React from 'react';

export default function MessageBubble({ message }) {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-sm bg-primary/12 border border-primary/25 text-on-surface px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm leading-relaxed font-light">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl space-y-3.5">
        {/* AI Avatar & Message */}
        <div className="flex gap-2.5">
          <div className="shrink-0 w-7 h-7 rounded-lg bg-secondary/15 border border-secondary/25 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
          </div>
          <div className="flex-1 space-y-2.5">
            {/* Main Message */}
            <div className="bg-surface-container/60 border border-white/8 px-3.5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:border-white/12 transition-all">
              <p className="text-sm leading-relaxed text-on-surface/95 font-light">{message.content}</p>
            </div>

            {/* Images Grid */}
            {message.images && (
              <div className="grid grid-cols-2 gap-2.5 mt-2">
                {message.images.map((image, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-lg border border-white/8 hover:border-white/15 transition-all shadow-sm hover:shadow-md">
                    <img
                      alt={image.alt}
                      src={image.src}
                      className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span className="absolute bottom-2 left-2 text-xs font-medium text-on-surface/90">
                      {image.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
