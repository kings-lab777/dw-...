import {
  Employee,
  AttendanceRecord,
  LeaveRequest,
  InternalTask,
  ClientLead,
  ClientQuote,
  Project,
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
  ServiceItem,
  CompanySettings
} from '../types';

// ==============================================================================
// 1. DIGIWORKU SERVICE CATALOGUE (13 Service Categories)
// ==============================================================================
export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-01',
    name: 'Full-Stack Website Development',
    category: 'website_development',
    description: 'Custom responsive web applications, modern JAMstack, Next.js/React, backend REST/GraphQL APIs and CMS integration.',
    requirements: ['UI/UX Figma design approval', 'Functional specification document', 'API & database schema definitions'],
    deliverables: ['Production-ready source repository', 'CI/CD deployment pipeline', 'Lighthouse audit > 90', 'Admin CMS dashboard'],
    acceptanceCriteria: ['Zero critical console errors', 'Mobile responsive across 360px-4K', 'Sub-2s page load speed', 'SSL & security headers verified'],
    estimatedTimeline: '3 - 6 Weeks',
    internalCost: 85000,       // ₹85,000 internal cost
    clientQuotation: 195000,   // ₹1,95,000 client quote
    assignedDepartment: 'Engineering',
    requiredSkills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    projectTemplates: ['Enterprise SaaS Starter', 'Corporate Portfolio Pro', 'E-Learning Portal'],
    isRecurring: false,
    isEnabled: true
  },
  {
    id: 'srv-02',
    name: 'Brand Identity & Graphic Design',
    category: 'graphic_design',
    description: 'Complete brand identity suites: logo design, brand guidelines book, visual assets, typography hierarchy and corporate collateral.',
    requirements: ['Brand discovery questionnaire', 'Target audience and mood board', 'Competitor visual audit'],
    deliverables: ['Vector logo kit (SVG, EPS, PNG)', 'Brand Guidelines PDF (40+ pages)', 'Stationery & social media templates', 'Iconography pack'],
    acceptanceCriteria: ['100% scalable vector artwork', 'CMYK & RGB color profiles defined', 'Full commercial copyright clearance', 'Client sign-off on 3 concept directions'],
    estimatedTimeline: '2 - 3 Weeks',
    internalCost: 35000,
    clientQuotation: 85000,
    assignedDepartment: 'Design & Creative',
    requiredSkills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Brand Strategy', 'Typography'],
    projectTemplates: ['Startup Launch Kit', 'Enterprise Rebrand Suite', 'Social Media Asset Pack'],
    isRecurring: false,
    isEnabled: true
  },
  {
    id: 'srv-03',
    name: 'Technical SEO & Search Marketing',
    category: 'seo_marketing',
    description: 'Data-driven search engine optimization, on-page schema markup, core web vitals speed optimization and high-intent backlink campaigns.',
    requirements: ['Google Search Console access', 'Google Analytics 4 setup', 'Target keyword seed list'],
    deliverables: ['Technical SEO audit report', 'Schema markup implementation', 'Monthly keyword ranking report', 'Content gap strategy plan'],
    acceptanceCriteria: ['Zero crawl 404/500 errors', 'Core Web Vitals passing (Good green scores)', 'Rankings improvement for top 20 keywords', 'XML Sitemap indexed properly'],
    estimatedTimeline: 'Ongoing / Monthly',
    internalCost: 28000,
    clientQuotation: 65000,
    assignedDepartment: 'Growth & Marketing',
    requiredSkills: ['Ahrefs', 'SEMrush', 'Technical SEO', 'Schema Markup', 'Core Web Vitals'],
    projectTemplates: ['E-Commerce SEO Sprint', 'Local SEO Dominance', 'SaaS Organic Growth'],
    isRecurring: true,
    isEnabled: true
  },
  {
    id: 'srv-04',
    name: 'Performance Digital Marketing & Ads',
    category: 'digital_marketing',
    description: 'High-ROI multi-channel paid acquisition: Google Ads, Meta Ads (Facebook/Instagram), LinkedIn B2B campaigns and funnel retargeting.',
    requirements: ['Ad accounts access with billing set', 'Brand visual assets', 'Target ICP & customer persona'],
    deliverables: ['Ad creative variants (Static & Video)', 'Custom tracking pixel & CAPI integration', 'Weekly ROAS & CAC performance reports', 'A/B landing page tests'],
    acceptanceCriteria: ['ROAS >= 3.5x maintained', 'Conversion tracking accuracy verified with test events', 'Cost per acquisition within target benchmark'],
    estimatedTimeline: 'Monthly Retainer',
    internalCost: 40000,
    clientQuotation: 90000,
    assignedDepartment: 'Growth & Marketing',
    requiredSkills: ['Meta Ads Manager', 'Google Ads', 'GA4', 'Conversion Rate Optimization', 'Copywriting'],
    projectTemplates: ['D2C Scale Playbook', 'B2B Lead Generation', 'App Install Campaign'],
    isRecurring: true,
    isEnabled: true
  },
  {
    id: 'srv-05',
    name: 'Video Production & Motion Animation',
    category: 'video_editing',
    description: 'Commercial video editing, 2D/3D motion graphics, product demo walkthroughs, YouTube long-form and high-engagement social reels.',
    requirements: ['Raw footage or screen recordings', 'Script & storyboard approval', 'Brand audio/visual assets'],
    deliverables: ['Master 4K/1080p final render', 'Social media cuts (9:16 vertical & 1:1 square)', 'Subtitles & caption files (.srt)', 'Licensed background audio track'],
    acceptanceCriteria: ['Color graded according to brand style', 'Pacing & audio loudness normalized to -14 LUFS', 'Zero rendering artifacts or compression glitches'],
    estimatedTimeline: '1 - 2 Weeks',
    internalCost: 30000,
    clientQuotation: 75000,
    assignedDepartment: 'Media & Production',
    requiredSkills: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Sound Design', 'Motion Design'],
    projectTemplates: ['SaaS Explainer Video', 'YouTube Content Sprint', 'Instagram Reels Batch (15x)'],
    isRecurring: false,
    isEnabled: true
  },
  {
    id: 'srv-06',
    name: 'Content Writing & Copywriting',
    category: 'content_writing',
    description: 'SEO-optimized authoritative blog posts, website landing page sales copy, email sequences, whitepapers and executive ghostwriting.',
    requirements: ['Content brief & tone of voice guidelines', 'Target keywords & search intent', 'Subject matter expert access'],
    deliverables: ['Formatted Markdown/Docs deliverables', 'Meta titles and descriptions included', 'Plagiarism & AI score verification report', 'Suggested internal linking list'],
    acceptanceCriteria: ['100% original copy (Copyscape checked)', 'Grammar score > 95 in Grammarly', 'Search intent fully satisfied', 'Engaging hooks and clear CTAs'],
    estimatedTimeline: '3 - 7 Days',
    internalCost: 15000,
    clientQuotation: 40000,
    assignedDepartment: 'Editorial & Content',
    requiredSkills: ['SEO Copywriting', 'Content Strategy', 'B2B Technical Writing', 'Storytelling'],
    projectTemplates: ['10x Pillar Blog Strategy', 'Conversion Sales Page Copy', 'Cold Outreach Email Sequence'],
    isRecurring: true,
    isEnabled: true
  },
  {
    id: 'srv-07',
    name: 'AI Solutions & Workflow Automation',
    category: 'ai_automation',
    description: 'Custom AI copilot integrations, LLM workflows, automated Zapier/Make operations pipelines, customer support chatbots and document OCR engines.',
    requirements: ['Workflow architecture diagram', 'API credentials & data schema', 'Security & privacy guardrails specification'],
    deliverables: ['Deployed AI agent / microservice', 'Webhook automation pipeline', 'Admin monitoring dashboard', 'Comprehensive API documentation'],
    acceptanceCriteria: ['Response latency under 1.5s', 'Hallucination safeguards & fallback prompts active', 'Zero sensitive data exposure in context', '99.9% uptime webhook reliability'],
    estimatedTimeline: '2 - 4 Weeks',
    internalCost: 75000,
    clientQuotation: 180000,
    assignedDepartment: 'AI & Innovation Lab',
    requiredSkills: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'Make/n8n', 'Vector Databases'],
    projectTemplates: ['Customer Support AI Bot', 'Lead Scraping & Auto-Enrichment', 'Invoice Data Extraction Agent'],
    isRecurring: false,
    isEnabled: true
  },
  {
    id: 'srv-08',
    name: 'Mobile App Development (iOS & Android)',
    category: 'mobile_apps',
    description: 'Cross-platform native mobile apps built with React Native / Flutter, offline sync, biometric login, push notifications and payment gateway.',
    requirements: ['Mobile UX wireframes & prototypes', 'Apple Developer & Google Play Console accounts', 'Backend API endpoints ready'],
    deliverables: ['Signed production APK & IPA builds', 'App Store & Play Store submission support', 'Push notification configuration (FCM)', 'Full source code repository'],
    acceptanceCriteria: ['Passes Apple App Store Review guidelines', 'Passes Google Play 64-bit compliance', '60 FPS smooth animations', 'Crash-free user rate > 99.5%'],
    estimatedTimeline: '6 - 10 Weeks',
    internalCost: 120000,
    clientQuotation: 290000,
    assignedDepartment: 'Mobile Engineering',
    requiredSkills: ['React Native', 'Flutter', 'TypeScript', 'iOS/Android Native APIs', 'Firebase'],
    projectTemplates: ['Fintech Mobile Wallet', 'Healthcare Teleconsult App', 'On-Demand Service Booking App'],
    isRecurring: false,
    isEnabled: true
  },
  {
    id: 'srv-09',
    name: 'UI/UX Product Design & Prototyping',
    category: 'ui_ux_design',
    description: 'End-to-end user experience design: user research, wireframing, high-fidelity Figma component systems, interactive micro-prototypes and user testing.',
    requirements: ['Product requirement document (PRD)', 'Target user demographics', 'Competitor design teardown'],
    deliverables: ['Figma Design System with auto-layout & tokens', 'Interactive clickable prototype', 'Developer handoff documentation', 'UX audit report with usability scores'],
    acceptanceCriteria: ['WCAG AA accessibility contrast compliant', 'Organized component variants & naming', '100% responsiveness for Mobile & Desktop', 'Client stakeholder approval'],
    estimatedTimeline: '3 - 5 Weeks',
    internalCost: 55000,
    clientQuotation: 135000,
    assignedDepartment: 'Design & Creative',
    requiredSkills: ['Figma', 'UX Research', 'Design Systems', 'Micro-interactions', 'Prototyping'],
    projectTemplates: ['SaaS Web App Redesign', 'Mobile App UI Blueprint', 'Enterprise Portal UX'],
    isRecurring: false,
    isEnabled: true
  },
  {
    id: 'srv-10',
    name: 'E-commerce Store Development',
    category: 'ecommerce_development',
    description: 'High-converting custom Shopify / WooCommerce / Headless commerce storefronts, multi-currency checkout, Indian payment gateways (Razorpay/Paytm) and ERP sync.',
    requirements: ['Product catalogue with SKUs & high-res images', 'Payment gateway merchant KYC approval', 'Shipping carrier partner APIs (Shiprocket)'],
    deliverables: ['Live storefront with customized theme', 'Payment gateway integration & webhook tests', 'Automated abandoned cart recovery flow', 'Inventory management walkthrough'],
    acceptanceCriteria: ['Checkout flow completes in <= 3 steps', 'Sub-2s mobile loading time', 'Tax calculations (GST) accurate on all invoices', 'Zero broken links or images'],
    estimatedTimeline: '3 - 5 Weeks',
    internalCost: 65000,
    clientQuotation: 160000,
    assignedDepartment: 'Engineering',
    requiredSkills: ['Shopify Liquid', 'WooCommerce', 'React', 'Razorpay API', 'Shiprocket API'],
    projectTemplates: ['D2C Brand Flagship', 'Multi-Vendor Marketplace', 'B2B Wholesale Ordering Portal'],
    isRecurring: false,
    isEnabled: true
  },
  {
    id: 'srv-11',
    name: 'Creative & Business Operations Support',
    category: 'creative_support',
    description: 'Dedicated virtual assistant pod: customer support ticketing (Zendesk/Freshdesk), daily data entry, presentation pitch deck design and operational support.',
    requirements: ['SOP documentation for daily tasks', 'Access to ticketing and CRM tools', 'Daily reporting template'],
    deliverables: ['Daily activity & output logs', 'Response time SLA compliance report', 'Monthly executive business review', 'Formatted executive presentation decks'],
    acceptanceCriteria: ['Ticket response time < 15 minutes', '98% CSAT rating maintained', '100% data accuracy on audited entries'],
    estimatedTimeline: 'Monthly Dedicated Pod',
    internalCost: 45000,
    clientQuotation: 95000,
    assignedDepartment: 'Operations & Support',
    requiredSkills: ['Customer Support', 'Zendesk', 'Excel/Sheets Advanced', 'PowerPoint / Keynote', 'SOP Writing'],
    projectTemplates: ['E-Commerce Support Pod (24/7)', 'Executive Admin Desk', 'Data Cleansing & CRM Sync'],
    isRecurring: true,
    isEnabled: true
  },
  {
    id: 'srv-12',
    name: 'Analytics, Tagging & Tracking Audit',
    category: 'analytics_tracking',
    description: 'Complete data measurement architecture: Google Tag Manager (GTM) server-side tagging, GA4 event tracking, Mixpanel/Amplitude product analytics and Looker Studio dashboards.',
    requirements: ['GTM & GA4 container access', 'Key business event definitions', 'Data privacy compliance requirements (GDPR/DPDP)'],
    deliverables: ['Server-side GTM container setup', 'Custom event measurement plan', 'Real-time Looker Studio executive dashboard', 'Data quality verification audit'],
    acceptanceCriteria: ['Zero duplicate transaction firing', '100% purchase revenue tracking accuracy', 'User privacy consent mode v2 active', 'Dashboard updates in real-time'],
    estimatedTimeline: '1 - 2 Weeks',
    internalCost: 25000,
    clientQuotation: 60000,
    assignedDepartment: 'Growth & Analytics',
    requiredSkills: ['Google Tag Manager', 'GA4', 'Looker Studio', 'JavaScript Tagging', 'DataLayer Schema'],
    projectTemplates: ['E-Commerce Attribution Suite', 'SaaS Product Funnel Tracking', 'Marketing Lead Source Attribution'],
    isRecurring: false,
    isEnabled: true
  },
  {
    id: 'srv-13',
    name: 'Cloud Hosting & Technical Maintenance',
    category: 'hosting_support',
    description: 'Managed cloud infrastructure, 24/7 server monitoring, automated daily backups, SSL renewal, security vulnerability patching and performance tuning.',
    requirements: ['Cloud provider access (AWS/DigitalOcean/Cloudflare)', 'Domain DNS registrar access', 'Emergency escalation contact list'],
    deliverables: ['High-availability cloud server config', 'Cloudflare WAF & DDoS mitigation', 'Daily automated offsite backup schedule', 'Monthly uptime & incident report'],
    acceptanceCriteria: ['99.95% server uptime guaranteed', 'Automated disaster recovery test verified', 'All security CVE patches applied within 48h', '24/7 emergency incident response < 30m'],
    estimatedTimeline: 'Annual / Monthly Retainer',
    internalCost: 20000,
    clientQuotation: 50000,
    assignedDepartment: 'Infrastructure & DevOps',
    requiredSkills: ['AWS', 'Docker', 'Linux Administration', 'Cloudflare WAF', 'Nginx', 'PostgreSQL Maintenance'],
    projectTemplates: ['High-Traffic Cluster Setup', 'Disaster Recovery Warm Standby', 'Monthly Security & Uptime Care'],
    isRecurring: true,
    isEnabled: true
  }
];

