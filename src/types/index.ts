export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'hr_manager'
  | 'operations_manager'
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

// ==========================================
// 1. DIGIWORKU SERVICE CATALOGUE (13 Services)
// ==========================================
export type ServiceCategoryKey =
  | 'website_development'
  | 'graphic_design'
  | 'seo_marketing'
  | 'digital_marketing'
  | 'video_editing'
  | 'content_writing'
  | 'ai_automation'
  | 'mobile_apps'
  | 'ui_ux_design'
  | 'ecommerce_development'
  | 'creative_support'
  | 'analytics_tracking'
  | 'hosting_support';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategoryKey;
  categoryKey?: ServiceCategoryKey;
  description: string;
  requirements: string[];
  deliverables: string[];
  acceptanceCriteria: string[];
  estimatedTimeline: string;
  internalCost: number;       // INR ₹ (Internal cost to DigiWorku)
  clientQuotation: number;    // INR ₹ (Standard quotation to client)
  assignedDepartment: string;
  requiredSkills: string[];
  projectTemplates: string[];
  isRecurring: boolean;
  isEnabled: boolean;
}

// ==========================================
// 2. EMPLOYEE & HR
// ==========================================
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
  baseSalary: number; // INR ₹
  workloadScore?: number; // 0-100%
  completedTasksCount?: number;
  ratingScore?: number; // e.g. 4.9
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

// ==========================================
// 3. TASKS & WORKFLOW (Fokys & TaskFlow Style)
// ==========================================
export type TaskStatus = 'backlog' | 'scheduled' | 'in_progress' | 'review' | 'qa_ready' | 'done' | 'completed';
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
  categoryTag?: 'Engineering' | 'Design' | 'Marketing' | 'Communication' | 'Finance' | 'Development' | 'Reporting' | 'Content' | 'Video' | 'SEO' | 'Management' | 'Sales' | string;
  status: TaskStatus;
  priority: TaskPriority;
  progressPercent: number; // 0 - 100%
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar?: string;
  assigneeType?: 'employee' | 'freelancer';
  assignedTo?: string[];
  projectId: string;
  projectName: string;
  milestoneId?: string;
  dueDate: string;
  estimatedHours: number;
  spentHours: number;
  checklist: TaskChecklistItem[];
  attachments: { name: string; url: string; size: string }[];
  commentsCount?: number;
  submissionUrl?: string;
  submissionNotes?: string;
  submittedAt?: string;
  qcReviewStatus?: 'pending' | 'in_review' | 'approved' | 'revision_requested' | 'not_submitted';
  revisionCount?: number;
  createdAt: string;
}

// ==========================================
// 4. CRM & CLIENT PIPELINE
// ==========================================
export type LeadStatus =
  | 'new_lead'
  | 'contacted'
  | 'qualified'
  | 'requirement_received'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost'
  // legacy compatibility
  | 'lead'
  | 'active_client'
  | 'churned';

export interface ClientLead {
  id: string;
  companyName: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  status: LeadStatus;
  contractValue: number; // INR ₹
  healthScore: number;
  notes: string;
  leadSource?: 'Website Inquiry' | 'Referral' | 'LinkedIn' | 'Outreach' | 'WhatsApp';
  requirementSummary?: string;
  serviceCategory?: ServiceCategoryKey;
  lastContactDate: string;
  convertedToClientId?: string;
  convertedProjectId?: string;
  activityHistory: { date: string; note: string; author: string }[];
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  rate: number; // INR ₹
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
  serviceCategory?: ServiceCategoryKey;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number; // typically 18% GST in India
  taxAmount: number;
  total: number;
  terms: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined';
  convertedProjectId?: string;
}

// ==========================================
// 5. PROJECTS & MILESTONES (Central Engine)
// ==========================================
export type ProjectStatus =
  | 'draft'
  | 'quoted'
  | 'awaiting_approval'
  | 'confirmed'
  | 'planning'
  | 'active'
  | 'in_progress'
  | 'delayed'
  | 'internal_qc'
  | 'client_review'
  | 'revision'
  | 'approved'
  | 'delivered'
  | 'completed'
  | 'on_hold'
  | 'archived';

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  orderIndex: number;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'under_qc' | 'approved_by_client' | 'paid';
  amount: number; // INR ₹
  deliverableUrl?: string;
  acceptanceCriteria?: string;
  qcApproved?: boolean;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  clientId: string;
  clientName: string;
  category?: string;
  serviceCategory?: ServiceCategoryKey;
  serviceCategoryKey?: ServiceCategoryKey;
  managerId: string;
  managerName: string;
  designLeadName?: string;
  designLeadAvatar?: string;
  teamAvatars?: string[];
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;        // INR ₹ agreed client revenue
  estimatedCost: number; // INR ₹ internal budget estimate
  spent: number;         // INR ₹ actual costs logged (salaries + freelancers + expenses)
  currency: string;      // INR
  techStack: string[];
  progress: number;      // 0-100%
  milestones: ProjectMilestone[];
  assignedEmployees: string[]; // employee IDs
  assignedFreelancers: string[]; // freelancer IDs
  deliverablesList?: string[];
  qcApprovalDate?: string;
  deliveryAuthorized?: boolean;
  repoUrl?: string;
  stagingUrl?: string;
  riskFactor?: 'low' | 'moderate' | 'high';
  daysDelayed?: number;
  revisionCount?: number;
  invoiceId?: string;
}

