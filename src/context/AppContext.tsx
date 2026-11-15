import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  NavModule,
  Employee,
  AttendanceRecord,
  LeaveRequest,
  InternalTask,
  TaskStatus,
  ClientLead,
  ClientQuote,
  LeadStatus,
  Project,
  ProjectMilestone,
  Freelancer,
  PayrollRecord,
  InvoiceRecord,
  FinancialSummary,
  ChatChannel,
  ChatMessage,
  QCReview,
  PerformanceMetrics,
  AIMessage,
  AppNotification,
  AuditLog,
  CompanySettings
} from '../types';
import {
  INITIAL_EMPLOYEES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVES,
  INITIAL_TASKS,
  INITIAL_CLIENTS,
  INITIAL_PROJECTS,
  INITIAL_FREELANCERS,
  INITIAL_PAYROLL,
  INITIAL_INVOICES,
  INITIAL_FINANCE_SUMMARY,
  INITIAL_CHANNELS,
  INITIAL_MESSAGES,
  INITIAL_QC_REVIEWS,
  INITIAL_PERFORMANCE,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_COMPANY_SETTINGS
} from '../data/mockData';

interface AppContextType {
  // RBAC & User
  currentRole: UserRole;
  currentUser: Employee;
  switchRole: (role: UserRole) => void;
  activeModule: NavModule;
  setActiveModule: (mod: NavModule) => void;
  hasAccessTo: (module: NavModule) => boolean;

  // Attendance
  isCheckedIn: boolean;
  checkInTime: string | null;
  elapsedSeconds: number;
  isLateToday: boolean;
  toggleCheckIn: () => void;
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  submitLeaveRequest: (leave: { leaveType: 'annual' | 'sick' | 'casual' | 'emergency'; startDate: string; endDate: string; totalDays: number; reason: string }) => void;
  reviewLeaveRequest: (leaveId: string, status: 'approved' | 'rejected') => void;
  addAttendanceCorrection: (recordId: string, correctedTime: string, reason: string) => void;

  // Tasks
  tasks: InternalTask[];
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  toggleTaskChecklist: (taskId: string, checkId: string) => void;
  addTask: (task: Omit<InternalTask, 'id' | 'createdAt'>) => void;
  updateTask: (task: InternalTask) => void;
  deleteTask: (taskId: string) => void;

  // CRM & Clients
  clients: ClientLead[];
  updateClientStatus: (clientId: string, status: LeadStatus) => void;
  addClient: (client: Omit<ClientLead, 'id' | 'activityHistory'>) => void;
  updateClient: (client: ClientLead) => void;
  deleteClient: (clientId: string) => void;
  quotes: ClientQuote[];
  addQuote: (quote: ClientQuote) => void;

