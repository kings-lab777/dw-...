import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Employee, UserRole } from '../../types';
import {
  Users,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  FileText,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  X
} from 'lucide-react';

export const EmployeesModule: React.FC = () => {
  const { employees, toggleEmployeeActive, addEmployee, currentRole, darkMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Employee Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newDesignation, setNewDesignation] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('team_member');
  const [newPhone, setNewPhone] = useState('');
  const [newSkills, setNewSkills] = useState('React, TypeScript, Tailwind');
  const [newSalary, setNewSalary] = useState('6500');

  const departments = ['All', 'Executive Leadership', 'Engineering', 'People & Culture', 'Delivery Management', 'Quality Assurance', 'Revenue & Growth', 'Corporate Finance'];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    addEmployee({
      fullName: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      department: newDept,
      designation: newDesignation.trim() || 'Software Engineer',
      phone: newPhone.trim() || '+91 98765 43210',
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      skills: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
      isActive: true,
      joinDate: new Date().toISOString().split('T')[0],
      baseSalary: parseInt(newSalary) || 50000,
      kycStatus: 'verified',
      kycDocuments: [
        {
          id: `kyc_${Date.now()}_1`,
          name: 'National Identity Proof (PAN/Aadhaar)',
          type: 'Identity Proof',
          fileSize: '1.4 MB',
          uploadedAt: 'Today',
          verified: true
        },
        {
          id: `kyc_${Date.now()}_2`,
          name: 'DigiWorku Employment Contract',
          type: 'Employment Contract',
          fileSize: '850 KB',
          uploadedAt: 'Today',
          verified: true
        }
      ]
    });

    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewDesignation('');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search employee by name, role or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] w-64 md:w-80 transition-colors ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
              }`}
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] transition-colors ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-300' 
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className={`rounded-2xl border transition-all p-5 flex flex-col justify-between relative overflow-hidden ${
              darkMode
                ? emp.isActive
                  ? 'bg-[#14171d] border-slate-800 hover:border-slate-700 shadow-xl'
                  : 'bg-[#0f1115] border-slate-800/40 opacity-60'
                : emp.isActive
                  ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                  : 'bg-slate-100 border-slate-200 opacity-60'
            }`}
          >
            <div>
              {/* Header: Avatar, Name, Toggle */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={emp.avatarUrl}
                      alt={emp.fullName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 ${
                        darkMode ? 'border-[#14171d]' : 'border-white'
                      } ${emp.isActive ? 'bg-[#00c853]' : 'bg-slate-400'}`}
                    />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold flex items-center gap-1.5 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {emp.fullName}
                      {emp.kycStatus === 'verified' && (
                        <span title="KYC Verified">
                          <ShieldCheck className="w-4 h-4 text-[#00c853] shrink-0" />
                        </span>
                      )}
                    </h3>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{emp.designation}</p>
                    <span className="text-[10px] font-mono text-[#00c853] font-bold">
                      {emp.department}
                    </span>
                  </div>
                </div>

                {/* Status Toggle Button */}
                <button
                  onClick={() => toggleEmployeeActive(emp.id)}
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold border transition-all cursor-pointer ${
                    emp.isActive
                      ? 'bg-[#00c853]/10 text-[#00c853] border-[#00c853]/20 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20'
                      : darkMode 
                        ? 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-[#00c853]/10 hover:text-[#00c853]'
                        : 'bg-slate-200 text-slate-500 border-slate-300 hover:bg-[#00c853]/10 hover:text-[#00c853]'
                  }`}
                  title="Click to toggle operational status"
                >
                  {emp.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>

              {/* Contact info */}
              <div className={`space-y-1 text-xs mb-4 p-2.5 rounded-xl border ${
                darkMode 
                  ? 'bg-[#0f1115] border-slate-800/80 text-slate-400' 
                  : 'bg-slate-50 border-slate-200/80 text-slate-600'
              }`}>
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{emp.phone}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mb-4">
                <div className={`text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Skills &amp; Proficiencies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {emp.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                        darkMode 
                          ? 'bg-slate-800/80 text-slate-300 border-slate-700/60' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {emp.skills.length > 4 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      +{emp.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className={`pt-3 border-t flex items-center justify-between text-xs ${
              darkMode ? 'border-slate-800/80' : 'border-slate-100'
            }`}>
              <span className={`text-[11px] flex items-center gap-1 ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <Calendar className="w-3 h-3" /> Since {emp.joinDate}
              </span>

              <button
                onClick={() => setSelectedEmp(emp)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  darkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#00c853]" />
                <span>KYC Vault ({emp.kycDocuments.length})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* KYC Vault Document Modal */}
      {selectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <img
                  src={selectedEmp.avatarUrl}
                  alt={selectedEmp.fullName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className={`text-sm font-bold flex items-center gap-1.5 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {selectedEmp.fullName} — KYC Documents Vault
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{selectedEmp.designation}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmp(null)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-200/60'
              }`}>
                <div>
                  <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>KYC Verification Status</div>
                  <div className="text-sm font-bold text-[#00c853] flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" /> Fully Verified &amp; Audited
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 font-bold">
                  Gov ID &amp; Contract
                </span>
              </div>

              <div className="space-y-2">
                <div className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Attached Enterprise Credentials
                </div>
                {selectedEmp.kycDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                      darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#00c853]" />
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{doc.name}</div>
                        <div className={`text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {doc.type} • {doc.fileSize} • Uploaded {doc.uploadedAt}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 text-[10px] font-mono font-bold">
                      Verified ✓
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedEmp(null)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors mt-2 cursor-pointer ${
                  darkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Close Vault
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Users className="w-4 h-4 text-[#00c853]" />
                Add New DigiWorku Team Member
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    placeholder="e.g. Jordan Lee"
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    placeholder="jordan.l@digiworku.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Delivery Management">Delivery Management</option>
                    <option value="People & Culture">People & Culture</option>
                    <option value="Revenue & Growth">Revenue & Growth</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Role Permission</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="team_member">Team Member</option>
                    <option value="project_manager">Project Manager</option>
                    <option value="qa_manager">QA Manager</option>
                    <option value="hr_manager">HR Manager</option>
                    <option value="sales_manager">Sales Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Designation Title</label>
                <input
                  type="text"
                  value={newDesignation}
                  onChange={(e) => setNewDesignation(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                  placeholder="e.g. Senior Frontend Specialist"
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
                >
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
