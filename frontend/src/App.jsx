// =========================
// FRONTEND DASHBOARD IMPORTS SECTION
// =========================
// React state hooks control the theme toggle and mobile sidebar.
import { useMemo, useState } from "react";

// Lucide icons provide professional dashboard symbols without custom SVG code.
import {
  Activity,
  ArrowUpRight,
  Bell,
  Bot,
  BrainCircuit,
  ChevronRight,
  Command,
  FileText,
  Gauge,
  LayoutDashboard,
  Menu,
  Moon,
  Network,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  UploadCloud,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";

// Navigation items shown in the left sidebar.
const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "AI Console", icon: Bot },
  { label: "Automations", icon: Workflow },
  { label: "Knowledge", icon: BrainCircuit },
  { label: "Analytics", icon: Activity },
  { label: "Security", icon: ShieldCheck },
];

// Metric cards summarize the assistant performance for the dashboard.
const metrics = [
  {
    label: "Resolved Queries",
    value: "18.4k",
    delta: "+24.8%",
    icon: Bot,
    tone: "from-cyan-400 to-blue-600",
  },
  {
    label: "Automation Runs",
    value: "6,920",
    delta: "+18.2%",
    icon: Zap,
    tone: "from-emerald-400 to-teal-600",
  },
  {
    label: "Knowledge Coverage",
    value: "94%",
    delta: "+7.6%",
    icon: BrainCircuit,
    tone: "from-violet-400 to-fuchsia-600",
  },
  {
    label: "Student Satisfaction",
    value: "4.8",
    delta: "+0.3",
    icon: Users,
    tone: "from-amber-300 to-rose-500",
  },
];

// Recent activity entries simulate live operations from automations and indexing.
const activity = [
  { title: "Admissions workflow completed", detail: "242 routed conversations updated", time: "2 min ago", state: "Live" },
  { title: "Website index refreshed", detail: "SHU pages synced into vector search", time: "18 min ago", state: "Synced" },
  { title: "Timetable reminder batch queued", detail: "Semester 5 and 7 alerts ready", time: "42 min ago", state: "Queued" },
  { title: "Document processor active", detail: "3 files converted and embedded", time: "1 hr ago", state: "Stable" },
];

// Automation progress cards mirror the Streamlit scheduler concepts.
const automations = [
  { name: "Website Sync", status: "Running", progress: 78 },
  { name: "Daily Reminders", status: "Scheduled", progress: 64 },
  { name: "Analytics Digest", status: "Ready", progress: 91 },
];

// Insight notes explain trends that an admin or evaluator can quickly understand.
const insights = [
  "Admissions and finance intents are trending up across evening sessions.",
  "Knowledge confidence is strongest for rooms, labs, teachers, and timetable queries.",
  "Document ingestion latency is down after chunking and retrieval tuning.",
];

