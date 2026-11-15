import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Supabase Client Connection
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rjxbdjgagizjmjwnlbxx.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_v-Wt6Skez4RmaQOUq-faCA_zHG-H8Au';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Persistent Local Database Store for Resilient Offline / Server Operation
const DB_FILE = path.join(__dirname, 'db.json');

const loadDb = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }
  return {
    inquiries: [],
    leads: [],
    clients: [],
    projects: [],
    tasks: [],
    qcReviews: [],
    invoices: [],
    payouts: [],
    expenses: [],
    employees: [],
    freelancers: [],
    leaves: [],
    attendance: [],
    chatMessages: []
  };
};

const saveDb = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
};

let db = loadDb();

// Seed default initial records if empty
if (db.projects.length === 0) {
  db.projects = [
    {
      id: 'proj_1',
      name: 'Nordic Living E-Commerce & Checkout Suite',
      code: 'DW-PRJ-2026-001',
      clientId: 'c1',
      clientName: 'Nordic Living Europe AB',
      serviceCategory: 'website_development',
      status: 'active',
      startDate: '2026-10-01',
      endDate: '2026-12-15',
      budget: 1850000,
      spent: 920000,
      currency: 'INR',
      deliveryAuthorized: false,
      progress: 68
    },
    {
      id: 'proj_2',
      name: 'Apex Core Banking Mobile App & Security Audit',
      code: 'DW-PRJ-2026-002',
      clientId: 'c2',
      clientName: 'Apex Financial Technologies Ltd.',
      serviceCategory: 'mobile_app_development',
      status: 'active',
      startDate: '2026-09-15',
      endDate: '2026-11-30',
      budget: 2400000,
      spent: 1450000,
      currency: 'INR',
      deliveryAuthorized: false,
      progress: 82
    }
  ];
  saveDb(db);
}

// ==============================================================================
// 1. SYSTEM HEALTH & TELEMETRY
// ==============================================================================
app.get('/api/health', async (req, res) => {
  let supabaseStatus = 'disconnected';
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (!error) supabaseStatus = 'connected';
  } catch (e) {
    supabaseStatus = 'local_fallback_active';
  }

  res.json({
    status: 'online',
    appName: 'DigiWorku Commander Backend Server',
    version: '2.5.0',
    port: PORT,
    supabase: supabaseStatus,
    timestamp: new Date().toISOString(),
    currency: 'INR (₹)'
  });
});

// ==============================================================================
// 2. CLIENT INQUIRIES (From Public Portal Website)
// ==============================================================================
app.get('/api/inquiries', (req, res) => {
  res.json({ success: true, count: db.inquiries.length, inquiries: db.inquiries });
});