// ==============================================================================
// 2. EMPLOYEES & WORKFORCE
// ==============================================================================
export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-01',
    fullName: 'Vir Kanwlia',
    email: 'vir.kanwlia@digiworku.in',
    role: 'super_admin',
    department: 'Executive Leadership',
    designation: 'Founder & Managing Director',
    avatarUrl: '/founder-vir.jpg',
    phone: '+91 98101 22340',
    skills: ['Business Strategy', 'Enterprise Sales', 'Operations OS', 'Workforce Scalability', 'Venture Growth'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-1', name: 'Director_Identification_DIN.pdf', type: 'Identification', fileSize: '2.1 MB', verified: true, uploadedAt: '2024-01-10' },
      { id: 'doc-2', name: 'MCA_Incorporation_Certificate.pdf', type: 'Legal', fileSize: '3.4 MB', verified: true, uploadedAt: '2024-01-10' }
    ],
    isActive: true,
    joinDate: '2023-01-01',
    baseSalary: 250000, // ₹2,50,000 / month
    workloadScore: 88,
    completedTasksCount: 145,
    ratingScore: 5.0
  },
  {
    id: 'emp-02',
    fullName: 'Rohit Verma',
    email: 'rohit.v@digiworku.in',
    role: 'operations_manager',
    department: 'Operations & Delivery',
    designation: 'Head of Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98202 33451',
    skills: ['Delivery SLA', 'Team Allocation', 'Cross-functional Scaling', 'Resource Planning'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-3', name: 'Aadhaar_Rohit_Verma.pdf', type: 'Identification', fileSize: '1.2 MB', verified: true, uploadedAt: '2023-04-15' }
    ],
    isActive: true,
    joinDate: '2023-04-15',
    baseSalary: 120000,
    workloadScore: 82,
    completedTasksCount: 112,
    ratingScore: 4.9
  },
  {
    id: 'emp-03',
    fullName: 'Priya Sharma',
    email: 'priya.s@digiworku.in',
    role: 'sales_manager',
    department: 'Revenue & Growth',
    designation: 'Enterprise Client Director',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98303 44562',
    skills: ['Enterprise Client Acquisition', 'Proposal Engineering', 'Contract Negotiation', 'CRM'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-4', name: 'PAN_Priya_Sharma.pdf', type: 'Identification', fileSize: '0.9 MB', verified: true, uploadedAt: '2023-06-01' }
    ],
    isActive: true,
    joinDate: '2023-06-01',
    baseSalary: 110000,
    workloadScore: 90,
    completedTasksCount: 88,
    ratingScore: 4.95
  },
  {
    id: 'emp-04',
    fullName: 'David Thorne',
    email: 'david.t@digiworku.in',
    role: 'project_manager',
    department: 'Project Delivery',
    designation: 'Senior Project Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98404 55673',
    skills: ['Agile Scrum', 'Milestone Tracking', 'Jira / Linear', 'Risk Mitigation', 'Client Management'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-5', name: 'Passport_David_Thorne.pdf', type: 'Identification', fileSize: '1.8 MB', verified: true, uploadedAt: '2023-08-10' }
    ],
    isActive: true,
    joinDate: '2023-08-10',
    baseSalary: 95000,
    workloadScore: 78,
    completedTasksCount: 96,
    ratingScore: 4.85
  },
  {
    id: 'emp-05',
    fullName: 'Marcus Chen',
    email: 'marcus.c@digiworku.in',
    role: 'team_member',
    department: 'Engineering',
    designation: 'Senior Full Stack Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98505 66784',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Cloud Infrastructure'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-6', name: 'Tech_Degree_Marcus.pdf', type: 'Education', fileSize: '1.4 MB', verified: true, uploadedAt: '2023-09-01' }
    ],
    isActive: true,
    joinDate: '2023-09-01',
    baseSalary: 85000,
    workloadScore: 85,
    completedTasksCount: 134,
    ratingScore: 4.92
  },
  {
    id: 'emp-06',
    fullName: 'Aria Montgomery',
    email: 'aria.m@digiworku.in',
    role: 'qa_manager',
    department: 'Quality Assurance',
    designation: 'Quality Control Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98606 77895',
    skills: ['Automated Testing', 'Design Verification', 'Acceptance Testing', 'Security Audit', 'WCAG AA'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-7', name: 'QA_Lead_Cert.pdf', type: 'Certification', fileSize: '2.0 MB', verified: true, uploadedAt: '2023-10-15' }
    ],
    isActive: true,
    joinDate: '2023-10-15',
    baseSalary: 88000,
    workloadScore: 72,
    completedTasksCount: 108,
    ratingScore: 4.98
  },
  {
    id: 'emp-07',
    fullName: 'Neha Patel',
    email: 'neha.p@digiworku.in',
    role: 'finance_manager',
    department: 'Finance & Accounts',
    designation: 'Chief Financial Officer (CFO)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98707 88906',
    skills: ['GST Compliance', 'Financial Modeling', 'Invoicing & Payouts', 'Cash Flow', 'Audit Trails'],
    kycStatus: 'verified',
    kycDocuments: [
      { id: 'doc-8', name: 'CA_Membership_Certificate.pdf', type: 'Professional', fileSize: '2.6 MB', verified: true, uploadedAt: '2023-03-01' }
    ],
    isActive: true,
    joinDate: '2023-03-01',
    baseSalary: 130000,
    workloadScore: 65,
    completedTasksCount: 74,
    ratingScore: 4.9
  }
];

