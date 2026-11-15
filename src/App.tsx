import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AnimatedGridBackground } from './components/AnimatedGridBackground';
import { DashboardModule } from './components/modules/DashboardModule';
import { TasksModule } from './components/modules/TasksModule';
import { EmployeesModule } from './components/modules/EmployeesModule';
import { ProjectsModule } from './components/modules/ProjectsModule';
import { CrmModule } from './components/modules/CrmModule';
import { FinanceModule } from './components/modules/FinanceModule';
import { FreelancersModule } from './components/modules/FreelancersModule';
import { QcModule } from './components/modules/QcModule';
import { AttendanceModule } from './components/modules/AttendanceModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';
import { AiAssistantModule } from './components/modules/AiAssistantModule';
import { NotificationsModule } from './components/modules/NotificationsModule';
import { SettingsModule } from './components/modules/SettingsModule';
import { PublicPortal } from './components/portal/PublicPortal';
import { SupabaseConfigModal } from './components/modals/SupabaseConfigModal';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeModule, toast, showToast, darkMode } = useApp();
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Panel Mode: 'commander' (Internal Ops OS) vs 'portal' (Public Ecosystem Portal)
  const [panelMode, setPanelMode] = useState<'commander' | 'portal'>(() => {
    const saved = localStorage.getItem('digiworku-panel-mode');
    return saved === 'portal' ? 'portal' : 'commander';
  });

  useEffect(() => {
    localStorage.setItem('digiworku-panel-mode', panelMode);
  }, [panelMode]);

  const togglePanelMode = () => {
    const next = panelMode === 'commander' ? 'portal' : 'commander';
    setPanelMode(next);
    showToast(
      next === 'portal'
        ? '🌐 Switched to DigiWorku Public Ecosystem Portal'
        : '⚡ Switched to DigiWorku Commander Operations OS',
      'info'
    );
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule />;
      case 'tasks':
        return <TasksModule />;
      case 'employees':
        return <EmployeesModule />;
      case 'projects':
        return <ProjectsModule />;
      case 'crm':
        return <CrmModule />;
      case 'finance':
        return <FinanceModule />;
      case 'freelancers':
        return <FreelancersModule />;
      case 'qc':
        return <QcModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'ai':
        return <AiAssistantModule />;
      case 'notifications':
        return <NotificationsModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <DashboardModule />;
    }
  };

  // If in Public Portal mode, render the full DigiWorku customer-facing platform
  if (panelMode === 'portal') {
    return (
      <div className="relative min-h-screen">
        <PublicPortal
          onOpenCommander={() => {
            setPanelMode('commander');
            showToast('⚡ Entered DigiWorku Commander Operations OS', 'success');
          }}
        />

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
            <div
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold ${
                toast.type === 'success'
                  ? 'bg-[#14171d] text-[#00c853] border-[#00c853]/30 shadow-[#00c853]/15'
                  : toast.type === 'warning'
                  ? 'bg-[#14171d] text-amber-300 border-amber-500/30'
                  : 'bg-[#14171d] text-rose-300 border-rose-500/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Otherwise, render DigiWorku Commander (Internal Ops OS)
  return (
    <div className={`min-h-screen flex font-sans relative overflow-x-hidden select-none transition-colors duration-200 ${
      darkMode ? 'bg-[#0a0d14] text-slate-100' : 'bg-[#f4f7fb] text-slate-900'
    }`}>
      {/* Signature Animated Geometric Grid Background */}
      <AnimatedGridBackground darkMode={darkMode} />

      {/* Ambient Radial Gradient Glows */}
      <div className={`fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 ${
        darkMode ? 'bg-blue-500/10' : 'bg-blue-400/10'
      }`} />
      <div className={`fixed bottom-0 left-1/3 w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none z-0 ${
        darkMode ? 'bg-purple-500/5' : 'bg-indigo-300/10'
      }`} />

      {/* Fixed 14-Module Sidebar */}
      <Sidebar onTogglePortalMode={togglePanelMode} />

      {/* Main Viewport Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen relative z-10">
        {/* Top Sticky Header */}
        <Header
          onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
          onTogglePortalMode={togglePanelMode}
        />

        {/* Active Module Canvas */}
        <main className="flex-1 p-3 md:p-6 pb-12 relative">
          {renderModule()}
        </main>
      </div>

      {/* Supabase Production Integration Modal */}
      <SupabaseConfigModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />

      {/* Real-Time Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold ${
              toast.type === 'success'
                ? 'bg-[#14171d] text-[#00c853] border-[#00c853]/30 shadow-[#00c853]/15'
                : toast.type === 'warning'
                ? 'bg-[#14171d] text-amber-300 border-amber-500/30'
                : toast.type === 'error'
                ? 'bg-[#14171d] text-rose-300 border-rose-500/30'
                : 'bg-[#14171d] text-blue-300 border-blue-500/30'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
