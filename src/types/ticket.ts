export type TicketStatus = 'Open' | 'In Progress' | 'Waiting for Response' | 'Resolved' | 'Closed';

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TicketCategory =
  | 'Technical Issue'
  | 'Account & Login'
  | 'Billing'
  | 'Product/Service'
  | 'General Question'
  | 'Other';

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface TicketMessage {
  id: string;
  senderName: string;
  senderRole: 'Customer' | 'Support Agent' | 'Admin';
  senderEmail: string;
  content: string;
  createdAt: string;
  attachments?: Attachment[];
}

export interface Ticket {
  id: string; // e.g. TCK-1001
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  requesterName: string;
  requesterEmail: string;
  assignedAgent?: string;
  organization?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
  attachments?: Attachment[];
  isDemo?: boolean;
}

export type UserRole = 'Customer' | 'Support Agent' | 'Admin';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  organization: string;
}

export interface NotificationItem {
  id: string;
  ticketId?: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isImportant?: boolean;
  type: 'ticket_created' | 'status_updated' | 'reply_added' | 'ticket_resolved' | 'system';
}