// ==============================================================================
// 3. ATTENDANCE & LEAVES
// ==============================================================================
export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-101',
    userId: 'emp-01',
    userName: 'Vir Kanwlia',
    date: '2026-11-15',
    checkInTime: '08:45 AM',
    durationMinutes: 510,
    isLate: false,
    status: 'present',
    location: 'DigiWorku HQ (Gurugram Suite 401)'
  },
  {
    id: 'att-102',
    userId: 'emp-02',
    userName: 'Rohit Verma',
    date: '2026-11-15',
    checkInTime: '08:55 AM',
    durationMinutes: 480,
    isLate: false,
    status: 'present',
    location: 'DigiWorku HQ (Operations Pod)'
  },
  {
    id: 'att-103',
    userId: 'emp-03',
    userName: 'Priya Sharma',
    date: '2026-11-15',
    checkInTime: '09:02 AM',
    durationMinutes: 465,
    isLate: false,
    status: 'present',
    location: 'Remote (Bengaluru Office)'
  },
  {
    id: 'att-104',
    userId: 'emp-04',
    userName: 'David Thorne',
    date: '2026-11-15',
    checkInTime: '09:15 AM',
    durationMinutes: 440,
    isLate: false,
    status: 'present',
    location: 'DigiWorku HQ (Delivery Desk 12)'
  },
  {
    id: 'att-105',
    userId: 'emp-05',
    userName: 'Marcus Chen',
    date: '2026-11-15',
    checkInTime: '09:35 AM',
    durationMinutes: 420,
    isLate: true,
    lateReason: 'Metro signal delay on Rapid Metro line',
    status: 'late',
    location: 'DigiWorku HQ (Engineering Lab)'
  },
  {
    id: 'att-106',
    userId: 'emp-06',
    userName: 'Aria Montgomery',
    date: '2026-11-15',
    checkInTime: '08:50 AM',
    durationMinutes: 490,
    isLate: false,
    status: 'present',
    location: 'Remote (Mumbai)'
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'leave-01',
    userId: 'emp-05',
    userName: 'Marcus Chen',
    department: 'Engineering',
    leaveType: 'annual',
    startDate: '2026-11-24',
    endDate: '2026-11-27',
    totalDays: 4,
    reason: 'Family wedding celebrations in Jaipur',
    status: 'pending',
    appliedAt: '2026-11-14'
  },
  {
    id: 'leave-02',
    userId: 'emp-03',
    userName: 'Priya Sharma',
    department: 'Revenue & Growth',
    leaveType: 'casual',
    startDate: '2026-11-20',
    endDate: '2026-11-20',
    totalDays: 1,
    reason: 'Attending India SaaS Conclave 2026',
    status: 'approved',
    appliedAt: '2026-11-12',
    reviewedBy: 'Rohit Verma'
  }
];

