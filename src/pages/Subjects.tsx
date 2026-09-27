import React, { useState } from 'react';
import {
  Database,
  Binary,
  Code2,
  GitBranch,
  Terminal,
  BookOpen,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface SubjectsProps {
  onNavigate: (tab: string) => void;
}

interface SubjectDetail {
  id: string;
  code: string;
  name: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderColor: string;
  coreConcepts: string[];
  howUsed: {
    title: string;
    description: string;
    concreteExample: string;
  }[];
  projectImpact: string;
}

export const Subjects: React.FC<SubjectsProps> = ({ onNavigate }) => {
  const [activeSubject, setActiveSubject] = useState<string>('all');

  const subjects: SubjectDetail[] = [
    {
      id: 'dbms',
      code: 'DBMS',
      name: 'Database Management Systems',
      tagline: 'Relational data modeling, schema normalization, ACID compliance, and indexing.',
      icon: Database,
      accentColor: 'bg-[#CFE8FF]',
      borderColor: 'border-[#b5dbfc]',
      coreConcepts: [
        'Entity-Relationship (ER) Modeling',
        'Primary & Foreign Key Constraints',
        'ACID Properties & Transactional Integrity',
        'Normalization (1NF, 2NF, 3NF)',
        'Index-Accelerated Query Execution'
      ],
      howUsed: [
        {
          title: 'Relational Entity Modeling',
          description:
            'The project models structured relationships between Tickets, Users, Messages, Categories, and Attachments. Each Ticket has a 1-to-many relationship with conversation messages and a many-to-1 relationship with the ticket requester.',
          concreteExample:
            'Ticket table structure: Primary Key (id: TCK-1001), Foreign references (requesterEmail, assignedAgent), and cascading child records (messages[]).'
        },
        {
          title: 'State Serialization & ACID Principles',
          description:
            'State transitions (e.g. changing status from Open to Resolved or appending a reply) are atomic and consistent. In our application, this mirrors transactional updates to guarantee no partial or corrupted records.',
          concreteExample:
            'When a reply is added, both the message log and the ticket’s updatedAt timestamp and notification queue update atomically in a unified state dispatch.'
        },
        {
          title: 'Indexed Queries & Filter Operations',
          description:
            'Filtering tickets by status, category, or priority simulates SQL WHERE clauses (e.g. `SELECT * FROM Tickets WHERE status="Open" AND priority="High"`), optimized for rapid lookup.',
          concreteExample:
            'Fast dictionary lookups and memoized filtering prevent redundant full-table re-evaluations.'
        }
      ],
      projectImpact:
        'DBMS provided the conceptual architectural blueprint for clean relational schemas, data persistence consistency, and entity separation without data redundancy.'
    },
    {
      id: 'dmgt',
      code: 'DMGT',
      name: 'Discrete Mathematics & Graph Theory',
      tagline: 'Finite state automata, predicate logic, relations, and directed conversation graphs.',
      icon: Binary,
      accentColor: 'bg-[#DCD6F7]',
      borderColor: 'border-[#CBC2F3]',
      coreConcepts: [
        'Finite State Machines (FSM / Automata)',
        'Propositional & Predicate Calculus',
        'Equivalence Relations & Set Partitions',
        'Directed Acyclic Graphs (DAGs)',
        'Combinatorics & Permutations'
      ],
      howUsed: [
        {
          title: 'Finite State Machine for Ticket Lifecycles',
          description:
            'The progression of a ticket follows a formal Finite State Automaton (FSM). Valid transitions are strictly defined: Open -> In Progress -> Waiting for Response -> Resolved -> Closed, with specific transition triggers.',
          concreteExample:
            'A customer reply from Resolved state triggers a deterministic state transition back to Open: δ(Resolved, CustomerReply) = Open.'
        },
        {
          title: 'Boolean Predicate Logic for Filter Engines',
          description:
            'The search and filter matrix evaluates complex truth values using conjunctions (∧), disjunctions (∨), and negations (¬) across search queries, status filters, and role permissions.',
          concreteExample:
            'VisibleTickets = {t ∈ T | (matchesQuery(t) ∧ (status = "All" ∨ t.status = status) ∧ (priority = "All" ∨ t.priority = priority))}.'
        },
        {
          title: 'Equivalence Relations & Directed Message Graphs',
          description:
            'Tickets partition the universal set of issues into disjoint equivalence classes by category and status. Chronological replies form a directed tree graph where each reply node references the root issue.',
          concreteExample:
            'Partitioning tickets into mutually exclusive sets: T/Status = {[Open], [In Progress], [Resolved], [Closed]}.'
        }
      ],
      projectImpact:
        'DMGT ensured mathematical precision in state transitions, preventing invalid ticket states and guaranteeing rigorous multi-attribute boolean filtering.'
    },
    {
      id: 'oopj',
      code: 'OOPJ',
      name: 'Object-Oriented Programming (Java / OOP)',
      tagline: 'Encapsulation, abstraction, role-based polymorphism, and modular architecture.',
      icon: Code2,
      accentColor: 'bg-[#D8F0E3]',
      borderColor: 'border-[#bee4cd]',
      coreConcepts: [
        'Encapsulation & Data Hiding',
        'Role-Based Polymorphism',
        'Abstraction & Interface Contracts',
        'Single Responsibility Principle (SOLID)',
        'Factory & Observer Patterns'
      ],
      howUsed: [
        {
          title: 'Encapsulation & Domain Models',
          description:
            'Data structures for Ticket, TicketMessage, UserProfile, and NotificationItem are defined as strict TypeScript interfaces mirroring Java class blueprints with private mutations handled via dedicated controller functions.',
          concreteExample:
            'Internal message arrays and timestamps cannot be directly modified without passing through the validated addMessage() and updateTicketStatus() handlers.'
        },
        {
          title: 'Polymorphism & Role Access Control',
          description:
            'Different user roles (Customer, Support Agent, Admin) exhibit polymorphic behavior: they interact with the same ticket entity but have access to distinct methods and elevated capabilities.',
          concreteExample:
            'An Agent role unlocks AdminOverview views, inline priority mutations, and reassignment controls, whereas a Customer role is scoped to submission and reopening.'
        },
        {
          title: 'Observer Pattern & Event Dispatch',
          description:
            'When ticket events happen, listeners are notified automatically, updating notification badges, unread tallies, and dashboard summaries in real time.',
          concreteExample:
            'The TicketProvider acts as a centralized Subject notifying Subscriber components (Navbar bell, Dashboard counts, TicketDetails) whenever state changes.'
        }
      ],
      projectImpact:
        'OOPJ principles resulted in reusable, decoupled, and maintainable software components with clean separation of concerns.'
    },
    {
      id: 'adsa',
      code: 'ADSA',
      name: 'Advanced Data Structures & Algorithms',
      tagline: 'Priority queues, heap orders, search indexing, time complexity optimization, and sorting.',
      icon: GitBranch,
      accentColor: 'bg-[#F4DDE7]',
      borderColor: 'border-[#e8c6d6]',
      coreConcepts: [
        'Priority Queues & Max-Heaps',
        'Time & Space Complexity (Big-O)',
        'Inverted Search & Substring Matching',
        'Linear & Doubly Linked Conversation Logs',
        'Stable Multi-Key Sorting'
      ],
      howUsed: [
        {
          title: 'Priority Queue Triage Simulation',
          description:
            'Support tickets are triaged based on priority weights (Urgent = 4, High = 3, Medium = 2, Low = 1). In high-volume systems, this corresponds to a Binary Max-Heap prioritizing critical tickets in O(log n) time.',
          concreteExample:
            'Sorting tickets by priority uses custom comparator algorithms to ensure Urgent incidents always bubble to the top of the queue for immediate agent triage.'
        },
        {
          title: 'Efficient Substring Search & Pattern Matching',
          description:
            'Searching through ticket IDs, subjects, and descriptions utilizes linear and tokenized string matching, minimizing search latency on client-side datasets.',
          concreteExample:
            'Search normalization converts tokens to lowercase and performs parallel substring evaluation across multiple field keys.'
        },
        {
          title: 'Algorithmic Complexity Optimization',
          description:
            'Stat aggregation (counts for Open, In Progress, Resolved) is computed in a single O(n) pass rather than multiple O(n) filtering iterations, preserving performance.',
          concreteExample:
            'Category distribution calculates exact percentages using a single reduce pass over the ticket collection.'
        }
      ],
      projectImpact:
        'ADSA guided the algorithmic efficiency of ticket ordering, priority escalation, fast search indexing, and real-time metric aggregations.'
    },
    {
      id: 'python',
      code: 'PYTHON',
      name: 'Python Programming',
      tagline: 'Automation scripting, regex text validation, data parsing, and future AI triage microservices.',
      icon: Terminal,
      accentColor: 'bg-[#CFE8FF]',
      borderColor: 'border-[#b5dbfc]',
      coreConcepts: [
        'Data Cleaning & Text Sanitization',
        'Regex Pattern Matching & Validation',
        'JSON / Dictionary Data Serializers',
        'Automated Scripting & Mock Pipelines',
        'Microservice Architecture & NLP Triage'
      ],
      howUsed: [
        {
          title: 'String Sanitization & Regex Email Validation',
          description:
            'Form inputs for requester emails and ticket subjects incorporate sanitization and validation patterns standard in Python web frameworks (such as FastAPI and Django).',
          concreteExample:
            'Email validation logic mirrors Python’s `re.match(r"[^@]+@[^@]+\\.[^@]+", email)` ensuring clean data ingest.'
        },
        {
          title: 'Dictionary Manipulation & JSON Serialization',
          description:
            'Managing ticket objects, message threads, and notification payloads reflects Pythonic dictionary handling (`dict.get()`, list comprehensions, and JSON serialization).',
          concreteExample:
            'Transforming tickets for export and storage follows Python’s structured dictionary representations with clear key-value schemas.'
        },
        {
          title: 'Automation & Intelligent Routing Architecture',
          description:
            'Python’s ecosystem (scikit-learn, NLTK, spaCy) provides the theoretical foundation for automated category classification and ticket sentiment analysis in enterprise support centers.',
          concreteExample:
            'Categorization by keywords (e.g. "billing", "login", "API") models rule-based NLP classification pipelines commonly written in Python.'
        }
      ],
      projectImpact:
        'Python concepts reinforced clean data validation, rapid prototyping of parsing logic, and architectural readiness for automated categorization pipelines.'
    }
  ];

  const displayedSubjects =
    activeSubject === 'all'
      ? subjects
      : subjects.filter(s => s.id === activeSubject);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#DCD6F7]/60 border border-[#CBC2F3] text-xs font-semibold text-[#1E293B]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum & Academic Foundations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B]">
              Academic Subjects in SupportDesk
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
              Explore how core Computer Science subjects — <strong>DBMS</strong>, <strong>DMGT</strong>, <strong>OOPJ</strong>, <strong>ADSA</strong>, and <strong>PYTHON</strong> — directly influenced, structured, and powered the design and construction of this customer support platform.
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

        {/* Subject Quick Tabs Filter */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[#E2E8F0]">
          <span className="text-xs font-medium text-[#64748B] mr-1">Filter Subject:</span>
          <button
            onClick={() => setActiveSubject('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubject === 'all'
                ? 'bg-[#1E293B] text-white shadow-xs'
                : 'bg-[#F8FAFC] text-[#64748B] hover:bg-white hover:text-[#1E293B] border border-[#E2E8F0]'
            }`}
          >
            All 5 Subjects
          </button>
          {subjects.map(s => {
            const isSelected = activeSubject === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSubject(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-white hover:text-[#1E293B] border border-[#E2E8F0]'
                }`}
              >
                {s.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Detailed Cards */}
      <div className="space-y-6">
        {displayedSubjects.map(subj => {
          const Icon = subj.icon;
          return (
            <div
              key={subj.id}
              className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden"
            >
              {/* Card Banner Header */}
              <div className="p-6 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8FAFC]/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${subj.accentColor} border ${subj.borderColor} flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    <Icon className="w-6 h-6 text-[#1E293B]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#1E293B] px-2 py-0.5 rounded bg-white border border-[#E2E8F0]">
                        {subj.code}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-[#1E293B]">
                        {subj.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">{subj.tagline}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Core Concept Badges */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2.5">
                    Core Subject Theoretical Concepts Applied
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {subj.coreConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#1E293B]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{concept}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Concrete Architectural Applications */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                    Concrete Implementation in SupportDesk
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {subj.howUsed.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between"
                      >
                        <div>
                          <h5 className="font-heading font-semibold text-sm text-[#1E293B] mb-1.5">
                            {item.title}
                          </h5>
                          <p className="text-xs text-[#64748B] leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-[11px] text-[#1E293B] bg-white p-2.5 rounded-lg border border-[#E2E8F0]">
                          <span className="font-semibold text-[#64748B] block mb-0.5">Application:</span>
                          <span className="font-mono">{item.concreteExample}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Impact Statement */}
                <div className="p-4 rounded-lg bg-white border border-[#E2E8F0] flex items-start gap-3">
                  <Cpu className="w-4 h-4 text-[#1E293B] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#1E293B] leading-relaxed">
                    <strong className="text-[#1E293B]">Project Impact: </strong>
                    {subj.projectImpact}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Synthesis Matrix Box */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-3">
          Cross-Disciplinary Integration Matrix
        </h3>
        <p className="text-xs text-[#64748B] leading-relaxed mb-4">
          Rather than existing in isolation, modern software systems rely on the synergistic union of theoretical computer science, practical systems architecture, and engineering principles:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <strong className="block text-[#1E293B] font-semibold mb-1">DBMS</strong>
            <span className="text-[#64748B]">Governs the storage schemas, foreign key mappings, and consistent state transactions.</span>
          </div>
          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <strong className="block text-[#1E293B] font-semibold mb-1">DMGT</strong>
            <span className="text-[#64748B]">Structures the finite state lifecycle rules and boolean filter predicates.</span>
          </div>
          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <strong className="block text-[#1E293B] font-semibold mb-1">OOPJ</strong>
            <span className="text-[#64748B]">Enforces modular domain encapsulation, role inheritance, and subscriber patterns.</span>
          </div>
          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <strong className="block text-[#1E293B] font-semibold mb-1">ADSA</strong>
            <span className="text-[#64748B]">Optimizes ticket priority triage via heap concepts, indexing, and sorting logic.</span>
          </div>
          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <strong className="block text-[#1E293B] font-semibold mb-1">PYTHON</strong>
            <span className="text-[#64748B]">Guides regex input sanitization, dictionary transformations, and routing intelligence.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
