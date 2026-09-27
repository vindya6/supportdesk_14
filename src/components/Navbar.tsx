import React from 'react';
import { Menu, Bell, User, CheckCircle2 } from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { UserRole } from '../types/ticket';

interface NavbarProps {
  currentTab: string;
  onOpenMobileMenu: () => void;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onOpenMobileMenu,
  onSelectTab
}) => {
  const { userProfile, activeRole, setActiveRole, notifications } = useTickets();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard';
      case 'tickets':
        return 'My Tickets';
      case 'create':
        return 'Create Ticket';
      case 'notifications':
        return 'Notifications';
      case 'profile':
        return 'User Profile';
      case 'help':
        return 'Help Center';
      case 'admin':
        return 'Admin & Support Overview';
      case 'subjects':
        return 'Academic Subjects & Curriculum Integration';
      case 'future_scope':
        return 'Future Scope & AI/LLM Roadmap';
      default:
        return 'Support Portal';
    }
  };

  const roles: UserRole[] = ['Customer', 'Support Agent', 'Admin'];

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] hidden sm:inline">
            SupportDesk /
          </span>
          <h1 className="text-base sm:text-lg font-bold text-[#1E293B] font-heading">
            {getPageTitle(currentTab)}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Demo Role Selector */}
        <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-1">
          <span className="text-xs text-[#64748B] px-1 hidden md:inline font-medium">
            Role:
          </span>
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value as UserRole)}
            className="text-xs font-medium bg-transparent text-[#1E293B] focus:outline-hidden cursor-pointer px-1 py-0.5"
            aria-label="Switch prototype role"
          >
            {roles.map(r => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={() => onSelectTab('notifications')}
          className="relative p-2 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#F4DDE7] text-[#1E293B] text-[10px] font-bold flex items-center justify-center border border-[#e8c6d6]">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Profile Pill Button */}
        <button
          onClick={() => onSelectTab('profile')}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#CFE8FF] border border-[#b5dbfc] flex items-center justify-center text-[#1E293B] text-xs font-bold">
            {userProfile.name.charAt(0)}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-[#1E293B] leading-tight">
              {userProfile.name}
            </p>
            <p className="text-[11px] text-[#64748B] leading-tight">
              {userProfile.role}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};
