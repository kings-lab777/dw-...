import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  ArrowRight
} from 'lucide-react';

export const AiAssistantModule: React.FC = () => {
  const { aiMessages, sendAIMessage, isAITyping, currentUser, currentRole, darkMode } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Which projects are currently delayed?',
    'Summarize sprint velocity for Sprint 44',
    'Show team members with spare capacity',
    'Draft client status email for Nordic Living',
    'What is our current monthly revenue & profit margin?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, isAITyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendAIMessage(inputText);
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    sendAIMessage(prompt);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto h-[calc(100vh-5.5rem)] flex flex-col space-y-4 select-none">
      {/* AI Header Banner */}
      <div className={`rounded-2xl p-5 border transition-colors duration-200 flex items-center justify-between shrink-0 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00c853] to-teal-500 text-white font-bold flex items-center justify-center shadow-md shadow-[#00c853]/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>DigiWorku AI Operations Copilot</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30">
                Gemini Flash Architecture
              </span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Contextual intelligence hooked into all 14 operational subsystems</p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className={`text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Clearances</span>
          <div className="text-xs font-mono text-[#00c853] font-bold capitalize">
            {currentRole.replace('_', ' ')}
          </div>
        </div>
      </div>

      {/* Conversation Stream */}
      <div className={`flex-1 rounded-2xl p-5 overflow-y-auto space-y-4 border transition-colors duration-200 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {aiMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.sender === 'assistant' ? (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00c853] to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            ) : (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 mt-0.5"
              />
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#00c853] text-white font-medium shadow-md shadow-[#00c853]/20'
                  : darkMode
                    ? 'bg-[#0f1115] border border-slate-800 text-slate-200'
                    : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Suggestions chips if any */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className={`mt-3 pt-3 border-t space-y-1.5 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <span className={`text-[10px] uppercase font-semibold block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Suggested Actions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePromptClick(sug)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left cursor-pointer ${
                          darkMode 
                            ? 'bg-slate-800 hover:bg-slate-700 text-[#00c853] border-slate-700' 
                            : 'bg-white hover:bg-slate-100 text-[#00c853] border-slate-200 shadow-xs'
                        }`}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isAITyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00c853] to-teal-500 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className={`p-3.5 rounded-2xl border flex items-center gap-1.5 ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse delay-150" />
              <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse delay-300" />
              <span className={`text-xs ml-1 font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Analyzing telemetry...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <span className={`text-[10px] font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1 ${
          darkMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <Sparkles className="w-3 h-3 text-[#00c853]" /> Quick Inquiries:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(p)}
            className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all border cursor-pointer ${
              darkMode 
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-[#00c853]/40' 
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs hover:border-[#00c853]/40'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask DigiWorku Copilot about tasks, bottlenecks, client reports, or capacity..."
          className={`w-full pl-4 pr-12 py-3 rounded-2xl border text-xs focus:outline-none focus:border-[#00c853] transition-colors ${
            darkMode 
              ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 shadow-xl' 
              : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
          }`}
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
          title="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
