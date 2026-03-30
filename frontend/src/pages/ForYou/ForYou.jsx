import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./ForYou.css";
import { ALL_PROJECTS } from '../DashboardProjects/DashboardProjects';

const Icon = {
  chevRight: (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="7 5 13 10 7 15" /></svg>),
  folder:    (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>),
  userPlus:  (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="7" r="4" /><path d="M2 17c0-3.3 2.7-6 6-6" /><line x1="15" y1="11" x2="15" y2="17" /><line x1="12" y1="14" x2="18" y2="14" /></svg>),
  task:      (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="14" height="14" rx="2" /><polyline points="7 10 9 12 13 8" /></svg>),
  clock:     (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10" cy="10" r="8" /><polyline points="10 6 10 10 13 12" /></svg>),
  bell:      (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 2a6 6 0 00-6 6c0 4-2 5-2 5h16s-2-1-2-5a6 6 0 00-6-6z" /><path d="M11.73 17a2 2 0 01-3.46 0" /></svg>),
  lightning: (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="13 2 7 11 10 11 7 18 13 9 10 9 13 2" /></svg>),
};

const CURRENT_USER = "Alex Morrison";

const MY_TASKS = [
  { id: "t4", title: "Button component — all variants", project: "Design System v3",   projectId: 1, priority: "high",   due: "2026-03-14" },
  { id: "t1", title: "Token audit — spacing & sizing",  project: "Design System v3",   projectId: 1, priority: "high",   due: "2026-03-18" },
  { id: "t7", title: "Design system scope & brief",     project: "Design System v3",   projectId: 1, priority: "high",   due: "2026-03-25" },
  { id: "t8", title: "Figma file architecture",         project: "Onboarding Redesign", projectId: 2, priority: "medium", due: "2026-04-02" },
  { id: "t9", title: "Checkout funnel wireframes",      project: "Checkout Optimisation",projectId: 4, priority: "low",   due: "2026-04-10" },
];

const ACTIVITY = [
  { id: 1, initials: "SK", color: "purple", text: <><strong>Sara Kim</strong> moved <em>"Input components"</em> to In Progress</>,        time: "2 min ago" },
  { id: 2, initials: "TR", color: "",       text: <><strong>Tom Reed</strong> commented on <em>"Docs site scaffold"</em></>,               time: "18 min ago" },
  { id: 3, initials: "LP", color: "green",  text: <><strong>Lena Park</strong> completed <em>"Typography tokens"</em></>,                   time: "1 hr ago" },
  { id: 4, initials: "AM", color: "",       text: <><strong>You</strong> were added to <em>"Brand Refresh 2025"</em></>,                    time: "3 hrs ago" },
  { id: 5, initials: "CW", color: "amber",  text: <><strong>Chris Wong</strong> created a new task in <em>"API Developer Portal"</em></>,   time: "Yesterday" },
  { id: 6, initials: "SK", color: "purple", text: <><strong>Sara Kim</strong> invited <strong>Jamie Liu</strong> to the project</>,         time: "Yesterday" },
];

function getGreeting(name) {
  const hour = new Date().getHours();
  if (hour < 12) return { time: "morning",   emoji: "☀️",  message: `Ready to get things done today?` };
  if (hour < 17) return { time: "afternoon", emoji: "👋",  message: `You have tasks waiting for you.` };
  return              { time: "evening",   emoji: "🌙",  message: `Wrapping up for the day?` };
}

function formatDateDisplay() {
  const now = new Date();
  return {
    day:  now.toLocaleDateString("en-GB", { day: "numeric" }),
    rest: now.toLocaleDateString("en-GB", { weekday: "long", month: "long", year: "numeric" }),
  };
}

function getDueChip(isoDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due   = new Date(isoDate);
  due.setHours(0, 0, 0, 0);
  const diff  = Math.round((due - today) / 86400000);

  if (diff < 0)  return { label: "Overdue",        cls: "overdue" };
  if (diff === 0) return { label: "Due today",      cls: "today" };
  if (diff <= 3)  return { label: `${diff}d left`,  cls: "soon" };
  return               { label: due.toLocaleDateString("en-GB", { day: "numeric", month: "short" }), cls: "upcoming" };
}

function pct(done, total) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function ProjectRow({ project, onClick }) {
  const progress = pct(project.tasksDone, project.tasksTotal);
  const isDone   = progress === 100;

  return (
    <div className="fy-proj-row" onClick={() => onClick(project)}>
      <div className={`fy-proj-accent ${project.ownership}`} />

      <div className="fy-proj-info">
        <div className="fy-proj-name">{project.title}</div>
        <div className="fy-proj-meta">
          <span className={`fy-proj-status ${project.status}`}>
            <span className="fy-proj-status-dot" />
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <span className="fy-proj-tasks-count">
            {project.tasksDone}/{project.tasksTotal} tasks
          </span>
        </div>
      </div>

      <div className="fy-proj-right">
        <span className="fy-proj-pct">{progress}%</span>
        <div className="fy-proj-bar-track">
          <div
            className={`fy-proj-bar-fill${isDone ? " done" : ""}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <svg style={{ width: "1rem", height: "1rem", color: "#d1d5db", flexShrink: 0 }} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="7 5 13 10 7 15" />
      </svg>
    </div>
  );
}

function TaskRow({ task, onClick }) {
  const chip = getDueChip(task.due);

  return (
    <div className="fy-task-row" onClick={() => onClick(task)}>
      <span className={`fy-task-priority-dot ${task.priority}`} />
      <div className="fy-task-info">
        <div className="fy-task-name">{task.title}</div>
        <div className="fy-task-project">{task.project}</div>
      </div>
      <span className={`fy-task-due-chip ${chip.cls}`}>{chip.label}</span>
    </div>
  );
}

export default function ForYou({ currentUser = CURRENT_USER }) {
  const navigate  = useNavigate();
  const greeting  = getGreeting(currentUser);
  const dateLabel = formatDateDisplay();
  const firstName = currentUser.split(" ")[0];

  const ownedProjects    = ALL_PROJECTS.filter(p => p.ownership === "owned");
  const assignedProjects = ALL_PROJECTS.filter(p => p.ownership === "assigned");
  const activeTaskCount  = MY_TASKS.length;
  const overdueCount     = MY_TASKS.filter(t => getDueChip(t.due).cls === "overdue").length;

  const recentOwned    = ownedProjects.slice(0, 3);
  const recentAssigned = assignedProjects.slice(0, 3);

  const sortedTasks = useMemo(() => {
    return [...MY_TASKS].sort((a, b) => new Date(a.due) - new Date(b.due));
  }, []);

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`, { state: { project } });
  };

  const handleTaskClick = (task) => {
    navigate(`/projects/${task.projectId}`);
  };

  return (
    <div className="fy-page">
      <div className="fy-inner">

        <div className="fy-hero">
          <div className="fy-hero-inner">
            <div>
              <div className="fy-greeting-label">
                Good {greeting.time} {greeting.emoji}
              </div>
              <h1 className="fy-greeting-name">{firstName}</h1>
              <p className="fy-greeting-sub">
                {overdueCount > 0
                  ? <><strong>{overdueCount} task{overdueCount !== 1 ? "s" : ""} overdue</strong> — let's get caught up.</>
                  : greeting.message
                }
              </p>
            </div>

            <div className="fy-hero-date">
              <div className="fy-hero-date-day">{dateLabel.day}</div>
              <div className="fy-hero-date-rest">{dateLabel.rest}</div>
            </div>
          </div>

          <div className="fy-stats">
            <div className="fy-stat">
              <span className="fy-stat-value">{ownedProjects.length}</span>
              <span className="fy-stat-label">My Projects</span>
              <span className="fy-stat-sub">
                {ownedProjects.filter(p => p.status === "active").length} active
              </span>
            </div>
            <div className="fy-stat">
              <span className="fy-stat-value">{assignedProjects.length}</span>
              <span className="fy-stat-label">Assigned to Me</span>
              <span className="fy-stat-sub">
                {assignedProjects.filter(p => p.status === "active").length} active
              </span>
            </div>
            <div className="fy-stat">
              <span className="fy-stat-value">{activeTaskCount}</span>
              <span className="fy-stat-label">Open Tasks</span>
              <span className="fy-stat-sub">
                {overdueCount > 0 ? `${overdueCount} overdue` : "All on track"}
              </span>
            </div>
            <div className="fy-stat">
              <span className="fy-stat-value">
                {ALL_PROJECTS.reduce((sum, p) => sum + p.tasksDone, 0)}
              </span>
              <span className="fy-stat-label">Tasks Completed</span>
              <span className="fy-stat-sub">across all projects</span>
            </div>
          </div>
        </div>

        <div className="fy-body">

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            <div className="fy-card">
              <div className="fy-card-head">
                <span className="fy-card-title">
                  {Icon.folder} Recent Projects
                </span>
                <button className="fy-card-link" onClick={() => navigate("/dashboard-projects")}>
                  See all {Icon.chevRight}
                </button>
              </div>

              <div className="fy-proj-list">
                <div className="fy-proj-section-label">My Projects</div>
                {recentOwned.length > 0
                  ? recentOwned.map(p => <ProjectRow key={p.id} project={p} onClick={handleProjectClick} />)
                  : <div className="fy-empty"><span className="fy-empty-icon">📁</span>No projects yet.</div>
                }
                <div className="fy-proj-section-label" style={{ marginTop: "0.5rem" }}>Assigned to Me</div>
                {recentAssigned.length > 0
                  ? recentAssigned.map(p => <ProjectRow key={p.id} project={p} onClick={handleProjectClick} />)
                  : <div className="fy-empty"><span className="fy-empty-icon">🤝</span>None assigned yet.</div>
                }
              </div>
            </div>

            <div className="fy-card">
              <div className="fy-card-head">
                <span className="fy-card-title">
                  {Icon.clock} Active Tasks
                  <span className="fy-card-badge">{sortedTasks.length}</span>
                </span>
                <button className="fy-card-link" onClick={() => navigate("/dashboard-projects")}>
                  View projects {Icon.chevRight}
                </button>
              </div>

              <div className="fy-tasks-list">
                {sortedTasks.length > 0
                  ? sortedTasks.map(t => <TaskRow key={t.id} task={t} onClick={handleTaskClick} />)
                  : (
                    <div className="fy-empty">
                      <span className="fy-empty-icon">✅</span>
                      All caught up — no active tasks.
                    </div>
                  )
                }
              </div>
            </div>

          </div>

          <div className="fy-sidebar">

            <div className="fy-card">
              <div className="fy-card-head">
                <span className="fy-card-title">
                  {Icon.lightning} Recent Activity
                </span>
              </div>

              <div className="fy-activity-list">
                {ACTIVITY.map(item => (
                  <div key={item.id} className="fy-activity-item">
                    <div className={`fy-activity-av ${item.color}`}>{item.initials}</div>
                    <div className="fy-activity-body">
                      <div className="fy-activity-text">{item.text}</div>
                      <div className="fy-activity-time">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fy-card">
              <div className="fy-card-head">
                <span className="fy-card-title">Quick Links</span>
              </div>

              <div className="fy-quicklinks">
                <button className="fy-quicklink-btn" onClick={() => navigate("/dashboard-projects")}>
                  <div className="fy-quicklink-icon blue">{Icon.folder}</div>
                  <div>
                    <div className="fy-quicklink-label">All Projects</div>
                    <div className="fy-quicklink-sub">Browse owned & assigned</div>
                  </div>
                  <span className="fy-quicklink-arrow">{Icon.chevRight}</span>
                </button>

                <button className="fy-quicklink-btn" onClick={() => navigate("/dashboard-settings")}>
                  <div className="fy-quicklink-icon purple">{Icon.userPlus}</div>
                  <div>
                    <div className="fy-quicklink-label">My Profile</div>
                    <div className="fy-quicklink-sub">Edit info, skills & bio</div>
                  </div>
                  <span className="fy-quicklink-arrow">{Icon.chevRight}</span>
                </button>

                <button className="fy-quicklink-btn" onClick={() => navigate("/projects/1")}>
                  <div className="fy-quicklink-icon green">{Icon.task}</div>
                  <div>
                    <div className="fy-quicklink-label">Design System v3</div>
                    <div className="fy-quicklink-sub">Your most active project</div>
                  </div>
                  <span className="fy-quicklink-arrow">{Icon.chevRight}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
