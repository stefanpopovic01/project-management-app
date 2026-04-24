import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardProjects.css";

import { getUserProjects, getAssignedProjects } from "../../api/services/projectServices";
import { AuthContext } from "../../contex/authContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const ALL_PROJECTS = [
  {
    id: 1, ownership: "owned",
    title: "Design System v3",
    description: "A comprehensive component library in Figma with React integration, covering tokens, patterns, and full documentation.",
    status: "active", deadline: "2025-06-15",
    tasksTotal: 24, tasksDone: 18,
    owner: { name: "Alex Morrison", initials: "AM" },
    members: [
      { name: "Alex Morrison", initials: "AM" },
      { name: "Sara Kim",      initials: "SK" },
      { name: "Tom Reed",      initials: "TR" },
      { name: "Lena Park",     initials: "LP" },
    ],
  },
  {
    id: 2, ownership: "owned",
    title: "Onboarding Flow Redesign",
    description: "End-to-end redesign of the new user onboarding experience, targeting a 30%+ reduction in drop-off.",
    status: "review", deadline: "2025-04-30",
    tasksTotal: 16, tasksDone: 14,
    owner: { name: "Alex Morrison", initials: "AM" },
    members: [
      { name: "Alex Morrison", initials: "AM" },
      { name: "Jamie Liu",     initials: "JL" },
    ],
  },
  {
    id: 3, ownership: "owned",
    title: "Mobile App Audit",
    description: "Accessibility and performance audit across iOS and Android with a prioritised fix backlog.",
    status: "archived", deadline: "2024-12-01",
    tasksTotal: 20, tasksDone: 20,
    owner: { name: "Alex Morrison", initials: "AM" },
    members: [
      { name: "Alex Morrison", initials: "AM" },
      { name: "Chris Wong",    initials: "CW" },
      { name: "Mia Torres",    initials: "MT" },
    ],
  },
  {
    id: 4, ownership: "assigned",
    title: "Checkout Optimisation",
    description: "Reducing checkout friction across the purchase funnel, shipping 6 incremental improvements in Q3.",
    status: "active", deadline: "2025-05-20",
    tasksTotal: 12, tasksDone: 5,
    owner: { name: "Sara Kim", initials: "SK" },
    members: [
      { name: "Sara Kim",      initials: "SK" },
      { name: "Alex Morrison", initials: "AM" },
      { name: "Tom Reed",      initials: "TR" },
      { name: "Lena Park",     initials: "LP" },
      { name: "Jamie Liu",     initials: "JL" },
    ],
  },
  {
    id: 5, ownership: "assigned",
    title: "Brand Refresh 2025",
    description: "Supporting the brand team on iconography, illustration style, and motion design guidelines.",
    status: "planning", deadline: "2025-08-01",
    tasksTotal: 30, tasksDone: 3,
    owner: { name: "Mia Torres", initials: "MT" },
    members: [
      { name: "Mia Torres",    initials: "MT" },
      { name: "Alex Morrison", initials: "AM" },
      { name: "Jamie Liu",     initials: "JL" },
    ],
  },
  {
    id: 6, ownership: "assigned",
    title: "API Developer Portal",
    description: "UX lead on the developer-facing documentation portal — IA, navigation, and code sample formatting.",
    status: "review", deadline: "2025-05-10",
    tasksTotal: 18, tasksDone: 15,
    owner: { name: "Chris Wong", initials: "CW" },
    members: [
      { name: "Chris Wong",    initials: "CW" },
      { name: "Alex Morrison", initials: "AM" },
      { name: "Sara Kim",      initials: "SK" },
    ],
  },
];

const Icon = {
  plus: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <line x1="10" y1="4" x2="10" y2="16" /><line x1="4" y1="10" x2="16" y2="10" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4" width="16" height="14" rx="2" />
      <line x1="2" y1="8" x2="18" y2="8" />
      <line x1="6" y1="2" x2="6" y2="6" /><line x1="14" y1="2" x2="14" y2="6" />
    </svg>
  ),
  chevLeft: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="13 5 7 10 13 15" />
    </svg>
  ),
  chevRight: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="7 5 13 10 7 15" />
    </svg>
  ),
  export: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M10 13V4M6 8l4-4 4 4" /><path d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" />
    </svg>
  ),
};

function formatDeadline(iso) {
  const d    = new Date(iso);
  const now  = new Date();
  const diff = Math.ceil((d - now) / 86400000);
  const label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return { label, overdue: diff < 0 };
}

function pct(done, total) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function AvatarStack({ members, max = 4 }) {
  const visible = members.slice(0, max);
  const extra   = members.length - max;
  return (
    <div className="dproj-avatars">
      {visible.map((m, i) => (
        <div key={i} className="dproj-avatar" title={`${m.user.firstName} ${m.user.lastName}`}>
          {m.user.avatarUrl ? (
            <img src={m.user.avatarUrl} alt={m.user.firstName} />
          ) : (
            <p>
              {((m.user.firstName?.[0] || "") + (m.user.lastName?.[0] || "")).toUpperCase()}
            </p>
          )}
        </div>
      ))}
      {extra > 0 && <div className="dproj-avatar extra">+{extra}</div>}
    </div>
  );
}

