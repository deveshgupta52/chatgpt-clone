import React from 'react';

export default function SideNavBar({ isOpen, toggleSidebar }) {
  const navigationItems = [
    { icon: 'add_comment', label: 'New Chat', active: true },
    { icon: 'history', label: 'History', active: false },
    { icon: 'folder_open', label: 'Library', active: false },
  ];

  const recentChats = [
    'Quantum Computing Ethics',
    'Brand Identity Strategy',
    'AI Architecture Deep Dive',
  ];

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#0A0A0A] border-r border-white/5 z-20 transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? 'w-64' : 'w-0'
        }`}
      >
        {/* Sidebar Content */}
        <div className="w-64 h-full flex flex-col mt-16">
          {/* Main Navigation */}
          <nav className="flex-1 px-3 py-6 overflow-y-auto">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.active
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'text-on-surface/60 hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-xl flex-shrink-0">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className="px-4 my-4 h-px bg-white/5"></div>

          {/* Recent Chats Section */}
          <div className="px-4 pb-6">
            <p className="text-xs font-semibold text-on-surface/40 uppercase tracking-wide mb-3">
              Recent
            </p>
            <div className="space-y-2">
              {recentChats.map((chat, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-3 py-2 text-sm text-on-surface/60 hover:text-on-surface rounded-lg hover:bg-white/5 transition-colors truncate"
                  title={chat}
                >
                  {chat}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="px-4 mb-4 h-px bg-white/5"></div>

          {/* Footer - Settings */}
          <div className="px-3 pb-6 border-t border-white/5 pt-4">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-on-surface/60 hover:text-on-surface rounded-lg hover:bg-white/5 transition-colors text-sm">
              <span className="material-symbols-outlined text-xl flex-shrink-0">
                settings
              </span>
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