// ==============================================================================
// 4. TASKS & WORKFLOW (Fokys & TaskFlow Design System)
// ==============================================================================
export const INITIAL_TASKS: InternalTask[] = [
  {
    id: 'tsk-101',
    title: 'Content QA Checklist Verification',
    description: 'Audit copy tone, grammar standards and metadata across newly launched customer onboarding portals.',
    categoryTag: 'Communication',
    status: 'backlog', // Fokys column: Scheduled
    priority: 'medium',
    progressPercent: 0,
    assigneeId: 'emp-03',
    assigneeName: 'Priya Sharma',
    assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'employee',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    dueDate: '2026-11-20',
    estimatedHours: 8,
    spentHours: 0,
    commentsCount: 10,
    checklist: [
      { id: 'c1', text: 'Verify brand tone consistency', completed: false },
      { id: 'c2', text: 'Validate GDPR and DPDP compliance statements', completed: false }
    ],
    attachments: [{ name: 'Onboarding_Copy_Draft_v2.pdf', url: '#', size: '1.4 MB' }],
    createdAt: '2026-11-12'
  },
  {
    id: 'tsk-102',
    title: 'UI Testing Round 2 (Mobile Viewports)',
    description: 'Ensure cross-device responsiveness on iOS Safari and Android Chrome down to 360px viewport width.',
    categoryTag: 'Communication',
    status: 'backlog', // Scheduled
    priority: 'high',
    progressPercent: 0,
    assigneeId: 'emp-06',
    assigneeName: 'Aria Montgomery',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'employee',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    dueDate: '2026-11-22',
    estimatedHours: 12,
    spentHours: 0,
    commentsCount: 10,
    checklist: [
      { id: 'c3', text: 'Inspect navigation drawer gestures', completed: false },
      { id: 'c4', text: 'Test tap targets >= 44px', completed: false }
    ],
    attachments: [],
    createdAt: '2026-11-13'
  },
  {
    id: 'tsk-103',
    title: 'Landing Page A/B Review & Conversion Analytics',
    description: 'Evaluate bounce rates, CTA click heatmaps and checkout drop-offs across desktop and tablet visitors.',
    categoryTag: 'Communication',
    status: 'backlog', // Scheduled
    priority: 'high',
    progressPercent: 0,
    assigneeId: 'emp-05',
    assigneeName: 'Marcus Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'employee',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    dueDate: '2026-11-24',
    estimatedHours: 10,
    spentHours: 0,
    commentsCount: 10,
    checklist: [],
    attachments: [],
    createdAt: '2026-11-14'
  },
  {
    id: 'tsk-104',
    title: 'Stakeholder Alignment Meeting & Roadmap Sync',
    description: 'Review engineering velocity, sprint backlog and resource allocation for Q1 deliverables with client stakeholders.',
    categoryTag: 'Engineering',
    status: 'in_progress', // In Progress
    priority: 'high',
    progressPercent: 40,
    assigneeId: 'emp-02',
    assigneeName: 'Rohit Verma',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'employee',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    dueDate: '2026-11-18',
    estimatedHours: 16,
    spentHours: 6.5,
    commentsCount: 10,
    checklist: [
      { id: 'c5', text: 'Prepare slide deck with burn-down charts', completed: true },
      { id: 'c6', text: 'Calculate freelance engineering budget variance', completed: false }
    ],
    attachments: [{ name: 'Q1_Roadmap_Deck.pdf', url: '#', size: '3.1 MB' }],
    createdAt: '2026-11-10'
  },
  {
    id: 'tsk-105',
    title: 'Redesign Homepage Banner & Promotional Cards',
    description: 'Craft fresh high-resolution 3D glassmorphic banner illustrations aligned with festive marketing promotions.',
    categoryTag: 'Design',
    status: 'in_progress', // In Progress
    priority: 'medium',
    progressPercent: 65,
    assigneeId: 'fl-01',
    assigneeName: 'Sofia Al-Mansoor',
    assigneeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'freelancer',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    dueDate: '2026-11-19',
    estimatedHours: 14,
    spentHours: 9,
    commentsCount: 10,
    checklist: [
      { id: 'c7', text: 'Create dark & light mode variants', completed: true },
      { id: 'c8', text: 'Export webp optimized 2x assets', completed: false }
    ],
    attachments: [{ name: 'Figma_Banner_v3.fig', url: '#', size: '18.2 MB' }],
    createdAt: '2026-11-11'
  },
  {
    id: 'tsk-106',
    title: 'UX Review & Bug Prioritization (Checkout)',
    description: 'Inspect Razorpay webhook response timing and handle retry states for failed UPI transaction callbacks.',
    categoryTag: 'Development',
    status: 'qa_ready', // Review
    priority: 'high',
    progressPercent: 85,
    assigneeId: 'emp-05',
    assigneeName: 'Marcus Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'employee',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    dueDate: '2026-11-17',
    estimatedHours: 20,
    spentHours: 17,
    commentsCount: 10,
    submissionUrl: 'https://github.com/digiworku/nordic-retail/pull/42',
    submissionNotes: 'All unit tests passing. Webhook signature verification implemented.',
    submittedAt: '2026-11-14 05:30 PM',
    qcReviewStatus: 'pending',
    checklist: [
      { id: 'c9', text: 'Implement HMAC-SHA256 signature verification', completed: true },
      { id: 'c10', text: 'Simulate timeout and network drops in staging', completed: true }
    ],
    attachments: [],
    createdAt: '2026-11-09'
  },
  {
    id: 'tsk-107',
    title: 'Write Quarterly Financial Audit & Tax Filings',
    description: 'Consolidate GST-1, GST-3B filings, client TDS certificates and vendor payout receipts for Q3 audit.',
    categoryTag: 'Reporting',
    status: 'qa_ready', // Review
    priority: 'high',
    progressPercent: 85,
    assigneeId: 'emp-07',
    assigneeName: 'Neha Patel',
    assigneeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'employee',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    dueDate: '2026-11-18',
    estimatedHours: 18,
    spentHours: 15,
    commentsCount: 10,
    checklist: [
      { id: 'c11', text: 'Reconcile bank statements against Razorpay payouts', completed: true },
      { id: 'c12', text: 'Verify freelancer TDS deductions at 10%', completed: true }
    ],
    attachments: [{ name: 'Q3_Tax_Reconciliation.xlsx', url: '#', size: '2.5 MB' }],
    createdAt: '2026-11-10'
  },
  {
    id: 'tsk-108',
    title: 'Team Standup & Sprint Planning Session',
    description: 'Weekly engineering standup, deliverable demo, blocker resolution and cross-functional sync.',
    categoryTag: 'Management',
    status: 'done', // Completed
    priority: 'low',
    progressPercent: 100,
    assigneeId: 'emp-04',
    assigneeName: 'David Thorne',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'employee',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    dueDate: '2026-11-14',
    estimatedHours: 4,
    spentHours: 4,
    commentsCount: 9,
    checklist: [
      { id: 'c13', text: 'Record sprint velocity metrics', completed: true },
      { id: 'c14', text: 'Publish meeting recording and summary notes', completed: true }
    ],
    attachments: [],
    createdAt: '2026-11-08'
  },
  {
    id: 'tsk-109',
    title: 'Finalize Product Pricing & Quotation Matrix',
    description: 'Update the official 13-service DigiWorku catalogue quotation tiers, margin targets and recurring discount policies.',
    categoryTag: 'Finance',
    status: 'done', // Completed
    priority: 'medium',
    progressPercent: 100,
    assigneeId: 'emp-01',
    assigneeName: 'Vir Kanwlia',
    assigneeAvatar: '/founder-vir.jpg',
    assigneeType: 'employee',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    dueDate: '2026-11-13',
    estimatedHours: 8,
    spentHours: 7.5,
    commentsCount: 10,
    checklist: [
      { id: 'c15', text: 'Calculate gross margins across all 13 services', completed: true },
      { id: 'c16', text: 'Approve new client quote template in CRM', completed: true }
    ],
    attachments: [{ name: 'DigiWorku_Service_Catalogue_v3.pdf', url: '#', size: '1.9 MB' }],
    createdAt: '2026-11-06'
  },
  {
    id: 'tsk-110',
    title: 'Update Sales Pitch Presentation & Case Studies',
    description: 'Incorporate recent case studies, client testimonial videos and verified ROI statistics for enterprise outreach.',
    categoryTag: 'Sales',
    status: 'done', // Completed
    priority: 'low',
    progressPercent: 100,
    assigneeId: 'emp-03',
    assigneeName: 'Priya Sharma',
    assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    assigneeType: 'employee',
    projectId: 'proj-03',
    projectName: 'CyberDefense Threat Monitor',
    dueDate: '2026-11-12',
    estimatedHours: 10,
    spentHours: 9.5,
    commentsCount: 5,
    checklist: [
      { id: 'c17', text: 'Review client logos & non-disclosure permissions', completed: true },
      { id: 'c18', text: 'Export high-res PDF and interactive web presentation', completed: true }
    ],
    attachments: [{ name: 'DigiWorku_Enterprise_Deck_2026.pdf', url: '#', size: '12.4 MB' }],
    createdAt: '2026-11-05'
  }
];

