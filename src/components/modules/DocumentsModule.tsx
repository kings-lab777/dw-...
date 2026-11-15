import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderArchive,
  Search,
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Folder,
  FileCheck,
  Building,
  User,
  Shield,
  Plus
} from 'lucide-react';

export const DocumentsModule: React.FC = () => {
  const { darkMode, showToast, projects } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');

  const folders = [
    { id: 'all', label: 'All Documents', count: 18 },
    { id: 'client', label: 'Client Contracts & SOWs', count: 5 },
    { id: 'proposals', label: 'Proposals & Quotations', count: 4 },
    { id: 'deliverables', label: 'Deliverable Outputs', count: 6 },
    { id: 'compliance', label: 'KYC & Legal Vault', count: 3 },
  ];

  const documents = [
    {
      id: 'doc-1',
      title: 'Fintech_Banking_OS_Master_SOW_Signed.pdf',
      folder: 'client',
      client: 'HDFC Global Fintech',
      project: 'Fintech Banking OS 2.0',
      size: '2.4 MB',
      updatedAt: '12 Nov 2026',
      uploadedBy: 'Rohit Verma',
      tag: 'Verified Contract'
    },
    {
      id: 'doc-2',
      title: 'Nordic_Retail_Q4_Proposal_v3.pdf',
      folder: 'proposals',
      client: 'Nordic Living Direct',
      project: 'Nordic Retail Omnichannel',
      size: '4.8 MB',
      updatedAt: '10 Nov 2026',
      uploadedBy: 'Priya Sharma',
      tag: 'Approved Quotation'
    },
    {
      id: 'doc-3',
      title: 'Apollo_Telehealth_System_Architecture.pdf',
      folder: 'deliverables',
      client: 'Apollo Telehealth Ltd',
      project: 'Apollo Telehealth Platform',
      size: '12.1 MB',
      updatedAt: '8 Nov 2026',
      uploadedBy: 'Marcus Chen',
      tag: 'Milestone Deliverable'
    },
    {
      id: 'doc-4',
      title: 'DigiWorku_100_Point_QC_Audit_Checklist.pdf',
      folder: 'compliance',
      client: 'Internal DigiWorku',
      project: 'Enterprise QC System',
      size: '1.1 MB',
      updatedAt: '4 Nov 2026',
      uploadedBy: 'Aria Montgomery',
      tag: 'Quality Assurance'
    },
    {
      id: 'doc-5',
      title: 'Tax_Invoice_INV-2026-089_HDFC.pdf',
      folder: 'client',
      client: 'HDFC Global Fintech',
      project: 'Fintech Banking OS 2.0',
      size: '890 KB',
      updatedAt: '1 Nov 2026',
      uploadedBy: 'Neha Patel',
      tag: 'Tax Invoice (₹)'
    }
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl md:text-2xl font-black font-display tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Documents &amp; File Vault
          </h1>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Centralized document library with permission-controlled storage and audit history
          </p>
        </div>

        <button
          onClick={() => showToast('Secure file upload dialog opened', 'info')}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Main Grid: Folders on Left, Document Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Folder Navigation */}
        <div className="lg:col-span-3 space-y-2">
          <div className={`p-4 rounded-3xl border ${
            darkMode ? 'bg-[#0f121a] border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 block mb-2">
              Document Folders
            </span>
            <div className="space-y-1">
              {folders.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFolder(f.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedFolder === f.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Folder className="w-4 h-4 shrink-0" />
                    <span className="truncate">{f.label}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    selectedFolder === f.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Search & Documents Table */}
        <div className="lg:col-span-9 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents by filename, client, or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-xs'
              }`}
            />
          </div>

          <div className={`rounded-3xl border overflow-hidden ${
            darkMode ? 'bg-[#0f121a] border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b text-[10px] font-extrabold uppercase tracking-wider ${
                    darkMode ? 'border-slate-800 text-slate-400 bg-slate-900/40' : 'border-slate-100 text-slate-500 bg-slate-50'
                  }`}>
                    <th className="py-3 px-4">Document Title</th>
                    <th className="py-3 px-4">Project / Client</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Uploaded By</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold flex items-center gap-2.5 text-slate-900 dark:text-white">
                        <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <div>{doc.title}</div>
                          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-normal">
                            {doc.tag}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{doc.project}</div>
                        <div className="text-[10px] text-slate-400">{doc.client}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {doc.size}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        <div>{doc.uploadedBy}</div>
                        <div className="text-[10px] text-slate-400">{doc.updatedAt}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => showToast(`Previewing ${doc.title}`, 'info')}
                            className="p-1.5 rounded-lg border text-slate-400 hover:text-blue-600 border-slate-200 dark:border-slate-700 cursor-pointer"
                            title="Preview File"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => showToast(`Downloaded ${doc.title}`, 'success')}
                            className="p-1.5 rounded-lg border text-slate-400 hover:text-emerald-600 border-slate-200 dark:border-slate-700 cursor-pointer"
                            title="Download File"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