/**
 * Join CSS class names while ignoring false values.
 * This keeps conditional styling readable for beginners.
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Render the React executive dashboard used as a polished frontend companion.
 * State variables below control dark/light mode and the mobile sidebar.
 */
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const shellClass = darkMode ? "dark" : "";
  const chartBars = useMemo(() => [52, 68, 44, 78, 92, 72, 86, 63, 95, 81, 88, 74], []);

  return (
    <div className={shellClass}>
      <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#e0f7ff_0,#f8fbff_28%,#edf2ff_58%,#f8fafc_100%)] text-slate-950 transition-colors duration-500 dark:bg-[radial-gradient(circle_at_top_left,#12384a_0,#08111f_34%,#0f172a_70%,#020617_100%)] dark:text-white">
        <div className="pointer-events-none fixed inset-0 opacity-70 dark:opacity-80">
          <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="absolute right-[6%] top-[20%] h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute bottom-[5%] left-[38%] h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px]">
          <aside
            className={classNames(
              "fixed inset-y-0 left-0 z-40 w-72 transform p-4 transition duration-300 lg:static lg:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="glass-panel flex h-full flex-col rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-glow dark:bg-white dark:text-slate-950">
                    <Command size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">SHU AI</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Automation Suite</p>
                  </div>
                </div>
                <button className="icon-button lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-8 space-y-1">
                {navItems.map((item) => (
                  <a key={item.label} className={classNames("nav-item", item.active && "nav-item-active")} href="#">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-auto rounded-2xl border border-cyan-300/30 bg-cyan-50/80 p-4 dark:border-cyan-300/20 dark:bg-cyan-300/10">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-white">
                  <Sparkles size={18} />
                </div>
                <p className="text-sm font-semibold">Investor Mode</p>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                  Live performance, adoption, automation, and knowledge health in one executive surface.
                </p>
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-glow dark:bg-white dark:text-slate-950">
                  View Deck <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </aside>

          {sidebarOpen && (
            <button
              className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close overlay"
            />
          )}

          <section className="flex min-w-0 flex-1 flex-col px-4 py-4 sm:px-6 lg:px-4">
            <header className="glass-panel sticky top-4 z-20 flex items-center gap-3 rounded-2xl px-4 py-3">
              <button className="icon-button lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                <Menu size={19} />
              </button>

              <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200/80 bg-white/70 px-3 py-2 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 md:flex">
                <Search size={17} />
                <span className="truncate text-sm">Search students, workflows, documents, departments...</span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button className="icon-button" aria-label="Notifications">
                  <Bell size={18} />
                </button>
                <button className="icon-button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle theme">
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <div className="hidden items-center gap-3 rounded-xl border border-slate-200/80 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-white/5 sm:flex">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
                  <div>
                    <p className="text-xs font-semibold">Admin</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Operations</p>
                  </div>
                </div>
              </div>
            </header>

            <div className="grid flex-1 gap-5 py-5 xl:grid-cols-[1fr_380px]">
              <div className="space-y-5">
                <section className="glass-panel overflow-hidden rounded-2xl p-5 sm:p-6">
                  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="animate-slide-up">
                      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-50/80 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-200">
                        <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-400" />
                        AI platform health: excellent
                      </div>
                      <h1 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                        Intelligent campus automation, styled for executive clarity.
                      </h1>
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                        A premium operating dashboard for SHU Assistant with live AI routing, automated notifications,
                        knowledge ingestion, and real-time analytics.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">
                          <Play size={17} /> Run Demo
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-300 dark:border-white/10 dark:bg-white/5 dark:text-white">
                          <UploadCloud size={17} /> Upload Data
                        </button>
                      </div>
                    </div>

                    <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/50 bg-slate-950 p-4 text-white shadow-glow dark:border-white/10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.34),transparent_28%),radial-gradient(circle_at_75%_25%,rgba(217,70,239,0.28),transparent_24%),linear-gradient(135deg,rgba(15,23,42,0.5),rgba(2,6,23,1))]" />
                      <div className="relative flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">AI Query Flow</p>
                          <p className="mt-1 text-2xl font-bold">42.8k tokens/min</p>
                        </div>
                        <div className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                          Live
                        </div>
                      </div>
                      <div className="relative mt-8 grid grid-cols-12 items-end gap-2">
                        {chartBars.map((height, index) => (
                          <div key={index} className="flex h-40 items-end rounded-full bg-white/5 p-1">
                            <div
                              className="w-full rounded-full bg-gradient-to-t from-cyan-400 via-blue-400 to-fuchsia-400 transition-all duration-700"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="relative mt-7 grid grid-cols-3 gap-3 text-center">
                        {["Routing", "Retrieval", "Answering"].map((item, index) => (
                          <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                            <p className="text-lg font-bold">{[98, 94, 96][index]}%</p>
                            <p className="text-xs text-slate-300">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {metrics.map((metric) => (
                    <article className="metric-card" key={metric.label}>
                      <div className="flex items-start justify-between">
                        <div className={classNames("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white", metric.tone)}>
                          <metric.icon size={20} />
                        </div>
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                          {metric.delta}
                        </span>
                      </div>
                      <p className="mt-5 text-3xl font-extrabold tracking-tight">{metric.value}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                    </article>
                  ))}
                </section>

                <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="glass-panel rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold">Automation Control</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Critical workflows and execution health</p>
                      </div>
                      <button className="icon-button" aria-label="Open automation details">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                    <div className="mt-5 space-y-4">
                      {automations.map((automation) => (
                        <div key={automation.name}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-semibold">{automation.name}</span>
                            <span className="text-slate-500 dark:text-slate-400">{automation.status}</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-200/80 dark:bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                              style={{ width: `${automation.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel rounded-2xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-bold">AI Conversation Preview</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Polished chat surface for student support</p>
                      </div>
                      <span className="rounded-full border border-emerald-300/40 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                        GPT-4o ready
                      </span>
                    </div>
                    <div className="mt-5 space-y-3">
                      <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200">
                        Which room has the AI lab today?
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-3 text-sm text-white shadow-lg">
                        The AI lab is scheduled in Lab 3 from 10:00 AM. I can also notify your section before the class begins.
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/70 px-3 py-3 dark:border-white/10 dark:bg-white/5">
                        <Sparkles size={17} className="text-cyan-500" />
                        <span className="text-sm text-slate-500 dark:text-slate-400">Ask about rooms, labs, teachers, documents, or schedules...</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="space-y-5">
                <section className="glass-panel rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Executive Pulse</h2>
                    <Gauge size={20} className="text-cyan-500" />
                  </div>
                  <div className="mt-5 flex items-center justify-center">
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 p-3 shadow-glow">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center dark:bg-slate-950">
                        <div>
                          <p className="text-4xl font-extrabold">97</p>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Score</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-200/80 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
                      <p className="text-xl font-bold">1.2s</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Median response</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
                      <p className="text-xl font-bold">99.9%</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Uptime</p>
                    </div>
                  </div>
                </section>

                <section className="glass-panel rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Live Activity</h2>
                    <Network size={20} className="text-fuchsia-500" />
                  </div>
                  <div className="mt-5 space-y-4">
                    {activity.map((item) => (
                      <div key={item.title} className="group rounded-xl border border-slate-200/70 bg-white/60 p-3 transition hover:-translate-y-0.5 hover:border-cyan-300 dark:border-white/10 dark:bg-white/5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.detail}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                            {item.state}
                          </span>
                        </div>
                        <p className="mt-2 text-[11px] text-slate-400">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="glass-panel rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Strategic Insights</h2>
                    <FileText size={20} className="text-emerald-500" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {insights.map((insight) => (
                      <div key={insight} className="flex gap-3 rounded-xl bg-slate-100/70 p-3 dark:bg-white/5">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
                        <p className="text-sm leading-5 text-slate-600 dark:text-slate-300">{insight}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