// ==============================================================================
// 5. CRM, LEADS & PROPOSALS
// ==============================================================================
export const INITIAL_CLIENTS: ClientLead[] = [
  {
    id: 'cli-01',
    companyName: 'Apex Financial Technologies Ltd.',
    industry: 'Fintech & Wealth Management',
    contactPerson: 'Harrison Thorne',
    email: 'harrison.t@apexfinancial.co.uk',
    phone: '+91 98111 00223',
    website: 'https://apexfinancial.co.uk',
    status: 'active_client', // Won
    contractValue: 1850000,   // ₹18,50,000 INR
    healthScore: 94,
    notes: 'Enterprise account. Signed 6-month contract for Banking OS development & technical SEO retainer. Payment terms: 50% advance, 25% MS2, 25% on final QA delivery.',
    leadSource: 'Referral',
    requirementSummary: 'Secure, modern full-stack financial dashboard with biometric login, real-time transaction webhooks, and institutional investor portal.',
    serviceCategory: 'website_development',
    lastContactDate: '2026-11-14',
    convertedProjectId: 'proj-01',
    activityHistory: [
      { date: '2026-11-14', note: 'Reviewed Milestone 2 sprint velocity; client delighted with speed and dark/light UI toggle.', author: 'Vir Kanwlia' },
      { date: '2026-10-28', note: 'Milestone 1 invoice of ₹6,50,000 cleared via NEFT/RTGS.', author: 'Neha Patel' }
    ]
  },
  {
    id: 'cli-02',
    companyName: 'Nordic Living Omni Retail Group',
    industry: 'E-Commerce & Fashion Retail',
    contactPerson: 'Freja Lindqvist',
    email: 'freja@nordicliving.se',
    phone: '+91 98222 11334',
    website: 'https://nordicliving.se',
    status: 'active_client', // Won
    contractValue: 1200000,   // ₹12,00,000 INR
    healthScore: 82,
    notes: 'Black Friday launch deadline. High urgency on Razorpay multi-currency checkout & abandoned cart workflows.',
    leadSource: 'Website Inquiry',
    requirementSummary: 'Shopify Plus headless storefront with sub-second page loads, automated inventory sync and custom festive design banners.',
    serviceCategory: 'ecommerce_development',
    lastContactDate: '2026-11-15',
    convertedProjectId: 'proj-02',
    activityHistory: [
      { date: '2026-11-15', note: 'Emergency staging preview delivered on time; mobile checkout QA ongoing.', author: 'Rohit Verma' }
    ]
  },
  {
    id: 'cli-03',
    companyName: 'CyberShield Quantum Systems',
    industry: 'Cybersecurity & Defense Tech',
    contactPerson: 'Jonathan Vance',
    email: 'j.vance@cybershieldquantum.io',
    phone: '+91 98333 22445',
    website: 'https://cybershieldquantum.io',
    status: 'proposal_sent',
    contractValue: 2400000,   // ₹24,00,000 INR
    healthScore: 88,
    notes: 'Comprehensive SOC incident management dashboard RFP submitted. Formal decision expected next week.',
    leadSource: 'LinkedIn',
    requirementSummary: 'High-throughput real-time telemetry dashboard with WebSocket streaming, TimescaleDB analytics and automated incident ticketing.',
    serviceCategory: 'ai_automation',
    lastContactDate: '2026-11-12',
    activityHistory: [
      { date: '2026-11-12', note: 'Comprehensive quotation (₹24,00,000) with 3-phase milestone breakdown sent to procurement board.', author: 'Priya Sharma' }
    ]
  },
  {
    id: 'cli-04',
    companyName: 'AeroDynamics Logistics Corp.',
    industry: 'Aviation Logistics & Supply Chain',
    contactPerson: 'Marcus Brody',
    email: 'm.brody@aerodynamics.aero',
    phone: '+91 98444 33556',
    website: 'https://aerodynamics.aero',
    status: 'lead',
    contractValue: 950000,    // ₹9,50,000 INR
    healthScore: 90,
    notes: 'Inbound inquiry from DigiWorku website landing page. Requires fleet tracker mobile application for ground dispatchers.',
    leadSource: 'Website Inquiry',
    requirementSummary: 'Cross-platform mobile app (iOS/Android) with offline GPS caching, geofencing triggers and driver push notifications.',
    serviceCategory: 'mobile_apps',
    lastContactDate: '2026-11-14',
    activityHistory: [
      { date: '2026-11-14', note: 'Initial discovery call scheduled for Nov 18 at 02:30 PM IST.', author: 'Priya Sharma' }
    ]
  }
];

export const INITIAL_QUOTES: ClientQuote[] = [
  {
    id: 'qt-2026-01',
    quoteNumber: 'DW-QT-2026-081',
    clientId: 'cli-03',
    clientName: 'CyberShield Quantum Systems',
    clientEmail: 'j.vance@cybershieldquantum.io',
    issueDate: '2026-11-12',
    validUntil: '2026-12-12',
    serviceCategory: 'ai_automation',
    items: [
      { id: 'qi-1', description: 'Real-time Telemetry Dashboard Architecture & WebSocket Streaming Engine', quantity: 1, rate: 950000, amount: 950000 },
      { id: 'qi-2', description: 'High-Density Security Incident UI & Interactive Node Topology Graphs', quantity: 1, rate: 650000, amount: 650000 },
      { id: 'qi-3', description: 'Automated AI Threat Remediation Agent & Alert Webhook Pipeline', quantity: 1, rate: 450000, amount: 450000 },
      { id: 'qi-4', description: 'Security Hardening, Penetration Testing & SLA Deployment Support', quantity: 1, rate: 350000, amount: 350000 }
    ],
    subtotal: 2400000,
    taxRate: 18,
    taxAmount: 432000,
    total: 2832000,
    terms: 'Payment Schedule: 35% on Project Kickoff, 35% on Staging Verification, 30% on Final Quality Acceptance. Standard DigiWorku 90-day bug warranty included.',
    status: 'sent'
  }
];

