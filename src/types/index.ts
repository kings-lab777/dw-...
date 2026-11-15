export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'hr_manager'
  | 'project_manager'
  | 'sales_manager'
  | 'team_member'
  | 'qa_manager'
  | 'finance_manager'
  | 'freelancer';

export type NavModule =
  | 'dashboard'
  | 'employees'
  | 'attendance'
  | 'tasks'
  | 'crm'
  | 'projects'
  | 'freelancers'
  | 'finance'
  | 'chat'
  | 'qc'
  | 'analytics'
  | 'ai'
  | 'notifications'
  | 'settings';

export interface KYCDocument {
  id: string;
  name: string;
  type: string;
  fileSize: string;
  verified: boolean;
  uploadedAt: string;
}

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  department: string;
  designation: string;
  avatarUrl: string;
  phone: string;
  skills: string[];
  kycStatus: 'verified' | 'pending' | 'rejected';
  kycDocuments: KYCDocument[];
  isActive: boolean;
  joinDate: string;
  baseSalary: number;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  durationMinutes: number;
  isLate: boolean;
  lateReason?: string;
  status: 'present' | 'late' | 'half_day' | 'absent' | 'on_leave';
  location: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  department: string;
  leaveType: 'annual' | 'sick' | 'casual' | 'emergency';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedBy?: string;
}

export type TaskStatus = 'backlog' | 'in_progress' | 'qa_ready' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TaskChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface InternalTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar?: string;
  projectId: string;
  projectName: string;
  milestoneId?: string;
  dueDate: string;
  estimatedHours: number;
  spentHours: number;
  checklist: TaskChecklistItem[];
  attachments: { name: string; url: string; size: string }[];
  createdAt: string;
}

export type LeadStatus = 'lead' | 'contacted' | 'proposal_sent' | 'active_client' | 'churned';

export interface ClientLead {
  id: string;
  companyName: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  status: LeadStatus;
  contractValue: number;
  healthScore: number;
  notes: string;
  lastContactDate: string;
  activityHistory: { date: string; note: string; author: string }[];
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface ClientQuote {
  id: string;
  quoteNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  validUntil: string;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  terms: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined';
}

export type ProjectStatus = 'planning' | 'active' | 'delayed' | 'on_hold' | 'completed';

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  orderIndex: number;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'under_qc' | 'approved_by_client' | 'paid';
  amount: number;
  deliverableUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  clientId: string;
  clientName: string;
  managerId: string;
  managerName: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  currency: string;
  techStack: string[];
  progress: number;
  milestones: ProjectMilestone[];
  repoUrl?: string;
  stagingUrl?: string;
  riskFactor?: 'low' | 'moderate' | 'high';
  daysDelayed?: number;
}

export interface Freelancer {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  skillDomain: string;
  skills: string[];
  hourlyRate: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  portfolioUrl: string;
  totalEarned: number;
  activeProjectsCount: number;
  status: 'available' | 'busy' | 'on_leave';
  kycVerified: boolean;
  contractHistory: { projectName: string; amount: number; completedDate: string }[];
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  department: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
  payPeriod: string;
  paymentMethod: string;
  processedDate?: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  projectId?: string;
  projectName: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface FinancialSummary {
  totalRevenueYTD: number;
  monthlyRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMarginPercent: number;
  pendingInvoicesAmount: number;
  upcomingPayrollAmount: number;
  monthlyTrend: { month: string; revenue: number; expenses: number; profit: number }[];
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  isDirectMessage: boolean;
  memberIds?: string[];
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  message: string;
  timestamp: string;
  attachments?: { name: string; url: string; size: string }[];
  reactions?: Record<string, string[]>; // emoji -> [userNames]
}

export interface QCChecklistItem {
  id: string;
  category: 'code_quality' | 'ui_ux' | 'performance_seo' | 'security' | 'client_spec';
  title: string;
  description: string;
  weight: number;
  passed: boolean;
}

export interface QCReview {
  id: string;
  projectId: string;
  projectName: string;
  milestoneTitle: string;
  deliverablePreviewUrl: string;
  submittedBy: string;
  submittedByName: string;
  reviewerId?: string;
  reviewerName?: string;
  overallScore: number;
  decision: 'pending' | 'approve' | 'request_revisions' | 'reject';
  comments: string;
  checklistItems: QCChecklistItem[];
  submittedAt: string;
  reviewedAt?: string;
}

export interface PerformanceMetrics {
  sprintVelocity: { sprint: string; committed: number; completed: number }[];
  slaDeliveryRate: number;
  overallQualityScore: number;
  activeWorkforce: number;
  departmentRankings: {
    department: string;
    onTimeRate: number;
    tasksCompleted: number;
    satisfactionScore: number;
  }[];
  topPerformers: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    tasksDone: number;
    accuracyPercent: number;
    badge: string;
  }[];
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionTriggered?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'task' | 'leave' | 'qc' | 'finance' | 'system' | 'client';
  read: boolean;
  createdAt: string;
  linkModule?: NavModule;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  module: NavModule;
  details: string;
  status: 'success' | 'warning' | 'error';
}

export interface CompanySettings {
  companyName: string;
  officialEmail: string;
  supportPhone: string;
  timezone: string;
  workingHoursStart: string;
  workingHoursEnd: string;
  defaultCurrency: string;
  autoApproveLeaveUnderDays: number;
  qcPassingThreshold: number;
  supabaseConnected: boolean;
  enableAuditLogging: boolean;
}
