# TaskFlow — Task Manager

A full-stack task management application built with React, Node.js, Express, and PostgreSQL. Users can register, log in, create tasks, mark them complete, and delete them — all behind JWT-based authentication.

## Features

- **Authentication** — Register and login with email/password (JWT protected)
- **Create Tasks** — Add a task with a title and optional description
- **View Tasks** — See all your tasks in a clean list
- **Complete Tasks** — Mark any pending task as completed
- **Delete Tasks** — Remove tasks you no longer need
- **Filter Tasks** — Filter by All / Pending / Completed
- **Progress Bar** — Visual completion percentage on the dashboard
- **Responsive** — Works on mobile, tablet, and desktop

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS v4     |
| Backend   | Node.js, Express                    |
| Database  | PostgreSQL                          |
| Auth      | JWT (JSON Web Tokens) + bcryptjs    |
| Hosting   | Vercel (Frontend + Backend)         |
| DB Host   | Neon (PostgreSQL)                   |

## Prerequisites

- Node.js v18+
- PostgreSQL installed and running
- npm

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASS=your_password
DB_NAME=task_manager
DB_PORT=5432
PORT=5000
JWT_SECRET=any_long_random_string
FRONTEND_URL=http://localhost:5173
```

Create the database in PostgreSQL:

```sql
CREATE DATABASE task_manager;
```

> Tables are created automatically when the server starts.

Start the backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend setup

```bash
cd ../Frontend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`
```


## API Endpoints

### Auth

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| POST   | `/api/auth/register`  | Register a new user      | No            |
| POST   | `/api/auth/login`     | Login and get token      | No            |
| GET    | `/api/auth/me`        | Get current user info    | Yes           |

### Tasks

| Method | Endpoint          | Description             | Auth Required |
|--------|-------------------|-------------------------|---------------|
| GET    | `/api/tasks`      | Get all tasks           | Yes           |
| POST   | `/api/tasks`      | Create a new task       | Yes           |
| PATCH  | `/api/tasks/:id`  | Mark task as completed  | Yes           |
| DELETE | `/api/tasks/:id`  | Delete a task           | Yes           |

**Filter by status:**
```
GET /api/tasks?status=pending
GET /api/tasks?status=completed
```

**Request body — Register:**
```json
{
  "name": "Jayesh Deshmane",
  "email": "jayesh@example.com",
  "password": "secret123"
}
```

**Request body — Create Task:**
```json
{
  "title": "Fix the login bug",
  "description": "Users can't login with special characters in password"
}
```

**Auth header (for protected routes):**
```
Authorization: Bearer <your_jwt_token>
```

## Folder Structure

```
Task_manager_assignment/
├── Backend/
│   ├── config/
│   │   └── db.js               # PostgreSQL connection pool
│   ├── controllers/
│   │   ├── auth.controller.js  # register, login, getMe
│   │   └── task.controller.js  # CRUD task handlers
│   ├── middlewares/
│   │   └── auth.middleware.js  # JWT verification
│   ├── models/
│   │   ├── user.model.js       # users table queries
│   │   └── task.model.js       # tasks table queries
│   ├── routes/
│   │   ├── auth.routes.js      # /api/auth/*
│   │   └── task.routes.js      # /api/tasks/*
│   ├── .env.example
│   ├── server.js               # Express app entry point
│   ├── vercel.json             # Vercel deployment config
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── TaskContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   └── api.js          # Axios instance
    │   └── App.jsx
    ├── .env.example
    └── package.json
```

## License

This project is open-source and available under the ISC License.