// ==============================================================================
// 6. PROJECTS & MILESTONES (Central Operations Engine)
// ==============================================================================
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    name: 'Fintech Banking OS 2.0',
    code: 'FB-2026',
    clientId: 'cli-01',
    clientName: 'Apex Financial Technologies Ltd.',
    serviceCategory: 'website_development',
    managerId: 'emp-04',
    managerName: 'David Thorne',
    designLeadName: 'Fernando Agaro',
    designLeadAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    teamAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    ],
    status: 'active', // In Progress
    startDate: '2026-10-01',
    endDate: '2026-12-25',
    budget: 1850000,        // ₹18,50,000 revenue
    estimatedCost: 820000,  // ₹8,20,000 budgeted cost
    spent: 485000,          // ₹4,85,000 actual costs incurred
    currency: 'INR',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js', 'PostgreSQL'],
    progress: 74,
    riskFactor: 'low',
    daysDelayed: 0,
    assignedEmployees: ['emp-04', 'emp-05', 'emp-06'],
    assignedFreelancers: ['fl-01'],
    deliverablesList: [
      'Responsive Executive Financial Dashboard',
      'Multi-tenant KYC & Biometric Authentication',
      'Real-time Transaction Feed & Webhook Dispatcher',
      'Automated PDF Statement Generator'
    ],
    deliveryAuthorized: false,
    repoUrl: 'https://github.com/digiworku/apex-financial-os',
    stagingUrl: 'https://apex.staging.digiworku.in',
    milestones: [
      { id: 'ms-01', projectId: 'proj-01', title: 'UX Architecture & Security Protocol Sign-off', orderIndex: 1, dueDate: '2026-10-25', status: 'approved_by_client', amount: 650000, qcApproved: true },
      { id: 'ms-02', projectId: 'proj-01', title: 'Core Banking Ledger & Transaction Ingestion Engine', orderIndex: 2, dueDate: '2026-11-20', status: 'in_progress', amount: 650000, deliverableUrl: 'https://apex.staging.digiworku.in/ledger' },
      { id: 'ms-03', projectId: 'proj-01', title: 'Institutional Investor Portal & Automated Audit Trail', orderIndex: 3, dueDate: '2026-12-20', status: 'pending', amount: 550000 }
    ]
  },
  {
    id: 'proj-02',
    name: 'Nordic Retail Omnichannel',
    code: 'NR-2026',
    clientId: 'cli-02',
    clientName: 'Nordic Living Omni Retail Group',
    serviceCategory: 'ecommerce_development',
    managerId: 'emp-02',
    managerName: 'Rohit Verma',
    designLeadName: 'Sofia Al-Mansoor',
    designLeadAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    teamAvatars: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    ],
    status: 'delayed', // Delayed by 2 days
    startDate: '2026-10-15',
    endDate: '2026-11-28',
    budget: 1200000,
    estimatedCost: 550000,
    spent: 390000,
    currency: 'INR',
    techStack: ['Shopify Plus', 'React', 'Tailwind CSS', 'Razorpay', 'Shiprocket'],
    progress: 82,
    riskFactor: 'moderate',
    daysDelayed: 2,
    assignedEmployees: ['emp-02', 'emp-05'],
    assignedFreelancers: ['fl-01', 'fl-02'],
    deliverablesList: [
      'Headless Storefront UI & Sub-2s Checkout Flow',
      'Automated Razorpay Multi-currency Gateway',
      'Shiprocket Courier Tracking Webhook Sync'
    ],
    deliveryAuthorized: false,
    repoUrl: 'https://github.com/digiworku/nordic-retail-app',
    stagingUrl: 'https://nordic.staging.digiworku.in',
    milestones: [
      { id: 'ms-10', projectId: 'proj-02', title: 'Product Catalog & Dynamic Collection Filtering', orderIndex: 1, dueDate: '2026-10-30', status: 'approved_by_client', amount: 450000, qcApproved: true },
      { id: 'ms-11', projectId: 'proj-02', title: 'Checkout & Multi-Currency Payment Gateway', orderIndex: 2, dueDate: '2026-11-18', status: 'under_qc', amount: 450000, deliverableUrl: 'https://nordic.staging.digiworku.in/checkout' },
      { id: 'ms-12', projectId: 'proj-02', title: 'Black Friday Scalability Testing & Go-Live', orderIndex: 3, dueDate: '2026-11-28', status: 'pending', amount: 300000 }
    ]
  },
  {
    id: 'proj-03',
    name: 'CyberDefense Threat Monitor',
    code: 'CYB-2026',
    clientId: 'cli-03',
    clientName: 'CyberShield Quantum Systems',
    serviceCategory: 'ai_automation',
    managerId: 'emp-01',
    managerName: 'Vir Kanwlia',
    designLeadName: 'Fernando Agaro',
    designLeadAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    teamAvatars: [
      '/founder-vir.jpg',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80'
    ],
    status: 'planning',
    startDate: '2026-12-01',
    endDate: '2027-03-30',
    budget: 2400000,
    estimatedCost: 1100000,
    spent: 85000,
    currency: 'INR',
    techStack: ['Next.js', 'WebSockets', 'Python', 'TimescaleDB', 'Docker'],
    progress: 18,
    riskFactor: 'low',
    daysDelayed: 0,
    assignedEmployees: ['emp-01', 'emp-05'],
    assignedFreelancers: ['fl-03'],
    deliverablesList: [
      'Real-time Threat Telemetry Ingestion Hub',
      'AI Automated Quarantine Pipeline',
      'Compliance Audit Export Center'
    ],
    deliveryAuthorized: false,
    milestones: [
      { id: 'ms-20', projectId: 'proj-03', title: 'Figma Interactive Mockups & Threat Vector UI', orderIndex: 1, dueDate: '2026-12-15', status: 'in_progress', amount: 750000 },
      { id: 'ms-21', projectId: 'proj-03', title: 'Telemetry Engine & Ingestion Pipeline', orderIndex: 2, dueDate: '2027-01-30', status: 'pending', amount: 950000 },
      { id: 'ms-22', projectId: 'proj-03', title: 'AI Automated Incident Quarantine Engine', orderIndex: 3, dueDate: '2027-03-15', status: 'pending', amount: 700000 }
    ]
  }
];

// ==============================================================================
// 7. FREELANCER NETWORK
// ==============================================================================
export const INITIAL_FREELANCERS: Freelancer[] = [
  {
    id: 'fl-01',
    fullName: 'Sofia Al-Mansoor',
    email: 'sofia.designs@freelancer.digiworku.in',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    skillDomain: 'Product Design & Design Systems',
    skills: ['Figma', 'UI Animation', 'Design Tokens', 'Tailwind CSS', 'Accessible Design'],
    hourlyRate: 1800, // ₹1,800 / hr
    currency: 'INR',
    rating: 4.98,
    reviewsCount: 38,
    portfolioUrl: 'https://dribbble.com/sofia-designs',
    totalEarned: 425000, // ₹4,25,000 INR
    activeProjectsCount: 2,
    status: 'available',
    kycVerified: true,
    phone: '+91 99111 88223',
    assignedTasks: ['tsk-105'],
    contractHistory: [
      { projectName: 'Fintech Banking OS 2.0', amount: 140000, completedDate: '2026-10-20' },
      { projectName: 'Nordic Retail Omnichannel', amount: 95000, completedDate: '2026-09-28' }
    ]
  },
  {
    id: 'fl-02',
    fullName: 'Tariq Al-Fassi',
    email: 'tariq.dev@freelancer.digiworku.in',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    skillDomain: 'Mobile Engineering (Android/iOS)',
    skills: ['React Native', 'Capacitor', 'Kotlin', 'Swift', 'App Store Deployments'],
    hourlyRate: 2200,
    currency: 'INR',
    rating: 4.92,
    reviewsCount: 29,
    portfolioUrl: 'https://github.com/tariq-mobile-lab',
    totalEarned: 580000,
    activeProjectsCount: 1,
    status: 'busy',
    kycVerified: true,
    phone: '+91 99222 77334',
    assignedTasks: [],
    contractHistory: [
      { projectName: 'Nordic Retail Omnichannel', amount: 180000, completedDate: '2026-10-30' }
    ]
  },
  {
    id: 'fl-03',
    fullName: 'Yuki Tanaka',
    email: 'yuki.tanaka@freelancer.digiworku.in',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    skillDomain: 'DevOps & Site Reliability',
    skills: ['Kubernetes', 'Terraform', 'Postgres Tuning', 'Grafana', 'Docker'],
    hourlyRate: 2500,
    currency: 'INR',
    rating: 5.0,
    reviewsCount: 21,
    portfolioUrl: 'https://linkedin.com/in/yuki-sre',
    totalEarned: 360000,
    activeProjectsCount: 1,
    status: 'available',
    kycVerified: true,
    phone: '+91 99333 66445',
    assignedTasks: [],
    contractHistory: [
      { projectName: 'CyberDefense Threat Monitor', amount: 120000, completedDate: '2026-08-15' }
    ]
  }
];

export const INITIAL_FREELANCER_PAYOUTS: FreelancerPayout[] = [
  {
    id: 'payout-101',
    freelancerId: 'fl-01',
    freelancerName: 'Sofia Al-Mansoor',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    taskTitle: 'Design Token System & High-Fi Figma Prototype',
    amount: 140000, // ₹1,40,000 INR
    status: 'paid',
    dueOn: '2026-10-25',
    paidAt: '2026-10-26',
    paymentReference: 'UPI-REF-981203819'
  },
  {
    id: 'payout-102',
    freelancerId: 'fl-02',
    freelancerName: 'Tariq Al-Fassi',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    taskTitle: 'Mobile Native Push & Razorpay Checkout Integration',
    amount: 180000,
    status: 'eligible',
    dueOn: '2026-11-20'
  },
  {
    id: 'payout-103',
    freelancerId: 'fl-01',
    freelancerName: 'Sofia Al-Mansoor',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    taskTitle: 'Redesign Homepage Banner & Promotional Cards',
    amount: 45000,
    status: 'pending_approval',
    dueOn: '2026-11-25'
  }
];

