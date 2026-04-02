import React, { useState } from 'react';
import SideNavBar from './components/SideNavBar';
import TopNavBar from './components/TopNavBar';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import {useSelector} from 'react-redux'
export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {user}=useSelector((state)=>state.auth)
console.log(user)
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar - Collapsible, Fixed Width */}
      <SideNavBar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area - Takes remaining space */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Bar - Fixed Height */}
        <TopNavBar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Chat Content Area - Flex container for scrollable chat + floating input */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Scrollable Chat Container */}
          <div className="flex-1 overflow-y-auto">
            <ChatContainer />
          </div>

          {/* Floating Chat Input - Positioned at bottom within main area */}
          <div className="relative flex-shrink-0">
            <ChatInput />
          </div>
        </main>
      </div>
    </div>
  );
}


