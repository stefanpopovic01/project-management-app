import { useState } from "react";
import "./CreateProjectModal.css";
import { createPortal } from "react-dom";

export default function CreateProjectModal({ onClose }) {
  const [inviteSearch, setInviteSearch] = useState("");

  const users = [
    { id: 1, name: "Marko Petrović", username: "@marko" },
    { id: 1, name: "Marko Petrović", username: "@marko" },
    { id: 1, name: "Marko Petrović", username: "@marko" },
    { id: 1, name: "Marko Petrović", username: "@marko" },
    { id: 2, name: "Jovana Ilić", username: "@jovana" },
    { id: 3, name: "Nikola Radović", username: "@nikola" },
    { id: 4, name: "Sara Milenković", username: "@sara" },
  ];

  return createPortal(
    <div className="cp-overlay" onClick={onClose}>
      <div
        className="cp-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cp-header">
          <h2>Create Project</h2>
          <button className="cp-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cp-body">
          <div className="cp-field">
            <label>Project Name</label>
            <input type="text" placeholder="Enter project name..." />
          </div>

          <div className="cp-field">
            <label>Description</label>
            <textarea placeholder="Project description..." />
          </div>

          <div className="cp-field">
            <label>Deadline</label>
            <input type="date" />
          </div>

          <div className="cp-field">
            <label>Short Description (optional)</label>
            <input type="text" placeholder="Optional short summary..." />
          </div>

          <div className="cp-field">
            <label>Invite Members</label>
            <div className="cp-invite-wrapper">
              <input
                type="text"
                placeholder="Search users..."
                value={inviteSearch}
                onChange={(e) => setInviteSearch(e.target.value)}
              />

              {inviteSearch && (
                <div className="cp-invite-dropdown">
                  {users
                    .filter((user) =>
                      user.name
                        .toLowerCase()
                        .includes(inviteSearch.toLowerCase())
                    )
                    .map((user) => (
                      <div key={user.id} className="cp-invite-item">
                        <div className="cp-invite-info">
                          <div className="cp-avatar"></div>
                          <div>
                            <span className="cp-name">{user.name}</span>
                            <span className="cp-username">
                              {user.username}
                            </span>
                          </div>
                        </div>
                        <button className="cp-invite-btn">
                          Invite
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="cp-footer">
          <button className="cp-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="cp-create">
            <i className="fa-solid fa-plus"></i> Create Project
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