function ProjectCard({ project, onClick, ownership }) {
  const progress = pct(project.completedTasks, project.totalTasks);

  const { label: deadlineLabel, overdue } = formatDeadline(project.deadline);
  const isDone = progress === 100;

  return (
    <div className={`dproj-card ${ownership}`} onClick={() => onClick(project)} >
      <div className="dproj-card-top">
        <span className="dproj-card-title">{project.title}</span>
        <span className={`dproj-ownership-pill ${ownership}`}>
          {ownership === "owned" ? "Owner" : "Assigned"}
        </span>
      </div>

      <p className="dproj-card-desc">{project.description}</p>

      <div className="dproj-progress-wrap">
        <div className="dproj-progress-top">
          <span>Progress</span>
          <span>{project.completedTasks} / {project.totalTasks} tasks</span>
        </div>
        <div className="dproj-progress-track">
          <div className={`dproj-progress-fill${isDone ? " done" : ""}`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="dproj-card-meta">
        <div className="dproj-card-meta-left">
          <span className={`dproj-status ${project.status}`}>
            <span className="dproj-status-dot" />
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <span className={`dproj-deadline${overdue ? " overdue" : ""}`}>
            {Icon.calendar} {overdue ? "Overdue · " : ""}{deadlineLabel}
          </span>
        </div>
        <AvatarStack members={project.members.filter(m => m.status === "accepted")} />
      </div>

      <div className="dproj-owner-row">
        <div className="dproj-owner-avatar">
          {project.creator.avatarUrl ? (
            <img 
              src={project.creator.avatarUrl} 
              alt={`${project.creator.firstName} ${project.creator.lastName}`} 
            />
          ) : (
            <p>
              {(project.creator.firstName?.[0] || "") + (project.creator.lastName?.[0] || "").toUpperCase()}
            </p>
          )}
        </div>
        <span>by <span className="dproj-owner-name">{project.creator.firstName}{" "}{project.creator.lastName}</span></span>
      </div>
    </div>
  );
}

export default function DashboardProjects() {
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`, { state: { project } });
    
  };

  const { user: currentUser, updateUser } = useContext(AuthContext);
  const id = currentUser.id;

  const [projects, setProjects] = useState({ count: 0, projects: [] });
  const [assigned, setAssigned] = useState({ count: 0, projects: [] });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
  
        const [projectsRes, assignedRes] = await Promise.all([
          getUserProjects(id),
          getAssignedProjects(id)
        ]);
  
        setProjects(projectsRes.data);
        setAssigned(assignedRes.data);
  
      } catch (err) {
        console.error("Error loading profile data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchDashboardData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dproj-page">
      <div className="dproj-inner">

        {/*  Page header */}
        <div className="dproj-page-header">
          <div>
            <h1 className="dproj-page-title">Projects</h1>
            <p className="dproj-page-sub">
              {projects.count} owned · {assigned.count} assigned
            </p>
          </div>
          <div className="dproj-header-actions">
            <button className="dproj-btn primary">{Icon.plus} New Project</button>
          </div>
        </div>

        {/*  Toolbar  */}
        <div className="dproj-toolbar">
          <div className="dproj-search-wrap">
            <svg className="dproj-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="8.5" cy="8.5" r="5.5" /><line x1="13" y1="13" x2="17" y2="17" />
            </svg>
            <input
              className="dproj-search"
              type="text"
              placeholder="Search projects…"
            />
          </div>
        </div>

        {/*  My Projects  */}
        <div className="dproj-section-head">
          <span className="dproj-section-title">My Projects</span>
          <span className="dproj-section-badge">{projects.count}</span>
          <span className="dproj-section-divider" />
        </div>

        <div className="dproj-grid">
          {projects.count > 0
            ? projects.projects.slice(0, 3).map((p) => (
                <ProjectCard key={p._id} project={p} onClick={handleProjectClick} ownership={"owned"}/>
              ))
            : <div className="dproj-empty"><span className="dproj-empty-icon">📁</span>No projects match your search.</div>
          }
        </div>

        {/*  Assigned to Me  */}
        <div className="dproj-section-head" style={{ marginTop: "2.5rem" }}>
          <span className="dproj-section-title">Assigned to Me</span>
          <span className="dproj-section-badge" style={{ background: "rgba(167,139,250,0.12)", color: "#7c3aed" }}>
            {assigned.count}
          </span>
          <span className="dproj-section-divider" />
        </div>

        <div className="dproj-grid">
          {assigned.count > 0
            ? assigned.projects.slice(0, 3).map((p) => (
                <ProjectCard key={p._id} project={p} onClick={handleProjectClick} ownership={"assigned"} />
              ))
            : <div className="dproj-empty"><span className="dproj-empty-icon">🤝</span>No assigned projects match your search.</div>
          }
        </div>

      </div>
    </div>
  );
}
