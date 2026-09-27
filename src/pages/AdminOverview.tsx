import React, { useState } from 'react';
import {
  ShieldCheck,
  FolderOpen,
  Eye,
  Filter,
  ArrowUpDown,
  Search,
  CheckCircle2,
  AlertCircle,
  Inbox
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { TicketStatus, TicketPriority } from '../types/ticket';

interface AdminOverviewProps {
  onNavigate: (tab: string, ticketId?: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
  const { tickets, updateTicketStatus, updateTicketPriority, activeRole } = useTickets();

  const [adminSearch, setAdminSearch] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>('All');

  const totalTickets = tickets.length;
  const openCount = tickets.filter(t => t.status === 'Open').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  const statuses: (TicketStatus | 'All')[] = [
    'All',
    'Open',
    'In Progress',
    'Waiting for Response',
    'Resolved',
    'Closed'
  ];

  const editableStatuses: TicketStatus[] = [
    'Open',
    'In Progress',
    'Waiting for Response',
    'Resolved',
    'Closed'
  ];

  const editablePriorities: TicketPriority[] = ['Low', 'Medium', 'High', 'Urgent'];

  const filteredTickets = tickets.filter(t => {
    const matchesSearch =
      !adminSearch ||
      t.subject.toLowerCase().includes(adminSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
      t.requesterEmail.toLowerCase().includes(adminSearch.toLowerCase()) ||
      t.requesterName.toLowerCase().includes(adminSearch.toLowerCase());

    const matchesStatus = adminStatusFilter === 'All' || t.status === adminStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Category counts
  const categoryCounts = tickets.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
              Admin Overview
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-[#1E293B] border border-[#CBC2F3]">
              {activeRole} Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Operational queue management, assignment controls, and ticket lifecycle tracking.
          </p>
        </div>
      </div>

      {/* Overview Stat Cards - All White Cards with Subtle Borders */}
      {totalTickets === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto mb-3">
            <Inbox className="w-6 h-6 text-[#64748B]" />
          </div>
          <h3 className="font-heading font-semibold text-base text-[#1E293B]">
            No tickets in the system yet
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto mt-1 mb-4">
            Once customer tickets are submitted or loaded from demo data, operational metrics and queue management tools will populate here.
          </p>
          <button
            onClick={() => onNavigate('create')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer"
          >
            Create First Ticket
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">Total Queue</span>
                <FolderOpen className="w-4 h-4 text-[#64748B]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] mt-2 tabular-nums">
                {totalTickets}
              </p>
              <p className="text-xs text-[#64748B] mt-1">All recorded requests</p>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">Open Unresolved</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#CFE8FF] border border-[#b5dbfc]"></span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] mt-2 tabular-nums">
                {openCount}
              </p>
              <p className="text-xs text-[#64748B] mt-1">Requires triage</p>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">In Progress</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#DCD6F7] border border-[#CBC2F3]"></span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] mt-2 tabular-nums">
                {inProgressCount}
              </p>
              <p className="text-xs text-[#64748B] mt-1">Under investigation</p>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">Resolved</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D8F0E3] border border-[#bee4cd]"></span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] mt-2 tabular-nums">
                {resolvedCount}
              </p>
              <p className="text-xs text-[#64748B] mt-1">Successfully closed</p>
            </div>
          </div>

          {/* Ticket Category Distribution Breakdown */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
            <h3 className="font-heading font-semibold text-sm text-[#1E293B]">
              Category Distribution
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div
                  key={cat}
                  className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"
                >
                  <span className="text-xs text-[#64748B] block truncate" title={cat}>
                    {cat}
                  </span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-lg font-bold font-heading text-[#1E293B] tabular-nums">
                      {count}
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      {Math.round((count / totalTickets) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Queue Management Table */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-heading font-semibold text-base text-[#1E293B]">
                  All Tickets Administration
                </h3>
                <p className="text-xs text-[#64748B]">
                  Inline controls to adjust ticket status, change priority, and review threads.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Filter tickets..."
                    value={adminSearch}
                    onChange={e => setAdminSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] focus:outline-hidden"
                  />
                </div>

                <select
                  value={adminStatusFilter}
                  onChange={e => setAdminStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] focus:outline-hidden"
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-medium text-xs">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Ticket ID</th>
                    <th className="py-3 px-4 font-semibold">Requester</th>
                    <th className="py-3 px-4 font-semibold">Subject</th>
                    <th className="py-3 px-4 font-semibold">Status (Editable)</th>
                    <th className="py-3 px-4 font-semibold">Priority (Editable)</th>
                    <th className="py-3 px-4 font-semibold text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredTickets.map(t => (
                    <tr key={t.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#1E293B] whitespace-nowrap">
                        {t.id}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-medium text-[#1E293B]">{t.requesterName}</div>
                        <div className="text-[11px] text-[#64748B]">{t.requesterEmail}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#1E293B] max-w-xs truncate">
                          {t.subject}
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          {t.category} · {formatDate(t.createdAt)}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={t.status}
                          onChange={e => updateTicketStatus(t.id, e.target.value as TicketStatus)}
                          className="px-2 py-1 rounded-md text-xs font-medium bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] focus:outline-hidden"
                        >
                          {editableStatuses.map(st => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={t.priority}
                          onChange={e => updateTicketPriority(t.id, e.target.value as TicketPriority)}
                          className="px-2 py-1 rounded-md text-xs font-medium bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] focus:outline-hidden"
                        >
                          {editablePriorities.map(p => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => onNavigate('ticket_details', t.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-[#CFE8FF] border border-[#E2E8F0] text-xs font-semibold text-[#1E293B] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
