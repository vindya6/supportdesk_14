import React from 'react';
import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  Inbox,
  Clock,
  MessageSquare,
  Bell,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface WelcomeLandingProps {
  onGetStarted: () => void;
  onCreateTicket: () => void;
  onGoToHelp: () => void;
  onGoToSubjects: () => void;
  onGoToFutureScope: () => void;
}

export const WelcomeLanding: React.FC<WelcomeLandingProps> = ({
  onGetStarted,
  onCreateTicket,
  onGoToHelp,
  onGoToSubjects,
  onGoToFutureScope
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#1E293B]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#DCD6F7] border border-[#CBC2F3] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#1E293B]" />
            </div>
            <span className="font-heading font-bold text-xl text-[#1E293B] tracking-tight">
              SupportDesk
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#64748B]">
            <a href="#features" className="hover:text-[#1E293B] transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-[#1E293B] transition-colors">
              How It Works
            </a>
            <button onClick={onGoToSubjects} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Subjects (DBMS...)
            </button>
            <button onClick={onGoToFutureScope} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Future Scope (AI)
            </button>
            <button onClick={onGoToHelp} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Help & FAQ
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onCreateTicket}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1E293B] bg-white border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Ticket</span>
            </button>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1E293B] bg-[#CFE8FF] border border-[#b5dbfc] rounded-lg hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#DCD6F7]/60 border border-[#CBC2F3] text-xs font-medium text-[#1E293B]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Modern Customer Support & Ticketing System</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#1E293B] tracking-tight leading-tight">
                Clear, organized customer support for modern teams.
              </h1>

              <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
                A streamlined ticketing platform for organizations, universities, startups, and service providers. Track issues effortlessly, resolve requests faster, and maintain transparent conversations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onGetStarted}
                  className="px-6 py-3 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onCreateTicket}
                  className="px-6 py-3 rounded-lg bg-white border border-[#E2E8F0] text-sm font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-[#64748B]" />
                  <span>Create a Ticket</span>
                </button>

                <button
                  onClick={onGoToSubjects}
                  className="px-4 py-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:text-[#1E293B] hover:bg-white transition-colors cursor-pointer"
                >
                  <span>Academic Foundations</span>
                </button>

                <button
                  onClick={onGoToFutureScope}
                  className="px-4 py-3 rounded-lg bg-[#CFE8FF]/60 border border-[#b5dbfc] text-sm font-medium text-[#1E293B] hover:bg-[#CFE8FF] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Future Scope (AI)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-white border border-[#E2E8F0] shadow-sm p-3 overflow-hidden">
                <img
                  src="/src/assets/images/support_hero_graphic_1790493427539.jpg"
                  alt="SupportDesk modern support desk visual illustration"
                  className="w-full h-auto rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container if image fails
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.img-fallback');
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                />
                <div className="img-fallback hidden w-full h-64 rounded-xl bg-[#F8FAFC] flex-col items-center justify-center p-6 text-center border border-[#E2E8F0]">
                  <Sparkles className="w-10 h-10 text-[#64748B] mb-2" />
                  <p className="font-heading font-semibold text-[#1E293B]">SupportDesk Support Hub</p>
                  <p className="text-xs text-[#64748B]">Professional ticket management interface</p>
                </div>

                {/* Subtle Floating Status Pill on Hero */}
                <div className="mt-3 bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1E293B]"></span>
                    <span className="font-medium text-[#1E293B]">System Operational</span>
                  </div>
                  <span className="text-[#64748B]">Response time &lt; 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="py-16 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] tracking-tight">
              Purpose-built support capabilities
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#64748B]">
              Engineered with clean pastel ergonomics so your customers and support agents stay focused on fast resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#CBC2F3] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] flex items-center justify-center mb-4">
                <Inbox className="w-5 h-5 text-[#1E293B]" />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-1.5">
                Easy Ticket Management
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Submit, filter, search, and categorize issues with clear priority levels and instant local tracking IDs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#CBC2F3] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#DCD6F7] border border-[#CBC2F3] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-[#1E293B]" />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-1.5">
                Faster Support
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Streamlined triage workflows and quick status switches (Open, In Progress, Resolved) reduce turnaround latency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#CBC2F3] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#D8F0E3] border border-[#bee4cd] flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-[#1E293B]" />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-1.5">
                Organized Conversations
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Threaded chronological message histories clearly distinguish customer inquiries from verified agent solutions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#CBC2F3] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#F4DDE7] border border-[#e8c6d6] flex items-center justify-center mb-4">
                <Bell className="w-5 h-5 text-[#1E293B]" />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-1.5">
                Support Tracking
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Stay updated on responses, status adjustments, and high-priority alerts with automated local notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="workflow" className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] tracking-tight">
              How SupportDesk works
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#64748B]">
              Three straightforward steps from initial inquiry to verified resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-[#CFE8FF] text-[#1E293B] font-bold text-xs flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-2">
                Submit Your Ticket
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Select your issue category, assign an urgency priority, describe the request, and attach reference files.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-[#DCD6F7] text-[#1E293B] font-bold text-xs flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-2">
                Collaborate in Real-Time
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Exchange comments with dedicated support specialists inside an organized, threaded communication timeline.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-[#D8F0E3] text-[#1E293B] font-bold text-xs flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-2">
                Track and Resolve
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Receive notifications when tickets are resolved or updated, with transparent history archived locally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applicability Banner */}
      <section className="py-12 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
                Ready to manage support requests efficiently?
              </h3>
              <p className="text-sm text-[#64748B] max-w-xl">
                Deployable for organizations, universities, tech startups, agencies, and service providers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onGetStarted}
                className="px-5 py-2.5 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Enter Support Portal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white border-t border-[#E2E8F0] text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#DCD6F7] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#1E293B]" />
            </div>
            <span className="font-semibold text-[#1E293B]">SupportDesk Platform</span>
            <span>— Minimal, clean, pastel ticketing system</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onGoToSubjects} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Subjects (DBMS, DMGT...)
            </button>
            <button onClick={onGoToFutureScope} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Future Scope (AI & LLMs)
            </button>
            <button onClick={onGoToHelp} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Help Center
            </button>
            <button onClick={onCreateTicket} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              New Ticket
            </button>
            <button onClick={onGetStarted} className="hover:text-[#1E293B] transition-colors cursor-pointer">
              Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
