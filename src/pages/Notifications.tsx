import React from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  Inbox,
  ArrowRight,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';

interface NotificationsProps {
  onNavigate: (tab: string, ticketId?: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onNavigate }) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications
  } = useTickets();

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const getNotificationIcon = (type: string, isImportant?: boolean) => {
    if (isImportant) {
      return <AlertTriangle className="w-4 h-4 text-[#1E293B]" />;
    }
    switch (type) {
      case 'ticket_created':
        return <PlusCircle className="w-4 h-4 text-[#1E293B]" />;
      case 'ticket_resolved':
        return <CheckCircle2 className="w-4 h-4 text-[#1E293B]" />;
      case 'reply_added':
        return <MessageSquare className="w-4 h-4 text-[#1E293B]" />;
      default:
        return <Bell className="w-4 h-4 text-[#1E293B]" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
            Notifications
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Stay updated on ticket creations, status transitions, and replies.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-medium text-[#1E293B] transition-colors shadow-xs cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all as read</span>
              </button>
            )}

            <button
              onClick={clearAllNotifications}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#FFF1F2] text-xs font-medium text-[#64748B] hover:text-[#9F1239] transition-colors shadow-xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear all</span>
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto mb-3">
            <Inbox className="w-6 h-6 text-[#64748B]" />
          </div>
          <h3 className="font-heading font-semibold text-base text-[#1E293B]">
            No new notifications
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-sm mx-auto">
            You are all caught up! Updates regarding your tickets or replies will appear right here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(item => {
            const isUrgentOrImportant = item.isImportant;

            return (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationAsRead(item.id);
                  if (item.ticketId) {
                    onNavigate('ticket_details', item.ticketId);
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  // Important notifications use Soft Pink #F4DDE7
                  isUrgentOrImportant
                    ? 'bg-[#F4DDE7]/40 border-[#e8c6d6] hover:bg-[#F4DDE7]/60'
                    : item.isRead
                    ? 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]'
                    : 'bg-white border-[#CFE8FF] ring-1 ring-[#CFE8FF] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {/* Icon container */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isUrgentOrImportant
                          ? 'bg-[#F4DDE7] text-[#1E293B] border border-[#e8c6d6]'
                          : 'bg-[#CFE8FF] text-[#1E293B] border border-[#b5dbfc]'
                      }`}
                    >
                      {getNotificationIcon(item.type, item.isImportant)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#1E293B]">
                          {item.title}
                        </h4>
                        {isUrgentOrImportant && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#F4DDE7] text-[#1E293B] border border-[#e8c6d6]">
                            Attention
                          </span>
                        )}
                        {!item.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#1E293B]"></span>
                        )}
                      </div>

                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-[11px] text-[#64748B]">
                        <span>{formatDate(item.timestamp)}</span>
                        {item.ticketId && (
                          <>
                            <span>·</span>
                            <span className="font-mono text-[#1E293B] font-medium">
                              {item.ticketId}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.ticketId && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        markNotificationAsRead(item.id);
                        onNavigate('ticket_details', item.ticketId);
                      }}
                      className="shrink-0 p-1.5 rounded-md hover:bg-black/5 text-[#64748B] hover:text-[#1E293B]"
                      title="View ticket"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
