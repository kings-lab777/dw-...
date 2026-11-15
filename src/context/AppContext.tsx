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
  FreelancerPayout,
  BusinessExpense,
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
  CompanySettings,
  ServiceItem
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_EMPLOYEES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVES,
  INITIAL_TASKS,
  INITIAL_CLIENTS,
  INITIAL_QUOTES,
  INITIAL_PROJECTS,
  INITIAL_FREELANCERS,
  INITIAL_FREELANCER_PAYOUTS,
  INITIAL_EXPENSES,
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

export type DateFilterOption = 'today' | '7d' | '30d' | 'this_month' | 'last_month' | 'quarter' | 'year' | 'custom';

interface AppContextType {
  // RBAC & User
  currentRole: UserRole;
  currentUser: Employee;
  switchRole: (role: UserRole) => void;
  activeModule: NavModule;
  setActiveModule: (mod: NavModule) => void;
  hasAccessTo: (module: NavModule) => boolean;

  // Date Filtering (Executive Dashboard)
  dateFilter: DateFilterOption;
  setDateFilter: (filter: DateFilterOption) => void;

  // 13 DigiWorku Services
  services: ServiceItem[];
  toggleServiceEnabled: (serviceId: string) => void;
  updateServiceItem: (service: ServiceItem) => void;

  // Attendance & Time
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

  // Tasks & Workflow (Fokys style)
  tasks: InternalTask[];
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  toggleTaskChecklist: (taskId: string, checkId: string) => void;
  addTask: (task: Omit<InternalTask, 'id' | 'createdAt'>) => void;
  updateTask: (task: InternalTask) => void;
  deleteTask: (taskId: string) => void;
  submitTaskWork: (taskId: string, submissionUrl: string, notes: string) => void;

  // CRM & Client Management
  clients: ClientLead[];
  updateClientStatus: (clientId: string, status: LeadStatus) => void;
  addClient: (client: Omit<ClientLead, 'id' | 'activityHistory'>) => void;
  updateClient: (client: ClientLead) => void;
  deleteClient: (clientId: string) => void;
  convertLeadToClient: (leadId: string) => ClientLead;
  quotes: ClientQuote[];
  addQuote: (quote: ClientQuote) => void;
  convertProposalToProject: (quoteId: string) => Project;

