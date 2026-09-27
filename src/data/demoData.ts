import { Ticket, NotificationItem } from '../types/ticket';

export const INITIAL_DEMO_TICKETS: Ticket[] = [
  {
    id: 'TCK-1001',
    subject: 'Cannot access portal login on Chrome',
    description: 'When trying to sign in using Google SSO, the page gets stuck on a blank redirection screen. I have cleared cache and cookies but the issue persists.',
    category: 'Account & Login',
    priority: 'High',
    status: 'Open',
    requesterName: 'Alex Morgan',
    requesterEmail: 'alex.m@example.org',
    organization: 'Apex Solutions',
    assignedAgent: 'Support Team',
    createdAt: '2026-09-26T14:32:00Z',
    updatedAt: '2026-09-26T14:32:00Z',
    isDemo: true,
    attachments: [
      {
        id: 'att-1',
        name: 'login_error_screen.png',
        size: '142 KB',
        type: 'image/png'
      }
    ],
    messages: [
      {
        id: 'msg-1',
        senderName: 'Alex Morgan',
        senderRole: 'Customer',
        senderEmail: 'alex.m@example.org',
        content: 'When trying to sign in using Google SSO, the page gets stuck on a blank redirection screen. I have cleared cache and cookies but the issue persists.',
        createdAt: '2026-09-26T14:32:00Z'
      }
    ]
  },
  {
    id: 'TCK-1002',
    subject: 'Requesting updated tax invoice for Q3',
    description: 'Our accounting department requires the VAT breakdown on our September billing invoice. Could you please regenerate and send it to our finance email?',
    category: 'Billing',
    priority: 'Medium',
    status: 'In Progress',
    requesterName: 'Jordan Lee',
    requesterEmail: 'jordan.lee@domain.net',
    organization: 'Beacon Labs',
    assignedAgent: 'Finance Desk',
    createdAt: '2026-09-25T09:15:00Z',
    updatedAt: '2026-09-26T11:20:00Z',
    isDemo: true,
    messages: [
      {
        id: 'msg-2',
        senderName: 'Jordan Lee',
        senderRole: 'Customer',
        senderEmail: 'jordan.lee@domain.net',
        content: 'Our accounting department requires the VAT breakdown on our September billing invoice. Could you please regenerate and send it to our finance email?',
        createdAt: '2026-09-25T09:15:00Z'
      },
      {
        id: 'msg-3',
        senderName: 'Sarah Jenkins',
        senderRole: 'Support Agent',
        senderEmail: 'sarah.j@support.internal',
        content: 'Hello Jordan, I have notified our billing team to compile the itemized VAT statement. We will attach the revised PDF here once prepared.',
        createdAt: '2026-09-26T11:20:00Z'
      }
    ]
  },
  {
    id: 'TCK-1003',
    subject: 'Setup assistance for webhook endpoint notifications',
    description: 'We need confirmation on the IP range used for outbound webhook deliveries so our firewall can whitelist the incoming notifications.',
    category: 'Technical Issue',
    priority: 'Low',
    status: 'Resolved',
    requesterName: 'Taylor Reed',
    requesterEmail: 'treed@acme.edu',
    organization: 'Acme Institute',
    assignedAgent: 'Dev Support',
    createdAt: '2026-09-24T16:00:00Z',
    updatedAt: '2026-09-25T17:45:00Z',
    isDemo: true,
    messages: [
      {
        id: 'msg-4',
        senderName: 'Taylor Reed',
        senderRole: 'Customer',
        senderEmail: 'treed@acme.edu',
        content: 'We need confirmation on the IP range used for outbound webhook deliveries so our firewall can whitelist the incoming notifications.',
        createdAt: '2026-09-24T16:00:00Z'
      },
      {
        id: 'msg-5',
        senderName: 'David Chen',
        senderRole: 'Support Agent',
        senderEmail: 'david.c@support.internal',
        content: 'Hi Taylor, our static egress CIDR block is 198.51.100.0/24. All webhook payloads originate exclusively from this block.',
        createdAt: '2026-09-25T17:45:00Z'
      }
    ]
  }
];

export const INITIAL_DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    ticketId: 'TCK-1001',
    title: 'High Priority Ticket Created',
    message: 'Alex Morgan submitted high priority ticket TCK-1001: Cannot access portal login on Chrome.',
    timestamp: '2026-09-26T14:32:00Z',
    isRead: false,
    isImportant: true,
    type: 'ticket_created'
  },
  {
    id: 'notif-2',
    ticketId: 'TCK-1002',
    title: 'New Response on TCK-1002',
    message: 'Support Agent Sarah Jenkins replied to your billing inquiry.',
    timestamp: '2026-09-26T11:20:00Z',
    isRead: false,
    isImportant: false,
    type: 'reply_added'
  }
];
