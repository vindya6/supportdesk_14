import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, TicketStatus, TicketPriority, TicketCategory, TicketMessage, NotificationItem, UserProfile, UserRole, Attachment } from '../types/ticket';
import { INITIAL_DEMO_TICKETS, INITIAL_DEMO_NOTIFICATIONS } from '../data/demoData';

interface TicketContextType {
  tickets: Ticket[];
  notifications: NotificationItem[];
  userProfile: UserProfile;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  createTicket: (data: {
    subject: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    requesterEmail: string;
    attachments?: Attachment[];
  }) => Ticket;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  updateTicketPriority: (ticketId: string, priority: TicketPriority) => void;
  addMessage: (ticketId: string, content: string, attachments?: Attachment[]) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;
  loadDemoData: () => void;
  clearAllTickets: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.m@example.org',
  role: 'Customer',
  organization: 'Acme Enterprise'
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from localStorage or start empty
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const saved = localStorage.getItem('supportdesk_tickets') || localStorage.getItem('auradesk_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading tickets from localStorage', e);
    }
    // Per requirement #15: "Prefer starting with an empty ticket state."
    return [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('supportdesk_notifications') || localStorage.getItem('auradesk_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading notifications from localStorage', e);
    }
    return [];
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('supportdesk_profile') || localStorage.getItem('auradesk_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading profile from localStorage', e);
    }
    return DEFAULT_PROFILE;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('supportdesk_tickets', JSON.stringify(tickets));
    } catch (e) {
      console.error('Error saving tickets', e);
    }
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem('supportdesk_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Error saving notifications', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('supportdesk_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error('Error saving profile', e);
    }
  }, [userProfile]);

  const setActiveRole = (role: UserRole) => {
    setUserProfile(prev => ({ ...prev, role }));
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
  };

  const generateTicketId = () => {
    const existingNums = tickets
      .map(t => {
        const match = t.id.match(/TCK-(\d+)/);
        return match ? parseInt(match[1], 10) : 1000;
      })
      .filter(n => !isNaN(n));
    const maxNum = existingNums.length > 0 ? Math.max(...existingNums) : 1000;
    return `TCK-${maxNum + 1}`;
  };

  const createTicket = (data: {
    subject: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    requesterEmail: string;
    attachments?: Attachment[];
  }): Ticket => {
    const newId = generateTicketId();
    const now = new Date().toISOString();

    const initialMessage: TicketMessage = {
      id: `msg-${Date.now()}`,
      senderName: userProfile.name,
      senderRole: userProfile.role,
      senderEmail: data.requesterEmail,
      content: data.description,
      createdAt: now,
      attachments: data.attachments
    };

    const newTicket: Ticket = {
      id: newId,
      subject: data.subject,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: 'Open',
      requesterName: userProfile.name,
      requesterEmail: data.requesterEmail,
      organization: userProfile.organization,
      assignedAgent: 'Unassigned',
      createdAt: now,
      updatedAt: now,
      messages: [initialMessage],
      attachments: data.attachments || [],
      isDemo: false
    };

    setTickets(prev => [newTicket, ...prev]);

    // Create notification
    const isImportant = data.priority === 'Urgent' || data.priority === 'High';
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      ticketId: newId,
      title: isImportant ? 'Urgent Ticket Submitted' : 'Ticket Created Successfully',
      message: `Ticket ${newId} (${data.subject}) has been opened.`,
      timestamp: now,
      isRead: false,
      isImportant,
      type: 'ticket_created'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newTicket;
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus) => {
    const now = new Date().toISOString();
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, status, updatedAt: now } : t))
    );

    const isResolved = status === 'Resolved';
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      ticketId,
      title: isResolved ? 'Ticket Resolved' : `Ticket Status: ${status}`,
      message: `Status of ticket ${ticketId} changed to ${status}.`,
      timestamp: now,
      isRead: false,
      isImportant: isResolved,
      type: isResolved ? 'ticket_resolved' : 'status_updated'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateTicketPriority = (ticketId: string, priority: TicketPriority) => {
    const now = new Date().toISOString();
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, priority, updatedAt: now } : t))
    );
  };

  const addMessage = (ticketId: string, content: string, attachments?: Attachment[]) => {
    const now = new Date().toISOString();
    const newMsg: TicketMessage = {
      id: `msg-${Date.now()}`,
      senderName: userProfile.name,
      senderRole: userProfile.role,
      senderEmail: userProfile.email,
      content,
      createdAt: now,
      attachments
    };

    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          // If customer replies, set status to Open/In Progress if closed
          let nextStatus = t.status;
          if (userProfile.role === 'Customer' && (t.status === 'Resolved' || t.status === 'Closed')) {
            nextStatus = 'Open';
          } else if (userProfile.role !== 'Customer' && t.status === 'Open') {
            nextStatus = 'In Progress';
          }
          return {
            ...t,
            status: nextStatus,
            updatedAt: now,
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      ticketId,
      title: `New Reply on ${ticketId}`,
      message: `${userProfile.name} (${userProfile.role}) added a new response.`,
      timestamp: now,
      isRead: false,
      isImportant: false,
      type: 'reply_added'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const loadDemoData = () => {
    setTickets(INITIAL_DEMO_TICKETS);
    setNotifications(INITIAL_DEMO_NOTIFICATIONS);
  };

  const clearAllTickets = () => {
    setTickets([]);
    setNotifications([]);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        notifications,
        userProfile,
        activeRole: userProfile.role,
        setActiveRole,
        updateUserProfile,
        createTicket,
        updateTicketStatus,
        updateTicketPriority,
        addMessage,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearAllNotifications,
        loadDemoData,
        clearAllTickets
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
