import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
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
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeModule, toast, darkMode } = useApp();

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

  return (
    <div className={`min-h-screen flex font-sans select-none transition-colors duration-200 ${
      darkMode ? 'bg-[#0b0f17] text-slate-100' : 'bg-[#f4f6fa] text-slate-800'
    }`}>
      {/* TaskFlow AI Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen">
        {/* TaskFlow AI Top Header */}
        <Header />

        {/* Dynamic Viewport Module */}
        <main className="flex-1 p-4 md:p-6 pb-12">
          {renderModule()}
        </main>
      </div>

      {/* Floating Clean Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold ${
              toast.type === 'success'
                ? 'bg-white text-emerald-600 border-emerald-100 shadow-emerald-500/10'
                : toast.type === 'warning'
                ? 'bg-white text-amber-600 border-amber-100 shadow-amber-500/10'
                : toast.type === 'error'
                ? 'bg-white text-rose-600 border-rose-100 shadow-rose-500/10'
                : 'bg-white text-blue-600 border-blue-100 shadow-blue-500/10'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
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
