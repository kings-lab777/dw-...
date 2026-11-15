import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Mic,
  Sun,
  Moon,
  Bell,
  Settings,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, darkMode, toggleDarkMode, setActiveModule, notifications } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className={`h-20 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200 ${
      darkMode ? 'bg-[#0b0f17]/90 text-white' : 'bg-[#f4f6fa]/95 text-slate-900'
    } backdrop-blur-sm`}>
      {/* Left: Hello, Shakib! 👋 Welcome and Let's do checkout your projects! */}
      <div>
        <h1 className={`text-xl font-extrabold tracking-tight flex items-center gap-1.5 ${
          darkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Hello, Shakib! 👋
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          Welcome and Let's do checkout your projects!
        </p>
      </div>

      {/* Right: Search, Mic, Theme Toggle, Bell, Settings, User Avatar */}
      <div className="flex items-center gap-3">
        {/* Search Pill */}
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-full text-xs font-medium border focus:outline-none focus:border-[#2563eb] transition-all w-48 md:w-64 ${
              darkMode
                ? 'bg-[#111622] border-slate-800 text-white placeholder-slate-500'
                : 'bg-white border-slate-200/80 text-slate-800 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        {/* Microphone Button */}
        <button
          onClick={() => alert('Voice command active: Listening for project inquiry...')}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            darkMode
              ? 'bg-[#111622] border-slate-800 text-slate-400 hover:text-white'
              : 'bg-white border-slate-200/80 text-slate-500 hover:text-slate-900 shadow-xs'
          }`}
          title="Voice Command"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Sun / Moon Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            darkMode
              ? 'bg-[#111622] border-slate-800 text-amber-400'
              : 'bg-white border-slate-200/80 text-slate-500 hover:text-slate-900 shadow-xs'
          }`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Bell Notification */}
        <button
          onClick={() => setActiveModule('notifications')}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all relative cursor-pointer ${
            darkMode
              ? 'bg-[#111622] border-slate-800 text-slate-400 hover:text-white'
              : 'bg-white border-slate-200/80 text-slate-500 hover:text-slate-900 shadow-xs'
          }`}
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 border-2 border-white dark:border-[#111622]" />
          )}
        </button>

        {/* Settings Gear */}
        <button
          onClick={() => setActiveModule('settings')}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            darkMode
              ? 'bg-[#111622] border-slate-800 text-slate-400 hover:text-white'
              : 'bg-white border-slate-200/80 text-slate-500 hover:text-slate-900 shadow-xs'
          }`}
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <div className="relative pl-1">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt={currentUser.fullName}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 cursor-pointer shadow-xs"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111622]" />
        </div>
      </div>
    </header>
  );
};
