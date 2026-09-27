import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Send,
  User,
  ShieldCheck,
  Headphones,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  FileText,
  X
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { TicketStatus, Attachment } from '../types/ticket';

interface TicketDetailsProps {
  ticketId: string;
  onBack: () => void;
  onNavigate: (tab: string, ticketId?: string) => void;
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({ ticketId, onBack, onNavigate }) => {
  const { tickets, updateTicketStatus, addMessage, activeRole } = useTickets();

  const ticket = tickets.find(t => t.id === ticketId);

  const [replyText, setReplyText] = useState('');
  const [replyAttachments, setReplyAttachments] = useState<Attachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ticket) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center shadow-xs">
          <AlertCircle className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
          <h2 className="text-xl font-bold font-heading text-[#1E293B]">
            Ticket Not Found
          </h2>
          <p className="text-sm text-[#64748B] max-w-sm mx-auto mt-2 mb-6">
            The requested ticket <span className="font-mono">{ticketId}</span> does not exist or was removed.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Tickets</span>
          </button>
        </div>
      </div>
    );
  }

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: Attachment[] = Array.from(files).map((file, idx) => ({
      id: `att-reply-${Date.now()}-${idx}`,
      name: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      type: file.type || 'application/octet-stream'
    }));

    setReplyAttachments(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removeReplyAttachment = (id: string) => {
    setReplyAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    addMessage(ticket.id, replyText.trim(), replyAttachments.length > 0 ? replyAttachments : undefined);
    setReplyText('');
    setReplyAttachments([]);
    setIsSubmitting(false);
  };

  const handleStatusChange = (newStatus: TicketStatus) => {
    updateTicketStatus(ticket.id, newStatus);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const statuses: TicketStatus[] = [
    'Open',
    'In Progress',
    'Waiting for Response',
    'Resolved',
    'Closed'
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Navigation Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tickets</span>
        </button>

        {/* Quick status indicator or actions */}
        <div className="flex items-center gap-2">
          {ticket.status !== 'Resolved' && (
            <button
              onClick={() => handleStatusChange('Resolved')}
              className="px-3 py-1.5 rounded-lg bg-[#D8F0E3] hover:bg-[#c6ebd4] border border-[#bee4cd] text-xs font-semibold text-[#1E293B] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark as Resolved</span>
            </button>
          )}
          {ticket.status === 'Resolved' && (
            <button
              onClick={() => handleStatusChange('Open')}
              className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#1E293B] transition-colors cursor-pointer"
            >
              Reopen Ticket
            </button>
          )}
        </div>
      </div>

      {/* Ticket Header Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-bold text-[#1E293B] px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                {ticket.id}
              </span>
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
              <span className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded">
                {ticket.category}
              </span>
              {ticket.isDemo && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                  Demo Data
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
              {ticket.subject}
            </h1>
          </div>

          {/* Status Switcher Dropdown (especially for Agents/Admins or manual override) */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-medium text-[#64748B]">Status:</span>
            <select
              value={ticket.status}
              onChange={e => handleStatusChange(e.target.value as TicketStatus)}
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] focus:outline-hidden focus:border-[#CBC2F3]"
            >
              {statuses.map(st => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]">
          <div>
            <span className="block text-[11px] font-medium text-[#64748B]">Requester</span>
            <span className="font-semibold text-[#1E293B]">{ticket.requesterName}</span>
            <span className="block text-[11px] truncate">{ticket.requesterEmail}</span>
          </div>

          <div>
            <span className="block text-[11px] font-medium text-[#64748B]">Organization</span>
            <span className="font-medium text-[#1E293B]">{ticket.organization || 'General User'}</span>
          </div>

          <div>
            <span className="block text-[11px] font-medium text-[#64748B]">Created On</span>
            <span className="font-medium text-[#1E293B]">{formatDate(ticket.createdAt)}</span>
          </div>

          <div>
            <span className="block text-[11px] font-medium text-[#64748B]">Last Activity</span>
            <span className="font-medium text-[#1E293B]">{formatDate(ticket.updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Main Original Request Description Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          <span>Original Description</span>
        </div>
        <p className="text-sm text-[#1E293B] whitespace-pre-line leading-relaxed">
          {ticket.description}
        </p>

        {/* Initial Attachments */}
        {ticket.attachments && ticket.attachments.length > 0 && (
          <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
            <span className="text-xs font-semibold text-[#64748B]">Attached Documents:</span>
            <div className="flex flex-wrap gap-2">
              {ticket.attachments.map(att => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#1E293B]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{att.name}</span>
                  <span className="text-[#64748B] text-[11px]">({att.size})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conversation Thread */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-heading text-[#1E293B]">
            Conversation History ({ticket.messages.length})
          </h3>
          <span className="text-xs text-[#64748B]">Replies are chronological</span>
        </div>

        <div className="space-y-3">
          {ticket.messages.map((msg, index) => {
            const isSupportOrAdmin = msg.senderRole === 'Support Agent' || msg.senderRole === 'Admin';
            return (
              <div
                key={msg.id || index}
                className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                  isSupportOrAdmin
                    ? 'border-[#CBC2F3] bg-white'
                    : 'border-[#E2E8F0] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    {/* Role Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSupportOrAdmin
                          ? 'bg-[#DCD6F7] text-[#1E293B] border border-[#CBC2F3]'
                          : 'bg-[#CFE8FF] text-[#1E293B] border border-[#b5dbfc]'
                      }`}
                    >
                      {isSupportOrAdmin ? (
                        <Headphones className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-[#1E293B]">
                          {msg.senderName}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            isSupportOrAdmin
                              ? 'bg-[#DCD6F7] text-[#1E293B] border border-[#CBC2F3]'
                              : 'bg-[#CFE8FF] text-[#1E293B] border border-[#b5dbfc]'
                          }`}
                        >
                          {msg.senderRole}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#64748B]">{msg.senderEmail}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#64748B]">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-[#1E293B] whitespace-pre-line leading-relaxed">
                  {msg.content}
                </div>

                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex flex-wrap gap-2">
                    {msg.attachments.map(att => (
                      <div
                        key={att.id}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B]"
                      >
                        <FileText className="w-3 h-3 text-[#64748B]" />
                        <span>{att.name}</span>
                        <span className="text-[#64748B] text-[10px]">({att.size})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reply Box Section */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold font-heading text-[#1E293B]">
            Send a Response
          </h4>
          <span className="text-xs text-[#64748B]">
            Posting as: <strong className="text-[#1E293B]">{activeRole}</strong>
          </span>
        </div>

        <form onSubmit={handleSendReply} className="space-y-4">
          <textarea
            required
            rows={4}
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Type your message, questions, or solution here..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] placeholder-[#64748B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all resize-y"
          />

          {/* Attachment list for reply */}
          {replyAttachments.length > 0 && (
            <div className="space-y-1">
              {replyAttachments.map(att => (
                <div
                  key={att.id}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-medium text-[#1E293B] truncate">{att.name}</span>
                    <span className="text-[#64748B] text-[10px]">({att.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeReplyAttachment(att.id)}
                    className="p-1 rounded text-[#64748B] hover:text-[#1E293B]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#1E293B] cursor-pointer transition-colors">
              <Paperclip className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Attach File</span>
              <input
                type="file"
                multiple
                onChange={handleSimulatedFileUpload}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !replyText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Reply</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
