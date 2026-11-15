import {
  Employee,
  AttendanceRecord,
  LeaveRequest,
  InternalTask,
  ClientLead,
  Project,
  Freelancer,
  PayrollRecord,
  InvoiceRecord,
  FinancialSummary,
  ChatChannel,
  ChatMessage,
  QCReview,
  PerformanceMetrics,
  UserRole
} from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-01',
    fullName: 'Alex Vance',
    email: 'alex.vance@digiworku.com',
    role: 'super_admin',
    department: 'Executive Leadership',
    designation: 'Chief Technology Officer (CTO)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 019-2834',
    skills: ['Architecture', 'Cloud Infrastructure', 'SecOps', 'Strategy', 'Go', 'React'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-1', name: 'Passport_Alex_Vance.pdf', type: 'Identification', fileSize: '2.4 MB', verified: true, uploadedAt: '2024-01-15' },
      { id: 'doc-2', name: 'Executive_Contract.pdf', type: 'Employment Agreement', fileSize: '1.1 MB', verified: true, uploadedAt: '2024-01-15' }
    ],
    isActive: true,
    joinDate: '2022-03-01',
    baseSalary: 12500
  },
  {
    id: 'emp-02',
    fullName: 'Samantha Sterling',
    email: 'samantha.s@digiworku.com',
    role: 'hr_manager',
    department: 'People & Culture',
    designation: 'Head of People Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 018-9921',
    skills: ['Talent Acquisition', 'Labor Compliance', 'Payroll Operations', 'Performance Reviews'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-3', name: 'National_ID_Samantha.pdf', type: 'Identification', fileSize: '1.8 MB', verified: true, uploadedAt: '2023-05-10' }
    ],
    isActive: true,
    joinDate: '2023-05-10',
    baseSalary: 7800
  },
  {
    id: 'emp-03',
    fullName: 'David Thorne',
    email: 'david.thorne@digiworku.com',
    role: 'project_manager',
    department: 'Delivery Management',
    designation: 'Lead Technical Project Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 014-5542',
    skills: ['Agile / Scrum', 'Jira Master', 'Sprint Planning', 'Risk Mitigation', 'Client Comm'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-4', name: 'Passport_David.pdf', type: 'Identification', fileSize: '3.1 MB', verified: true, uploadedAt: '2023-01-12' }
    ],
    isActive: true,
    joinDate: '2023-01-15',
    baseSalary: 8200
  },
  {
    id: 'emp-04',
    fullName: 'Elena Rostova',
    email: 'elena.r@digiworku.com',
    role: 'sales_manager',
    department: 'Revenue & Growth',
    designation: 'VP of Global Client Partnerships',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 012-7788',
    skills: ['B2B Enterprise Sales', 'Contract Negotiation', 'CRM Architecture', 'Pipelines'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-5', name: 'Drivers_License_Elena.pdf', type: 'Identification', fileSize: '1.5 MB', verified: true, uploadedAt: '2023-08-20' }
    ],
    isActive: true,
    joinDate: '2023-08-20',
    baseSalary: 8500
  },
  {
    id: 'emp-05',
    fullName: 'Marcus Chen',
    email: 'marcus.chen@digiworku.com',
    role: 'team_member',
    department: 'Engineering',
    designation: 'Senior Full Stack Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 019-3312',
    skills: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-6', name: 'Passport_Marcus.pdf', type: 'Identification', fileSize: '2.0 MB', verified: true, uploadedAt: '2023-11-01' }
    ],
    isActive: true,
    joinDate: '2023-11-01',
    baseSalary: 6800
  },
  {
    id: 'emp-06',
    fullName: 'Aria Montgomery',
    email: 'aria.m@digiworku.com',
    role: 'qa_manager',
    department: 'Quality Assurance',
    designation: 'Chief Quality Control Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 016-8844',
    skills: ['Playwright', 'Cypress', 'Lighthouse 100/100', 'OWASP Top 10', 'UI Polish Check'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-7', name: 'ID_Aria.pdf', type: 'Identification', fileSize: '1.2 MB', verified: true, uploadedAt: '2024-02-15' }
    ],
    isActive: true,
    joinDate: '2024-02-15',
    baseSalary: 7200
  },
  {
    id: 'emp-07',
    fullName: 'Robert Sterling',
    email: 'robert.s@digiworku.com',
    role: 'finance_manager',
    department: 'Corporate Finance',
    designation: 'Director of Financial Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 011-3421',
    skills: ['GAAP Accounting', 'Tax Compliance', 'Corporate Audit', 'Cash Flow Optimization'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-8', name: 'CPA_Certificate_Robert.pdf', type: 'Certification', fileSize: '3.4 MB', verified: true, uploadedAt: '2022-09-01' }
    ],
    isActive: true,
    joinDate: '2022-09-01',
    baseSalary: 9400
  },
  {
    id: 'emp-08',
    fullName: 'Sofia Al-Mansoor',
    email: 'sofia.designs@freelancer.digiworku.com',
    role: 'freelancer',
    department: 'External Design Talent',
    designation: 'Principal UI/UX Design Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    phone: '+971 50 123 4567',
    skills: ['Figma Design Systems', 'Micro-interactions', 'Prototyping', 'User Research'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-9', name: 'UAE_Residency_ID_Sofia.pdf', type: 'Identification', fileSize: '1.9 MB', verified: true, uploadedAt: '2024-04-10' }
    ],
    isActive: true,
    joinDate: '2024-04-10',
    baseSalary: 0 // Billed on milestones
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-101',
    userId: 'emp-01',
    userName: 'Alex Vance',
    date: '2026-11-14',
    checkInTime: '08:55 AM',
    durationMinutes: 485,
    isLate: false,
    status: 'present',
    location: 'Headquarters (HQ-1 Floor 4)'
  },
  {
    id: 'att-102',
    userId: 'emp-03',
    userName: 'David Thorne',
    date: '2026-11-14',
    checkInTime: '09:12 AM',
    durationMinutes: 468,
    isLate: false,
    status: 'present',
    location: 'Remote (San Francisco, CA)'
  },
  {
    id: 'att-103',
    userId: 'emp-05',
    userName: 'Marcus Chen',
    date: '2026-11-14',
    checkInTime: '09:42 AM',
    durationMinutes: 438,
    isLate: true,
    lateReason: 'Traffic congestion on Bay Bridge corridor',
    status: 'late',
    location: 'Headquarters (Desk 42B)'
  },
  {
    id: 'att-104',
    userId: 'emp-06',
    userName: 'Aria Montgomery',
    date: '2026-11-14',
    checkInTime: '09:05 AM',
    durationMinutes: 475,
    isLate: false,
    status: 'present',
    location: 'Remote (Austin, TX)'
  },
  {
    id: 'att-105',
    userId: 'emp-07',
    userName: 'Robert Sterling',
    date: '2026-11-14',
    checkInTime: '08:45 AM',
    durationMinutes: 495,
    isLate: false,
    status: 'present',
    location: 'Headquarters (Finance Suite)'
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'leave-01',
    userId: 'emp-05',
    userName: 'Marcus Chen',
    department: 'Engineering',
    leaveType: 'annual',
    startDate: '2026-11-20',
    endDate: '2026-11-24',
    totalDays: 4,
    reason: 'Family wedding ceremony and scheduled travel',
    status: 'pending',
    appliedAt: '2026-11-13'
  },
  {
    id: 'leave-02',
    userId: 'emp-04',
    userName: 'Elena Rostova',
    department: 'Revenue & Growth',
    leaveType: 'casual',
    startDate: '2026-11-18',
    endDate: '2026-11-18',
    totalDays: 1,
    reason: 'Attending Enterprise SaaS Tech Summit in NYC',
    status: 'approved',
    appliedAt: '2026-11-10',
    reviewedBy: 'Samantha Sterling'
  }
];

