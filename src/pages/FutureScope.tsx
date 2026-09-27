import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Cpu,
  Layers,
  FileSearch,
  MessageSquare,
  Shield,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Workflow,
  Globe,
  Camera,
  LineChart
} from 'lucide-react';

interface FutureScopeProps {
  onNavigate: (tab: string) => void;
}

interface ScopeFeature {
  id: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderColor: string;
  techStack: string[];
  capabilities: string[];
  expectedImpact: string;
  architectureWorkflow: string;
}

export const FutureScope: React.FC<FutureScopeProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const features: ScopeFeature[] = [
    {
      id: 'triage',
      title: 'Automated Ticket Triage & Smart Zero-Shot Routing',
      tagline: 'Instant NLP categorization, sentiment detection, and skill-based agent matching.',
      icon: Workflow,
      accentColor: 'bg-[#CFE8FF]',
      borderColor: 'border-[#b5dbfc]',
      techStack: ['LLM Embeddings', 'Function Calling', 'Vector Database', 'Zero-Shot Classifier'],
      capabilities: [
        'Analyzes free-form user descriptions at the exact millisecond of ticket creation.',
        'Automatically assigns the accurate Category, Priority, and Department tag without human pre-sorting.',
        'Detects customer sentiment (frustration, emergency, neutral) and dynamically elevates ticket urgency.',
        'Routes tickets directly to the agent with the highest domain track record for that specific technical stack.'
      ],
      expectedImpact: 'Reduces ticket first-response latency by up to 68% and eliminates manual routing overhead.',
      architectureWorkflow:
        'User Submits Ticket → LLM Evaluates Intent & Urgency → Generates Metadata JSON → Triggers Priority Event'
    },
    {
      id: 'rag',
      title: 'RAG-Powered Instant Self-Resolution Engine',
      tagline: 'Retrieval Augmented Generation grounded in institutional knowledge bases.',
      icon: FileSearch,
      accentColor: 'bg-[#DCD6F7]',
      borderColor: 'border-[#CBC2F3]',
      techStack: ['RAG Pipeline', 'Semantic Vector Search', 'Knowledge Graph', 'Cosine Similarity'],
      capabilities: [
        'Searches enterprise policies, technical FAQs, past resolved tickets, and user manuals in vector space.',
        'Generates factual, step-by-step resolution proposals directly to the customer prior to human agent intervention.',
        'Enforces hallucination guardrails: if confidence is below 85%, seamlessly defers to human specialist.',
        'Allows the customer to confirm "Did this resolve your problem?", instantly closing the ticket if solved.'
      ],
      expectedImpact: 'Deflects 40–50% of routine Tier-1 inquiries (e.g. password resets, billing receipts, network configs).',
      architectureWorkflow:
        'Inquiry Vectorized → Knowledge Chunks Retrieved → LLM Synthesizes Verified Solution → Human Escalation Fallback'
    },
    {
      id: 'copilot',
      title: 'Support Agent AI Copilot & Thread Summarizer',
      tagline: 'Assisted reply drafting, thread summarization, and contextual solution suggestions.',
      icon: Bot,
      accentColor: 'bg-[#D8F0E3]',
      borderColor: 'border-[#bee4cd]',
      techStack: ['Instruction-Tuned LLMs', 'Contextual Few-Shot Prompting', 'Tone Rewriter'],
      capabilities: [
        'Condenses long multi-turn ticket threads into an executive 3-bullet handover summary for incoming agents.',
        'One-click draft generation taking into account previous interactions and company brand tone.',
        'Tone calibration controls: Transform technical jargon into empathetic, customer-friendly prose.',
        'Proactive suggestion of troubleshooting code snippets, diagnostic links, and relevant documentation.'
      ],
      expectedImpact: 'Boosts support agent resolution throughput by 2.5x while minimizing burnout and typo errors.',
      architectureWorkflow:
        'Agent Views Ticket → Copilot Parses History → Generates Suggested Draft & Summary → Agent Reviews & Dispatches'
    },
    {
      id: 'predictive',
      title: 'Predictive Outage & Churn Anomaly Detection',
      tagline: 'Clustering recurring issues to detect live platform outages and at-risk accounts.',
      icon: LineChart,
      accentColor: 'bg-[#F4DDE7]',
      borderColor: 'border-[#e8c6d6]',
      techStack: ['Density Clustering (HDBSCAN)', 'Anomaly Detection', 'Time-Series Regression'],
      capabilities: [
        'Clusters incoming tickets in real time to spot emerging incidents (e.g. sudden surge in "Login 500 error").',
        'Automatically creates a Master Incident Ticket and links all related customer submissions to avoid duplicate effort.',
        'Monitors customer satisfaction velocity to flag churn risks before customers cancel subscriptions.',
        'Sends real-time Slack/Teams webhooks to engineering DevOps when systemic errors spike.'
      ],
      expectedImpact: 'Shortens Mean Time to Detection (MTTD) for system outages from hours to under 3 minutes.',
      architectureWorkflow:
        'Ticket Stream Ingested → Real-time Topic Embedding Clustering → Spike Anomaly Detected → Ops Alert Dispatched'
    },
    {
      id: 'multimodal',
      title: 'Multimodal Vision & Log Diagnostics',
      tagline: 'Direct OCR, visual error parsing, and server log analysis using multimodal models.',
      icon: Camera,
      accentColor: 'bg-[#CFE8FF]',
      borderColor: 'border-[#b5dbfc]',
      techStack: ['Multimodal LLMs (Gemini / Vision)', 'OCR Document Parser', 'Log File Tokenizer'],
      capabilities: [
        'Extracts error codes, network headers, and stack traces directly from uploaded screenshot attachments.',
        'Parses multi-megabyte log files to isolate exact exception line numbers without human manual scanning.',
        'Recognizes browser console errors and automatically queries GitHub issue trackers for known patches.',
        'Validates visual discrepancies in UI layout bug submissions across mobile and desktop captures.'
      ],
      expectedImpact: 'Eliminates repetitive back-and-forth asking customers for error messages and console logs.',
      architectureWorkflow:
        'Customer Attaches Screenshot → Vision LLM Extracts Exception & Environment → Injects Diagnostics into Ticket Thread'
    },
    {
      id: 'global',
      title: 'Real-Time Multilingual Cross-Language Relay',
      tagline: 'Seamless bidirectional translation between customers and global support teams.',
      icon: Globe,
      accentColor: 'bg-[#DCD6F7]',
      borderColor: 'border-[#CBC2F3]',
      techStack: ['Neural Machine Translation', 'Domain-Specific Terminology Dictionaries', 'Locale Adapters'],
      capabilities: [
        'Enables customers to write in over 80+ global languages while agents read and respond in English (or vice versa).',
        'Preserves technical product terms, function names, and company jargon without mistranslation.',
        'Maintains cultural nuances, polite phrasing, and locale-specific greeting conventions automatically.'
      ],
      expectedImpact: 'Enables 24/7 global customer reach without requiring localized multilingual support desks.',
      architectureWorkflow:
        'Foreign Query Received → Translated to Agent Native Tongue → Agent Replies → Translated to Customer Language'
    }
  ];

  const displayedFeatures =
    activeTab === 'all'
      ? features
      : features.filter(f => f.id === activeTab);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#CFE8FF]/80 border border-[#b5dbfc] text-xs font-semibold text-[#1E293B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Future Scope & Next-Gen Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B]">
              Enhancing SupportDesk with AI & LLMs
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
              Discover how integrating Large Language Models (LLMs), Retrieval Augmented Generation (RAG), and intelligent agent copilots can transform SupportDesk from a reactive ticketing system into a proactive, intelligent support ecosystem.
            </p>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#CFE8FF] border border-[#b5dbfc] text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#bce0ff] transition-all shadow-xs self-start md:self-auto cursor-pointer"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[#E2E8F0]">
          <span className="text-xs font-medium text-[#64748B] mr-1">Filter Roadmap:</span>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1E293B] text-white shadow-xs'
                : 'bg-[#F8FAFC] text-[#64748B] hover:bg-white hover:text-[#1E293B] border border-[#E2E8F0]'
            }`}
          >
            All 6 Innovations
          </button>
          {features.map(f => {
            const isSelected = activeTab === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveTab(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-white hover:text-[#1E293B] border border-[#E2E8F0]'
                }`}
              >
                {f.title.split(' ')[0]} {f.title.split(' ')[1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* High-Level AI Architecture Flow Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-2">
          Proposed Next-Gen AI System Architecture
        </h3>
        <p className="text-xs text-[#64748B] leading-relaxed mb-4">
          How modern LLM pipelines seamlessly embed into SupportDesk's event-driven state model without altering core local reliability:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] relative">
            <span className="text-xs font-mono font-bold text-[#1E293B] px-2 py-0.5 rounded bg-white border border-[#E2E8F0] inline-block mb-2">
              Phase 1
            </span>
            <h4 className="font-semibold text-xs sm:text-sm text-[#1E293B] mb-1">
              Smart Ingestion
            </h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Ticket text & screenshots are embedded into dense vectors. Real-time classification infers priority, sentiment, and category.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] relative">
            <span className="text-xs font-mono font-bold text-[#1E293B] px-2 py-0.5 rounded bg-white border border-[#E2E8F0] inline-block mb-2">
              Phase 2
            </span>
            <h4 className="font-semibold text-xs sm:text-sm text-[#1E293B] mb-1">
              RAG Knowledge Search
            </h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Queries internal knowledge articles & historical ticket database for verified resolutions with confidence scoring.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] relative">
            <span className="text-xs font-mono font-bold text-[#1E293B] px-2 py-0.5 rounded bg-white border border-[#E2E8F0] inline-block mb-2">
              Phase 3
            </span>
            <h4 className="font-semibold text-xs sm:text-sm text-[#1E293B] mb-1">
              Agent Copilot Synthesis
            </h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              If deflecting fails, the LLM presents the human agent with a structured summary, relevant docs, and a ready-to-send draft reply.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] relative">
            <span className="text-xs font-mono font-bold text-[#1E293B] px-2 py-0.5 rounded bg-white border border-[#E2E8F0] inline-block mb-2">
              Phase 4
            </span>
            <h4 className="font-semibold text-xs sm:text-sm text-[#1E293B] mb-1">
              Self-Learning Loop
            </h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Once a ticket is resolved, successful solutions are autonomously converted into indexed FAQ articles for future queries.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards Detailed Breakdown */}
      <div className="space-y-6">
        {displayedFeatures.map(feat => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8FAFC]/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${feat.accentColor} border ${feat.borderColor} flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    <Icon className="w-6 h-6 text-[#1E293B]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-[#1E293B]">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">{feat.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
                  {feat.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-white border border-[#E2E8F0] text-[#1E293B]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2.5">
                    Core Autonomous Capabilities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {feat.capabilities.map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1E293B] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow Execution Pipeline */}
                <div className="p-3.5 rounded-lg bg-white border border-[#E2E8F0]">
                  <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                    Pipeline Execution Flow
                  </span>
                  <div className="font-mono text-xs text-[#1E293B] bg-[#F8FAFC] p-2.5 rounded-md border border-[#E2E8F0]">
                    {feat.architectureWorkflow}
                  </div>
                </div>

                {/* Projected Business & Operational Outcome */}
                <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-[#D8F0E3]/40 border border-[#bee4cd] text-xs text-[#1E293B]">
                  <Sparkles className="w-4 h-4 text-[#1E293B] shrink-0" />
                  <span>
                    <strong>Projected Impact: </strong> {feat.expectedImpact}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Strategic Vision Callout */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-3">
        <h3 className="font-heading font-semibold text-base text-[#1E293B]">
          Human-in-the-Loop Philosophy
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          The goal of integrating LLMs into SupportDesk is not to replace human empathy, but to eliminate mechanical friction. By delegating repetitive triage, log scanning, and formatting to AI models, human support engineers are empowered to focus on complex technical challenges, strategic customer relationships, and platform reliability.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('subjects')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#1E293B] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Review Academic Subjects (DBMS, DMGT...)</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#CFE8FF] hover:bg-[#bce0ff] border border-[#b5dbfc] text-xs font-semibold text-[#1E293B] transition-colors cursor-pointer"
          >
            <span>Return to Support Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
