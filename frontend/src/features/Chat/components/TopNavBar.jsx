import React from 'react';

export default function TopNavBar({ sidebarOpen, toggleSidebar }) {
  return (
    <header className="h-16 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 z-40 flex-shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-on-surface"
          title="Toggle sidebar"
        >
          <span className="material-symbols-outlined">
            {sidebarOpen ? 'menu_open' : 'menu'}
          </span>
        </button>

        {/* Logo/Branding */}
        <h1 className="text-lg font-bold text-primary font-manrope">Luminous AI</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Help Button */}
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-on-surface/60 hover:text-on-surface" title="Help">
          <span className="material-symbols-outlined">help</span>
        </button>

        {/* Settings Button */}
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-on-surface/60 hover:text-on-surface" title="Settings">
          <span className="material-symbols-outlined">settings</span>
        </button>

        {/* User Avatar */}
        <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/20 ml-2 cursor-pointer hover:border-primary/40 transition-colors">
          <img
            alt="User avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-Nj2dkK60G59WSuDBX47gDHhPAunlu2hDC3hNlfy53jnHTUKfcNvUxEwJtqwcW6I9KF04wS1btcp_sblSJbzeByCxftAtTrus93_dpLKxIlJiq8vPf-pYOUd2thUfsCGQVsI-ezurh4hmItNvpTNAGUBHHpBYuK8Rbli0LvRgyLHWm8LQhVc6ABiRpguvKi8_1Xk5iyDEfctqfLK58DIy-f6puCKIV8RxKFyYsUAICOT6E7ZJOeq4l7oNm1EOb-ajkKZtlJ-mhZ2p"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}