export const INITIAL_TASKS: InternalTask[] = [
  {
    id: 'TSK-1042',
    title: 'Migrate Core Authentication to Multi-Tenant SSO & WebAuthn',
    description: 'Implement enterprise SAML 2.0 and biometric passkeys for high-tier banking client access.',
    status: 'in_progress',
    priority: 'critical',
    assigneeId: 'emp-05',
    assigneeName: 'Marcus Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-01',
    projectName: 'Apex Financial Portal 2.0',
    milestoneId: 'ms-01',
    dueDate: '2026-11-18',
    estimatedHours: 24,
    spentHours: 16,
    checklist: [
      { id: 'c1', text: 'Configure Supabase Auth SAML SSO endpoint', completed: true },
      { id: 'c2', text: 'Implement WebAuthn credentials registration modal', completed: true },
      { id: 'c3', text: 'Enforce RLS session verification headers', completed: false },
      { id: 'c4', text: 'Audit session token revocation flow', completed: false }
    ],
    attachments: [
      { name: 'SSO_Security_Architecture.pdf', url: '#', size: '1.4 MB' },
      { name: 'OAuth2_Flowchart.png', url: '#', size: '420 KB' }
    ],
    createdAt: '2026-11-10'
  },
  {
    id: 'TSK-1043',
    title: 'Stripe Global Multi-Currency Checkout & Invoice Webhooks',
    description: 'Connect automatic tax handling (Stripe Tax) and European SEPA direct debit triggers.',
    status: 'qa_ready',
    priority: 'high',
    assigneeId: 'emp-05',
    assigneeName: 'Marcus Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    milestoneId: 'ms-03',
    dueDate: '2026-11-16',
    estimatedHours: 18,
    spentHours: 18,
    checklist: [
      { id: 'c1', text: 'Set up Stripe Webhook handler with signature checking', completed: true },
      { id: 'c2', text: 'Support EUR, USD, GBP and DKK currency formatting', completed: true },
      { id: 'c3', text: 'Write integration test for failed charge notifications', completed: true }
    ],
    attachments: [
      { name: 'Stripe_Integration_Doc.md', url: '#', size: '18 KB' }
    ],
    createdAt: '2026-11-09'
  },
  {
    id: 'TSK-1044',
    title: 'Design Component Library in Figma & Tailwind Export',
    description: 'Finalize dark mode design tokens, glassmorphism card elevation, and accessible contrast ratios.',
    status: 'done',
    priority: 'medium',
    assigneeId: 'emp-08',
    assigneeName: 'Sofia Al-Mansoor',
    assigneeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-03',
    projectName: 'CyberDefense Threat Monitor',
    dueDate: '2026-11-12',
    estimatedHours: 30,
    spentHours: 28,
    checklist: [
      { id: 'c1', text: 'WCAG AAA contrast verification on all buttons', completed: true },
      { id: 'c2', text: 'Export SVG icon sprite sheet', completed: true },
      { id: 'c3', text: 'Deliver interactive Figma prototype', completed: true }
    ],
    attachments: [
      { name: 'Design_System_v2.fig', url: '#', size: '14.2 MB' }
    ],
    createdAt: '2026-11-04'
  },
  {
    id: 'TSK-1045',
    title: 'Audit Postgres Index Latency & Query Optimization',
    description: 'Analyze slow query logs on `internal_tasks` and `attendance` tables; introduce composite indexes.',
    status: 'backlog',
    priority: 'high',
    assigneeId: 'emp-01',
    assigneeName: 'Alex Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-01',
    projectName: 'Apex Financial Portal 2.0',
    dueDate: '2026-11-22',
    estimatedHours: 12,
    spentHours: 0,
    checklist: [
      { id: 'c1', text: 'Run EXPLAIN ANALYZE on heavy queries', completed: false },
      { id: 'c2', text: 'Create composite index on (user_id, date DESC)', completed: false }
    ],
    attachments: [],
    createdAt: '2026-11-14'
  },
  {
    id: 'TSK-1046',
    title: '100-Point Security & QA Regression Sweep for Sprint 44',
    description: 'Execute end-to-end regression tests across all deliverables before staging client release.',
    status: 'in_progress',
    priority: 'critical',
    assigneeId: 'emp-06',
    assigneeName: 'Aria Montgomery',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    dueDate: '2026-11-17',
    estimatedHours: 16,
    spentHours: 6,
    checklist: [
      { id: 'c1', text: 'Test Safari iOS mobile viewport rendering', completed: true },
      { id: 'c2', text: 'Verify CSRF token validation on all POST routes', completed: false },
      { id: 'c3', text: 'Check Lighthouse performance score >= 90', completed: false }
    ],
    attachments: [],
    createdAt: '2026-11-13'
  }
];

