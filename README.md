# Todo List Web App

A simple, modern todo list application built with React (frontend) and Express.js (backend).

## Project Structure

```
.
├── frontend/          # React frontend
├── backend/           # Express.js API
└── README.md
```

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npm start
```

The API will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will open on `http://localhost:3000`

## API Endpoints

- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `GET /health` - Health check

## Features

- ✅ Add new todos
- ✅ Mark todos as complete
- ✅ Edit todo titles and descriptions
- ✅ Delete todos
- ✅ Persistent storage (JSON file)
- ✅ CORS enabled for frontend-backend communication

## Tech Stack

- **Frontend:** React, Axios
- **Backend:** Express.js, CORS, Body-parser
- **Storage:** JSON file

## Development

Both frontend and backend support hot-reloading during development:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

---

Built with ❤️ by the bot army
