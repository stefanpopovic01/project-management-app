import React from "react";
import "./DashboardProfile.css";

const profile = {
  firstName: "Alex",
  lastName: "Morrison",
  initials: "AM",
  position: "Senior Product Designer",
  company: "Figma Inc.",
  location: "San Francisco, CA",
  email: "alex.morrison@figma.com",
  joined: "Joined Jan 2021",
  description:
    "Designing digital products that feel human. Passionate about building scalable design systems, improving user flows, and collaborating closely with engineering. Previously at Stripe and Notion.",
  skills: ["UI/UX Design", "Figma", "React", "Design Systems", "Prototyping", "User Research"],
  stats: {
    projects: 24,
    contributions: 61,
    followers: 318,
    following: 74,
  },
};

const createdProjects = [
  {
    id: 1,
    title: "Design System v3",
    description:
      "A comprehensive component library built in Figma with React integration, covering tokens, patterns, and documentation.",
    tags: ["Figma", "React", "Documentation"],
    status: "active",
    statusLabel: "Active",
    date: "Updated 2d ago",
  },
  {
    id: 2,
    title: "Onboarding Flow Redesign",
    description:
      "End-to-end redesign of the user onboarding experience, reducing drop-off by 34% in A/B tests.",
    tags: ["UX Research", "Prototyping"],
    status: "review",
    statusLabel: "In Review",
    date: "Updated 5d ago",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description:
      "Real-time analytics dashboard for internal teams, featuring customisable widgets and data export.",
    tags: ["Dashboard", "Data Viz"],
    status: "planning",
    statusLabel: "Planning",
    date: "Updated 2w ago",
  },
  {
    id: 4,
    title: "Mobile App Audit",
    description:
      "Accessibility and performance audit across iOS and Android surfaces with a prioritised fix backlog.",
    tags: ["Mobile", "Accessibility"],
    status: "archived",
    statusLabel: "Archived",
    date: "Updated 3mo ago",
  },
];

const collaboratedProjects = [
  {
    id: 5,
    title: "Checkout Optimisation",
    description:
      "Collaborated on reducing checkout friction, shipping 6 incremental improvements over Q3.",
    tags: ["E-commerce", "A/B Testing"],
    status: "active",
    statusLabel: "Active",
    date: "Updated 1d ago",
    role: "Contributor",
  },
  {
    id: 6,
    title: "Brand Refresh 2024",
    description:
      "Supported the brand team on iconography, illustration style, and motion guidelines.",
    tags: ["Branding", "Motion"],
    status: "archived",
    statusLabel: "Archived",
    date: "Updated 6mo ago",
    role: "Reviewer",
  },
  {
    id: 7,
    title: "API Developer Portal",
    description:
      "UX lead for the developer-facing documentation portal — IA, navigation, and code sample formatting.",
    tags: ["Developer UX", "Docs"],
    status: "review",
    statusLabel: "In Review",
    date: "Updated 3d ago",
    role: "UX Lead",
  },
];

const Icon = {
  pencil: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14.5 2.5l3 3L6 17H3v-3L14.5 2.5z" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="10" y1="4" x2="10" y2="16" />
      <line x1="4" y1="10" x2="16" y2="10" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="15" cy="4" r="1.75" />
      <circle cx="5" cy="10" r="1.75" />
      <circle cx="15" cy="16" r="1.75" />
      <line x1="6.7" y1="9.1" x2="13.3" y2="5" />
      <line x1="6.7" y1="10.9" x2="13.3" y2="15" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <path d="M2 7l8 5 8-5" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 6v4l3 2" />
    </svg>
  ),
};

function ProjectCard({ project, showRole = false }) {
  return (
    <div className="dp-project-card">
      <div className="dp-project-top">
        <div>
          <div className="dp-project-title">{project.title}</div>
          <div className="dp-project-desc">{project.description}</div>
        </div>
        {showRole && <span className="dp-role-badge">{project.role}</span>}
      </div>

      <div className="dp-project-bottom">
        <div className="dp-project-tags">
          {project.tags.map((t) => (
            <span key={t} className="dp-tag">{t}</span>
          ))}
        </div>
        <div className="dp-project-meta">
          <span className="dp-project-status">
            <span className={`dp-status-dot ${project.status}`} />
            {project.statusLabel}
          </span>
          <span className="dp-project-date">{project.date}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardProfile() {
  return (
    <div className="dp-page">

      <div className="dp-banner-wrap">
        <div className="dp-banner">
          <div className="dp-banner-dots" />
          <button className="dp-banner-edit-btn">
            {Icon.pencil}
            Edit banner
          </button>
        </div>
      </div>

      <div className="dp-container">
        <div className="dp-profile-card">

          <div className="dp-profile-header">
            <div className="dp-avatar-wrap">
              <div className="dp-avatar">{profile.initials}</div>
              <div className="dp-avatar-badge" />
            </div>

            <div className="dp-profile-actions">
              <button className="dp-btn ghost">{Icon.share} Share</button>
              <button className="dp-btn outline">{Icon.pencil} Edit Profile</button>
              <button className="dp-btn primary">{Icon.plus} Follow</button>
            </div>
          </div>

          <div className="dp-profile-info">
            <h1 className="dp-name">
              {profile.firstName} {profile.lastName}
            </h1>

            <div className="dp-position-row">
              <span className="dp-position">{profile.position}</span>
              <span className="dp-divider-dot" />
              <span className="dp-company">{profile.company}</span>
            </div>

            <div className="dp-meta-row">
              <span className="dp-meta-item">{Icon.location}{profile.location}</span>
              <span className="dp-meta-item">{Icon.mail}{profile.email}</span>
              <span className="dp-meta-item">{Icon.clock}{profile.joined}</span>
            </div>

            <p className="dp-description">{profile.description}</p>

            <div className="dp-skills-row">
              {profile.skills.map((s) => (
                <span key={s} className="dp-skill-tag">{s}</span>
              ))}
            </div>
          </div>

          <div className="dp-stats-strip">
            <div className="dp-stat">
              <div className="dp-stat-value">{profile.stats.projects}</div>
              <div className="dp-stat-label">Projects</div>
            </div>
            <div className="dp-stat">
              <div className="dp-stat-value">{profile.stats.contributions}</div>
              <div className="dp-stat-label">Contributions</div>
            </div>
            <div className="dp-stat">
              <div className="dp-stat-value">{profile.stats.followers}</div>
              <div className="dp-stat-label">Followers</div>
            </div>
            <div className="dp-stat">
              <div className="dp-stat-value">{profile.stats.following}</div>
              <div className="dp-stat-label">Following</div>
            </div>
          </div>
        </div>

        <div className="dp-content">

          <div className="dp-section">
            <div className="dp-section-header">
              <span className="dp-section-title">
                <span className="dp-section-title-dot" />
                Created Projects
              </span>
              <span className="dp-section-count">{createdProjects.length}</span>
            </div>
            <div className="dp-projects-list">
              {createdProjects.length > 0
                ? createdProjects.map((p) => <ProjectCard key={p.id} project={p} />)
                : <div className="dp-empty">No projects created yet.</div>}
            </div>
          </div>

          <div className="dp-section">
            <div className="dp-section-header">
              <span className="dp-section-title">
                <span className="dp-section-title-dot" />
                Collaborated On
              </span>
              <span className="dp-section-count">{collaboratedProjects.length}</span>
            </div>
            <div className="dp-projects-list">
              {collaboratedProjects.length > 0
                ? collaboratedProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} showRole />
                  ))
                : <div className="dp-empty">No collaborations yet.</div>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