export const INITIAL_CLIENTS: ClientLead[] = [
  {
    id: 'cli-01',
    companyName: 'Apex Financial Technologies Ltd.',
    industry: 'Fintech & Wealth Management',
    contactPerson: 'Lord Harrison Thorne',
    email: 'harrison.t@apexfinancial.co.uk',
    phone: '+44 20 7946 0912',
    website: 'https://apexfinancial.co.uk',
    status: 'active_client',
    contractValue: 185000,
    healthScore: 92,
    notes: 'Premium enterprise account. Strict SLA turnaround < 4 hours. Security audit required quarterly.',
    lastContactDate: '2026-11-12',
    activityHistory: [
      { date: '2026-11-12', note: 'Reviewed Milestone 2 sprint velocity; client impressed by SSO progress.', author: 'David Thorne' },
      { date: '2026-10-28', note: 'Milestone 1 invoice of $60,000 paid via wire transfer.', author: 'Robert Sterling' }
    ]
  },
  {
    id: 'cli-02',
    companyName: 'Nordic Living Omni Retail Group',
    industry: 'E-Commerce & Retail',
    contactPerson: 'Freja Lindqvist',
    email: 'freja@nordicliving.se',
    phone: '+46 8 123 4567',
    website: 'https://nordicliving.se',
    status: 'active_client',
    contractValue: 120000,
    healthScore: 78,
    notes: 'Black Friday launch deadline approaching. High urgency on Stripe checkout checkout testing.',
    lastContactDate: '2026-11-14',
    activityHistory: [
      { date: '2026-11-14', note: 'Client requested emergency staging preview of checkout flow by Thursday.', author: 'Elena Rostova' }
    ]
  },
  {
    id: 'cli-03',
    companyName: 'CyberShield Quantum Systems',
    industry: 'Cybersecurity & Defense',
    contactPerson: 'Col. Jonathan Vance',
    email: 'j.vance@cybershieldquantum.io',
    phone: '+1 (555) 019-8733',
    website: 'https://cybershieldquantum.io',
    status: 'proposal_sent',
    contractValue: 240000,
    healthScore: 88,
    notes: 'Full-stack SOC incident management dashboard RFP submitted. Decision expected next Tuesday.',
    lastContactDate: '2026-11-11',
    activityHistory: [
      { date: '2026-11-11', note: 'Custom RFP quote generated ($240,000) sent to procurement board.', author: 'Elena Rostova' }
    ]
  },
  {
    id: 'cli-04',
    companyName: 'AeroDynamics Aerospace Corp.',
    industry: 'Aviation Logistics',
    contactPerson: 'Capt. Marcus Brody',
    email: 'm.brody@aerodynamics.aero',
    phone: '+1 (555) 017-6421',
    website: 'https://aerodynamics.aero',
    status: 'lead',
    contractValue: 95000,
    healthScore: 90,
    notes: 'Inbound inquiry from DigiWorku landing page. Needs telemetry fleet tracker UI.',
    lastContactDate: '2026-11-13',
    activityHistory: [
      { date: '2026-11-13', note: 'Introductory discovery call scheduled for Nov 17 at 10 AM EST.', author: 'Elena Rostova' }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    name: 'Apex Financial Portal 2.0',
    code: 'APX-2026',
    clientId: 'cli-01',
    clientName: 'Apex Financial Technologies Ltd.',
    managerId: 'emp-03',
    managerName: 'David Thorne',
    status: 'active',
    startDate: '2026-09-01',
    endDate: '2026-12-15',
    budget: 185000,
    spent: 98400,
    currency: 'USD',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Supabase', 'Node.js', 'Redis'],
    progress: 68,
    riskFactor: 'low',
    daysDelayed: 0,
    milestones: [
      { id: 'ms-01', projectId: 'proj-01', title: 'Architecture & Multi-Tenant Database Setup', orderIndex: 1, dueDate: '2026-09-30', status: 'approved_by_client', amount: 55000, deliverableUrl: 'https://staging.apex.internal' },
      { id: 'ms-02', projectId: 'proj-01', title: 'Portfolio Management & Real-Time Trading Engine UI', orderIndex: 2, dueDate: '2026-11-05', status: 'approved_by_client', amount: 65000, deliverableUrl: 'https://staging.apex.internal/trading' },
      { id: 'ms-03', projectId: 'proj-01', title: 'Security Audit, SSO, & Final Client Release', orderIndex: 3, dueDate: '2026-12-15', status: 'in_progress', amount: 65000 }
    ],
    repoUrl: 'https://github.com/digiworku/apex-portal-2',
    stagingUrl: 'https://apex-v2.staging.digiworku.internal'
  },
  {
    id: 'proj-02',
    name: 'Nordic Retail Omnichannel',
    code: 'NRD-2026',
    clientId: 'cli-02',
    clientName: 'Nordic Living Omni Retail Group',
    managerId: 'emp-03',
    managerName: 'David Thorne',
    status: 'delayed',
    startDate: '2026-08-15',
    endDate: '2026-11-20',
    budget: 120000,
    spent: 89000,
    currency: 'USD',
    techStack: ['React', 'Capacitor Mobile', 'Node.js', 'Stripe', 'PostgreSQL'],
    progress: 74,
    riskFactor: 'high',
    daysDelayed: 6,
    milestones: [
      { id: 'ms-10', projectId: 'proj-02', title: 'Catalog API & Inventory Sync', orderIndex: 1, dueDate: '2026-09-15', status: 'approved_by_client', amount: 40000 },
      { id: 'ms-11', projectId: 'proj-02', title: 'Checkout & Multi-Currency Gateway', orderIndex: 2, dueDate: '2026-11-08', status: 'under_qc', amount: 45000, deliverableUrl: 'https://nordic-checkout.staging.digiworku.internal' },
      { id: 'ms-12', projectId: 'proj-02', title: 'Android & iOS App Store Submission', orderIndex: 3, dueDate: '2026-11-20', status: 'pending', amount: 35000 }
    ],
    repoUrl: 'https://github.com/digiworku/nordic-retail-app',
    stagingUrl: 'https://nordic.staging.digiworku.internal'
  },
  {
    id: 'proj-03',
    name: 'CyberDefense Threat Monitor',
    code: 'CYB-2026',
    clientId: 'cli-03',
    clientName: 'CyberShield Quantum Systems',
    managerId: 'emp-01',
    managerName: 'Alex Vance',
    status: 'planning',
    startDate: '2026-11-25',
    endDate: '2027-03-30',
    budget: 240000,
    spent: 12500,
    currency: 'USD',
    techStack: ['Next.js', 'WebSockets', 'Go', 'TimescaleDB', 'Docker'],
    progress: 15,
    riskFactor: 'low',
    daysDelayed: 0,
    milestones: [
      { id: 'ms-20', projectId: 'proj-03', title: 'Figma Interactive Mockups & Threat Vector UI', orderIndex: 1, dueDate: '2026-12-10', status: 'in_progress', amount: 50000 },
      { id: 'ms-21', projectId: 'proj-03', title: 'Telemetry Engine & Ingestion Pipeline', orderIndex: 2, dueDate: '2027-01-30', status: 'pending', amount: 95000 }
    ]
  }
];

export const INITIAL_FREELANCERS: Freelancer[] = [
  {
    id: 'fl-01',
    fullName: 'Sofia Al-Mansoor',
    email: 'sofia.designs@freelancer.digiworku.com',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    skillDomain: 'Product Design & Design Systems',
    skills: ['Figma', 'UI Animation', 'Design Tokens', 'Tailwind CSS', 'Accessible Design'],
    hourlyRate: 85,
    currency: 'USD',
    rating: 4.98,
    reviewsCount: 34,
    portfolioUrl: 'https://dribbble.com/sofia-designs',
    totalEarned: 42500,
    activeProjectsCount: 2,
    status: 'available',
    kycVerified: true,
    contractHistory: [
      { projectName: 'Apex Financial Portal 2.0', amount: 14000, completedDate: '2026-10-15' },
      { projectName: 'Nordic Retail Omnichannel', amount: 9500, completedDate: '2026-09-20' }
    ]
  },
  {
    id: 'fl-02',
    fullName: 'Tariq Al-Fassi',
    email: 'tariq.dev@freelancer.digiworku.com',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    skillDomain: 'Mobile Engineering (Android/iOS)',
    skills: ['React Native', 'Capacitor', 'Kotlin', 'Swift', 'App Store Deployments'],
    hourlyRate: 95,
    currency: 'USD',
    rating: 4.92,
    reviewsCount: 27,
    portfolioUrl: 'https://github.com/tariq-mobile-lab',
    totalEarned: 58000,
    activeProjectsCount: 1,
    status: 'busy',
    kycVerified: true,
    contractHistory: [
      { projectName: 'Nordic Retail Omnichannel', amount: 18000, completedDate: '2026-10-30' }
    ]
  },
  {
    id: 'fl-03',
    fullName: 'Yuki Tanaka',
    email: 'yuki.tanaka@freelancer.digiworku.com',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    skillDomain: 'DevOps & Site Reliability',
    skills: ['Kubernetes', 'Terraform', 'AWS GovCloud', 'Postgres Tuning', 'Grafana'],
    hourlyRate: 110,
    currency: 'USD',
    rating: 5.0,
    reviewsCount: 19,
    portfolioUrl: 'https://linkedin.com/in/yuki-sre',
    totalEarned: 36000,
    activeProjectsCount: 0,
    status: 'available',
    kycVerified: true,
    contractHistory: [
      { projectName: 'CyberDefense Threat Monitor', amount: 12000, completedDate: '2026-08-15' }
    ]
  }
];

export const INITIAL_PAYROLL: PayrollRecord[] = [
  {
    id: 'pay-2026-11-01',
    employeeId: 'emp-01',
    employeeName: 'Alex Vance',
    role: 'Chief Technology Officer',
    department: 'Executive',
    baseSalary: 12500,
    bonus: 1500,
    deductions: 800,
    netSalary: 13200,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'Direct Deposit #9824',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-02',
    employeeId: 'emp-02',
    employeeName: 'Samantha Sterling',
    role: 'Head of People Operations',
    department: 'People & Culture',
    baseSalary: 7800,
    bonus: 500,
    deductions: 450,
    netSalary: 7850,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'Direct Deposit #3312',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-03',
    employeeId: 'emp-03',
    employeeName: 'David Thorne',
    role: 'Lead Project Manager',
    department: 'Delivery',
    baseSalary: 8200,
    bonus: 800,
    deductions: 500,
    netSalary: 8500,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'Direct Deposit #5514',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-04',
    employeeId: 'emp-05',
    employeeName: 'Marcus Chen',
    role: 'Senior Full Stack Engineer',
    department: 'Engineering',
    baseSalary: 6800,
    bonus: 600,
    deductions: 400,
    netSalary: 7000,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'Direct Deposit #8892',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-05',
    employeeId: 'emp-06',
    employeeName: 'Aria Montgomery',
    role: 'Chief Quality Control Lead',
    department: 'Quality Assurance',
    baseSalary: 7200,
    bonus: 400,
    deductions: 420,
    netSalary: 7180,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'Direct Deposit #4401',
    processedDate: '2026-11-01'
  }
];

export const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: 'inv-8801',
    invoiceNumber: 'INV-2026-0881',
    clientId: 'cli-01',
    clientName: 'Apex Financial Technologies Ltd.',
    projectName: 'Apex Financial Portal 2.0',
    issueDate: '2026-10-15',
    dueDate: '2026-11-15',
    subtotal: 65000,
    taxAmount: 0,
    totalAmount: 65000,
    status: 'paid'
  },
  {
    id: 'inv-8802',
    invoiceNumber: 'INV-2026-0882',
    clientId: 'cli-02',
    clientName: 'Nordic Living Omni Retail Group',
    projectName: 'Nordic Retail Omnichannel',
    issueDate: '2026-11-01',
    dueDate: '2026-11-20',
    subtotal: 45000,
    taxAmount: 0,
    totalAmount: 45000,
    status: 'sent'
  },
  {
    id: 'inv-8803',
    invoiceNumber: 'INV-2026-0883',
    clientId: 'cli-03',
    clientName: 'CyberShield Quantum Systems',
    projectName: 'CyberDefense Threat Monitor',
    issueDate: '2026-11-10',
    dueDate: '2026-12-10',
    subtotal: 50000,
    taxAmount: 0,
    totalAmount: 50000,
    status: 'sent'
  }
];

