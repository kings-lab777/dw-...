import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Hash,
  Send,
  User,
  Paperclip,
  Smile,
  ShieldCheck,
  Bell,
  Sparkles
} from 'lucide-react';

export const ChatModule: React.FC = () => {
  const { channels, activeChannelId, setActiveChannelId, messages, sendMessage, currentUser, darkMode } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];
  const channelMessages = messages.filter((m) => m.channelId === activeChannelId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChannelId, inputText);
    setInputText('');
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30';
      case 'qa_manager':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30';
      case 'project_manager':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30';
      case 'finance_manager':
        return 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30';
      default:
        return darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto h-[calc(100vh-5.5rem)] flex flex-col md:flex-row gap-4 select-none">
      {/* Channels Sidebar */}
      <div className={`w-full md:w-64 rounded-2xl flex flex-col overflow-hidden border transition-colors duration-200 shrink-0 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className={`p-4 border-b ${darkMode ? 'border-slate-800 bg-[#0f1115]' : 'border-slate-100 bg-slate-50'}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            <MessageSquare className="w-4 h-4 text-[#00c853]" />
            Operations Channels
          </h3>
          <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Real-time team sync</p>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Public Channels
          </div>

          {channels.filter((c) => !c.isDirectMessage).map((chan) => {
            const isActive = chan.id === activeChannelId;
            return (
              <button
                key={chan.id}
                onClick={() => setActiveChannelId(chan.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
                    : darkMode 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Hash className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{chan.name}</span>
                </div>
                {chan.unreadCount && chan.unreadCount > 0 ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#00c853] text-white font-bold">
                    {chan.unreadCount}
                  </span>
                ) : null}
              </button>
            );
          })}

          <div className={`px-3 pt-3 pb-1 text-[10px] uppercase font-bold tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Direct Messages
          </div>

          {channels.filter((c) => c.isDirectMessage).map((chan) => {
            const isActive = chan.id === activeChannelId;
            return (
              <button
                key={chan.id}
                onClick={() => setActiveChannelId(chan.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
                    : darkMode 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{chan.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Conversation View */}
      <div className={`flex-1 rounded-2xl flex flex-col overflow-hidden border transition-colors duration-200 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {/* Channel Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          darkMode ? 'border-slate-800 bg-[#0f1115]' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#00c853]" />
            <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{activeChannel.name}</h3>
            <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>• {activeChannel.description}</span>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
            darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
          }`}>
            Encrypted Team Channel
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {channelMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 group">
              <img
                src={msg.senderAvatar}
                alt={msg.senderName}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>{msg.senderName}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase font-bold ${getRoleBadgeStyle(msg.senderRole)}`}>
                    {msg.senderRole.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{msg.timestamp}</span>
                </div>

                <div className={`p-3 rounded-2xl border text-xs leading-relaxed max-w-2xl ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  {msg.message}

                  {/* Attachments if any */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className={`mt-2 pt-2 border-t space-y-1 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                      {msg.attachments.map((att, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-[#00c853] hover:underline cursor-pointer font-semibold">
                          <Paperclip className="w-3 h-3" />
                          <span>{att.name} ({att.size})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reactions if any */}
                {msg.reactions && (
                  <div className="flex items-center gap-1 mt-1.5">
                    {Object.entries(msg.reactions).map(([emoji, users]) => (
                      <span
                        key={emoji}
                        className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${
                          darkMode ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {emoji} {users.length}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className={`p-3 border-t flex items-center gap-2 ${
          darkMode ? 'border-slate-800 bg-[#0f1115]' : 'border-slate-100 bg-slate-50'
        }`}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message #${activeChannel.name}...`}
            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] transition-colors ${
              darkMode 
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
            }`}
          />

          <button
            type="submit"
            className="p-2.5 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