  // Project Management Engine
  projects: Project[];
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: ProjectMilestone['status']) => void;
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (proj: Project) => void;
  deleteProject: (projectId: string) => void;
  addMilestone: (projectId: string, milestone: Omit<ProjectMilestone, 'id' | 'projectId'>) => void;

  // Freelancers & Mobile Payouts
  freelancers: Freelancer[];
  updateFreelancerStatus: (id: string, status: Freelancer['status']) => void;
  addFreelancer: (fl: Omit<Freelancer, 'id'>) => void;
  updateFreelancer: (fl: Freelancer) => void;
  deleteFreelancer: (id: string) => void;
  allocateFreelancerToProject: (freelancerId: string, projectId: string) => void;
  freelancerPayouts: FreelancerPayout[];
  releaseFreelancerPayout: (payoutId: string) => void;
  requestFreelancerPayout: (payout: Omit<FreelancerPayout, 'id'>) => void;

  // Finance, Invoices & Installments
  payroll: PayrollRecord[];
  invoices: InvoiceRecord[];
  expenses: BusinessExpense[];
  financialSummary: FinancialSummary;
  processPayrollItem: (id: string) => void;
  createInvoice: (inv: Omit<InvoiceRecord, 'id' | 'payments' | 'amountPaid'>) => void;
  updateInvoice: (inv: InvoiceRecord) => void;
  deleteInvoice: (id: string) => void;
  recordInvoicePayment: (invoiceId: string, amount: number, paymentMethod: InvoiceRecord['payments'][0]['paymentMethod'], notes?: string) => void;
  addBusinessExpense: (expense: Omit<BusinessExpense, 'id'>) => void;
  addExpense: (expense: { description: string; amount: number; category: string; date: string }) => void; // backwards compat

  // Internal Collaboration
  channels: ChatChannel[];
  activeChannelId: string;
  setActiveChannelId: (id: string) => void;
  messages: ChatMessage[];
  sendMessage: (channelId: string, text: string) => void;

  // Quality Control (QC) Gate
  qcReviews: QCReview[];
  submitQcDecision: (reviewId: string, decision: 'approve' | 'request_revisions' | 'reject', comments: string) => void;
  toggleQcChecklistItem: (reviewId: string, checkId: string) => void;
  submitDeliverableForQC: (projectId: string, milestoneTitle: string, deliverableUrl: string, comments: string) => void;
  approveQcAndAuthorizeDelivery: (reviewId: string, projectId: string) => void;
  requestQcRevision: (reviewId: string, revisionNotes: string) => void;

  // Analytics
  performance: PerformanceMetrics;

  // Employees Directory
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

  // Theme & Toast
  darkMode: boolean;
  toggleDarkMode: () => void;
  toast: { message: string; type: 'success' | 'warning' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme State (Default: Light Mode matching digiworku.in)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('digiworku_dark_mode');
    return saved !== null ? saved === 'true' : false;
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

  // Date Filter for Executive Dashboard
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('this_month');

  // Role and Current User
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('digiworku_employees_v4');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_employees_v4', JSON.stringify(employees));
  }, [employees]);

  const [currentUser, setCurrentUser] = useState<Employee>(employees[0]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const matched = employees.find((e) => e.role === role);
    if (matched) {
      setCurrentUser(matched);
    } else if (role === 'freelancer') {
      setCurrentUser({
        id: 'fl-temp',
        fullName: 'Sofia Al-Mansoor',
        email: 'sofia.designs@freelancer.digiworku.in',
        role: 'freelancer',
        department: 'External Freelance Network',
        designation: 'Senior Product Designer',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        phone: '+91 99111 88223',
        skills: ['Figma', 'UI Animation', 'Tailwind CSS'],
        kycStatus: 'verified',
        kycDocuments: [],
        isActive: true,
        joinDate: '2024-01-01',
        baseSalary: 0
      });
    }
    showToast(`Role switched to ${role.replace('_', ' ').toUpperCase()}`, 'info');
    logAuditEvent('Role Switch', 'settings', `User switched simulated workspace role to: ${role}`);
  };

  const [activeModule, setActiveModule] = useState<NavModule>('dashboard');

  const hasAccessTo = (module: NavModule): boolean => {
    if (currentRole === 'super_admin' || currentRole === 'admin') return true;
    switch (module) {
      case 'dashboard':
        return true;
      case 'employees':
        return ['super_admin', 'admin', 'hr_manager', 'operations_manager'].includes(currentRole);
      case 'attendance':
        return true;
      case 'tasks':
        return true;
      case 'crm':
        return ['super_admin', 'admin', 'sales_manager', 'operations_manager', 'project_manager'].includes(currentRole);
      case 'projects':
        return ['super_admin', 'admin', 'project_manager', 'operations_manager', 'team_member', 'qa_manager', 'freelancer'].includes(currentRole);
      case 'freelancers':
        return ['super_admin', 'admin', 'operations_manager', 'project_manager', 'freelancer'].includes(currentRole);
      case 'finance':
        return ['super_admin', 'admin', 'finance_manager'].includes(currentRole);
      case 'chat':
        return true;
      case 'qc':
        return ['super_admin', 'admin', 'qa_manager', 'project_manager', 'operations_manager', 'team_member'].includes(currentRole);
      case 'analytics':
        return ['super_admin', 'admin', 'operations_manager', 'sales_manager', 'finance_manager'].includes(currentRole);
      case 'ai':
        return true;
      case 'notifications':
        return true;
      case 'settings':
        return ['super_admin', 'admin'].includes(currentRole);
      default:
        return false;
    }
  };

  // 13 DigiWorku Services Catalogue
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('digiworku_services_v4');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_services_v4', JSON.stringify(services));
  }, [services]);

  const toggleServiceEnabled = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, isEnabled: !s.isEnabled } : s))
    );
    const target = services.find((s) => s.id === serviceId);
    showToast(`Service "${target?.name}" ${target?.isEnabled ? 'disabled' : 'enabled'} in catalogue`, 'info');
    logAuditEvent('Service Status Toggle', 'settings', `Toggled service ${target?.name}`);
  };

  const updateServiceItem = (service: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
    showToast(`Service "${service.name}" updated`, 'success');
  };

  // Attendance
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(true);
  const [checkInTime, setCheckInTime] = useState<string | null>('08:45 AM');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(19500);
  const [isLateToday, setIsLateToday] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCheckedIn) {
      timer = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isCheckedIn]);

  const toggleCheckIn = () => {
    if (isCheckedIn) {
      setIsCheckedIn(false);
      showToast('Shift checked out. Have a great evening!', 'info');
      logAuditEvent('Shift Check-Out', 'attendance', `Operator ${currentUser.fullName} checked out.`);
    } else {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setIsCheckedIn(true);
      setCheckInTime(timeStr);
      const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 30);
      setIsLateToday(isLate);
      setElapsedSeconds(0);
      showToast(`Shift checked in at ${timeStr}${isLate ? ' (Marked as late)' : ''}`, isLate ? 'warning' : 'success');
      logAuditEvent('Shift Check-In', 'attendance', `Operator ${currentUser.fullName} checked in at ${timeStr}`);
    }
  };

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('digiworku_attendance_v4');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_attendance_v4', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('digiworku_leaves_v4');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_leaves_v4', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  const submitLeaveRequest = (leave: { leaveType: LeaveRequest['leaveType']; startDate: string; endDate: string; totalDays: number; reason: string }) => {
    const newReq: LeaveRequest = {
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
    setLeaveRequests((prev) => [newReq, ...prev]);
    showToast('Leave request submitted to HR Operations', 'success');
    logAuditEvent('Leave Application', 'attendance', `Leave application for ${leave.totalDays} days submitted.`);
  };

  const reviewLeaveRequest = (leaveId: string, status: 'approved' | 'rejected') => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, status, reviewedBy: currentUser.fullName } : l))
    );
    showToast(`Leave request ${status}`, status === 'approved' ? 'success' : 'warning');
    logAuditEvent('Leave Review', 'attendance', `Leave request ${leaveId} was ${status} by ${currentUser.fullName}.`);
  };

  const addAttendanceCorrection = (recordId: string, correctedTime: string, reason: string) => {
    setAttendanceRecords((prev) =>
      prev.map((rec) =>
        rec.id === recordId
          ? { ...rec, checkInTime: correctedTime, isLate: false, status: 'present', lateReason: `Corrected: ${reason}` }
          : rec
      )
    );
    showToast('Attendance record corrected', 'success');
  };

  // Tasks & Workflow (Fokys style)
  const [tasks, setTasks] = useState<InternalTask[]>(() => {
    const saved = localStorage.getItem('digiworku_tasks_v4');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_tasks_v4', JSON.stringify(tasks));
  }, [tasks]);

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newProgress = status === 'done' ? 100 : status === 'qa_ready' ? 85 : status === 'in_progress' ? 50 : 0;
          return { ...t, status, progressPercent: newProgress };
        }
        return t;
      })
    );
    showToast(`Task status updated to ${status.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const toggleTaskChecklist = (taskId: string, checkId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = t.checklist.map((item) =>
            item.id === checkId ? { ...item, completed: !item.completed } : item
          );
          const completedCount = updated.filter((c) => c.completed).length;
          const progress = updated.length > 0 ? Math.round((completedCount / updated.length) * 100) : t.progressPercent;
          return { ...t, checklist: updated, progressPercent: progress };
        }
        return t;
      })
    );
  };

  const addTask = (task: Omit<InternalTask, 'id' | 'createdAt'>) => {
    const newTask: InternalTask = {
      ...task,
      id: `tsk-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task "${task.title}" created`, 'success');
    logAuditEvent('Task Created', 'tasks', `Created task: ${task.title}`);
  };

  const updateTask = (task: InternalTask) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    showToast(`Task "${task.title}" updated`, 'success');
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Task removed', 'warning');
  };

  const submitTaskWork = (taskId: string, submissionUrl: string, notes: string) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'qa_ready',
              progressPercent: 85,
              submissionUrl,
              submissionNotes: notes,
              submittedAt: new Date().toLocaleString(),
              qcReviewStatus: 'pending'
            }
          : t
      )
    );

    // Auto-create QC review entry for the QA team
    const newQC: QCReview = {
      id: `qc-rev-${Date.now()}`,
      projectId: targetTask.projectId,
      projectName: targetTask.projectName,
      milestoneTitle: targetTask.title,
      taskId: targetTask.id,
      deliverablePreviewUrl: submissionUrl,
      submittedBy: targetTask.assigneeId,
      submittedByName: targetTask.assigneeName,
      overallScore: 90,
      decision: 'pending',
      comments: notes,
      revisionCount: (targetTask.revisionCount || 0) + 1,
      checklistItems: INITIAL_QC_REVIEWS[0]?.checklistItems || [],
      deliveryAuthorized: false,
      submittedAt: new Date().toLocaleString()
    };
    setQcReviews((prev) => [newQC, ...prev]);

    // Send notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Deliverable Submitted for QA Review',
      message: `${targetTask.assigneeName} submitted deliverable for "${targetTask.title}" (${targetTask.projectName}).`,
      type: 'qc',
      read: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      linkModule: 'qc'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`Work submitted for QA Review. Handed over to QC Engine!`, 'success');
    logAuditEvent('Deliverable Submitted', 'qc', `Task ${targetTask.title} deliverable submitted for review.`);
  };

  // CRM & Clients
  const [clients, setClients] = useState<ClientLead[]>(() => {
    const saved = localStorage.getItem('digiworku_clients_v4');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_clients_v4', JSON.stringify(clients));
  }, [clients]);

  const [quotes, setQuotes] = useState<ClientQuote[]>(() => {
    const saved = localStorage.getItem('digiworku_quotes_v4');
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_quotes_v4', JSON.stringify(quotes));
  }, [quotes]);

  const updateClientStatus = (clientId: string, status: LeadStatus) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              status,
              activityHistory: [
                {
                  date: new Date().toISOString().split('T')[0],
                  note: `Pipeline stage updated to: ${status.replace('_', ' ').toUpperCase()}`,
                  author: currentUser.fullName
                },
                ...c.activityHistory
              ]
            }
          : c
      )
    );
    showToast(`Client stage updated to ${status.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const addClient = (client: Omit<ClientLead, 'id' | 'activityHistory'>) => {
    const newClient: ClientLead = {
      ...client,
      id: `cli-${Date.now()}`,
      activityHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          note: `Lead acquired into CRM pipeline from ${client.leadSource || 'Direct Inbound'}.`,
          author: currentUser.fullName
        }
      ]
    };
    setClients((prev) => [newClient, ...prev]);
    showToast(`Lead "${client.companyName}" registered`, 'success');
    logAuditEvent('Lead Registered', 'crm', `Lead ${client.companyName} added.`);
  };

  const updateClient = (client: ClientLead) => {
    setClients((prev) => prev.map((c) => (c.id === client.id ? client : c)));
    showToast(`Client "${client.companyName}" updated`, 'success');
  };

  const deleteClient = (clientId: string) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
    showToast('Client record removed', 'warning');
  };

  // Convert Lead -> Active Client and auto-prompt project creation
  const convertLeadToClient = (leadId: string): ClientLead => {
    const targetLead = clients.find((c) => c.id === leadId);
    if (!targetLead) throw new Error('Lead not found');

    const updatedLead: ClientLead = {
      ...targetLead,
      status: 'active_client',
      activityHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          note: `🎉 Lead WON and converted into active corporate client!`,
          author: currentUser.fullName
        },
        ...targetLead.activityHistory
      ]
    };

    setClients((prev) => prev.map((c) => (c.id === leadId ? updatedLead : c)));
    showToast(`🎉 "${targetLead.companyName}" converted to Active Client!`, 'success');
    logAuditEvent('Lead Converted', 'crm', `Lead ${targetLead.companyName} converted to Active Client.`);
    return updatedLead;
  };

  const addQuote = (quote: ClientQuote) => {
    setQuotes((prev) => [quote, ...prev]);
    showToast(`Quote ${quote.quoteNumber} issued (₹${quote.total.toLocaleString('en-IN')})`, 'success');
    logAuditEvent('Quote Issued', 'crm', `Quote ${quote.quoteNumber} issued for ${quote.clientName}`);
  };

  // Convert Proposal / Quote -> Project
  const convertProposalToProject = (quoteId: string): Project => {
    const targetQuote = quotes.find((q) => q.id === quoteId);
    if (!targetQuote) throw new Error('Quote not found');

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: `${targetQuote.clientName} Project`,
      code: `DW-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: targetQuote.clientId,
      clientName: targetQuote.clientName,
      serviceCategory: targetQuote.serviceCategory || 'website_development',
      managerId: currentUser.id,
      managerName: currentUser.fullName,
      status: 'confirmed',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      budget: targetQuote.subtotal,
      estimatedCost: Math.round(targetQuote.subtotal * 0.45), // 45% estimated cost
      spent: 0,
      currency: 'INR',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      progress: 0,
      riskFactor: 'low',
      daysDelayed: 0,
      assignedEmployees: [currentUser.id],
      assignedFreelancers: [],
      deliveryAuthorized: false,
      milestones: targetQuote.items.map((item, idx) => ({
        id: `ms-gen-${Date.now()}-${idx}`,
        projectId: `proj-${Date.now()}`,
        title: item.description,
        orderIndex: idx + 1,
        dueDate: new Date(Date.now() + (idx + 1) * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
        amount: item.amount
      }))
    };

    setProjects((prev) => [newProject, ...prev]);
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'accepted', convertedProjectId: newProject.id } : q))
    );

    // Auto-create initial advance invoice (50%)
    const advanceAmount = Math.round(targetQuote.total * 0.5);
    const newInvoice: InvoiceRecord = {
      id: `inv-gen-${Date.now()}`,
      invoiceNumber: `DW-INV-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: targetQuote.clientId,
      clientName: targetQuote.clientName,
      clientEmail: targetQuote.clientEmail,
      projectId: newProject.id,
      projectName: newProject.name,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtotal: Math.round(targetQuote.subtotal * 0.5),
      taxAmount: Math.round(targetQuote.taxAmount * 0.5),
      totalAmount: advanceAmount,
      amountPaid: 0,
      status: 'sent',
      payments: []
    };
    setInvoices((prev) => [newInvoice, ...prev]);

    showToast(`Proposal accepted! Project & Advance Invoice created.`, 'success');
    logAuditEvent('Proposal to Project Conversion', 'projects', `Converted Quote ${targetQuote.quoteNumber} into Project ${newProject.name}`);
    return newProject;
  };

  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('digiworku_projects_v4');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_projects_v4', JSON.stringify(projects));
  }, [projects]);

  const updateMilestoneStatus = (projectId: string, milestoneId: string, status: ProjectMilestone['status']) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updated = p.milestones.map((m) => (m.id === milestoneId ? { ...m, status } : m));
          const completedCount = updated.filter((m) => m.status === 'approved_by_client' || m.status === 'paid').length;
          const progress = updated.length > 0 ? Math.round((completedCount / updated.length) * 100) : p.progress;
          return { ...p, milestones: updated, progress };
        }
        return p;
      })
    );
    showToast(`Milestone status updated to ${status.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const addProject = (proj: Omit<Project, 'id'>) => {
    const newProj: Project = { ...proj, id: `proj-${Date.now()}` };
    setProjects((prev) => [newProj, ...prev]);
    showToast(`Project "${proj.name}" initialized`, 'success');
    logAuditEvent('Project Initialized', 'projects', `Initialized project ${proj.name} (Code: ${proj.code})`);
  };

  const updateProject = (proj: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === proj.id ? proj : p)));
    showToast(`Project "${proj.name}" updated`, 'success');
  };

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    showToast('Project removed', 'warning');
  };

  const addMilestone = (projectId: string, milestone: Omit<ProjectMilestone, 'id' | 'projectId'>) => {
    const newMs: ProjectMilestone = {
      ...milestone,
      id: `ms-${Date.now()}`,
      projectId
    };
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, milestones: [...p.milestones, newMs] } : p))
    );
    showToast(`Milestone "${milestone.title}" added to project`, 'success');
  };

  // Freelancers & Mobile Payouts
  const [freelancers, setFreelancers] = useState<Freelancer[]>(() => {
    const saved = localStorage.getItem('digiworku_freelancers_v4');
    return saved ? JSON.parse(saved) : INITIAL_FREELANCERS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_freelancers_v4', JSON.stringify(freelancers));
  }, [freelancers]);

  const [freelancerPayouts, setFreelancerPayouts] = useState<FreelancerPayout[]>(() => {
    const saved = localStorage.getItem('digiworku_payouts_v4');
    return saved ? JSON.parse(saved) : INITIAL_FREELANCER_PAYOUTS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_payouts_v4', JSON.stringify(freelancerPayouts));
  }, [freelancerPayouts]);

  const updateFreelancerStatus = (id: string, status: Freelancer['status']) => {
    setFreelancers((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
    showToast(`Freelancer availability updated to ${status}`, 'info');
  };

  const addFreelancer = (fl: Omit<Freelancer, 'id'>) => {
    const newFl: Freelancer = { ...fl, id: `fl-${Date.now()}` };
    setFreelancers((prev) => [newFl, ...prev]);
    showToast(`Freelancer "${fl.fullName}" registered to talent network`, 'success');
  };

  const updateFreelancer = (fl: Freelancer) => {
    setFreelancers((prev) => prev.map((f) => (f.id === fl.id ? fl : f)));
    showToast(`Freelancer "${fl.fullName}" profile updated`, 'success');
  };

  const deleteFreelancer = (id: string) => {
    setFreelancers((prev) => prev.filter((f) => f.id !== id));
    showToast('Freelancer profile removed', 'warning');
  };

  const allocateFreelancerToProject = (freelancerId: string, projectId: string) => {
    const fl = freelancers.find((f) => f.id === freelancerId);
    const prj = projects.find((p) => p.id === projectId);
    if (!fl || !prj) return;

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, assignedFreelancers: Array.from(new Set([...p.assignedFreelancers, freelancerId])) }
          : p
      )
    );
    setFreelancers((prev) =>
      prev.map((f) => (f.id === freelancerId ? { ...f, activeProjectsCount: f.activeProjectsCount + 1 } : f))
    );
    showToast(`Allocated ${fl.fullName} to "${prj.name}"`, 'success');
    logAuditEvent('Freelancer Allocation', 'freelancers', `Allocated ${fl.fullName} to project ${prj.name}`);
  };

  const releaseFreelancerPayout = (payoutId: string) => {
    const targetPayout = freelancerPayouts.find((p) => p.id === payoutId);
    if (!targetPayout) return;

    const refNum = `UPI-REF-${Math.floor(100000000 + Math.random() * 900000000)}`;
    setFreelancerPayouts((prev) =>
      prev.map((p) =>
        p.id === payoutId ? { ...p, status: 'paid', paidAt: new Date().toISOString().split('T')[0], paymentReference: refNum } : p
      )
    );

    // Record as business expense & increment project actual cost
    addBusinessExpense({
      category: 'Freelancer Payout',
      description: `Disbursed payout for ${targetPayout.freelancerName} (${targetPayout.taskTitle || targetPayout.projectName})`,
      amount: targetPayout.amount,
      date: new Date().toISOString().split('T')[0],
      projectId: targetPayout.projectId,
      projectName: targetPayout.projectName,
      loggedBy: currentUser.fullName,
      status: 'approved'
    });

    // Update project spent cost
    setProjects((prev) =>
      prev.map((p) => (p.id === targetPayout.projectId ? { ...p, spent: p.spent + targetPayout.amount } : p))
    );

    showToast(`₹${targetPayout.amount.toLocaleString('en-IN')} payout disbursed to ${targetPayout.freelancerName} (${refNum})`, 'success');
    logAuditEvent('Freelancer Payout Disbursed', 'finance', `Payout of ₹${targetPayout.amount} released to ${targetPayout.freelancerName}`);
  };

  const requestFreelancerPayout = (payout: Omit<FreelancerPayout, 'id'>) => {
    const newPayout: FreelancerPayout = {
      ...payout,
      id: `payout-${Date.now()}`
    };
    setFreelancerPayouts((prev) => [newPayout, ...prev]);
    showToast(`Payout request of ₹${payout.amount.toLocaleString('en-IN')} submitted to Finance`, 'success');
  };

  // Finance, Invoices & Installments
  const [payroll, setPayroll] = useState<PayrollRecord[]>(() => {
    const saved = localStorage.getItem('digiworku_payroll_v4');
    return saved ? JSON.parse(saved) : INITIAL_PAYROLL;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_payroll_v4', JSON.stringify(payroll));
  }, [payroll]);

  const [invoices, setInvoices] = useState<InvoiceRecord[]>(() => {
    const saved = localStorage.getItem('digiworku_invoices_v4');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_invoices_v4', JSON.stringify(invoices));
  }, [invoices]);

  const [expenses, setExpenses] = useState<BusinessExpense[]>(() => {
    const saved = localStorage.getItem('digiworku_expenses_v4');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_expenses_v4', JSON.stringify(expenses));
  }, [expenses]);

  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>(INITIAL_FINANCE_SUMMARY);

  const processPayrollItem = (id: string) => {
    setPayroll((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: 'paid', processedDate: new Date().toISOString().split('T')[0] } : p
      )
    );
    showToast('Salary payment cleared via automated banking gateway', 'success');
  };

  const createInvoice = (inv: Omit<InvoiceRecord, 'id' | 'payments' | 'amountPaid'>) => {
    const newInv: InvoiceRecord = {
      ...inv,
      id: `inv-${Date.now()}`,
      amountPaid: 0,
      payments: []
    };
    setInvoices((prev) => [newInv, ...prev]);
    showToast(`Invoice ${inv.invoiceNumber} generated for ${inv.clientName}`, 'success');
    logAuditEvent('Invoice Created', 'finance', `Created invoice ${inv.invoiceNumber}`);
  };

  const updateInvoice = (inv: InvoiceRecord) => {
    setInvoices((prev) => prev.map((i) => (i.id === inv.id ? inv : i)));
    showToast(`Invoice ${inv.invoiceNumber} updated`, 'success');
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    showToast('Invoice removed', 'warning');
  };

  // Record partial or full payment on an invoice
  const recordInvoicePayment = (
    invoiceId: string,
    amount: number,
    paymentMethod: InvoiceRecord['payments'][0]['paymentMethod'],
    notes?: string
  ) => {
    const targetInv = invoices.find((i) => i.id === invoiceId);
    if (!targetInv) return;

    const newPayment = {
      id: `p-${Date.now()}`,
      invoiceId,
      amount,
      paidAt: new Date().toISOString().split('T')[0],
      paymentMethod,
      transactionReference: `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      notes
    };

    const newTotalPaid = targetInv.amountPaid + amount;
    const isFullPaid = newTotalPaid >= targetInv.totalAmount;
    const newStatus: InvoiceRecord['status'] = isFullPaid ? 'paid' : 'partially_paid';

    setInvoices((prev) =>
      prev.map((i) =>
        i.id === invoiceId
          ? {
              ...i,
              amountPaid: newTotalPaid,
              status: newStatus,
              payments: [newPayment, ...i.payments]
            }
          : i
      )
    );

    // Update financial summary
    setFinancialSummary((prev) => ({
      ...prev,
      collectedRevenue: prev.collectedRevenue + amount,
      outstandingRevenue: Math.max(0, prev.outstandingRevenue - amount)
    }));

    showToast(
      `Payment of ₹${amount.toLocaleString('en-IN')} recorded for ${targetInv.invoiceNumber} (${isFullPaid ? 'Fully Cleared' : 'Partial Installment'})`,
      'success'
    );
    logAuditEvent('Invoice Payment Recorded', 'finance', `Recorded payment of ₹${amount} on ${targetInv.invoiceNumber}`);
  };

  const addBusinessExpense = (expense: Omit<BusinessExpense, 'id'>) => {
    const newExp: BusinessExpense = {
      ...expense,
      id: `exp-${Date.now()}`
    };
    setExpenses((prev) => [newExp, ...prev]);
    setFinancialSummary((prev) => ({
      ...prev,
      totalExpenses: prev.totalExpenses + expense.amount,
      netProfit: prev.monthlyRevenue - (prev.totalExpenses + expense.amount)
    }));
    showToast(`Expense logged: ${expense.description} (₹${expense.amount.toLocaleString('en-IN')})`, 'info');
  };

  const addExpense = (expense: { description: string; amount: number; category: string; date: string }) => {
    addBusinessExpense({
      description: expense.description,
      amount: expense.amount,
      category: expense.category as any,
      date: expense.date,
      loggedBy: currentUser.fullName,
      status: 'approved'
    });
  };

  // Internal Communication
  const [channels, setChannels] = useState<ChatChannel[]>(INITIAL_CHANNELS);
  const [activeChannelId, setActiveChannelId] = useState<string>('announcements');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('digiworku_messages_v4');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_messages_v4', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (channelId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatarUrl,
      message: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Quality Control (QC) Gate
  const [qcReviews, setQcReviews] = useState<QCReview[]>(() => {
    const saved = localStorage.getItem('digiworku_qc_reviews_v4');
    return saved ? JSON.parse(saved) : INITIAL_QC_REVIEWS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_qc_reviews_v4', JSON.stringify(qcReviews));
  }, [qcReviews]);

  const submitQcDecision = (reviewId: string, decision: 'approve' | 'request_revisions' | 'reject', comments: string) => {
    setQcReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              decision,
              comments,
              reviewerId: currentUser.id,
              reviewerName: currentUser.fullName,
              reviewedAt: new Date().toLocaleString(),
              deliveryAuthorized: decision === 'approve'
            }
          : r
      )
    );

    const review = qcReviews.find((r) => r.id === reviewId);
    if (review && decision === 'approve') {
      setProjects((prev) =>
        prev.map((p) => (p.id === review.projectId ? { ...p, deliveryAuthorized: true, qcApprovalDate: new Date().toISOString() } : p))
      );
    }

    showToast(`QC Decision: ${decision.replace('_', ' ').toUpperCase()}`, decision === 'approve' ? 'success' : 'warning');
    logAuditEvent('QC Review Completed', 'qc', `QC Review ${reviewId} decision: ${decision} by ${currentUser.fullName}`);
  };

  const toggleQcChecklistItem = (reviewId: string, checkId: string) => {
    setQcReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const items = r.checklistItems.map((item) =>
            item.id === checkId ? { ...item, passed: !item.passed } : item
          );
          const score = Math.round((items.filter((i) => i.passed).length / items.length) * 100);
          return { ...r, checklistItems: items, overallScore: score };
        }
        return r;
      })
    );
  };

  const submitDeliverableForQC = (projectId: string, milestoneTitle: string, deliverableUrl: string, comments: string) => {
    const targetProject = projects.find((p) => p.id === projectId);
    const newRev: QCReview = {
      id: `qc-rev-${Date.now()}`,
      projectId,
      projectName: targetProject?.name || 'Assigned Project',
      milestoneTitle,
      deliverablePreviewUrl: deliverableUrl,
      submittedBy: currentUser.id,
      submittedByName: currentUser.fullName,
      overallScore: 90,
      decision: 'pending',
      comments,
      revisionCount: 1,
      checklistItems: INITIAL_QC_REVIEWS[0]?.checklistItems || [],
      deliveryAuthorized: false,
      submittedAt: new Date().toLocaleString()
    };
    setQcReviews((prev) => [newRev, ...prev]);
    showToast('Deliverable dispatched to QC Review Queue', 'success');
  };

  const approveQcAndAuthorizeDelivery = (reviewId: string, projectId: string) => {
    setQcReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, decision: 'approve', deliveryAuthorized: true } : r))
    );
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, deliveryAuthorized: true, status: 'approved', qcApprovalDate: new Date().toISOString() } : p
      )
    );
    showToast('✅ Quality Approved! Project authorized for Client Delivery.', 'success');
    logAuditEvent('Delivery Authorized', 'qc', `Authorized final client delivery for project ${projectId}`);
  };

  const requestQcRevision = (reviewId: string, revisionNotes: string) => {
    setQcReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              decision: 'request_revisions',
              comments: revisionNotes,
              revisionCount: r.revisionCount + 1,
              deliveryAuthorized: false
            }
          : r
      )
    );
    showToast('Revision requested. Assignee notified.', 'warning');
    logAuditEvent('QC Revision Requested', 'qc', `Revision requested on review ${reviewId}: ${revisionNotes}`);
  };

  const [performance, setPerformance] = useState<PerformanceMetrics>(INITIAL_PERFORMANCE);

  // Employees Directory
  const toggleEmployeeActive = (id: string) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isActive: !e.isActive } : e))
    );
    showToast('Employee status updated', 'info');
  };

  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp: Employee = { ...emp, id: `emp-${Date.now()}` };
    setEmployees((prev) => [newEmp, ...prev]);
    showToast(`Employee "${emp.fullName}" added to directory`, 'success');
  };

  const updateEmployee = (emp: Employee) => {
    setEmployees((prev) => prev.map((e) => (e.id === emp.id ? emp : e)));
    showToast(`Employee "${emp.fullName}" updated`, 'success');
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    showToast('Employee record archived', 'warning');
  };

  // AI Assistant
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'ai-welcome',
      sender: 'assistant',
      text: 'Greetings, Commander. I am your DigiWorku Operations Intelligence agent (powered by Gemini Flash). I am monitoring all 14 operational modules, task velocities, delayed project radars, and financial ledgers. How can I assist you today?',
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

  const sendAIMessage = (text: string) => {
    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAiMessages((prev) => [...prev, userMsg]);
    setIsAITyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = '';

      if (lower.includes('delayed') || lower.includes('delay')) {
        const delayedList = projects.filter((p) => p.status === 'delayed' || (p.daysDelayed && p.daysDelayed > 0));
        if (delayedList.length > 0) {
          replyText = `⚠️ **Critical Radar Alert:** There is currently ${delayedList.length} delayed project:\n\n• **${delayedList[0].name}** (Code: ${delayedList[0].code}) is delayed by **${delayedList[0].daysDelayed || 2} days**. Root cause: mobile checkout gateway QA review in progress. Assigned Manager: ${delayedList[0].managerName}. Recommended action: allocate Marcus Chen to close out the remaining 2 styling issues.`;
        } else {
          replyText = '✅ **All Systems Green:** No delayed projects detected on the delivery radar. All sprints are tracking within SLA milestones.';
        }
      } else if (lower.includes('revenue') || lower.includes('profit') || lower.includes('finance')) {
        if (currentRole === 'team_member' || currentRole === 'freelancer') {
          replyText = `🔒 **Access Restricted:** Financial and profitability reporting requires Super Admin, Operations Manager, or Finance Manager clearance. Please contact your Department Lead or Vir Kanwlia for executive financial metrics.`;
        } else {
          replyText = `📊 **Real-time Financial Snapshot (DigiWorku India):**\n\n• **Monthly Revenue:** ₹${financialSummary.monthlyRevenue.toLocaleString('en-IN')}\n• **Collected Revenue:** ₹${financialSummary.collectedRevenue.toLocaleString('en-IN')}\n• **Outstanding Receivables:** ₹${financialSummary.outstandingRevenue.toLocaleString('en-IN')}\n• **Realized Net Profit:** ₹${financialSummary.netProfit.toLocaleString('en-IN')} (${financialSummary.profitMarginPercent}% Margin)\n• **Freelancer Commitments:** ₹${financialSummary.freelancerCommitments.toLocaleString('en-IN')}\n\nTop performing account: **Apex Financial Technologies Ltd.** (₹18.50 Lakh contract).`;
        }
      } else if (lower.includes('qc') || lower.includes('approval') || lower.includes('review') || lower.includes('gate')) {
        const pendingQc = qcReviews.filter((q) => q.decision === 'pending' || !q.deliveryAuthorized);
        replyText = `🛡️ **Quality Assurance & Gate Status:**\n\n• **Total Active Audits:** ${qcReviews.length}\n• **Pending Gate Approvals:** ${pendingQc.length}\n• **Authorized for Delivery:** ${qcReviews.filter((q) => q.deliveryAuthorized).length}\n\nKey review in progress: **${qcReviews[0]?.projectName || 'Nordic Living'} — ${qcReviews[0]?.milestoneTitle || 'Milestone 2'}** (Audit Score: ${qcReviews[0]?.overallScore || 92}/100). Final client delivery is locked until QA certification passes.`;
      } else if (lower.includes('task') || lower.includes('pending task') || lower.includes('todo')) {
        const inProg = tasks.filter((t) => t.status === 'in_progress');
        const inReview = tasks.filter((t) => t.status === 'review');
        replyText = `📋 **Operational Tasks Overview (Fokys Board):**\n\n• **In Progress:** ${inProg.length} tasks\n• **In QC Review:** ${inReview.length} tasks\n• **Scheduled Next:** ${tasks.filter((t) => t.status === 'scheduled').length} tasks\n\nHigh Priority Focus: **${inProg[0]?.title || 'Checkout Flow'}** assigned to ${inProg[0]?.assignedTo?.join(', ') || 'Rohit Verma'}.`;
      } else if (lower.includes('proposal') || lower.includes('quote') || lower.includes('draft')) {
        replyText = `📄 **DigiWorku Proposal Generator Draft:**\n\n**Client:** Nordic Living India\n**Scope:** 1. Website Development (₹1,85,000) + 2. UI/UX Design System (₹95,000)\n**Subtotal:** ₹2,80,000\n**GST (18%):** ₹50,400\n**Total Quotation:** ₹3,30,400 INR\n**Estimated Delivery:** 35 Business Days with 100-Point QA Certification.\n\nReady to emit formal proposal in CRM Module with 1-click project provisioning.`;
      } else if (lower.includes('velocity') || lower.includes('sprint') || lower.includes('performance')) {
        replyText = `🚀 **Sprint Velocity Analysis:**\n\nCurrent Sprint (Sprint 44) has **55 out of 60** committed points delivered (91.6% sprint progress). Overall SLA delivery rate stands at **${performance.slaDeliveryRate}%** with a quality benchmark of **${performance.overallQualityScore}/100**. Top performer this sprint: **Marcus Chen** with 28 completed tasks and 99.4% accuracy.`;
      } else if (lower.includes('freelancer') || lower.includes('payout')) {
        const pendingPayouts = freelancerPayouts.filter((p) => p.status === 'eligible' || p.status === 'pending_approval');
        replyText = `💼 **Freelancer Network Status:**\n\nActive talent pool: **${freelancers.length} specialists** across UI/UX, Mobile Engineering and SRE.\n• Available now: **${freelancers.filter((f) => f.status === 'available').length} freelancers**\n• Pending payout requests: **${pendingPayouts.length}** totaling ₹${pendingPayouts.reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}.\n\nAll freelancer deliverables pass strict QC before payouts become eligible.`;
      } else {
        replyText = `I have cross-analyzed your inquiry against DigiWorku's live operations database. All 14 modules (CRM, Projects, Fokys Tasks, Freelancer Network, Finance, QC Engine) are synchronized. Let me know if you would like me to generate a client proposal, inspect QC checklist items, or reconcile pending invoices.`;
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
    }, 600);
  };

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('digiworku_notifications_v4');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_notifications_v4', JSON.stringify(notifications));
  }, [notifications]);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notification center cleared', 'info');
  };

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('digiworku_audit_logs_v4');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_audit_logs_v4', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const logAuditEvent = (
    action: string,
    module: NavModule,
    details: string,
    status: 'success' | 'warning' | 'error' = 'success'
  ) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
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

  // Company Settings
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem('digiworku_company_settings_v4');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_SETTINGS;
  });
  useEffect(() => {
    localStorage.setItem('digiworku_company_settings_v4', JSON.stringify(companySettings));
  }, [companySettings]);

  const updateCompanySettings = (settings: Partial<CompanySettings>) => {
    setCompanySettings((prev) => ({ ...prev, ...settings }));
    showToast('System configuration saved', 'success');
    logAuditEvent('Settings Updated', 'settings', 'Updated global company operating settings.');
  };

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
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
        dateFilter,
        setDateFilter,
        services,
        toggleServiceEnabled,
        updateServiceItem,
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
        submitTaskWork,
        clients,
        updateClientStatus,
        addClient,
        updateClient,
        deleteClient,
        convertLeadToClient,
        quotes,
        addQuote,
        convertProposalToProject,
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
        freelancerPayouts,
        releaseFreelancerPayout,
        requestFreelancerPayout,
        payroll,
        invoices,
        expenses,
        financialSummary,
        processPayrollItem,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        recordInvoicePayment,
        addBusinessExpense,
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
        approveQcAndAuthorizeDelivery,
        requestQcRevision,
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
