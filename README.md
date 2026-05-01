# Flowly — Project Management Tool

A full-stack project management web application built with React, Express, and MongoDB.

## Live Demo

[flowly.vercel.app](https://project-management-app-omega-umber.vercel.app)

Demo credentials:
- Email: alex.morrison@figma.com
- Password: 12345

## Features

### Users & Social
- Register and login with JWT authentication
- Search for other users and view their public profiles
- Follow / unfollow users
- View projects a user created or contributed to

### Projects
- Create projects and invite other users as members
- Edit project details
- View a summary of any public project

### Task Board
- Kanban-style dashboard with three columns: **Planning**, **In Progress**, **Done**
- Only the task owner can drag tasks between columns
- Only the task owner and project owner can view full task details
- Add comments to tasks
- Project owner can add a checklist to tasks

### Security
- JWT-based authentication and authorization
- Every route is protected with auth middleware
- Rate limiting (express-rate-limit)
- HTTP security headers (Helmet)
- CORS protection
- HTTP parameter pollution prevention (HPP)

> and more — including notification system, profile editing, and additional project and task management capabilities.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (Access Tokens) |
| Hosting | Vercel (frontend), Render (backend), MongoDB Atlas |
