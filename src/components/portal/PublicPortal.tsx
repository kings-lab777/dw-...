import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Briefcase,
  Users,
  Star,
  Send,
  ExternalLink,
  ShieldCheck,
  Code,
  Palette,
  Film,
  Bot,
  Zap,
  Phone,
  Mail,
  Check,
  LayoutDashboard
} from 'lucide-react';

interface PublicPortalProps {
  onOpenCommander: () => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({ onOpenCommander }) => {
  const { addClient, showToast } = useApp();

  // Inquire Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedService, setSelectedService] = useState('Web Development');
  const [selectedBudget, setSelectedBudget] = useState('₹45,000 - ₹1,00,000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'design' | 'ai'>('all');

  const services = [
    {
      id: 'web',
      icon: Code,
      title: 'Full-Stack Web Development',
      desc: 'High-performance web apps built with React 19, Next.js, TypeScript, and robust cloud APIs.',
      startingPrice: '₹45,000',
      turnaround: '2-4 Weeks',
      features: ['SEO & AEO Optimized', 'Ultra-fast Sub-second Load', 'Automated CI/CD', 'Responsive Mobile-first']
    },
    {
      id: 'design',
      icon: Palette,
      title: 'UI/UX & Design Systems',
      desc: 'Modern, high-converting digital product design with custom design tokens and interactive prototypes.',
      startingPrice: '₹25,000',
      turnaround: '7-14 Days',
      features: ['Figma Component Libraries', 'Tailwind Design Sync', 'User Flow Mapping', 'Design Tokens Spec']
    },
    {
      id: 'video',
      icon: Film,
      title: 'Video Production & Motion',
      desc: 'Studio-grade promotional reels, YouTube series editing, and high-impact 3D product animations.',
      startingPrice: '₹12,500',
      turnaround: '48-72 Hours',
      features: ['4K Ultra HD Export', 'Custom Sound Design', 'Motion Graphics', 'Shorts/Reels Formats']
    },
    {
      id: 'ai',
      icon: Bot,
      title: 'Enterprise AI & Automation',
      desc: 'Custom Gemini & LLM assistants, automated document processors, and workflow orchestrators.',
      startingPrice: '₹35,000',
      turnaround: '1-3 Weeks',
      features: ['Gemini 2.5 Flash / Pro', 'RAG Knowledge Bases', 'Internal Ops Bot', 'REST & Webhook Sync']
    },
    {
      id: 'squad',
      icon: Users,
      title: 'Dedicated Engineering Squads',
      desc: 'Full agile team allocated exclusively to your product roadmap on a flexible monthly subscription.',
      startingPrice: '₹95,000/mo',
      turnaround: 'Immediate Kickoff',
      features: ['Dedicated Tech Lead', 'Daily Standups', 'Direct Slack/Discord', 'Guaranteed SLA']
    },
    {
      id: 'brand',
      icon: Zap,
      title: 'Brand Identity & Guidelines',
      desc: 'Complete corporate branding systems including logos, color physics, typography, and stationery.',
      startingPrice: '₹18,000',
      turnaround: '7-10 Days',
      features: ['Vector Logo Formats', 'Brand Style Guide', 'Social Media Kit', 'Stationery Templates']
    }
  ];

  const portfolio = [
    {
      title: 'FinEdge Neo-Banking Portal',
      category: 'web',
      tags: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
      impact: '2.4M Transactions Processed',
      client: 'FinEdge Global'
    },
    {
      title: 'Apex E-Commerce Marketplace',
      category: 'web',
      tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
      impact: '+34% Checkout Conversion',
      client: 'Apex Retail'
    },
    {
      title: 'Pulse Healthcare Mobile App',
      category: 'design',
      tags: ['UI/UX', 'Figma', 'Design System', 'iOS/Android'],
      impact: '120,000+ Active Patients',
      client: 'Pulse MedTech'
    },
    {
      title: 'AeroDocs AI Semantic Engine',
      category: 'ai',
      tags: ['Gemini Flash', 'FastAPI', 'Embeddings', 'Python'],
      impact: '92% Faster Document Triage',
      client: 'AeroLogistics'
    }
  ];

  const filteredPortfolio = portfolio.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      showToast('Please enter your name and email', 'warning');
      return;
    }

    setIsSubmitting(true);
    // Real Backend API call
    fetch('http://localhost:5000/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: clientName,
        email: clientEmail,
        service: selectedService,
        budget: selectedBudget,
        message: message
      })
    }).catch((err) => console.log('Backend sync notice:', err));

    setTimeout(() => {
      addClient({
        companyName: clientName,
        industry: selectedService,
        contactPerson: clientName,
        email: clientEmail,
        phone: '+91 98765 43210',
        website: 'https://digiworku.in',
        status: 'lead',
        contractValue: 45000,
        healthScore: 95,
        notes: message || `Inbound inquiry for ${selectedService} with budget ${selectedBudget}`,
        lastContactDate: new Date().toISOString()
      });

      showToast(`🎉 Thank you, ${clientName}! Inquiry synced to Commander CRM pipeline.`, 'success');
      setClientName('');
      setClientEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-100 font-sans selection:bg-[#00c853]/30 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. PUBLIC NAVBAR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 h-16 border-b border-slate-800/80 bg-[#14171d]/90 backdrop-blur-md px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00c853] flex items-center justify-center text-white font-black text-lg shadow-md shadow-[#00c853]/20">
            DW
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight font-display text-white">DigiWorku</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
                ECOSYSTEM
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold block">India's Digital Workforce Platform</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
          <a href="#services" className="hover:text-[#00c853] transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-[#00c853] transition-colors">Portfolio</a>
          <a href="#reviews" className="hover:text-[#00c853] transition-colors">Testimonials</a>
          <a href="#inquire" className="hover:text-[#00c853] transition-colors">Get a Quote</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <a
            href="#inquire"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-[#00c853] bg-[#00c853]/10 hover:bg-[#00c853]/20 border border-[#00c853]/20 transition-all cursor-pointer"
          >
            <span>Instant Quote</span>
          </a>

          {/* Commander OS Switcher Button */}
          <button
            onClick={onOpenCommander}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-black text-xs shadow-md shadow-[#00c853]/20 transition-all cursor-pointer active:scale-95"
            title="Launch 12-Module Internal Operations OS"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Commander OS</span>
            <span className="px-1 py-0.2 rounded text-[8px] bg-white/20 font-mono">12 Subsystems</span>
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. HERO SECTION */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 px-4 md:px-8 max-w-6xl mx-auto text-center">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00c853]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00c853]/10 border border-[#00c853]/20 text-[#00c853] text-xs font-bold shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Digital Talent & AI Automation Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-display max-w-4xl mx-auto leading-tight">
            India's Leading Digital Workforce &amp; <span className="text-[#00c853]">AI Ecosystem</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            DigiWorku connects fast-moving startups and global enterprises with dedicated software engineers, UI/UX designers, video creators, and AI automation squads in India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#inquire"
              className="px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#00c853]/25 transition-all cursor-pointer active:scale-95"
            >
              <span>Get Free Project Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCommander}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-[#00c853]" />
              <span>Enter Internal Operations Hub</span>
            </button>
          </div>

          {/* 3 Live Metric Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 max-w-3xl mx-auto text-left">
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#14171d]/90 shadow-xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">ACTIVE CLIENT SQS</span>
              <div className="text-3xl font-black text-white font-mono">14+</div>
              <span className="text-[11px] font-bold text-[#00c853] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% On-Time Delivery
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#14171d]/90 shadow-xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">DELIVERED PROJECTS</span>
              <div className="text-3xl font-black text-white font-mono">500+</div>
              <span className="text-[11px] font-bold text-blue-400">Web, Mobile, AI &amp; Video</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-[#14171d]/90 shadow-xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">CLIENT SATISFACTION</span>
              <div className="text-3xl font-black text-white font-mono">98%</div>
              <span className="text-[11px] font-bold text-amber-400">Verified Post-Delivery NPS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. SERVICES SECTION */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="services" className="py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-xs font-bold text-slate-300 border border-slate-700">
            <Layers className="w-3.5 h-3.5 text-[#00c853]" />
            <span>Enterprise Digital Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white font-display">
            Specialized Digital Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Every service is managed by senior lead engineers with weekly milestones and live staging previews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="p-6 rounded-2xl border border-slate-800 bg-[#14171d] hover:border-slate-700 shadow-xl space-y-4 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00c853]/10 border border-[#00c853]/20 flex items-center justify-center text-[#00c853]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">{svc.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{svc.desc}</p>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    {svc.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 font-semibold">
                        <Check className="w-3.5 h-3.5 text-[#00c853] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">STARTING FROM</span>
                    <span className="text-sm font-black text-[#00c853] font-mono">{svc.startingPrice}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-md bg-slate-800/80">
                    {svc.turnaround}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. PORTFOLIO SHOWCASE */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-xs font-bold text-slate-300 border border-slate-700">
              <Briefcase className="w-3.5 h-3.5 text-[#00c853]" />
              <span>Proven Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white font-display">
              Featured Case Studies &amp; Impact
            </h2>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 bg-[#14171d] p-1.5 rounded-xl border border-slate-800">
            {(['all', 'web', 'design', 'ai'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00c853] text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPortfolio.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-800 bg-[#14171d] hover:border-slate-700 shadow-xl space-y-4 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00c853] block">
                    {item.client}
                  </span>
                  <h3 className="text-lg font-black text-white mt-0.5">{item.title}</h3>
                </div>
                <div className="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
                  {item.impact}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. INBOUND CRM QUOTE FORM */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="inquire" className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="p-8 md:p-10 rounded-3xl border border-slate-800 bg-[#14171d] shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00c853]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              Initiate Your Digital Project
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Submit your scope. Our technical leads review inquiries within 2 hours and generate itemized proposals.
            </p>
          </div>

          <form onSubmit={handleSubmitInquiry} className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">
                  YOUR NAME / COMPANY
                </label>
                <input
                  type="text"
                  required
                  placeholder="Viraj Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/70 text-sm text-white focus:border-[#00c853] focus:ring-1 focus:ring-[#00c853] outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">
                  BUSINESS EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="viraj@enterprise.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/70 text-sm text-white focus:border-[#00c853] focus:ring-1 focus:ring-[#00c853] outline-none font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">
                  PRIMARY SERVICE
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/70 text-sm text-white focus:border-[#00c853] focus:ring-1 focus:ring-[#00c853] outline-none font-semibold cursor-pointer"
                >
                  <option value="Web Development">Full-Stack Web Development</option>
                  <option value="UI/UX Design">UI/UX Design &amp; Prototyping</option>
                  <option value="AI Automation">AI Workflow &amp; Assistant Dev</option>
                  <option value="Video Production">Video Production &amp; Reels</option>
                  <option value="Dedicated Squad">Dedicated Engineering Squad</option>
                  <option value="Brand Identity">Corporate Brand Identity</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">
                  ESTIMATED BUDGET
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/70 text-sm text-white focus:border-[#00c853] focus:ring-1 focus:ring-[#00c853] outline-none font-semibold cursor-pointer"
                >
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                  <option value="₹2,50,000+">₹2,50,000+ (Enterprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">
                PROJECT BRIEF / OBJECTIVES
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your requirements, timeline, or reference links..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-800 bg-slate-900/70 text-sm text-white focus:border-[#00c853] focus:ring-1 focus:ring-[#00c853] outline-none font-semibold resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00c853]/25 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT PROJECT INQUIRY TO CRM</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. FOOTER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/80 py-8 px-4 md:px-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#00c853] flex items-center justify-center text-white font-black text-[10px]">
            DW
          </div>
          <span className="font-extrabold text-slate-300">DigiWorku Workforce OS &amp; AI Ecosystem</span>
        </div>
        <p>© 2026 DigiWorku Platform. All rights reserved. Connecting global ambition with Indian tech talent.</p>
      </footer>
    </div>
  );
};