export const INITIAL_FINANCE_SUMMARY: FinancialSummary = {
  totalRevenueYTD: 1420000,
  monthlyRevenue: 160000,
  totalExpenses: 78500,
  netProfit: 81500,
  profitMarginPercent: 50.9,
  pendingInvoicesAmount: 95000,
  upcomingPayrollAmount: 54500,
  monthlyTrend: [
    { month: 'Jun', revenue: 110000, expenses: 62000, profit: 48000 },
    { month: 'Jul', revenue: 125000, expenses: 65000, profit: 60000 },
    { month: 'Aug', revenue: 135000, expenses: 71000, profit: 64000 },
    { month: 'Sep', revenue: 148000, expenses: 73000, profit: 75000 },
    { month: 'Oct', revenue: 155000, expenses: 76000, profit: 79000 },
    { month: 'Nov (Proj)', revenue: 160000, expenses: 78500, profit: 81500 }
  ]
};

export const INITIAL_CHANNELS: ChatChannel[] = [
  { id: 'announcements', name: 'announcements', description: 'Company-wide notices, executive releases, and milestones', isDirectMessage: false, unreadCount: 1 },
  { id: 'qc-alerts', name: 'qc-alerts', description: 'Real-time automated alerts from the Quality Control Engine', isDirectMessage: false, unreadCount: 2 },
  { id: 'dev-team', name: 'dev-team', description: 'Engineering, architecture, pull requests, and staging deployments', isDirectMessage: false, unreadCount: 0 },
  { id: 'general', name: 'general', description: 'Day-to-day team sync, coffee breaks, and company culture', isDirectMessage: false, unreadCount: 0 },
  { id: 'dm-alex', name: 'Alex Vance (CTO)', description: 'Direct message channel with Alex Vance', isDirectMessage: true, unreadCount: 0 }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-01',
    channelId: 'announcements',
    senderId: 'emp-01',
    senderName: 'Alex Vance',
    senderRole: 'super_admin',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    message: '🚀 DigiWorku Commander OS v2.0 is now officially live across all internal workstations and mobile apps. 12 operational modules are connected to our production Supabase backend.',
    timestamp: '10:00 AM',
    reactions: { '🎉': ['Samantha Sterling', 'Marcus Chen', 'David Thorne'], '🔥': ['Aria Montgomery'] }
  },
  {
    id: 'msg-02',
    channelId: 'qc-alerts',
    senderId: 'emp-06',
    senderName: 'Aria Montgomery',
    senderRole: 'qa_manager',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    message: '⚠️ QC Audit Notice: Milestone 2 for Nordic Retail passed 94/100 points. 2 minor styling discrepancies flagged on mobile viewport width < 375px. Review sandbox link attached.',
    timestamp: '11:15 AM',
    attachments: [
      { name: 'QC_Inspection_Audit_MS2.pdf', url: '#', size: '2.1 MB' }
    ]
  },
  {
    id: 'msg-03',
    channelId: 'dev-team',
    senderId: 'emp-05',
    senderName: 'Marcus Chen',
    senderRole: 'team_member',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    message: 'Pushed the WebAuthn and SAML SSO flow to branch `feature/sso-apex`. RLS integration tests are passing 100%. Ready for QA review!',
    timestamp: '11:45 AM',
    reactions: { '👏': ['David Thorne', 'Aria Montgomery'] }
  }
];

