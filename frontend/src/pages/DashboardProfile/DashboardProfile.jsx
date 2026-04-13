import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { getUser, getFollowers, getFollowing } from "../../api/services/userServices";
import { getUserProjects, getAssignedProjects } from "../../api/services/projectServices";

import { formatTimeAgo } from "..//../utils/formatDate";


import "./DashboardProfile.css";
import EditProfileDrawer from "../../components/EditProfile/EditProfileDrawer"

const initialProfile = {
  firstName:   "Alex",
  lastName:    "Morrison",
  initials:    "AM",
  position:    "Senior Product Designer",
  company:     "Figma Inc.",
  location:    "San Francisco, CA",
  email:       "alex.morrison@figma.com",
  joined:      "Joined Jan 2021",
  description:
    "Designing digital products that feel human. Passionate about building scalable design systems, improving user flows, and collaborating closely with engineering. Previously at Stripe and Notion.",
  skills:    ["UI/UX Design", "Figma", "React", "Design Systems", "Prototyping", "User Research"],
  avatarSrc: null,
  stats: { 
    projects:      24,
    contributions: 61,
    followers:     318,
    following:     74,
  },
};

const createdProjects = [
  {
    id: 1,
    title: "Design System v3",
    description:
      "A comprehensive component library built in Figma with React integration, covering tokens, patterns, and documentation.",
    // tags: ["Figma", "React", "Documentation"],
    status: "active",
    statusLabel: "Active",
    date: "Updated 2d ago",
  },
  {
    id: 2,
    title: "Onboarding Flow Redesign",
    description:
      "End-to-end redesign of the user onboarding experience, reducing drop-off by 34% in A/B tests.",
    // tags: ["UX Research", "Prototyping"],
    status: "review",
    statusLabel: "In Review",
    date: "Updated 5d ago",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description:
      "Real-time analytics dashboard for internal teams, featuring customisable widgets and data export.",
    // tags: ["Dashboard", "Data Viz"],
    status: "planning",
    statusLabel: "Planning",
    date: "Updated 2w ago",
  },
  {
    id: 4,
    title: "Mobile App Audit",
    description:
      "Accessibility and performance audit across iOS and Android surfaces with a prioritised fix backlog.",
    // tags: ["Mobile", "Accessibility"],
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
    // tags: ["E-commerce", "A/B Testing"],
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
    // tags: ["Branding", "Motion"],
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
    // tags: ["Developer UX", "Docs"],
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

  const timeAgo = project?.updatedAt ? formatTimeAgo(project.updatedAt) : "";

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
          {/* {project.tags.map((t) => (
            <span key={t} className="dp-tag">{t}</span>
          ))} */}
        </div>
        <div className="dp-project-meta">
          <span className="dp-project-status">
            <span className={`dp-status-dot ${project.status}`} />
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <span className="dp-project-date">Updated {timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardProfile() {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState({ count: 0, followers: [] });
  const [following, setFollowing] = useState({ count: 0, followers: [] });

  const [projects, setProjects] = useState({ count: 0, projects: [] });
  const [assigned, setAssigned] = useState({ count: 0, projects: [] });

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [userRes, followersRes, followingRes, projectsRes, assignedRes] = await Promise.all([
        getUser(id),
        getFollowers(id),
        getFollowing(id),
        getUserProjects(id),
        getAssignedProjects(id)
      ]);

      setUser(userRes.data);
      setFollowers(followersRes.data);
      setFollowing(followingRes.data);
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

  const [profile, setProfile] = useState(initialProfile);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSave = (updated) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
      initials: `${updated.firstName?.[0] ?? ""}${updated.lastName?.[0] ?? ""}`.toUpperCase(),
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  const initials = (user.firstName?.[0] || "") + (user.lastName?.[0] || "");
  const displayInitials = initials.toUpperCase();

  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });


  return (
    <>
      <div className="dp-page">

        {/* ── Banner ── */}
        <div className="dp-banner-wrap">
          <div className="dp-banner">
            <div className="dp-banner-dots" />
            <button className="dp-banner-edit-btn">
              {Icon.pencil}
              Edit banner
            </button>
          </div>
        </div>

        {/* Profile card */}
        <div className="dp-container">
          <div className="dp-profile-card">

            <div className="dp-profile-header">
              <div className="dp-avatar-wrap">
                <div className="dp-avatar">
                  {user.avatarUrl
                    ? <img src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                    : displayInitials }
                </div>
                <div className="dp-avatar-badge" />
              </div>

              <div className="dp-profile-actions">
                <button className="dp-btn ghost">{Icon.share} Share</button>
                <button
                  className="dp-btn outline"
                  onClick={() => setDrawerOpen(true)}
                >
                  {Icon.pencil} Edit Profile
                </button>
                <button className="dp-btn primary">{Icon.plus} Follow</button>
              </div>
            </div>

            <div className="dp-profile-info">
              <h1 className="dp-name">
                {user.firstName} {user.lastName}
              </h1>

              <div className="dp-position-row">
                <span className="dp-position">{user.position}</span>
                <span className="dp-divider-dot" />
                <span className="dp-company">{user.company}</span>
              </div>

              <div className="dp-meta-row">
                <span className="dp-meta-item">{Icon.location}{user.location}</span>
                <span className="dp-meta-item">{Icon.mail}{user.email}</span>
                <span className="dp-meta-item">{Icon.clock}{`Joined ${joinedDate}`}</span>
              </div>

              <p className="dp-description">{user.bio}</p>

              <div className="dp-skills-row">
                {user.skills.map((s) => (
                  <span key={s} className="dp-skill-tag">{s}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="dp-stats-strip">
              <div className="dp-stat">
                <div className="dp-stat-value">{projects.count}</div>
                <div className="dp-stat-label">Projects</div>
              </div>
              <div className="dp-stat">
                <div className="dp-stat-value">61</div>
                <div className="dp-stat-label">Contributions</div>
              </div>
              <div className="dp-stat">
                <div className="dp-stat-value">{followers.count}</div>
                <div className="dp-stat-label">Followers</div>
              </div>
              <div className="dp-stat">
                <div className="dp-stat-value">{following.count}</div>
                <div className="dp-stat-label">Following</div>
              </div>
            </div>
          </div>

          {/*  Content grid  */}
          <div className="dp-content">
            <div className="dp-section">
              <div className="dp-section-header">
                <span className="dp-section-title">
                  <span className="dp-section-title-dot" />
                  Created Projects
                </span>
                <span className="dp-section-count">{projects.count}</span>
              </div>
              <div className="dp-projects-list">
                {projects.count > 0
                  ? projects.projects.map((p) => <ProjectCard key={p._id} project={p} />)
                  : <div className="dp-empty">No projects created yet.</div>}
              </div>
            </div>

            <div className="dp-section">
              <div className="dp-section-header">
                <span className="dp-section-title">
                  <span className="dp-section-title-dot" />
                  Collaborated On
                </span>
                <span className="dp-section-count">{assigned.count}</span>
              </div>
              <div className="dp-projects-list">
                {assigned.count > 0
                  ? assigned.projects.map((p) => (
                      <ProjectCard key={p._id} project={p} showRole />
                    ))
                  : <div className="dp-empty">No collaborations yet.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Edit Profile Drawer */}
      <EditProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        profile={profile}
        onSave={handleSave}
      />
    </>
  );
}