// ==============================================================================
// 8. FINANCE, INVOICES & EXPENSES
// ==============================================================================
export const INITIAL_EXPENSES: BusinessExpense[] = [
  { id: 'exp-01', category: 'Software & Tools', description: 'GitHub Enterprise, Figma Org & Linear licenses', amount: 45000, date: '2026-11-02', loggedBy: 'Vir Kanwlia', status: 'approved' },
  { id: 'exp-02', category: 'Infrastructure & Hosting', description: 'AWS Cloud EC2 instances & Supabase Pro Tier', amount: 38500, date: '2026-11-04', loggedBy: 'Rohit Verma', status: 'approved' },
  { id: 'exp-03', category: 'Marketing', description: 'Google Ads & LinkedIn Sponsored Sponsored Inbound campaigns', amount: 65000, date: '2026-11-08', loggedBy: 'Priya Sharma', status: 'approved' },
  { id: 'exp-04', category: 'Freelancer Payout', description: 'Milestone 1 design deliverables for Sofia Al-Mansoor', amount: 140000, date: '2026-10-26', projectId: 'proj-01', projectName: 'Fintech Banking OS 2.0', loggedBy: 'Neha Patel', status: 'approved' }
];

export const INITIAL_PAYROLL: PayrollRecord[] = [
  {
    id: 'pay-2026-11-01',
    employeeId: 'emp-01',
    employeeName: 'Vir Kanwlia',
    role: 'Founder & Managing Director',
    department: 'Executive',
    baseSalary: 250000,
    bonus: 0,
    deductions: 25000,
    netSalary: 225000,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'HDFC Corporate Direct Transfer',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-02',
    employeeId: 'emp-02',
    employeeName: 'Rohit Verma',
    role: 'Head of Operations',
    department: 'Operations & Delivery',
    baseSalary: 120000,
    bonus: 10000,
    deductions: 12000,
    netSalary: 118000,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'ICICI Bank Salary Transfer',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-03',
    employeeId: 'emp-03',
    employeeName: 'Priya Sharma',
    role: 'Enterprise Client Director',
    department: 'Revenue & Growth',
    baseSalary: 110000,
    bonus: 15000,
    deductions: 11000,
    netSalary: 114000,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'Axis Bank Salary Transfer',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-04',
    employeeId: 'emp-04',
    employeeName: 'David Thorne',
    role: 'Senior Project Manager',
    department: 'Project Delivery',
    baseSalary: 95000,
    bonus: 5000,
    deductions: 9500,
    netSalary: 90500,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'HDFC Bank Salary Transfer',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-05',
    employeeId: 'emp-05',
    employeeName: 'Marcus Chen',
    role: 'Senior Full Stack Engineer',
    department: 'Engineering',
    baseSalary: 85000,
    bonus: 8000,
    deductions: 8500,
    netSalary: 84500,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'SBI Salary Account Transfer',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-06',
    employeeId: 'emp-06',
    employeeName: 'Aria Montgomery',
    role: 'Quality Control Lead',
    department: 'Quality Assurance',
    baseSalary: 88000,
    bonus: 6000,
    deductions: 8800,
    netSalary: 85200,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'ICICI Bank Salary Transfer',
    processedDate: '2026-11-01'
  },
  {
    id: 'pay-2026-11-07',
    employeeId: 'emp-07',
    employeeName: 'Neha Patel',
    role: 'Chief Financial Officer (CFO)',
    department: 'Finance & Accounts',
    baseSalary: 130000,
    bonus: 10000,
    deductions: 13000,
    netSalary: 127000,
    status: 'paid',
    payPeriod: 'November 2026',
    paymentMethod: 'HDFC Corporate Direct Transfer',
    processedDate: '2026-11-01'
  }
];

export const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: 'inv-8801',
    invoiceNumber: 'DW-INV-2026-0881',
    clientId: 'cli-01',
    clientName: 'Apex Financial Technologies Ltd.',
    clientEmail: 'harrison.t@apexfinancial.co.uk',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    issueDate: '2026-10-15',
    dueDate: '2026-11-15',
    subtotal: 650000,
    taxAmount: 117000,
    totalAmount: 767000,
    amountPaid: 767000, // Fully Paid
    status: 'paid',
    payments: [
      { id: 'p-1', invoiceId: 'inv-8801', amount: 767000, paidAt: '2026-10-28', paymentMethod: 'NEFT/IMPS', transactionReference: 'HDFC-RTGS-982104928', notes: 'Advance Milestone 1 full settlement' }
    ]
  },
  {
    id: 'inv-8802',
    invoiceNumber: 'DW-INV-2026-0882',
    clientId: 'cli-02',
    clientName: 'Nordic Living Omni Retail Group',
    clientEmail: 'freja@nordicliving.se',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    issueDate: '2026-11-01',
    dueDate: '2026-11-20',
    subtotal: 450000,
    taxAmount: 81000,
    totalAmount: 531000,
    amountPaid: 250000, // Partial Payment
    status: 'partially_paid',
    payments: [
      { id: 'p-2', invoiceId: 'inv-8802', amount: 250000, paidAt: '2026-11-05', paymentMethod: 'Bank Transfer', transactionReference: 'SEB-SWIFT-33109281', notes: 'First installment of 50%' }
    ]
  },
  {
    id: 'inv-8803',
    invoiceNumber: 'DW-INV-2026-0883',
    clientId: 'cli-01',
    clientName: 'Apex Financial Technologies Ltd.',
    clientEmail: 'harrison.t@apexfinancial.co.uk',
    projectId: 'proj-01',
    projectName: 'Fintech Banking OS 2.0',
    issueDate: '2026-11-10',
    dueDate: '2026-12-10',
    subtotal: 650000,
    taxAmount: 117000,
    totalAmount: 767000,
    amountPaid: 0,
    status: 'sent',
    payments: []
  }
];

export const INITIAL_FINANCE_SUMMARY: FinancialSummary = {
  totalRevenueYTD: 14250000,       // ₹1.42 Cr YTD
  monthlyRevenue: 1845000,          // ₹18.45 Lakh this month
  collectedRevenue: 1017000,        // ₹10.17 Lakh collected
  outstandingRevenue: 828000,       // ₹8.28 Lakh outstanding
  totalExpenses: 785000,            // ₹7.85 Lakh total expenses
  freelancerCommitments: 225000,    // ₹2.25 Lakh freelancer payables
  netProfit: 1060000,               // ₹10.60 Lakh net profit
  profitMarginPercent: 57.4,
  pendingInvoicesAmount: 1298000,
  upcomingPayrollAmount: 844700,
  monthlyTrend: [
    { month: 'Jun', revenue: 1150000, expenses: 580000, profit: 570000 },
    { month: 'Jul', revenue: 1280000, expenses: 610000, profit: 670000 },
    { month: 'Aug', revenue: 1420000, expenses: 660000, profit: 760000 },
    { month: 'Sep', revenue: 1560000, expenses: 710000, profit: 850000 },
    { month: 'Oct', revenue: 1720000, expenses: 740000, profit: 980000 },
    { month: 'Nov', revenue: 1845000, expenses: 785000, profit: 1060000 }
  ]
};

// ==============================================================================
// 9. CHAT & INTERNAL DISCUSSIONS
// ==============================================================================
export const INITIAL_CHANNELS: ChatChannel[] = [
  { id: 'announcements', name: 'announcements', description: 'Company-wide notices, executive releases, and milestones', isDirectMessage: false, unreadCount: 1 },
  { id: 'qc-alerts', name: 'qc-alerts', description: 'Real-time automated alerts from the Quality Control Engine', isDirectMessage: false, unreadCount: 2 },
  { id: 'dev-team', name: 'dev-team', description: 'Engineering, architecture, pull requests, and staging deployments', isDirectMessage: false, unreadCount: 0 },
  { id: 'general', name: 'general', description: 'Day-to-day team sync, coffee breaks, and company culture', isDirectMessage: false, unreadCount: 0 },
  { id: 'dm-vir', name: 'Vir Kanwlia (Founder)', description: 'Direct message channel with Vir Kanwlia', isDirectMessage: true, unreadCount: 0 }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-01',
    channelId: 'announcements',
    senderId: 'emp-01',
    senderName: 'Vir Kanwlia',
    senderRole: 'super_admin',
    senderAvatar: '/founder-vir.jpg',
    message: '🚀 DigiWorku Commander OS is officially live. All 14 operational modules connect our clients, service catalogue, employee and freelancer workforce into a seamless, high-velocity delivery machine.',
    timestamp: '09:00 AM',
    reactions: { '🎉': ['Rohit Verma', 'Priya Sharma', 'David Thorne'], '🔥': ['Marcus Chen', 'Aria Montgomery'] }
  },
  {
    id: 'msg-02',
    channelId: 'qc-alerts',
    senderId: 'emp-06',
    senderName: 'Aria Montgomery',
    senderRole: 'qa_manager',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    message: '⚠️ QC Audit Notice: Milestone 2 for Nordic Retail passed 92/100 points. 2 minor styling discrepancies flagged on mobile viewport width < 375px. Review sandbox link attached.',
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
    message: 'Pushed the Razorpay webhook verification and multi-currency calculation to branch `feature/nordic-checkout`. RLS integration tests are passing 100%. Ready for QA review!',
    timestamp: '11:45 AM',
    reactions: { '👏': ['David Thorne', 'Aria Montgomery'] }
  }
];

