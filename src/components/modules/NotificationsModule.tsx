import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppNotification } from '../../types';
import {
  Bell,
  CheckCircle2,
  Trash2,
  Filter,
  CheckCheck,
  ShieldAlert,
  Calendar,
  FileCheck2,
  DollarSign,
  Layers,
  ArrowRight
} from 'lucide-react';

export const NotificationsModule: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    setActiveModule,
    darkMode
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');

  const filtered = notifications.filter((n) => filterType === 'all' || n.type === filterType);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'qc':
        return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case 'leave':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'task':
        return <FileCheck2 className="w-4 h-4 text-[#00c853]" />;
      case 'finance':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto select-none">
      {/* Header Banner */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-colors duration-200 ${
        darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00c853]/10 border border-[#00c853]/20 flex items-center justify-center text-[#00c853]">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-lg md:text-xl font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>Notifications Hub</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30">
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <p className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Real-time operational alerts, review gates, and leave approvals across DigiWorku
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00c853]/10 hover:bg-[#00c853]/20 text-[#00c853] border border-[#00c853]/20 text-xs font-bold transition-all cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'qc', 'leave', 'task', 'finance', 'system'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterType === t
                ? 'bg-[#00c853] text-white shadow-md shadow-[#00c853]/20 font-black'
                : darkMode
                  ? 'bg-[#14171d] text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border space-y-2 ${
            darkMode ? 'border-slate-800 bg-[#14171d]' : 'border-slate-200 bg-white'
          }`}>
            <CheckCircle2 className="w-8 h-8 text-[#00c853] mx-auto opacity-60" />
            <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>All Caught Up!</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No notifications in this filter category.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                item.read
                  ? darkMode 
                    ? 'bg-[#14171d]/60 border-slate-800/60 opacity-80' 
                    : 'bg-slate-50/80 border-slate-200/80 opacity-80'
                  : darkMode 
                    ? 'bg-[#14171d] border-slate-700 shadow-lg' 
                    : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                  darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs md:text-sm font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
                    )}
                  </div>
                  <p className={`text-xs font-medium leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.message}</p>
                  <span className={`text-[10px] font-mono block pt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{item.createdAt}</span>
                </div>
              </div>

              {item.linkModule && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead(item.id);
                    setActiveModule(item.linkModule!);
                  }}
                  className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    darkMode 
                      ? 'bg-slate-800 hover:bg-[#00c853] hover:text-white text-slate-300 border-slate-700' 
                      : 'bg-slate-100 hover:bg-[#00c853] hover:text-white text-slate-700 border-slate-200'
                  }`}
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
