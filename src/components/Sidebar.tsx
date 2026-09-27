import React from 'react';
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Bell,
  User,
  HelpCircle,
  ShieldCheck,
  Home,
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onGoToLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onGoToLanding
}) => {
  const { notifications, activeRole } = useTickets();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const isAdminOrAgent = activeRole === 'Admin' || activeRole === 'Support Agent';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tickets', label: 'My Tickets', icon: Ticket },
    { id: 'create', label: 'Create Ticket', icon: PlusCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadCount },
    { id: 'subjects', label: 'Subjects (DBMS, DMGT...)', icon: BookOpen },
    { id: 'future_scope', label: 'Future Scope (AI & LLMs)', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'help', label: 'Help', icon: HelpCircle },
    ...(isAdminOrAgent
      ? [{ id: 'admin', label: 'Admin Overview', icon: ShieldCheck, badge: activeRole }]
      : [])
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#DCD6F7] border-r border-[#CBC2F3] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:static'
        }`}
      >
        {/* Header / Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#CBC2F3]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/80 border border-[#CBC2F3] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#1E293B]" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-[#1E293B] tracking-tight">
                SupportDesk
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-md hover:bg-black/5 text-[#1E293B] transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Pill Indicator in Sidebar */}
        <div className="px-5 py-3 border-b border-[#CBC2F3]/60 bg-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#1E293B]/70 font-medium">Active Mode:</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/70 text-[#1E293B] border border-[#CBC2F3]">
              {activeRole}
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-white text-[#1E293B] shadow-xs font-semibold'
                    : 'text-[#1E293B]/85 hover:bg-white/40 hover:text-[#1E293B]'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1E293B]' : 'text-[#1E293B]/70'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#F4DDE7] text-[#1E293B] border border-[#e8c6d6] shrink-0">
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold rounded bg-white/80 text-[#1E293B] shrink-0">
                    {item.badge === 'Admin' ? 'Admin' : 'Agent'}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer action: HOME */}
        <div className="p-3 border-t border-[#CBC2F3]/80 space-y-1 bg-white/10">
          <button
            onClick={() => {
              onGoToLanding();
              onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-bold text-[#1E293B] hover:bg-white/50 transition-colors uppercase tracking-wide cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#1E293B]" />
            <span>HOME</span>
          </button>
        </div>
      </aside>
    </>
  );
};
