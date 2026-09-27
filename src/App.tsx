import React, { useState } from 'react';
import { TicketProvider } from './context/TicketContext';
import { WelcomeLanding } from './pages/WelcomeLanding';
import { Dashboard } from './pages/Dashboard';
import { MyTickets } from './pages/MyTickets';
import { CreateTicket } from './pages/CreateTicket';
import { TicketDetails } from './pages/TicketDetails';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { AdminOverview } from './pages/AdminOverview';
import { HelpCenter } from './pages/HelpCenter';
import { Subjects } from './pages/Subjects';
import { FutureScope } from './pages/FutureScope';
import { NotFound } from './pages/NotFound';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';

type AppView = 'landing' | 'app';

function MainApp() {
  // Requirement #1: When the website is opened, DO NOT immediately show the ticket dashboard or ticket list!
  // The first screen must be a professional Welcome / Landing Page.
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (tab: string, ticketId?: string) => {
    if (ticketId) {
      setSelectedTicketId(ticketId);
      setCurrentTab('ticket_details');
    } else {
      setCurrentTab(tab);
    }
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    setCurrentTab('dashboard');
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateTicketFromLanding = () => {
    setCurrentTab('create');
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToHelpFromLanding = () => {
    setCurrentTab('help');
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToSubjectsFromLanding = () => {
    setCurrentTab('subjects');
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToFutureScopeFromLanding = () => {
    setCurrentTab('future_scope');
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Landing Page view, render the first screen Welcome / Landing Page
  if (currentView === 'landing') {
    return (
      <WelcomeLanding
        onGetStarted={handleGetStarted}
        onCreateTicket={handleCreateTicketFromLanding}
        onGoToHelp={handleGoToHelpFromLanding}
        onGoToSubjects={handleGoToSubjectsFromLanding}
        onGoToFutureScope={handleGoToFutureScopeFromLanding}
      />
    );
  }

  // Inside the main SaaS application
  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'tickets':
        return <MyTickets onNavigate={handleNavigate} />;
      case 'create':
        return <CreateTicket onNavigate={handleNavigate} />;
      case 'ticket_details':
        return (
          <TicketDetails
            ticketId={selectedTicketId || ''}
            onBack={() => setCurrentTab('tickets')}
            onNavigate={handleNavigate}
          />
        );
      case 'notifications':
        return <Notifications onNavigate={handleNavigate} />;
      case 'subjects':
        return <Subjects onNavigate={handleNavigate} />;
      case 'future_scope':
        return <FutureScope onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <AdminOverview onNavigate={handleNavigate} />;
      case 'help':
        return <HelpCenter onNavigate={handleNavigate} />;
      default:
        return <NotFound onReturnToDashboard={() => setCurrentTab('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#1E293B]">
      {/* Sidebar: Lavender #DCD6F7 */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={tab => {
          setCurrentTab(tab);
          setSelectedTicketId(null);
        }}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onGoToLanding={() => setCurrentView('landing')}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          currentTab={currentTab}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onSelectTab={tab => {
            setCurrentTab(tab);
            setSelectedTicketId(null);
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TicketProvider>
      <MainApp />
    </TicketProvider>
  );
}
