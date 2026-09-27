import React, { useState } from 'react';
import {
  User,
  Mail,
  Building,
  Shield,
  Edit2,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Trash2
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { UserRole } from '../types/ticket';

export const Profile: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    activeRole,
    setActiveRole,
    loadDemoData,
    clearAllTickets,
    tickets
  } = useTickets();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [organization, setOrganization] = useState(userProfile.organization);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim()
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const roles: { role: UserRole; desc: string }[] = [
    {
      role: 'Customer',
      desc: 'Can create tickets, view own tickets, respond to inquiries, and mark own tickets resolved.'
    },
    {
      role: 'Support Agent',
      desc: 'Accesses Admin Overview, responds to tickets, adjusts ticket status, and manages ticket priorities.'
    },
    {
      role: 'Admin',
      desc: 'Full administrative control over all organizational support tickets, team routing, and metrics.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
          User Profile & Settings
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Manage your account identity and switch roles for local testing.
        </p>
      </div>

      {/* Demo Prototype Role Switcher Banner */}
      <div className="bg-[#DCD6F7]/40 border border-[#CBC2F3] rounded-xl p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#1E293B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#1E293B]">
              Local Prototype Role Switcher
            </h4>
            <p className="text-xs text-[#1E293B]/80 leading-relaxed">
              This selector allows you to preview the platform through different organizational perspectives (Customer, Support Agent, or Admin). Role switching is strictly for local prototype and demo evaluation purposes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {roles.map(item => {
            const isSelected = activeRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => setActiveRole(item.role)}
                className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#1E293B] shadow-xs'
                    : 'bg-white/60 border-[#CBC2F3] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-xs text-[#1E293B]">
                    {item.role}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#1E293B]"></span>
                  )}
                </div>
                <p className="text-[11px] text-[#64748B] leading-tight">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#CFE8FF] border border-[#b5dbfc] flex items-center justify-center text-lg font-bold text-[#1E293B]">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B]">
                {userProfile.name}
              </h3>
              <p className="text-xs text-[#64748B]">
                Role: <strong className="text-[#1E293B]">{userProfile.role}</strong>
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => {
                setName(userProfile.name);
                setEmail(userProfile.email);
                setOrganization(userProfile.organization);
                setIsEditing(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-semibold text-[#1E293B] transition-colors shadow-xs cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {saveSuccess && (
          <div className="p-3 rounded-lg bg-[#D8F0E3] border border-[#bee4cd] text-xs font-medium text-[#1E293B] flex items-center gap-2">
            <Check className="w-4 h-4 text-[#1E293B]" />
            <span>Profile information updated successfully.</span>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                Organization / Department
              </label>
              <input
                type="text"
                required
                value={organization}
                onChange={e => setOrganization(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] hover:text-[#1E293B] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5" />
                <span>Full Name</span>
              </span>
              <p className="font-semibold text-sm text-[#1E293B]">{userProfile.name}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                <Mail className="w-3.5 h-3.5" />
                <span>Email Address</span>
              </span>
              <p className="font-semibold text-sm text-[#1E293B]">{userProfile.email}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                <Building className="w-3.5 h-3.5" />
                <span>Organization</span>
              </span>
              <p className="font-semibold text-sm text-[#1E293B]">{userProfile.organization}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>Access Level</span>
              </span>
              <p className="font-semibold text-sm text-[#1E293B]">{userProfile.role}</p>
            </div>
          </div>
        )}
      </div>

      {/* Local Storage & Data Management */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-heading font-semibold text-sm text-[#1E293B]">
            Data Management (Local Storage)
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Test the application with pre-populated demo cases or test a fresh empty-slate experience.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              if (window.confirm('Load sample demonstration tickets? This will overwrite existing local data.')) {
                loadDemoData();
              }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-semibold text-[#1E293B] transition-colors shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Load Demo Data (3 Sample Tickets)</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all tickets and notifications to a completely empty state?')) {
                clearAllTickets();
              }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#FFF1F2] text-xs font-semibold text-[#9F1239] transition-colors shadow-xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Data (Start Empty)</span>
          </button>
        </div>

        <p className="text-[11px] text-[#64748B]">
          Current stored tickets: <strong className="text-[#1E293B]">{tickets.length}</strong>
        </p>
      </div>
    </div>
  );
};
