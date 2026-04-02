import React from 'react';

export default function FloatingChips() {
  const chips = [
    {
      id: 1,
      label: 'Refine Palette',
      icon: 'auto_fix',
      color: 'cyan',
    },
    {
      id: 2,
      label: 'Logo Concept',
      icon: 'brush',
      color: 'purple',
    },
  ];

  return (
    <div className="fixed bottom-32 right-12 flex flex-col gap-3 items-end pointer-events-none">
      {chips.map((chip) => (
        <button
          key={chip.id}
          className={`pointer-events-auto bg-[#0E0E0E]/80 backdrop-blur-md border text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all ${
            chip.color === 'cyan'
              ? 'border-secondary/40 text-secondary hover:bg-secondary/10 neon-glow-cyan'
              : 'border-primary/40 text-primary hover:bg-primary/10 neon-glow-purple'
          }`}
        >
          <span className="material-symbols-outlined text-sm">{chip.icon}</span>
          {chip.label}
        </button>
      ))}
    </div>
  );
}