export const INITIAL_QC_CHECKLIST: QCReview['checklistItems'] = [
  // Code Quality
  { id: 'qc-c1', category: 'code_quality', title: 'TypeScript Compilation & Zero Any Types', description: 'Zero compilation warnings, strict null checks enabled, all interfaces typed', weight: 10, passed: true },
  { id: 'qc-c2', category: 'code_quality', title: 'Modular Architecture & Separation of Concerns', description: 'Business logic isolated in hooks/services; components pure and testable', weight: 10, passed: true },
  { id: 'qc-c3', category: 'code_quality', title: 'Error Boundary & Graceful Fallbacks', description: 'Components fail gracefully without unhandled crashes or blank white screens', weight: 10, passed: true },
  
  // UI / UX Polish
  { id: 'qc-u1', category: 'ui_ux', title: 'Dark Mode Harmony & Color Consistency', description: 'DigiWorku brand palette strictly honored (#030712 bg, #0f172a cards, #10b981 emerald)', weight: 10, passed: true },
  { id: 'qc-u2', category: 'ui_ux', title: 'Fluid Responsiveness (360px to 4K)', description: 'No horizontal overflow, touch-friendly tap targets >= 44px on mobile', weight: 10, passed: true },
  { id: 'qc-u3', category: 'ui_ux', title: 'Micro-interactions & State Feedback', description: 'Hover states, loading spinners, active button presses and tooltips intuitive', weight: 10, passed: true },

  // Performance & SEO
  { id: 'qc-p1', category: 'performance_seo', title: 'Sub-100ms Interaction Latency', description: 'Fast render loops, memoized callbacks, zero perceptible lag on tab changes', weight: 10, passed: true },
  { id: 'qc-p2', category: 'performance_seo', title: 'Asset & Bundle Optimization', description: 'Modern ESM bundling, tree-shaken icons, optimized SVG and typography assets', weight: 10, passed: true },

  // Security & Data Integrity
  { id: 'qc-s1', category: 'security', title: 'Row Level Security (RLS) & RBAC Guardrails', description: 'Salaries and client figures strictly blocked from non-finance staff roles', weight: 10, passed: true },
  { id: 'qc-s2', category: 'security', title: 'Input Sanitization & XSS Mitigation', description: 'Safe React rendering, escaped form outputs, no raw dangerous HTML injection', weight: 10, passed: true }
];

