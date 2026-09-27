import React from 'react';
import { TicketPriority } from '../types/ticket';

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getStyle = () => {
    switch (priority) {
      case 'Urgent':
        // Using soft pink #F4DDE7 for urgent attention
        return 'bg-[#F4DDE7] text-[#1E293B] border-[#e8c6d6] font-semibold';
      case 'High':
        return 'bg-[#FFF1F2] text-[#9F1239] border-[#FFE4E6] font-medium';
      case 'Medium':
        return 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] font-medium';
      case 'Low':
        return 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] font-normal';
      default:
        return 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${getStyle()} whitespace-nowrap`}
    >
      {priority}
    </span>
  );
};
