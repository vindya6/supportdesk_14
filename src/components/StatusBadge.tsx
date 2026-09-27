import React from 'react';
import { TicketStatus } from '../types/ticket';

interface StatusBadgeProps {
  status: TicketStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  // Color specifications from requirements:
  // Open: Powder Blue #CFE8FF
  // In Progress: Lavender #DCD6F7
  // Waiting for Response: Neutral / light gray
  // Resolved: Mint #D8F0E3
  // Closed: Neutral / light gray

  const getStyle = () => {
    switch (status) {
      case 'Open':
        return 'bg-[#CFE8FF] text-[#1E293B] border-[#b5dbfc]';
      case 'In Progress':
        return 'bg-[#DCD6F7] text-[#1E293B] border-[#cbc2f3]';
      case 'Resolved':
        return 'bg-[#D8F0E3] text-[#1E293B] border-[#bee4cd]';
      case 'Waiting for Response':
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
      case 'Closed':
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
      default:
        return 'bg-[#F1F5F9] text-[#1E293B] border-[#E2E8F0]';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border ${getStyle()} ${sizeClasses} whitespace-nowrap`}
    >
      {status}
    </span>
  );
};
