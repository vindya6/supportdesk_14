import React, { useState } from 'react';
import {
  PlusCircle,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { TicketCategory, TicketPriority, Attachment } from '../types/ticket';

interface CreateTicketProps {
  onNavigate: (tab: string, ticketId?: string) => void;
}

export const CreateTicket: React.FC<CreateTicketProps> = ({ onNavigate }) => {
  const { createTicket, userProfile } = useTickets();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TicketCategory>('Technical Issue');
  const [priority, setPriority] = useState<TicketPriority>('Medium');
  const [email, setEmail] = useState(userProfile.email || '');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  const categories: TicketCategory[] = [
    'Technical Issue',
    'Account & Login',
    'Billing',
    'Product/Service',
    'General Question',
    'Other'
  ];

  const priorities: TicketPriority[] = ['Low', 'Medium', 'High', 'Urgent'];

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: Attachment[] = Array.from(files).map((file, idx) => ({
      id: `att-${Date.now()}-${idx}`,
      name: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      type: file.type || 'application/octet-stream'
    }));

    setAttachments(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!subject.trim() || !description.trim() || !email.trim()) {
      setError('Please complete the required fields.');
      return;
    }

    // Basic email check
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    try {
      const created = createTicket({
        subject: subject.trim(),
        description: description.trim(),
        category,
        priority,
        requesterEmail: email.trim(),
        attachments: attachments.length > 0 ? attachments : undefined
      });

      setCreatedTicketId(created.id);
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating your ticket. Please try again.');
    }
  };

  const resetForm = () => {
    setSubject('');
    setDescription('');
    setCategory('Technical Issue');
    setPriority('Medium');
    setEmail(userProfile.email || '');
    setAttachments([]);
    setError(null);
    setCreatedTicketId(null);
  };

  if (createdTicketId) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#D8F0E3] border border-[#bee4cd] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-[#1E293B]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
            Ticket Created Successfully
          </h2>

          <div className="mt-4 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] max-w-sm mx-auto">
            <span className="text-xs text-[#64748B]">Assigned Ticket ID:</span>
            <p className="font-mono text-xl font-bold text-[#1E293B] mt-0.5 tracking-wider">
              {createdTicketId}
            </p>
          </div>

          <p className="text-sm text-[#64748B] mt-4 max-w-md mx-auto leading-relaxed">
            Your inquiry has been registered in the system. Our support team will review your details and respond shortly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => onNavigate('ticket_details', createdTicketId)}
              className="px-5 py-2.5 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>View Ticket</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={resetForm}
              className="px-4 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs sm:text-sm font-medium text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              Create Another Ticket
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs sm:text-sm font-medium text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
          Create a Support Ticket
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Please describe your issue or inquiry in detail so we can route it to the right team.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-lg bg-[#F4DDE7]/70 border border-[#e8c6d6] flex items-center gap-2.5 text-xs sm:text-sm text-[#1E293B]">
          <AlertCircle className="w-4 h-4 text-[#1E293B] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Ticket Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
        {/* Subject */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-[#1E293B] mb-1.5">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Brief summary of the issue (e.g., Cannot login to student portal)"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] placeholder-[#64748B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all"
          />
        </div>

        {/* Category & Priority Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#1E293B] mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as TicketCategory)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#1E293B] mb-1.5">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as TicketPriority)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all"
            >
              {priorities.map(pri => (
                <option key={pri} value={pri}>
                  {pri}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-[#1E293B] mb-1.5">
            Your Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="name@organization.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] placeholder-[#64748B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all"
          />
          <p className="text-[11px] text-[#64748B] mt-1">
            Status updates and replies will be linked to this email address.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-[#1E293B] mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            placeholder="Please explain the problem clearly, including steps to reproduce, error codes, and what you expected to happen."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] placeholder-[#64748B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all resize-y"
          />
        </div>

        {/* Optional Attachment */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-[#1E293B] mb-1.5">
            Attachments (Optional)
          </label>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#1E293B] cursor-pointer transition-colors">
              <Paperclip className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Attach Files</span>
              <input
                type="file"
                multiple
                onChange={handleSimulatedFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-[11px] text-[#64748B]">
              Images, PDFs, or logs up to 10MB
            </span>
          </div>

          {/* Uploaded attachments list */}
          {attachments.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {attachments.map(att => (
                <div
                  key={att.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-[#64748B] shrink-0" />
                    <span className="font-medium text-[#1E293B] truncate">{att.name}</span>
                    <span className="text-[#64748B] text-[11px]">({att.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(att.id)}
                    className="p-1 rounded text-[#64748B] hover:text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button Section */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 rounded-lg text-xs font-medium text-[#64748B] hover:text-[#1E293B] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Ticket</span>
          </button>
        </div>
      </form>
    </div>
  );
};