app.post('/api/inquiries', async (req, res) => {
  const { name, email, phone, service, budget, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required.' });
  }

  const newInquiry = {
    id: `inq_${Date.now()}`,
    name,
    email,
    phone: phone || '',
    service: service || 'Web Development',
    budget: budget || 'Flexible',
    message: message || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  db.inquiries.unshift(newInquiry);

  // Automatically create a corresponding lead in CRM
  const newLead = {
    id: `lead_${Date.now()}`,
    inquiryId: newInquiry.id,
    companyName: `${name}'s Organization`,
    contactPerson: name,
    email,
    phone: phone || '',
    status: 'new',
    estimatedValue: budget.includes('1,00,000') ? 100000 : 50000,
    currency: 'INR',
    serviceInterest: service || 'Web Development',
    notes: message || 'Inbound requirement received from DigiWorku Public Portal',
    createdAt: new Date().toISOString()
  };
  db.leads.unshift(newLead);

  saveDb(db);

  // Sync to Supabase in background
  try {
    await supabase.from('leads').insert({
      company_name: newLead.companyName,
      contact_person: newLead.contactPerson,
      email: newLead.email,
      phone: newLead.phone,
      source: 'DigiWorku Public Portal',
      status: 'new',
      estimated_deal_value: newLead.estimatedValue
    });
  } catch (err) {
    console.log('Background Supabase lead sync failed, cached locally.');
  }

  res.status(201).json({
    success: true,
    message: 'Inquiry received and lead provisioned in DigiWorku CRM!',
    inquiry: newInquiry
  });
});

// ==============================================================================
// 3. CRM LEADS & CONVERSION
// ==============================================================================
app.get('/api/leads', (req, res) => {
  res.json({ success: true, count: db.leads.length, leads: db.leads });
});

app.post('/api/leads/:id/convert', (req, res) => {
  const { id } = req.params;
  const leadIndex = db.leads.findIndex((l) => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ success: false, error: 'Lead not found' });
  }

  const lead = db.leads[leadIndex];
  lead.status = 'won';

  // Create Client
  const newClient = {
    id: `client_${Date.now()}`,
    companyName: lead.companyName,
    contactPerson: lead.contactPerson,
    email: lead.email,
    phone: lead.phone,
    contractValue: lead.estimatedValue || 150000,
    currency: 'INR',
    status: 'active_client',
    createdAt: new Date().toISOString()
  };
  db.clients.unshift(newClient);

  // Create Initial Project
  const newProject = {
    id: `proj_${Date.now()}`,
    name: `${lead.companyName} — Implementation`,
    code: `DW-PRJ-${new Date().getFullYear()}-${String(db.projects.length + 1).padStart(3, '0')}`,
    clientId: newClient.id,
    clientName: newClient.companyName,
    serviceCategory: 'website_development',
    status: 'planning',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
    budget: lead.estimatedValue || 150000,
    spent: 0,
    currency: 'INR',
    deliveryAuthorized: false,
    progress: 10
  };
  db.projects.unshift(newProject);

  saveDb(db);

  res.json({
    success: true,
    message: `Lead converted! Client "${newClient.companyName}" and Project "${newProject.code}" launched.`,
    client: newClient,
    project: newProject
  });
});

// ==============================================================================
// 4. PROJECTS ENGINE & 12-STAGE LIFECYCLE
// ==============================================================================
app.get('/api/projects', (req, res) => {
  res.json({ success: true, count: db.projects.length, projects: db.projects });
});

app.post('/api/projects', (req, res) => {
  const newProj = {
    id: `proj_${Date.now()}`,
    code: `DW-PRJ-${new Date().getFullYear()}-${String(db.projects.length + 1).padStart(3, '0')}`,
    currency: 'INR',
    deliveryAuthorized: false,
    spent: 0,
    progress: 0,
    status: 'planning',
    ...req.body
  };
  db.projects.unshift(newProj);
  saveDb(db);
  res.status(201).json({ success: true, project: newProj });
});

app.put('/api/projects/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const proj = db.projects.find((p) => p.id === id);
  if (!proj) return res.status(404).json({ success: false, error: 'Project not found' });

  // Delivery Gate check: Cannot mark delivered without QA authorization
  if (status === 'delivered' && !proj.deliveryAuthorized) {
    return res.status(403).json({
      success: false,
      error: 'Delivery Gate Locked: This project cannot be marked delivered until 100-Point Quality Assurance approval is certified.'
    });
  }

  proj.status = status;
  saveDb(db);
  res.json({ success: true, project: proj });
});

// ==============================================================================
// 5. TASKS & WORKFLOW (Fokys Board)
// ==============================================================================
app.get('/api/tasks', (req, res) => {
  res.json({ success: true, count: db.tasks.length, tasks: db.tasks });
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: `task_${Date.now()}`,
    status: 'scheduled',
    progressPercent: 0,
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.tasks.unshift(newTask);
  saveDb(db);
  res.status(201).json({ success: true, task: newTask });
});

app.put('/api/tasks/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = db.tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

  task.status = status;
  saveDb(db);
  res.json({ success: true, task });
});

app.post('/api/tasks/:id/submit', (req, res) => {
  const { id } = req.params;
  const { submissionUrl, notes, submittedBy } = req.body;
  const task = db.tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

  task.status = 'review';
  task.submissionUrl = submissionUrl;
  task.submissionNotes = notes;
  task.qcReviewStatus = 'in_review';

  // Automatically enqueue into QC reviews
  const newReview = {
    id: `qc_${Date.now()}`,
    projectId: task.projectId || 'proj_1',
    projectName: task.projectName || 'Active Sprint',
    milestoneTitle: task.title,
    taskId: task.id,
    submittedBy: submittedBy || 'Contractor',
    submittedByName: submittedBy || 'Contractor',
    overallScore: 92,
    decision: 'pending',
    revisionCount: 0,
    deliveryAuthorized: false,
    deliverablePreviewUrl: submissionUrl,
    comments: notes || '',
    submittedAt: new Date().toISOString().split('T')[0]
  };
  db.qcReviews.unshift(newReview);

  saveDb(db);
  res.json({ success: true, message: 'Deliverable submitted for Quality Audit!', task, qcReview: newReview });
});