export const INITIAL_QC_REVIEWS: QCReview[] = [
  {
    id: 'qc-rev-01',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    milestoneTitle: 'Checkout & Multi-Currency Gateway',
    deliverablePreviewUrl: 'https://digiworku.com',
    submittedBy: 'emp-05',
    submittedByName: 'Marcus Chen',
    reviewerId: 'emp-06',
    reviewerName: 'Aria Montgomery',
    overallScore: 92,
    decision: 'pending',
    comments: 'Strong implementation overall. Multi-currency math is airtight. Need to ensure modal backdrop blur does not reduce frame rates on low-end mobile devices.',
    checklistItems: INITIAL_QC_CHECKLIST,
    submittedAt: '2026-11-14 09:30 AM'
  }
];

export const INITIAL_PERFORMANCE: PerformanceMetrics = {
  sprintVelocity: [
    { sprint: 'Sprint 40', committed: 45, completed: 42 },
    { sprint: 'Sprint 41', committed: 50, completed: 49 },
    { sprint: 'Sprint 42', committed: 52, completed: 51 },
    { sprint: 'Sprint 43', committed: 55, completed: 53 },
    { sprint: 'Sprint 44 (Current)', committed: 60, completed: 54 }
  ],
  slaDeliveryRate: 96.4,
  overallQualityScore: 94.8,
  activeWorkforce: 18,
  departmentRankings: [
    { department: 'Engineering', onTimeRate: 98.2, tasksCompleted: 142, satisfactionScore: 4.9 },
    { department: 'Quality Assurance', onTimeRate: 99.1, tasksCompleted: 88, satisfactionScore: 4.95 },
    { department: 'Design & UX', onTimeRate: 95.0, tasksCompleted: 64, satisfactionScore: 4.8 },
    { department: 'Revenue / Sales', onTimeRate: 93.4, tasksCompleted: 52, satisfactionScore: 4.7 }
  ],
  topPerformers: [
    { id: 'emp-05', name: 'Marcus Chen', role: 'Sr. Full Stack Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', tasksDone: 28, accuracyPercent: 99.2, badge: 'Sprint MVP' },
    { id: 'emp-06', name: 'Aria Montgomery', role: 'Chief QC Lead', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', tasksDone: 34, accuracyPercent: 98.8, badge: 'Zero Defect Guardian' },
    { id: 'fl-01', name: 'Sofia Al-Mansoor', role: 'Design Specialist', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', tasksDone: 22, accuracyPercent: 97.5, badge: 'Pixel Perfect' }
  ]
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-01',
    title: 'Milestone Review Pending',
    message: 'Marcus Chen submitted Checkout & Gateway deliverable for Nordic Retail project.',
    type: 'qc' as const,
    read: false,
    createdAt: '2026-11-14 09:35 AM',
    linkModule: 'qc' as const
  },
  {
    id: 'notif-02',
    title: 'Leave Request Received',
    message: 'Marcus Chen requested 2 days Sick Leave starting Nov 18.',
    type: 'leave' as const,
    read: false,
    createdAt: '2026-11-14 09:15 AM',
    linkModule: 'attendance' as const
  },
  {
    id: 'notif-03',
    title: 'Delayed Project Alert',
    message: 'Nordic Retail Omnichannel flagged 2 days delayed on SLA radar.',
    type: 'system' as const,
    read: false,
    createdAt: '2026-11-14 08:50 AM',
    linkModule: 'projects' as const
  },
  {
    id: 'notif-04',
    title: 'Invoice Payment Received',
    message: 'Aura Health Systems cleared Invoice #INV-2026-081 (₹1,50,000).',
    type: 'finance' as const,
    read: true,
    createdAt: '2026-11-13 04:20 PM',
    linkModule: 'finance' as const
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud-01',
    timestamp: '2026-11-14 09:40:12',
    actorId: 'emp-01',
    actorName: 'Alex Vance',
    actorRole: 'super_admin' as const,
    action: 'QC Checklist Inspection',
    module: 'qc' as const,
    details: 'Verified RLS security guardrails and responsive UI compliance for Sprint 44.',
    status: 'success' as const
  },
  {
    id: 'aud-02',
    timestamp: '2026-11-14 09:12:05',
    actorId: 'emp-02',
    actorName: 'Samantha Sterling',
    actorRole: 'hr_manager' as const,
    action: 'Leave Review Approval',
    module: 'attendance' as const,
    details: 'Approved 3 days casual leave for David Thorne.',
    status: 'success' as const
  },
  {
    id: 'aud-03',
    timestamp: '2026-11-14 08:55:00',
    actorId: 'emp-01',
    actorName: 'Alex Vance',
    actorRole: 'super_admin' as const,
    action: 'Operator Shift Check-In',
    module: 'attendance' as const,
    details: 'Logged on-duty operator shift timestamp 08:55 AM.',
    status: 'success' as const
  }
];

export const INITIAL_COMPANY_SETTINGS = {
  companyName: 'DigiWorku Technologies Pvt Ltd',
  officialEmail: 'operations@digiworku.in',
  supportPhone: '+91 80 4920 1820',
  timezone: 'Asia/Kolkata (IST +05:30)',
  workingHoursStart: '09:00 AM',
  workingHoursEnd: '06:00 PM',
  defaultCurrency: 'INR (₹)',
  autoApproveLeaveUnderDays: 1,
  qcPassingThreshold: 90,
  supabaseConnected: true,
  enableAuditLogging: true
};
