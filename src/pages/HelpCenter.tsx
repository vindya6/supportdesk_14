import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Mail,
  FileQuestion,
  LifeBuoy
} from 'lucide-react';

interface HelpCenterProps {
  onNavigate: (tab: string) => void;
}

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How do I create a ticket?',
      answer: (
        <p>
          Click the <strong className="text-[#1E293B]">"Create Ticket"</strong> button in the sidebar or top navigation. Provide a descriptive subject, select the appropriate issue category and priority level, enter your email address, and explain your request in the description field. You can also attach reference files or screenshots.
        </p>
      )
    },
    {
      question: 'How do I check my ticket status?',
      answer: (
        <p>
          Navigate to <strong className="text-[#1E293B]">"My Tickets"</strong> in the sidebar. There you can search by ticket ID or subject, and filter by status (<span className="bg-[#CFE8FF] px-1 py-0.5 rounded text-xs">Open</span>, <span className="bg-[#DCD6F7] px-1 py-0.5 rounded text-xs">In Progress</span>, or <span className="bg-[#D8F0E3] px-1 py-0.5 rounded text-xs">Resolved</span>). Clicking any row opens the full conversation history.
        </p>
      )
    },
    {
      question: 'How do I reply to a ticket?',
      answer: (
        <p>
          Open the ticket from <strong className="text-[#1E293B]">"My Tickets"</strong> or the Dashboard. Scroll down to the <strong className="text-[#1E293B]">"Send a Response"</strong> section, type your update or question, attach any new documentation, and click <strong className="text-[#1E293B]">"Send Reply"</strong>.
        </p>
      )
    },
    {
      question: 'What does each ticket status mean?',
      answer: (
        <div className="space-y-2 mt-1">
          <div>
            <strong className="text-[#1E293B]">Open:</strong> The request has been submitted and is waiting for initial review by a support representative.
          </div>
          <div>
            <strong className="text-[#1E293B]">In Progress:</strong> A technician or administrator is currently investigating or implementing a fix.
          </div>
          <div>
            <strong className="text-[#1E293B]">Waiting for Response:</strong> The support team has requested additional details or verification from you.
          </div>
          <div>
            <strong className="text-[#1E293B]">Resolved:</strong> The issue has been addressed and concluded.
          </div>
          <div>
            <strong className="text-[#1E293B]">Closed:</strong> The ticket has been archived and finalized.
          </div>
        </div>
      )
    },
    {
      question: 'How do I contact support?',
      answer: (
        <p>
          Submitting a ticket is the primary channel for support as it ensures your request is assigned a unique reference ID and tracked until complete resolution. For emergency inquiries, reach out directly to your organization’s support administrator.
        </p>
      )
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof f.answer === 'string' && f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
          Help & Knowledge Base
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Find answers to common questions about ticket submission, tracking, and resolution procedures.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search FAQs and help guides..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B] placeholder-[#64748B] focus:outline-hidden focus:border-[#CBC2F3] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <h3 className="font-heading font-semibold text-base text-[#1E293B]">
          Frequently Asked Questions
        </h3>

        {filteredFaqs.length === 0 ? (
          <div className="p-6 text-center text-[#64748B] text-xs sm:text-sm">
            No help topics match "{searchQuery}".
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left font-semibold text-sm text-[#1E293B] hover:text-[#64748B] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#64748B] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Contact & Quick Action Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#DCD6F7] border border-[#CBC2F3] flex items-center justify-center shrink-0">
            <LifeBuoy className="w-5 h-5 text-[#1E293B]" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-[#1E293B]">
              Need direct assistance?
            </h4>
            <p className="text-xs text-[#64748B]">
              Can’t find what you need in the FAQs? Open a formal support ticket.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('create')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Ticket</span>
        </button>
      </div>
    </div>
  );
};