// ==============================================================================
// 10. QUALITY CONTROL (QC) REVIEWS
// ==============================================================================
export const INITIAL_QC_CHECKLIST: QCReview['checklistItems'] = [
  { id: 'qc-c1', category: 'code_quality', title: 'TypeScript Compilation & Zero Any Types', description: 'Zero compilation warnings, strict null checks enabled, all interfaces typed', weight: 10, passed: true },
  { id: 'qc-c2', category: 'code_quality', title: 'Modular Architecture & Separation of Concerns', description: 'Business logic isolated in hooks/context; components pure and maintainable', weight: 10, passed: true },
  { id: 'qc-c3', category: 'code_quality', title: 'Error Boundary & Graceful Fallbacks', description: 'Components fail gracefully without unhandled crashes or blank screens', weight: 10, passed: true },
  { id: 'qc-u1', category: 'ui_ux', title: 'DigiWorku Brand Consistency & Dark/Light Harmony', description: 'DigiWorku palette strictly honored (#f8fafc bg, #ffffff cards, #00c853 emerald)', weight: 10, passed: true },
  { id: 'qc-u2', category: 'ui_ux', title: 'Fluid Responsiveness (360px to 4K)', description: 'No horizontal overflow, touch-friendly tap targets >= 44px on mobile', weight: 10, passed: true },
  { id: 'qc-u3', category: 'ui_ux', title: 'Micro-interactions & State Feedback', description: 'Hover states, loading skeletons, active button presses and tooltips intuitive', weight: 10, passed: true },
  { id: 'qc-p1', category: 'performance_seo', title: 'Sub-100ms Interaction Latency', description: 'Fast render loops, memoized callbacks, zero perceptible lag on tab changes', weight: 10, passed: true },
  { id: 'qc-p2', category: 'performance_seo', title: 'Asset & Bundle Optimization', description: 'Modern ESM bundling, tree-shaken icons, optimized SVG and typography assets', weight: 10, passed: true },
  { id: 'qc-s1', category: 'security', title: 'Row Level Security (RLS) & RBAC Guardrails', description: 'Salaries, client financials and KYC documents strictly blocked from unauthorized staff', weight: 10, passed: true },
  { id: 'qc-s2', category: 'client_spec', title: 'Acceptance Criteria & Scope Compliance', description: 'All agreed milestone deliverables present, functional, and verified against PRD', weight: 10, passed: true }
];

export const INITIAL_QC_REVIEWS: QCReview[] = [
  {
    id: 'qc-rev-01',
    projectId: 'proj-02',
    projectName: 'Nordic Retail Omnichannel',
    milestoneTitle: 'Checkout & Multi-Currency Gateway',
    taskId: 'tsk-106',
    deliverablePreviewUrl: 'https://nordic.staging.digiworku.in/checkout',
    submittedBy: 'emp-05',
    submittedByName: 'Marcus Chen',
    reviewerId: 'emp-06',
    reviewerName: 'Aria Montgomery',
    overallScore: 92,
    decision: 'pending',
    comments: 'Strong implementation overall. Razorpay HMAC signature checks are airtight. Minor spacing adjustment needed on mobile checkout modal button.',
    revisionCount: 1,
    checklistItems: INITIAL_QC_CHECKLIST,
    deliveryAuthorized: false,
    submittedAt: '2026-11-14 09:30 AM'
  }
];

// ==============================================================================
// 11. PERFORMANCE & ANALYTICS
// ==============================================================================
export const INITIAL_PERFORMANCE: PerformanceMetrics = {
  sprintVelocity: [
    { sprint: 'Sprint 40', committed: 45, completed: 42 },
    { sprint: 'Sprint 41', committed: 50, completed: 49 },
    { sprint: 'Sprint 42', committed: 52, completed: 51 },
    { sprint: 'Sprint 43', committed: 55, completed: 53 },
    { sprint: 'Sprint 44 (Current)', committed: 60, completed: 55 }
  ],
  slaDeliveryRate: 97.2,
  overallQualityScore: 95.4,
  activeWorkforce: 10,
  departmentRankings: [
    { department: 'Engineering', onTimeRate: 98.5, tasksCompleted: 148, satisfactionScore: 4.9 },
    { department: 'Quality Assurance', onTimeRate: 99.2, tasksCompleted: 92, satisfactionScore: 4.95 },
    { department: 'Design & Creative', onTimeRate: 96.0, tasksCompleted: 68, satisfactionScore: 4.85 },
    { department: 'Revenue / Growth', onTimeRate: 94.2, tasksCompleted: 58, satisfactionScore: 4.75 }
  ],
  topPerformers: [
    { id: 'emp-05', name: 'Marcus Chen', role: 'Sr. Full Stack Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', tasksDone: 28, accuracyPercent: 99.4, badge: 'Sprint MVP' },
    { id: 'emp-06', name: 'Aria Montgomery', role: 'Chief QC Lead', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', tasksDone: 34, accuracyPercent: 99.1, badge: 'Zero Defect Guardian' },
    { id: 'fl-01', name: 'Sofia Al-Mansoor', role: 'Design Specialist', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', tasksDone: 22, accuracyPercent: 98.2, badge: 'Pixel Perfection' }
  ]
};

// ==============================================================================
// 12. NOTIFICATIONS & AUDIT LOGS
// ==============================================================================
export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-01',
    title: 'Milestone Review Pending',
    message: 'Marcus Chen submitted Checkout & Gateway deliverable for Nordic Retail project.',
    type: 'qc' as const,
    read: false,
    createdAt: '2026-11-15 09:35 AM',
    linkModule: 'qc' as const
  },
  {
    id: 'notif-02',
    title: 'Leave Request Received',
    message: 'Marcus Chen requested 4 days Annual Leave starting Nov 24.',
    type: 'leave' as const,
    read: false,
    createdAt: '2026-11-15 09:15 AM',
    linkModule: 'attendance' as const
  },
  {
    id: 'notif-03',
    title: 'Delayed Project Alert',
    message: 'Nordic Retail Omnichannel flagged 2 days delayed on SLA radar.',
    type: 'system' as const,
    read: false,
    createdAt: '2026-11-15 08:50 AM',
    linkModule: 'projects' as const
  },
  {
    id: 'notif-04',
    title: 'Invoice Payment Received',
    message: 'Apex Financial Technologies cleared Milestone 1 Invoice (₹7,67,000).',
    type: 'finance' as const,
    read: true,
    createdAt: '2026-11-14 04:20 PM',
    linkModule: 'finance' as const
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud-01',
    timestamp: '2026-11-15 09:40:12',
    actorId: 'emp-01',
    actorName: 'Vir Kanwlia',
    actorRole: 'super_admin' as const,
    action: 'QC Checklist Inspection',
    module: 'qc' as const,
    details: 'Verified RLS security guardrails and responsive UI compliance for Sprint 44.',
    status: 'success' as const
  },
  {
    id: 'aud-02',
    timestamp: '2026-11-15 09:12:05',
    actorId: 'emp-02',
    actorName: 'Rohit Verma',
    actorRole: 'operations_manager' as const,
    action: 'Leave Review Approval',
    module: 'attendance' as const,
    details: 'Approved 1 day casual leave for Priya Sharma.',
    status: 'success' as const
  },
  {
    id: 'aud-03',
    timestamp: '2026-11-15 08:45:00',
    actorId: 'emp-01',
    actorName: 'Vir Kanwlia',
    actorRole: 'super_admin' as const,
    action: 'Executive Shift Check-In',
    module: 'attendance' as const,
    details: 'Logged on-duty operator shift timestamp 08:45 AM.',
    status: 'success' as const
  }
];

// ==============================================================================
// 13. COMPANY SETTINGS
// ==============================================================================
export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
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
