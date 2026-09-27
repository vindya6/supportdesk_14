import React from 'react';
import {
  PlusCircle,
  Ticket as TicketIcon,
  Bell,
  HelpCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  FolderOpen,
  Inbox,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';

interface DashboardProps {
  onNavigate: (tab: string, ticketId?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { tickets, notifications } = useTickets();

  const totalCount = tickets.length;
  const openCount = tickets.filter(t => t.status === 'Open').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  const recentTickets = [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

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
      {/* Welcome Banner Section */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
              Welcome to your Support Center
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Manage your support requests, track responses, and communicate with your support team.
            </p>
          </div>

          <button
            onClick={() => onNavigate('create')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs self-start md:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Ticket</span>
          </button>
        </div>

        {/* Quick Action Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#E2E8F0]">
          <button
            onClick={() => onNavigate('create')}
            className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#1E293B] transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-md bg-[#CFE8FF] flex items-center justify-center text-[#1E293B] shrink-0">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#1E293B]">Create Ticket</p>
              <p className="text-[11px] text-[#64748B]">Submit new inquiry</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('tickets')}
            className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#1E293B] transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-md bg-[#DCD6F7] flex items-center justify-center text-[#1E293B] shrink-0">
              <TicketIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#1E293B]">View My Tickets</p>
              <p className="text-[11px] text-[#64748B]">All active requests</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('notifications')}
            className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#1E293B] transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-md bg-[#F4DDE7] flex items-center justify-center text-[#1E293B] shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#1E293B]">Notifications</p>
              <p className="text-[11px] text-[#64748B]">
                {unreadNotificationsCount > 0 ? `${unreadNotificationsCount} unread` : 'All caught up'}
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('help')}
            className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#1E293B] transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-md bg-[#D8F0E3] flex items-center justify-center text-[#1E293B] shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#1E293B]">Help Center</p>
              <p className="text-[11px] text-[#64748B]">Browse FAQs</p>
            </div>
          </button>
        </div>
      </div>

      {/* Ticket Summary - All Cards are White with Subtle Borders/Shadows */}
      {totalCount === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto mb-3">
            <Inbox className="w-6 h-6 text-[#64748B]" />
          </div>
          <h3 className="text-base font-semibold font-heading text-[#1E293B]">
            No tickets yet
          </h3>
          <p className="text-sm text-[#64748B] max-w-md mx-auto mt-1 mb-4">
            You do not have any open or resolved tickets in the system. Create a support ticket to get assistance from your organization.
          </p>
          <button
            onClick={() => onNavigate('create')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Ticket</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Open Tickets Card */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">Open Tickets</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#CFE8FF] border border-[#b5dbfc]"></span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] tabular-nums">
                {openCount}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">Awaiting initial resolution</p>
          </div>

          {/* In Progress Card */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">In Progress</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DCD6F7] border border-[#CBC2F3]"></span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] tabular-nums">
                {inProgressCount}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">Being worked on</p>
          </div>

          {/* Resolved Card */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">Resolved</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#D8F0E3] border border-[#bee4cd]"></span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] tabular-nums">
                {resolvedCount}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">Completed requests</p>
          </div>

          {/* Total Tickets Card */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">Total Tickets</span>
              <FolderOpen className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] tabular-nums">
                {totalCount}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">Lifetime recorded</p>
          </div>
        </div>
      )}

      {/* Recent Tickets Section */}
      {totalCount > 0 && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B]">
                Recent Tickets
              </h3>
              <p className="text-xs text-[#64748B]">Latest active requests and inquiries</p>
            </div>
            <button
              onClick={() => onNavigate('tickets')}
              className="text-xs font-medium text-[#1E293B] hover:text-[#64748B] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View all tickets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {recentTickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => onNavigate('ticket_details', ticket.id)}
                className="p-4 sm:px-6 hover:bg-[#F8FAFC] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#1E293B]">
                      {ticket.id}
                    </span>
                    <span className="text-[#64748B] text-xs">·</span>
                    <span className="text-xs text-[#64748B]">{ticket.category}</span>
                    {ticket.isDemo && (
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                        Demo Data
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-[#1E293B] line-clamp-1">
                    {ticket.subject}
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Created on {formatDate(ticket.createdAt)} · {ticket.messages.length} {ticket.messages.length === 1 ? 'message' : 'messages'}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <PriorityBadge priority={ticket.priority} />
                  <StatusBadge status={ticket.status} />
                  <ArrowRight className="w-4 h-4 text-[#64748B] hidden sm:inline" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational Foundations & AI Future Scope Banner */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#DCD6F7] border border-[#CBC2F3] flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-[#1E293B]" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#1E293B]">
              Academic Foundations & AI Future Scope
            </h4>
            <p className="text-xs text-[#64748B]">
              Review the 5 Computer Science subjects (DBMS, DMGT...) and discover future LLM/AI enhancements.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
          <button
            onClick={() => onNavigate('subjects')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#1E293B] transition-colors cursor-pointer"
          >
            <span>Subjects Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('future_scope')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#CFE8FF] hover:bg-[#bce0ff] border border-[#b5dbfc] text-xs font-semibold text-[#1E293B] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Future Scope (AI)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
