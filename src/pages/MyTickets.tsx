import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  PlusCircle,
  ArrowUpDown,
  Ticket as TicketIcon,
  X,
  Eye,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { TicketStatus, TicketPriority, TicketCategory } from '../types/ticket';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';

interface MyTicketsProps {
  onNavigate: (tab: string, ticketId?: string) => void;
}

export const MyTickets: React.FC<MyTicketsProps> = ({ onNavigate }) => {
  const { tickets } = useTickets();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority'>('newest');

  const categories: TicketCategory[] = [
    'Technical Issue',
    'Account & Login',
    'Billing',
    'Product/Service',
    'General Question',
    'Other'
  ];

  const statuses: (TicketStatus | 'All')[] = [
    'All',
    'Open',
    'In Progress',
    'Waiting for Response',
    'Resolved',
    'Closed'
  ];

  const priorities: (TicketPriority | 'All')[] = ['All', 'Urgent', 'High', 'Medium', 'Low'];

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      // Search matches subject, id, description, or requester email
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        ticket.requesterEmail.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'All' || ticket.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'priority') {
        const weight: Record<TicketPriority, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
        return weight[b.priority] - weight[a.priority];
      }
      return 0;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

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

  const hasActiveFilters =
    searchQuery !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    categoryFilter !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  // Base empty state: No tickets at all in the application
  if (tickets.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto mb-4">
            <TicketIcon className="w-7 h-7 text-[#64748B]" />
          </div>
          <h2 className="text-xl font-bold font-heading text-[#1E293B]">
            No tickets yet
          </h2>
          <p className="text-sm text-[#64748B] max-w-md mx-auto mt-2 mb-6">
            Create a support ticket to get assistance from your organization. Your submitted tickets will appear here.
          </p>
          <button
            onClick={() => onNavigate('create')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header with Title and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
            My Tickets
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Track, filter, and review the history of your submitted support inquiries.
          </p>
        </div>

        <button
          onClick={() => onNavigate('create')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Ticket</span>
        </button>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search by ticket ID, subject, or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] placeholder-[#64748B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E293B]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all"
            >
              <option value="All">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-1.5 w-full">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="priority">Sort: By Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Segmented Bar & Priority Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-xs font-medium text-[#64748B] mr-1">Status:</span>
            {statuses.map(st => {
              const isSelected = statusFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#CFE8FF] text-[#1E293B] font-semibold border border-[#b5dbfc]'
                      : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:text-[#1E293B] hover:bg-white'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>

          {/* Priority selector & clear filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#64748B]">Priority:</span>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] focus:outline-hidden"
            >
              {priorities.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#64748B] hover:text-[#1E293B] underline ml-2 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ticket List / Table Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        {filteredTickets.length === 0 ? (
          <div className="p-10 text-center">
            <AlertCircle className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
            <h3 className="font-heading font-semibold text-base text-[#1E293B]">
              No tickets match your search.
            </h3>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              Try adjusting your query, clearing filters, or create a new ticket.
            </p>
            <button
              onClick={resetFilters}
              className="px-3.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#1E293B] hover:bg-[#F1F5F9] cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-medium text-xs">
                <tr>
                  <th className="py-3 px-4 font-semibold">Ticket ID</th>
                  <th className="py-3 px-4 font-semibold">Subject</th>
                  <th className="py-3 px-4 font-semibold hidden md:table-cell">Category</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Priority</th>
                  <th className="py-3 px-4 font-semibold hidden lg:table-cell">Created</th>
                  <th className="py-3 px-4 font-semibold hidden sm:table-cell">Last Updated</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredTickets.map(ticket => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                    onClick={() => onNavigate('ticket_details', ticket.id)}
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#1E293B] whitespace-nowrap">
                      {ticket.id}
                      {ticket.isDemo && (
                        <span className="ml-1.5 text-[9px] font-normal px-1 py-0.2 rounded bg-[#F1F5F9] text-[#64748B]">
                          Demo
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#1E293B] group-hover:text-[#1E293B] max-w-xs sm:max-w-md truncate">
                        {ticket.subject}
                      </div>
                      <div className="text-[11px] text-[#64748B] md:hidden truncate">
                        {ticket.category}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B] hidden md:table-cell whitespace-nowrap">
                      {ticket.category}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={ticket.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <PriorityBadge priority={ticket.priority} />
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B] text-xs hidden lg:table-cell whitespace-nowrap">
                      {formatDate(ticket.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B] text-xs hidden sm:table-cell whitespace-nowrap">
                      {formatDate(ticket.updatedAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onNavigate('ticket_details', ticket.id);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-[#CFE8FF] border border-[#E2E8F0] hover:border-[#b5dbfc] text-xs font-medium text-[#1E293B] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <span>
            Showing <strong className="text-[#1E293B]">{filteredTickets.length}</strong> of{' '}
            <strong className="text-[#1E293B]">{tickets.length}</strong> tickets
          </span>
          <span className="hidden sm:inline">Click any ticket to view thread or reply</span>
        </div>
      </div>
    </div>
  );
};