// ==============================================================================
// 6. QUALITY CONTROL (QC 100-POINT GATE)
// ==============================================================================
app.get('/api/qc/reviews', (req, res) => {
  res.json({ success: true, count: db.qcReviews.length, qcReviews: db.qcReviews });
});

app.post('/api/qc/reviews/:id/decision', (req, res) => {
  const { id } = req.params;
  const { decision, comments, reviewerName } = req.body;
  const review = db.qcReviews.find((r) => r.id === id);
  if (!review) return res.status(404).json({ success: false, error: 'QC review record not found' });

  review.decision = decision;
  review.comments = comments || review.comments;
  review.reviewerName = reviewerName || 'Priya Sharma (QA Lead)';
  review.reviewedAt = new Date().toISOString();

  if (decision === 'approve') {
    review.deliveryAuthorized = true;
    // Unlock linked project for delivery
    const proj = db.projects.find((p) => p.id === review.projectId);
    if (proj) {
      proj.deliveryAuthorized = true;
      proj.status = 'approved';
    }
  } else if (decision === 'request_revisions') {
    review.revisionCount = (review.revisionCount || 0) + 1;
    review.deliveryAuthorized = false;
    const task = db.tasks.find((t) => t.id === review.taskId);
    if (task) {
      task.qcReviewStatus = 'revision_requested';
      task.status = 'in_progress';
    }
  }

  saveDb(db);
  res.json({ success: true, review });
});

// ==============================================================================
// 7. FINANCE & INR ACCOUNTING (Invoices, Installments, P&L)
// ==============================================================================
app.get('/api/finance/invoices', (req, res) => {
  res.json({ success: true, count: db.invoices.length, invoices: db.invoices });
});

app.post('/api/finance/invoices/:id/pay', (req, res) => {
  const { id } = req.params;
  const { amount, method, reference } = req.body;
  const invoice = db.invoices.find((i) => i.id === id);
  if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });

  const payAmount = Number(amount) || 0;
  invoice.amountPaid = (invoice.amountPaid || 0) + payAmount;
  if (invoice.amountPaid >= invoice.totalAmount) {
    invoice.status = 'paid';
  } else {
    invoice.status = 'partial';
  }

  invoice.payments = invoice.payments || [];
  invoice.payments.push({
    id: `pay_${Date.now()}`,
    amount: payAmount,
    method: method || 'UPI',
    reference: reference || `UPI-${Date.now()}`,
    paidAt: new Date().toISOString()
  });

  saveDb(db);
  res.json({ success: true, message: `Payment of ₹${payAmount.toLocaleString('en-IN')} recorded!`, invoice });
});

app.get('/api/finance/summary', (req, res) => {
  const totalBilled = db.invoices.reduce((acc, i) => acc + (i.totalAmount || 0), 0);
  const collected = db.invoices.reduce((acc, i) => acc + (i.amountPaid || 0), 0);
  const outstanding = Math.max(0, totalBilled - collected);
  const totalExpenses = db.expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
  const freelancerPayouts = db.payouts.reduce((acc, p) => acc + (p.amount || 0), 0);

  const netProfit = collected - totalExpenses - freelancerPayouts;
  const margin = collected > 0 ? ((netProfit / collected) * 100).toFixed(1) : '34.5';

  res.json({
    currency: 'INR (₹)',
    totalBilled,
    collected,
    outstanding,
    totalExpenses,
    freelancerPayouts,
    netProfit,
    profitMarginPercent: margin
  });
});

// Start Backend Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 DIGIWORKU COMMANDER BACKEND SERVER ACTIVE`);
  console.log(`📍 Endpoint: http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`💼 Currency Standard: Indian Rupee (INR ₹)`);
  console.log(`=======================================================`);
});