// ==========================================
// 6. FREELANCER WORKSPACE
// ==========================================
export interface FreelancerPayout {
  id: string;
  freelancerId: string;
  freelancerName: string;
  projectId: string;
  projectName: string;
  taskId?: string;
  taskTitle?: string;
  amount: number; // INR ₹
  status: 'pending_approval' | 'eligible' | 'processing' | 'paid';
  dueOn: string;
  paidAt?: string;
  paymentReference?: string;
}

export interface Freelancer {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  skillDomain: string;
  skills: string[];
  hourlyRate: number; // INR ₹
  currency: string;   // INR
  rating: number;     // e.g. 4.9
  reviewsCount: number;
  portfolioUrl: string;
  totalEarned: number;
  activeProjectsCount: number;
  status: 'available' | 'busy' | 'on_leave';
  kycVerified: boolean;
  phone?: string;
  assignedTasks?: string[];
  payoutHistory?: FreelancerPayout[];
  contractHistory: { projectName: string; amount: number; completedDate: string }[];
}

// ==========================================
// 7. FINANCE & ACCOUNTING
// ==========================================
export interface InvoicePayment {
  id: string;
  invoiceId: string;
  amount: number; // INR ₹
  paidAt: string;
  paymentMethod: 'UPI' | 'NEFT/IMPS' | 'Bank Transfer' | 'Stripe/Card' | 'Cheque';
  transactionReference: string;
  notes?: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientEmail?: string;
  projectId?: string;
  projectName: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;     // INR ₹
  amountPaid: number;      // INR ₹
  status: 'draft' | 'sent' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled';
  payments: InvoicePayment[];
  notes?: string;
}

export interface BusinessExpense {
  id: string;
  category: 'Software & Tools' | 'Infrastructure & Hosting' | 'Office & Admin' | 'Marketing' | 'Consulting' | 'Freelancer Payout' | 'Hardware';
  description: string;
  amount: number; // INR ₹
  date: string;
  projectId?: string;
  projectName?: string;
  loggedBy: string;
  status: 'approved' | 'pending';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  department: string;
  baseSalary: number; // INR ₹
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
  payPeriod: string;
  paymentMethod: string;
  processedDate?: string;
}

export interface FinancialSummary {
  totalRevenueYTD: number;
  monthlyRevenue: number;
  collectedRevenue: number;
  outstandingRevenue: number;
  totalExpenses: number;
  freelancerCommitments: number;
  netProfit: number;
  profitMarginPercent: number;
  pendingInvoicesAmount: number;
  upcomingPayrollAmount: number;
  monthlyTrend: { month: string; revenue: number; expenses: number; profit: number }[];
}

// ==========================================
// 8. QUALITY CONTROL (QC) SYSTEM
// ==========================================
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
  taskId?: string;
  deliverablePreviewUrl: string;
  submittedBy: string;
  submittedByName: string;
  reviewerId?: string;
  reviewerName?: string;
  overallScore: number;
  decision: 'pending' | 'approve' | 'request_revisions' | 'reject';
  comments: string;
  revisionCount: number;
  checklistItems: QCChecklistItem[];
  deliveryAuthorized: boolean;
  submittedAt: string;
  reviewedAt?: string;
}

// ==========================================
// 9. COLLABORATION & NOTIFICATIONS
// ==========================================
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
  reactions?: Record<string, string[]>;
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
  dataSummary?: {
    totalRevenue?: string;
    delayedProjectsCount?: number;
    pendingQcCount?: number;
    activeWorkforceCount?: number;
  };
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
  defaultCurrency: string; // 'INR'
  autoApproveLeaveUnderDays: number;
  qcPassingThreshold: number;
  supabaseConnected: boolean;
  enableAuditLogging: boolean;
}