  // Projects
  projects: Project[];
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: ProjectMilestone['status']) => void;
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (proj: Project) => void;
  deleteProject: (projectId: string) => void;
  addMilestone: (projectId: string, milestone: Omit<ProjectMilestone, 'id' | 'projectId'>) => void;

  // Freelancers
  freelancers: Freelancer[];
  updateFreelancerStatus: (id: string, status: Freelancer['status']) => void;
  addFreelancer: (fl: Omit<Freelancer, 'id'>) => void;
  updateFreelancer: (fl: Freelancer) => void;
  deleteFreelancer: (id: string) => void;
  allocateFreelancerToProject: (freelancerId: string, projectId: string) => void;

  // Finance & Payroll (Strictly Restricted)
  payroll: PayrollRecord[];
  invoices: InvoiceRecord[];
  financialSummary: FinancialSummary;
  processPayrollItem: (id: string) => void;
  createInvoice: (inv: Omit<InvoiceRecord, 'id'>) => void;
  updateInvoice: (inv: InvoiceRecord) => void;
  deleteInvoice: (id: string) => void;
  addExpense: (expense: { description: string; amount: number; category: string; date: string }) => void;

  // Internal Communication
  channels: ChatChannel[];
  activeChannelId: string;
  setActiveChannelId: (id: string) => void;
  messages: ChatMessage[];
  sendMessage: (channelId: string, text: string) => void;

  // Quality Control Engine
  qcReviews: QCReview[];
  submitQcDecision: (reviewId: string, decision: 'approve' | 'request_revisions' | 'reject', comments: string) => void;
  toggleQcChecklistItem: (reviewId: string, checkId: string) => void;
  submitDeliverableForQC: (projectId: string, milestoneTitle: string, deliverableUrl: string, comments: string) => void;

  // Performance & Analytics
  performance: PerformanceMetrics;

  // Employee Directory
  employees: Employee[];
  toggleEmployeeActive: (id: string) => void;
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (emp: Employee) => void;
  deleteEmployee: (id: string) => void;

  // DigiWorku AI Assistant
  aiMessages: AIMessage[];
  sendAIMessage: (text: string) => void;
  isAITyping: boolean;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;

  // Audit Logs
  auditLogs: AuditLog[];
  logAuditEvent: (action: string, module: NavModule, details: string, status?: 'success' | 'warning' | 'error') => void;

  // Company Settings
  companySettings: CompanySettings;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;

  // Theme (Light / Dark)
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Notification Toast
  toast: { message: string; type: 'success' | 'warning' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme State (Default to Light Mode matching digiworku.in)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('digiworku_dark_mode');
    return saved !== null ? saved === 'true' : false; // Default: Light Mode
  });

  useEffect(() => {
    localStorage.setItem('digiworku_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    showToast(!darkMode ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated (DigiWorku Theme)', 'info');
  };

  // Active Role and Current User
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  
  // Persistent Employees
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('digiworku_employees_v3');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_employees_v3', JSON.stringify(employees));
  }, [employees]);

  const [currentUser, setCurrentUser] = useState<Employee>(employees[0]);
  const [activeModule, setActiveModule] = useState<NavModule>('dashboard');

  // Attendance State
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(true);
  const [checkInTime, setCheckInTime] = useState<string | null>('08:55 AM');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(18240);
  const [isLateToday, setIsLateToday] = useState<boolean>(false);

  // Persistent Attendance Records
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('digiworku_attendance_v3');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_attendance_v3', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  // Persistent Leaves
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('digiworku_leaves_v3');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_leaves_v3', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  // Persistent Tasks
  const [tasks, setTasks] = useState<InternalTask[]>(() => {
    const saved = localStorage.getItem('digiworku_tasks_v3');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_tasks_v3', JSON.stringify(tasks));
  }, [tasks]);

  // Persistent Clients & Quotes
  const [clients, setClients] = useState<ClientLead[]>(() => {
    const saved = localStorage.getItem('digiworku_clients_v3');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_clients_v3', JSON.stringify(clients));
  }, [clients]);

  const [quotes, setQuotes] = useState<ClientQuote[]>(() => {
    const saved = localStorage.getItem('digiworku_quotes_v3');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('digiworku_quotes_v3', JSON.stringify(quotes));
  }, [quotes]);

  // Persistent Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('digiworku_projects_v3');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_projects_v3', JSON.stringify(projects));
  }, [projects]);

  // Persistent Freelancers
  const [freelancers, setFreelancers] = useState<Freelancer[]>(() => {
    const saved = localStorage.getItem('digiworku_freelancers_v3');
    return saved ? JSON.parse(saved) : INITIAL_FREELANCERS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_freelancers_v3', JSON.stringify(freelancers));
  }, [freelancers]);

  // Persistent Finance & Payroll
  const [payroll, setPayroll] = useState<PayrollRecord[]>(() => {
    const saved = localStorage.getItem('digiworku_payroll_v3');
    return saved ? JSON.parse(saved) : INITIAL_PAYROLL;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_payroll_v3', JSON.stringify(payroll));
  }, [payroll]);

  const [invoices, setInvoices] = useState<InvoiceRecord[]>(() => {
    const saved = localStorage.getItem('digiworku_invoices_v3');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_invoices_v3', JSON.stringify(invoices));
  }, [invoices]);

  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>(INITIAL_FINANCE_SUMMARY);

  // Persistent Chat
  const [channels, setChannels] = useState<ChatChannel[]>(INITIAL_CHANNELS);
  const [activeChannelId, setActiveChannelId] = useState<string>('announcements');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('digiworku_messages_v3');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_messages_v3', JSON.stringify(messages));
  }, [messages]);

  // Persistent QC Reviews
  const [qcReviews, setQcReviews] = useState<QCReview[]>(() => {
    const saved = localStorage.getItem('digiworku_qc_reviews_v3');
    return saved ? JSON.parse(saved) : INITIAL_QC_REVIEWS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_qc_reviews_v3', JSON.stringify(qcReviews));
  }, [qcReviews]);

  const [performance, setPerformance] = useState<PerformanceMetrics>(INITIAL_PERFORMANCE);

  // Persistent Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('digiworku_notifications_v3');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_notifications_v3', JSON.stringify(notifications));
  }, [notifications]);

  // Persistent Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('digiworku_audit_logs_v3');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_audit_logs_v3', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Persistent Company Settings
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem('digiworku_company_settings_v3');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_SETTINGS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_company_settings_v3', JSON.stringify(companySettings));
  }, [companySettings]);

  // AI Assistant State
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'ai-welcome',
      sender: 'assistant',
      text: 'Greetings, Commander. I am your DigiWorku Operations Intelligence agent (powered by Gemini Flash). I am monitoring all 12 operational modules, task velocities, delayed project radars, and financial ledgers. How can I assist you today?',
      timestamp: '09:00 AM',
      suggestions: [
        'Which projects are currently delayed?',
        'Summarize sprint velocity for Sprint 44',
        'Show team members with spare capacity',
        'Draft client status email for Nordic Living'
      ]
    }
  ]);
  const [isAITyping, setIsAITyping] = useState<boolean>(false);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Stopwatch for Attendance
  useEffect(() => {
    let interval: any = null;
    if (isCheckedIn) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  // Helper for logging audit events
  const logAuditEvent = (action: string, module: NavModule, details: string, status: 'success' | 'warning' | 'error' = 'success') => {
    if (!companySettings.enableAuditLogging) return;
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actorId: currentUser.id,
      actorName: currentUser.fullName,
      actorRole: currentRole,
      action,
      module,
      details,
      status
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Sync Current User when Role changes
  const switchRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    const matchingEmp = employees.find((e) => e.role === newRole) || employees[0];
    setCurrentUser(matchingEmp);

    const allowed = hasAccessToRole(newRole, activeModule);
    if (!allowed) {
      setActiveModule(newRole === 'freelancer' ? 'tasks' : 'dashboard');
    }

    logAuditEvent('Role Switch', 'dashboard', `Switched active perspective to: ${formatRoleName(newRole)}`);
    showToast(`Switched active perspective to: ${formatRoleName(newRole)} (${matchingEmp.fullName})`, 'info');
  };

  const formatRoleName = (role: UserRole): string => {
    return role.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  // RBAC Permission Engine (8-9 Roles + All 14 Navigation Modules)
  const hasAccessToRole = (role: UserRole, mod: NavModule): boolean => {
    switch (role) {
      case 'super_admin':
      case 'admin':
        return true; // Full access across all 14 modules
      case 'finance_manager':
        return ['dashboard', 'finance', 'projects', 'crm', 'freelancers', 'chat', 'ai', 'notifications', 'settings'].includes(mod);
      case 'hr_manager':
        return ['dashboard', 'employees', 'attendance', 'chat', 'ai', 'notifications', 'settings'].includes(mod);
      case 'project_manager':
        return ['dashboard', 'tasks', 'projects', 'freelancers', 'qc', 'analytics', 'chat', 'ai', 'notifications'].includes(mod);
      case 'sales_manager':
        return ['dashboard', 'crm', 'projects', 'analytics', 'chat', 'ai', 'notifications'].includes(mod);
      case 'qa_manager':
        return ['dashboard', 'qc', 'tasks', 'projects', 'chat', 'ai', 'notifications'].includes(mod);
      case 'team_member':
        // STRICT RULE: Team members NEVER have access to salaries, client financial figures, or admin settings
        return ['tasks', 'attendance', 'chat', 'ai', 'notifications'].includes(mod);
      case 'freelancer':
        // Freelancer dedicated portal: own tasks, submit deliverables, chat
        return ['tasks', 'chat', 'ai', 'notifications'].includes(mod);
      default:
        return false;
    }
  };

  const hasAccessTo = (mod: NavModule): boolean => {
    return hasAccessToRole(currentRole, mod);
  };

  // Attendance Punch In / Out
  const toggleCheckIn = () => {
    if (isCheckedIn) {
      setIsCheckedIn(false);
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      logAuditEvent('Shift Punch Out', 'attendance', `Operator shift concluded at ${nowStr}`);
      showToast(`Punched OUT at ${nowStr}. Shift logged: ${Math.floor(elapsedSeconds / 3600)}h ${Math.floor((elapsedSeconds % 3600) / 60)}m.`, 'info');
    } else {
      setIsCheckedIn(true);
      const now = new Date();
      const nowStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCheckInTime(nowStr);
      const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 30);
      setIsLateToday(isLate);

      const newRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.fullName,
        date: new Date().toISOString().split('T')[0],
        checkInTime: nowStr,
        durationMinutes: 0,
        isLate,
        lateReason: isLate ? 'Logged in after 09:30 AM standard shift window' : undefined,
        status: isLate ? 'late' : 'present',
        location: 'Bengaluru Campus Hub'
      };

      setAttendanceRecords((prev) => [newRecord, ...prev]);
      logAuditEvent('Shift Punch In', 'attendance', `Logged shift check-in at ${nowStr} (Late: ${isLate})`);
      showToast(isLate ? `⚠️ Late Check-In logged at ${nowStr} (>09:30 AM policy)` : `✓ Check-In recorded at ${nowStr}`, isLate ? 'warning' : 'success');
    }
  };

  const submitLeaveRequest = (leave: {
    leaveType: 'annual' | 'sick' | 'casual' | 'emergency';
    startDate: string;
    endDate: string;
    totalDays: number;
    reason: string;
  }) => {
    const newLeave: LeaveRequest = {
      id: `leave-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      department: currentUser.department,
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      totalDays: leave.totalDays,
      reason: leave.reason,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);

    // Push Notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Leave Request',
        message: `${currentUser.fullName} applied for ${leave.totalDays} day(s) ${leave.leaveType} leave.`,
        type: 'leave',
        read: false,
        createdAt: 'Just now',
        linkModule: 'attendance'
      },
      ...prev
    ]);

    logAuditEvent('Leave Application', 'attendance', `Submitted ${leave.totalDays}d ${leave.leaveType} leave request`);
    showToast(`Leave request for ${leave.totalDays} day(s) submitted for HR approval!`, 'success');
  };

  const reviewLeaveRequest = (leaveId: string, status: 'approved' | 'rejected') => {
    setLeaveRequests((prev) =>
      prev.map((lr) =>
        lr.id === leaveId ? { ...lr, status, reviewedBy: currentUser.fullName } : lr
      )
    );
    logAuditEvent('Leave Review', 'attendance', `Leave request ${leaveId} was marked ${status}`);
    showToast(`Leave request ${status.toUpperCase()} by ${currentUser.fullName}`, status === 'approved' ? 'success' : 'warning');
  };

  const addAttendanceCorrection = (recordId: string, correctedTime: string, reason: string) => {
    setAttendanceRecords((prev) =>
      prev.map((rec) =>
        rec.id === recordId ? { ...rec, checkInTime: correctedTime, lateReason: `Adjusted: ${reason}` } : rec
      )
    );
    logAuditEvent('Attendance Correction', 'attendance', `Record ${recordId} adjusted to ${correctedTime}. Reason: ${reason}`);
    showToast('Attendance record adjusted with audit log.', 'success');
  };

  // Tasks Management
  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    const task = tasks.find((t) => t.id === taskId);
    logAuditEvent('Task Status Update', 'tasks', `Moved "${task?.title || taskId}" to ${newStatus}`);
    showToast(`Task status updated to: ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const toggleTaskChecklist = (taskId: string, checkId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedChecklist = t.checklist.map((item) =>
            item.id === checkId ? { ...item, completed: !item.completed } : item
          );
          return { ...t, checklist: updatedChecklist };
        }
        return t;
      })
    );
  };

  const addTask = (task: Omit<InternalTask, 'id' | 'createdAt'>) => {
    const newTask: InternalTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks((prev) => [newTask, ...prev]);
    logAuditEvent('Task Created', 'tasks', `Created task "${newTask.title}" for ${newTask.assigneeName}`);
    showToast(`Task "${newTask.title}" assigned to ${newTask.assigneeName}!`);
  };

  const updateTask = (updated: InternalTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    logAuditEvent('Task Edited', 'tasks', `Updated details for task "${updated.title}"`);
    showToast(`Task "${updated.title}" updated.`);
  };

  const deleteTask = (taskId: string) => {
    const t = tasks.find((item) => item.id === taskId);
    setTasks((prev) => prev.filter((item) => item.id !== taskId));
    logAuditEvent('Task Deleted', 'tasks', `Removed task "${t?.title || taskId}"`, 'warning');
    showToast(`Task deleted.`, 'warning');
  };

  // CRM & Clients
  const updateClientStatus = (clientId: string, newStatus: LeadStatus) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status: newStatus } : c))
    );
    const c = clients.find((item) => item.id === clientId);
    logAuditEvent('CRM Stage Advance', 'crm', `Client "${c?.companyName}" shifted to ${newStatus}`);
    showToast(`Client stage updated to: ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const addClient = (client: Omit<ClientLead, 'id' | 'activityHistory'>) => {
    const newClient: ClientLead = {
      ...client,
      id: `client-${Date.now()}`,
      activityHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          note: `Lead created into CRM pipeline with contract valuation ₹${client.contractValue.toLocaleString()}.`,
          author: currentUser.fullName
        }
      ]
    };
    setClients((prev) => [newClient, ...prev]);
    logAuditEvent('Client Added', 'crm', `New enterprise lead registered: ${client.companyName}`);
    showToast(`Lead for "${newClient.companyName}" added to CRM pipeline!`);
  };

  const updateClient = (updated: ClientLead) => {
    setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    logAuditEvent('Client Dossier Edited', 'crm', `Updated information for ${updated.companyName}`);
    showToast(`Client "${updated.companyName}" dossier updated.`);
  };

  const deleteClient = (clientId: string) => {
    const c = clients.find((item) => item.id === clientId);
    setClients((prev) => prev.filter((item) => item.id !== clientId));
    logAuditEvent('Client Deleted', 'crm', `Removed client "${c?.companyName || clientId}"`, 'warning');
    showToast(`Client removed from CRM pipeline.`, 'warning');
  };

  const addQuote = (quote: ClientQuote) => {
    setQuotes((prev) => [quote, ...prev]);
    logAuditEvent('Quote Generated', 'crm', `Generated formal proposal ${quote.quoteNumber} (₹${quote.total.toLocaleString()})`);
    showToast(`Quote #${quote.quoteNumber} created for ${quote.clientName}! Total: ₹${quote.total.toLocaleString()}`);
  };

  // Projects & Milestones
  const updateMilestoneStatus = (
    projectId: string,
    milestoneId: string,
    status: ProjectMilestone['status']
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedMilestones = p.milestones.map((m) =>
            m.id === milestoneId ? { ...m, status } : m
          );
          const approvedCount = updatedMilestones.filter((m) => m.status === 'approved_by_client' || m.status === 'paid').length;
          const calculatedProgress = Math.round((approvedCount / updatedMilestones.length) * 100);

          return {
            ...p,
            milestones: updatedMilestones,
            progress: calculatedProgress
          };
        }
        return p;
      })
    );
    logAuditEvent('Milestone Status Changed', 'projects', `Project ${projectId} milestone updated to ${status}`);
    showToast(`Milestone status updated to: ${status.replace('_', ' ').toUpperCase()}`);
  };

  const addProject = (proj: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...proj,
      id: `proj-${Date.now()}`
    };
    setProjects((prev) => [newProject, ...prev]);
    logAuditEvent('Project Created', 'projects', `Initiated project roadmap "${newProject.name}" (Code: ${newProject.code})`);
    showToast(`Project "${newProject.name}" added successfully!`);
  };

  const updateProject = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    logAuditEvent('Project Updated', 'projects', `Updated details for project "${updated.name}"`);
    showToast(`Project "${updated.name}" updated.`);
  };

  const deleteProject = (projectId: string) => {
    const p = projects.find((item) => item.id === projectId);
    setProjects((prev) => prev.filter((item) => item.id !== projectId));
    logAuditEvent('Project Deleted', 'projects', `Deleted project "${p?.name || projectId}"`, 'warning');
    showToast(`Project removed.`, 'warning');
  };

  const addMilestone = (projectId: string, milestone: Omit<ProjectMilestone, 'id' | 'projectId'>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newMilestone: ProjectMilestone = {
            ...milestone,
            id: `ms-${Date.now()}`,
            projectId
          };
          return {
            ...p,
            milestones: [...p.milestones, newMilestone]
          };
        }
        return p;
      })
    );
    logAuditEvent('Milestone Added', 'projects', `Added milestone "${milestone.title}" to project ${projectId}`);
    showToast(`Milestone "${milestone.title}" added to project!`);
  };

  // Freelancer Network
  const updateFreelancerStatus = (id: string, status: Freelancer['status']) => {
    setFreelancers((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
    const fl = freelancers.find((item) => item.id === id);
    logAuditEvent('Freelancer Availability', 'freelancers', `Updated status for ${fl?.fullName} to ${status}`);
    showToast(`Freelancer availability set to ${status.toUpperCase()}`);
  };

  const addFreelancer = (fl: Omit<Freelancer, 'id'>) => {
    const newFL: Freelancer = {
      ...fl,
      id: `fl-${Date.now()}`
    };
    setFreelancers((prev) => [newFL, ...prev]);
    logAuditEvent('Freelancer Added', 'freelancers', `Vetted talent onboarded: ${fl.fullName}`);
    showToast(`Freelancer "${newFL.fullName}" onboarded to network!`);
  };

  const updateFreelancer = (updated: Freelancer) => {
    setFreelancers((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    logAuditEvent('Freelancer Edited', 'freelancers', `Updated profile for ${updated.fullName}`);
    showToast(`Freelancer profile for "${updated.fullName}" updated.`);
  };

  const deleteFreelancer = (id: string) => {
    const fl = freelancers.find((item) => item.id === id);
    setFreelancers((prev) => prev.filter((item) => item.id !== id));
    logAuditEvent('Freelancer Deleted', 'freelancers', `Removed ${fl?.fullName || id}`, 'warning');
    showToast(`Freelancer removed from network.`, 'warning');
  };

  const allocateFreelancerToProject = (freelancerId: string, projectId: string) => {
    const fl = freelancers.find((item) => item.id === freelancerId);
    const proj = projects.find((item) => item.id === projectId);
    if (!fl || !proj) return;

    setFreelancers((prev) =>
      prev.map((f) => (f.id === freelancerId ? { ...f, activeProjectsCount: f.activeProjectsCount + 1, status: 'busy' } : f))
    );

    logAuditEvent('Freelancer Allocated', 'freelancers', `Allocated ${fl.fullName} to project "${proj.name}"`);
    showToast(`Allocated ${fl.fullName} to "${proj.name}"!`);
  };

  // Finance & Payroll
  const processPayrollItem = (id: string) => {
    setPayroll((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: 'paid', processedDate: new Date().toISOString().split('T')[0] } : p
      )
    );
    const item = payroll.find((p) => p.id === id);
    logAuditEvent('Salary Disbursed', 'finance', `Processed salary payout for ${item?.employeeName} (₹${item?.netSalary.toLocaleString()})`);
    showToast(`Salary for ${item?.employeeName || 'staff'} marked as PAID!`, 'success');
  };

  const createInvoice = (inv: Omit<InvoiceRecord, 'id'>) => {
    const newInv: InvoiceRecord = {
      ...inv,
      id: `inv-${Date.now()}`
    };
    setInvoices((prev) => [newInv, ...prev]);
    logAuditEvent('Invoice Created', 'finance', `Generated invoice ${newInv.invoiceNumber} for ${newInv.clientName} (₹${newInv.totalAmount.toLocaleString()})`);
    showToast(`Invoice #${newInv.invoiceNumber} created for ${newInv.clientName}! Total: ₹${newInv.totalAmount.toLocaleString()}`);
  };

  const updateInvoice = (updated: InvoiceRecord) => {
    setInvoices((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    logAuditEvent('Invoice Updated', 'finance', `Modified invoice #${updated.invoiceNumber}`);
    showToast(`Invoice #${updated.invoiceNumber} updated.`);
  };

  const deleteInvoice = (id: string) => {
    const inv = invoices.find((item) => item.id === id);
    setInvoices((prev) => prev.filter((item) => item.id !== id));
    logAuditEvent('Invoice Deleted', 'finance', `Removed invoice #${inv?.invoiceNumber || id}`, 'warning');
    showToast(`Invoice removed.`, 'warning');
  };

  const addExpense = (expense: { description: string; amount: number; category: string; date: string }) => {
    setFinancialSummary((prev) => ({
      ...prev,
      totalExpenses: prev.totalExpenses + expense.amount,
      netProfit: prev.totalRevenueYTD - (prev.totalExpenses + expense.amount)
    }));
    logAuditEvent('Expense Recorded', 'finance', `Recorded expense: ${expense.description} (₹${expense.amount.toLocaleString()})`);
    showToast(`Expense of ₹${expense.amount.toLocaleString()} logged.`);
  };

  // Internal Communication
  const sendMessage = (channelId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderRole: currentRole,
      senderAvatar: currentUser.avatarUrl,
      message: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Quality Control
  const submitQcDecision = (
    reviewId: string,
    decision: 'approve' | 'request_revisions' | 'reject',
    comments: string
  ) => {
    setQcReviews((prev) =>
      prev.map((q) =>
        q.id === reviewId
          ? {
              ...q,
              decision,
              comments,
              reviewerId: currentUser.id,
              reviewerName: currentUser.fullName,
              reviewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : q
      )
    );

    const review = qcReviews.find((q) => q.id === reviewId);
    if (review) {
      const channel = channels.find((c) => c.id === 'qc-alerts');
      if (channel) {
        sendMessage(
          'qc-alerts',
          `🚨 QC DECISION: Milestone "${review.milestoneTitle}" for project "${review.projectName}" was marked **${decision.toUpperCase()}** by QA Lead ${currentUser.fullName}. Comment: ${comments}`
        );
      }
    }

    logAuditEvent('QC Review Audit', 'qc', `Milestone review ${reviewId} decision: ${decision}`);
    showToast(`QC Decision: ${decision.replace('_', ' ').toUpperCase()} recorded!`, decision === 'approve' ? 'success' : 'warning');
  };

  const toggleQcChecklistItem = (reviewId: string, checkId: string) => {
    setQcReviews((prev) =>
      prev.map((q) => {
        if (q.id === reviewId) {
          const updatedItems = q.checklistItems.map((item) =>
            item.id === checkId ? { ...item, passed: !item.passed } : item
          );
          const passedWeight = updatedItems.filter((i) => i.passed).reduce((acc, curr) => acc + curr.weight, 0);
          const totalWeight = updatedItems.reduce((acc, curr) => acc + curr.weight, 0);
          const overallScore = Math.round((passedWeight / totalWeight) * 100);

          return { ...q, checklistItems: updatedItems, overallScore };
        }
        return q;
      })
    );
  };

  const submitDeliverableForQC = (projectId: string, milestoneTitle: string, deliverableUrl: string, comments: string) => {
    const proj = projects.find((p) => p.id === projectId);
    const newRev: QCReview = {
      id: `qc-${Date.now()}`,
      projectId,
      projectName: proj?.name || 'Enterprise Project',
      milestoneTitle,
      deliverablePreviewUrl: deliverableUrl,
      submittedBy: currentUser.id,
      submittedByName: currentUser.fullName,
      overallScore: 85,
      decision: 'pending',
      comments,
      checklistItems: qcReviews[0]?.checklistItems || [],
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setQcReviews((prev) => [newRev, ...prev]);
    logAuditEvent('QC Submission', 'qc', `Submitted deliverable for "${milestoneTitle}"`);
    showToast(`Deliverable for "${milestoneTitle}" submitted to QA team!`);
  };

  // Employee Directory
  const toggleEmployeeActive = (id: string) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isActive: !e.isActive } : e))
    );
    const emp = employees.find((e) => e.id === id);
    const nextStatus = !emp?.isActive;
    logAuditEvent('Employee Status Changed', 'employees', `Employee ${emp?.fullName} toggled to ${nextStatus ? 'Active' : 'Deactivated'}`);
    showToast(`Employee status toggled to: ${nextStatus ? 'ACTIVE' : 'INACTIVE'}`);
  };

  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp: Employee = {
      ...emp,
      id: `emp-${Date.now()}`
    };
    setEmployees((prev) => [newEmp, ...prev]);
    logAuditEvent('Employee Created', 'employees', `Onboarded new employee: ${newEmp.fullName} (${newEmp.role})`);
    showToast(`Employee "${newEmp.fullName}" onboarded successfully!`);
  };

  const updateEmployee = (updated: Employee) => {
    setEmployees((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    logAuditEvent('Employee Edited', 'employees', `Updated staff record for ${updated.fullName}`);
    showToast(`Employee profile for "${updated.fullName}" updated.`);
  };

  const deleteEmployee = (id: string) => {
    const emp = employees.find((item) => item.id === id);
    setEmployees((prev) => prev.filter((item) => item.id !== id));
    logAuditEvent('Employee Deleted', 'employees', `Deactivated employee record for ${emp?.fullName || id}`, 'warning');
    showToast(`Employee removed from roster.`, 'warning');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.');
  };

  // Company Settings
  const updateCompanySettings = (settings: Partial<CompanySettings>) => {
    setCompanySettings((prev) => ({ ...prev, ...settings }));
    logAuditEvent('System Settings Updated', 'settings', 'Updated company operating parameters & policies');
    showToast('System configuration saved successfully!');
  };

  // DigiWorku AI Assistant
  const sendAIMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAiMessages((prev) => [...prev, userMsg]);
    setIsAITyping(true);

    setTimeout(() => {
      let replyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('delay') || lower.includes('late')) {
        const delayed = projects.filter((p) => p.status === 'delayed' || (p.daysDelayed && p.daysDelayed > 0));
        if (delayed.length > 0) {
          replyText = `⚠️ **Radar Delay Diagnostic**: Found ${delayed.length} delayed project: **${delayed[0].name}** (Code: ${delayed[0].code}). Client: **${delayed[0].clientName}**. Current delay is **${delayed[0].daysDelayed || 2} days** behind SLA schedule. Key bottleneck: Third-party mobile sandbox regression checks.`;
        } else {
          replyText = '✓ All active projects are currently operating within nominal SLA schedules.';
        }
      } else if (lower.includes('velocity') || lower.includes('sprint')) {
        replyText = `🚀 **Sprint 44 Velocity Telemetry**: Current sprint has **${performance.sprintVelocity[4].completed} story points completed** out of **${performance.sprintVelocity[4].committed} committed** (90% completion velocity). SLA Delivery Rate is currently standing strong at **${performance.slaDeliveryRate}%**.`;
      } else if (lower.includes('capacity') || lower.includes('available')) {
        const availableFL = freelancers.filter((f) => f.status === 'available');
        replyText = `👥 **Workforce Capacity Overview**: Internal engineering squad is currently at 88% capacity utilization. We have **${availableFL.length} verified senior contractors** ready for immediate deployment in the Freelancer Network: ${availableFL.map((f) => f.fullName + ' (' + f.skillDomain + ')').join(', ')}.`;
      } else if (lower.includes('finance') || lower.includes('revenue') || lower.includes('payroll')) {
        if (currentRole === 'team_member' || currentRole === 'freelancer') {
          replyText = '🔒 **Access Denied**: Under DigiWorku RBAC security protocol, financial metrics and payroll ledgers are strictly restricted to Super Admin and Finance Manager roles.';
        } else {
          replyText = `💰 **Financial Intelligence**: Total YTD Revenue is **₹${financialSummary.totalRevenueYTD.toLocaleString()}** with a healthy **${financialSummary.profitMarginPercent}% net profit margin**. Outstanding client receivables stand at **₹${financialSummary.pendingInvoicesAmount.toLocaleString()}** across 2 unpaid invoices.`;
        }
      } else {
        replyText = `Understood, ${currentUser.fullName}. I have cross-referenced the DigiWorku Operations Hub. We have ${projects.filter((p) => p.status === 'active').length} active projects running, ${tasks.filter((t) => t.status !== 'done').length} pending tasks in the Kanban pipeline, and ${attendanceRecords.filter((a) => a.status === 'present').length} team members currently on-duty.`;
      }

      const aiReply: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Which projects are currently delayed?',
          'Summarize sprint velocity for Sprint 44',
          'Show team members with spare capacity'
        ]
      };
      setAiMessages((prev) => [...prev, aiReply]);
      setIsAITyping(false);
    }, 700);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        activeModule,
        setActiveModule,
        hasAccessTo,
        isCheckedIn,
        checkInTime,
        elapsedSeconds,
        isLateToday,
        toggleCheckIn,
        attendanceRecords,
        leaveRequests,
        submitLeaveRequest,
        reviewLeaveRequest,
        addAttendanceCorrection,
        tasks,
        updateTaskStatus,
        toggleTaskChecklist,
        addTask,
        updateTask,
        deleteTask,
        clients,
        updateClientStatus,
        addClient,
        updateClient,
        deleteClient,
        quotes,
        addQuote,
        projects,
        updateMilestoneStatus,
        addProject,
        updateProject,
        deleteProject,
        addMilestone,
        freelancers,
        updateFreelancerStatus,
        addFreelancer,
        updateFreelancer,
        deleteFreelancer,
        allocateFreelancerToProject,
        payroll,
        invoices,
        financialSummary,
        processPayrollItem,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        addExpense,
        channels,
        activeChannelId,
        setActiveChannelId,
        messages,
        sendMessage,
        qcReviews,
        submitQcDecision,
        toggleQcChecklistItem,
        submitDeliverableForQC,
        performance,
        employees,
        toggleEmployeeActive,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        aiMessages,
        sendAIMessage,
        isAITyping,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        auditLogs,
        logAuditEvent,
        companySettings,
        updateCompanySettings,
        darkMode,
        toggleDarkMode,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
