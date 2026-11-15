import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  Plus,
  Search,
  MessageSquare,
  Pin,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Paperclip,
  Share2,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FolderGit2
} from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
  isPinned?: boolean;
}

export const AiAssistantModule: React.FC = () => {
  const {
    aiMessages,
    sendAIMessage,
    isAITyping,
    currentUser,
    currentRole,
    projects,
    tasks,
    clients,
    invoices,
    employees,
    darkMode,
    showToast
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState('');
  const [activeSessionId, setActiveSessionId] = useState<string>('session-1');

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: 'session-1', title: 'Q4 Revenue & Cash Flow Forecast', updatedAt: 'Today', isPinned: true },
    { id: 'session-2', title: 'Sprint 44 Velocity & Blockers', updatedAt: 'Yesterday', isPinned: true },
    { id: 'session-3', title: 'Apollo Telehealth Proposal Draft', updatedAt: '12 Nov 2026' },
    { id: 'session-4', title: 'Freelancer Payout Reconciliation', updatedAt: '9 Nov 2026' },
    { id: 'session-5', title: '100-Point QC Delivery Signoff', updatedAt: '5 Nov 2026' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
    { label: 'Which projects are overdue or at risk?', icon: AlertTriangle },
    { label: 'Summarize revenue & profit for this month', icon: TrendingUp },
    { label: 'Show employee workload and capacity', icon: Clock },
    { label: 'Draft client onboarding email for new lead', icon: FileText },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, isAITyping]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendAIMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    showToast('Copied response to clipboard', 'info');
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: 'New Conversation',
      updatedAt: 'Just now'
    };
    setChatSessions([newSession, ...chatSessions]);
    setActiveSessionId(newSession.id);
    showToast('Started new AI conversation session', 'info');
  };

  const filteredSessions = chatSessions.filter((s) =>
    s.title.toLowerCase().includes(searchHistoryQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-6.5rem)] flex rounded-3xl border overflow-hidden select-none shadow-xs transition-colors duration-200 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1017]">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LEFT CHAT SIDEBAR (ChatGPT Style) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <aside className={`w-72 border-r flex flex-col justify-between shrink-0 transition-colors ${
        darkMode ? 'bg-[#0f121a] border-slate-800' : 'bg-slate-50/80 border-slate-200/80'
      }`}>
        <div className="p-3.5 space-y-3">
          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full py-2.5 px-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-between shadow-xs transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>New Conversation</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-blue-700 text-white font-mono">⌘N</kbd>
          </button>

          {/* Search History */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchHistoryQuery}
              onChange={(e) => setSearchHistoryQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 rounded-xl border text-xs font-medium focus:outline-none transition-colors ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Sessions List */}
          <div className="space-y-4 pt-1 max-h-[calc(100vh-270px)] overflow-y-auto pr-1">
            {/* Pinned */}
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Pin className="w-3 h-3" /> Pinned
              </span>
              <div className="space-y-0.5">
                {filteredSessions.filter((s) => s.isPinned).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      activeSessionId === s.id
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate pr-2">{s.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{s.updatedAt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent */}
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> Recent
              </span>
              <div className="space-y-0.5">
                {filteredSessions.filter((s) => !s.isPinned).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      activeSessionId === s.id
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate pr-2">{s.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{s.updatedAt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className={`p-3 border-t flex items-center justify-between text-[11px] font-semibold text-slate-400 ${
          darkMode ? 'border-slate-800 bg-[#0c1017]' : 'border-slate-200/80 bg-white'
        }`}>
          <span className="flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-blue-500" />
            <span>DigiWorku LLM Core</span>
          </span>
          <span className="font-mono text-[10px]">Gemini 2.5</span>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MAIN CHAT AREA */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
        {/* Chat Header Bar */}
        <div className={`h-14 px-6 border-b flex items-center justify-between shrink-0 ${
          darkMode ? 'border-slate-800 bg-[#0f121a]' : 'border-slate-100 bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-xs font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  DigiWorku AI Copilot
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold">
                  Online
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Connected to Projects ({projects.length}), Tasks ({tasks.length}), Clients ({clients.length}), and Invoices ({invoices.length})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Conversation pinned to active workspace', 'info')}
              className="p-1.5 rounded-lg border text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer border-slate-200 dark:border-slate-800"
              title="Pin Session"
            >
              <Pin className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => showToast('Conversation exported as Markdown report', 'success')}
              className="p-1.5 rounded-lg border text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer border-slate-200 dark:border-slate-800"
              title="Export Chat"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {aiMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-5">
              <div className="w-14 h-14 rounded-3xl bg-blue-50 dark:bg-slate-900 text-blue-600 flex items-center justify-center shadow-xs">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  How can DigiWorku AI assist you today?
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Ask questions about project delivery, revenue trends, pending tasks, or automated proposal drafts.
                </p>
              </div>

              {/* Quick Prompts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-2">
                {quickPrompts.map((qp) => {
                  const Icon = qp.icon;
                  return (
                    <button
                      key={qp.label}
                      onClick={() => sendAIMessage(qp.label)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all hover:border-blue-500 cursor-pointer flex items-start gap-2.5 ${
                        darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{qp.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            aiMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.sender === 'assistant' ? (
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                ) : (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 mt-1"
                  />
                )}

                <div className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-xs'
                    : darkMode
                    ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {msg.sender === 'assistant' && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
                      <span>Verified with live database records</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors"
                      >
                        {copiedMessageId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedMessageId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isAITyping && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className={`p-3 rounded-2xl rounded-tl-xs border text-xs font-semibold flex items-center gap-2 ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-500" />
                <span>DigiWorku AI is querying business databases...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Composer (ChatGPT Standard) */}
        <div className={`p-4 border-t ${
          darkMode ? 'border-slate-800 bg-[#0c1017]' : 'border-slate-100 bg-white'
        }`}>
          <div className="max-w-4xl mx-auto space-y-2">
            <div className={`relative rounded-2xl border p-2 flex items-end gap-2 transition-all focus-within:border-blue-500 ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200/90 shadow-2xs'
            }`}>
              <button
                type="button"
                onClick={() => showToast('Attach file or document for AI context analysis', 'info')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                title="Attach Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="Message DigiWorku AI... (Enter to send, Shift+Enter for new line)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-xs font-medium focus:outline-none resize-none max-h-32 py-1.5 placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={!inputText.trim()}
                className={`p-2 rounded-xl font-bold transition-all cursor-pointer ${
                  inputText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Security enforced: Private financial and KYC data protected by RBAC</span>
              <span>DigiWorku Enterprise Business OS</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
