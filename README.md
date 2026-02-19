# 📋 Todo List Web App

A modern, full-stack todo list application with a React frontend and Express.js backend. This project demonstrates best practices for frontend-backend communication, API design, and real-time data synchronization.

> **Status:** ✅ Fully Functional | **License:** MIT

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## 🎯 Overview

**Todo List Web App** is a simple yet feature-rich task management application that showcases a complete full-stack implementation. It provides a clean, intuitive interface for users to manage their daily tasks with persistent storage and real-time synchronization between frontend and backend.

This project is ideal for:
- Learning full-stack development
- Understanding REST API design patterns
- Exploring frontend-backend communication
- Reference implementation for CRUD operations
- Base template for more complex applications

---

## ✨ Features

### Core Features
- ✅ **Add Todos** - Create new tasks with title and optional description
- ✅ **Mark Complete** - Toggle completion status with visual feedback
- ✅ **Edit Todos** - Modify titles and descriptions inline
- ✅ **Delete Todos** - Remove completed or unwanted tasks
- ✅ **Progress Tracking** - Real-time counter showing completed vs. total tasks

### Technical Features
- 🔄 **Real-time Synchronization** - Instant updates across the application
- 💾 **Persistent Storage** - All todos saved to JSON file backend
- 🌐 **CORS Enabled** - Seamless frontend-backend communication
- ⚡ **Fast Performance** - Optimized API responses
- 🛡️ **Error Handling** - Comprehensive error messages and validation
- 🔧 **Hot Reload Support** - Development-friendly with automatic refresh

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18.2.0** | UI library and component management |
| **Axios 1.6.0** | HTTP client for API requests |
| **CSS3** | Styling and responsive design |
| **HTML5** | Semantic markup |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Express.js 4.18.2** | Web framework and routing |
| **CORS 2.8.5** | Cross-Origin Resource Sharing |
| **Body-parser 1.20.2** | Request body parsing middleware |
| **Node.js** | Runtime environment |
| **JSON File** | Data persistence |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Nodemon 3.0.1** | Auto-restart server on file changes |
| **HTTP Server 14.1.1** | Local development server for frontend |

---

## 🏛️ Project Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   USER BROWSER (Port 3000)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         React Frontend (TodoApp Component)            │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ State Management (useState hooks)               │ │   │
│  │  │ - todos: []                                      │ │   │
│  │  │ - newTitle, newDescription                      │ │   │
│  │  │ - loading, error states                         │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  │              ↕ (Axios HTTP Requests)                  │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ UI Components                                    │ │   │
│  │  │ - Header (title + progress)                     │ │   │
│  │  │ - Form (add new todo)                           │ │   │
│  │  │ - TodoList (render todos)                       │ │   │
│  │  │ - Error/Loading States                          │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ⬇️                                  │
│              HTTP Requests (JSON Payload)                     │
│                           ⬇️                                  │
└─────────────────────────────────────────────────────────────┘
                            ⬆️ ⬇️
                    (REST API Communication)
                            ⬆️ ⬇️
┌─────────────────────────────────────────────────────────────┐
│                 Express.js Server (Port 5000)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Express Middleware                                    │   │
│  │ - CORS (allows frontend requests)                    │   │
│  │ - Body Parser (JSON parsing)                         │   │
│  │ - Error handling                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│              ⬇️                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Route Handlers (CRUD Operations)                      │   │
│  │ ├─ GET /todos (fetch all)                            │   │
│  │ ├─ POST /todos (create new)                          │   │
│  │ ├─ PUT /todos/:id (update specific)                  │   │
│  │ ├─ DELETE /todos/:id (delete specific)               │   │
│  │ └─ GET /health (server status)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│              ⬇️                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ File-Based Storage Layer                              │   │
│  │ - readTodos() / writeTodos()                          │   │
│  │ - todos.json (persistent storage)                    │   │
│  │ - ID generation and validation                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Interaction** → Frontend captures user input
2. **API Request** → Axios sends HTTP request to backend
3. **Server Processing** → Express route handler processes request
4. **File Operations** → Read/write todos.json file
5. **Response** → Send JSON response back to frontend
6. **State Update** → React updates component state
7. **UI Re-render** → Changes displayed to user

### Communication Protocol

- **Protocol:** HTTP/REST
- **Data Format:** JSON
- **CORS:** Enabled for localhost:3000 ↔ localhost:5000
- **Error Handling:** HTTP status codes + error messages

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js

### Verification

Check your versions:

```bash
node --version
npm --version
```

You should see output like:
```
v18.x.x (or higher)
8.x.x (or higher)
```

### Optional
- **Git** - For version control
- **VS Code** or your favorite code editor
- **Postman** - For API testing

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Varun-2538/clawd_test.git
cd clawd_test
```

### Step 2: Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

**Installed Dependencies:**
- `express` - Web framework
- `cors` - Enable cross-origin requests
- `body-parser` - Parse request bodies
- `nodemon` (dev) - Auto-reload server

**Configuration:**
- Default Port: `5000`
- Data File: `backend/todos.json` (auto-created on first run)
- Environment: Development

### Step 3: Frontend Setup

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm install
```

**Installed Dependencies:**
- `react` - UI library
- `react-dom` - DOM rendering
- `axios` - HTTP client
- `http-server` (dev) - Development server

**Configuration:**
- Default Port: `3000`
- API URL: `http://localhost:5000`

### Verification

After setup, you should have:

```
clawd_test/
├── backend/
│   ├── node_modules/
│   ├── todos.json (created on first run)
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── node_modules/
│   ├── package.json
│   ├── index.html
│   └── app.js
├── .gitignore
├── DEVELOPMENT.md
└── README.md
```

---

## ▶️ Running the Application

### Option 1: Running Both Services (Recommended)

**Terminal 1 - Start Backend:**

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Todo API server running on http://localhost:5000
📋 API endpoints: GET/POST /todos, PUT/DELETE /todos/:id
```

**Terminal 2 - Start Frontend:**

```bash
cd frontend
npm start
```

Expected output:
```
Starting up http-server, serving ./
Available on:
  http://localhost:3000
```

Then open your browser to **http://localhost:3000**

### Option 2: Production Mode

For production builds (without hot reload):

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

### Stopping the Services

Press `Ctrl+C` in each terminal to stop the servers.

### Health Check

Verify both services are running:

```bash
# In a third terminal
curl http://localhost:5000/health

# Expected response:
# {"status":"OK","timestamp":"2024-02-19T12:00:00.000Z"}
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

### Response Format
All responses are in JSON format.

### Error Responses
Standard HTTP status codes are used:
- `400` - Bad Request (validation error)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## 📌 Endpoints

### 1. Get All Todos

Retrieve all todo items.

**Request:**
```http
GET /todos
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/todos
```

**JavaScript/Axios Example:**
```javascript
const fetchTodos = async () => {
  try {
    const response = await axios.get('http://localhost:5000/todos');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

**Response (200 OK):**
```json
[
  {
    "id": "_abc123xyz",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2024-02-19T10:30:00.000Z"
  },
  {
    "id": "_def456uvw",
    "title": "Complete project",
    "description": "Finish the todo app",
    "completed": true,
    "createdAt": "2024-02-19T09:15:00.000Z"
  }
]
```

**Response (500 Error):**
```json
{
  "error": "Failed to fetch todos"
}
```

---

### 2. Create a Todo

Add a new todo item.

**Request:**
```http
POST /todos
Content-Type: application/json

{
  "title": "string (required)",
  "description": "string (optional)"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","description":"Complete Express course"}'
```

**JavaScript/Axios Example:**
```javascript
const createTodo = async (title, description) => {
  try {
    const response = await axios.post('http://localhost:5000/todos', {
      title: title,
      description: description
    });
    console.log('Created:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

createTodo('Learn React', 'Complete React hooks tutorial');
```

**Response (201 Created):**
```json
{
  "id": "_ghi789rst",
  "title": "Learn Node.js",
  "description": "Complete Express course",
  "completed": false,
  "createdAt": "2024-02-19T11:45:00.000Z"
}
```

**Response (400 Bad Request - Missing Title):**
```json
{
  "error": "Title is required"
}
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | Yes | The todo title (min 1 character) |
| description | string | No | Additional details about the todo |

---

### 3. Update a Todo

Update an existing todo item (title, description, or completion status).

**Request:**
```http
PUT /todos/:id
Content-Type: application/json

{
  "title": "string (optional)",
  "description": "string (optional)",
  "completed": "boolean (optional)"
}
```

**cURL Examples:**

```bash
# Update title
curl -X PUT http://localhost:5000/todos/_abc123xyz \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated title"}'

# Mark as completed
curl -X PUT http://localhost:5000/todos/_abc123xyz \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Update description
curl -X PUT http://localhost:5000/todos/_abc123xyz \
  -H "Content-Type: application/json" \
  -d '{"description":"New description"}'
```

**JavaScript/Axios Example:**
```javascript
const updateTodo = async (id, updates) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/todos/${id}`,
      updates
    );
    console.log('Updated:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

// Mark todo as completed
updateTodo('_abc123xyz', { completed: true });

// Update title and description
updateTodo('_abc123xyz', {
  title: 'New title',
  description: 'New description'
});
```

**Response (200 OK):**
```json
{
  "id": "_abc123xyz",
  "title": "Updated title",
  "description": "Buy groceries",
  "completed": true,
  "createdAt": "2024-02-19T10:30:00.000Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Todo not found"
}
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | The unique identifier of the todo |

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | No | Updated title for the todo |
| description | string | No | Updated description for the todo |
| completed | boolean | No | Mark todo as completed (true) or incomplete (false) |

---

### 4. Delete a Todo

Remove a todo item permanently.

**Request:**
```http
DELETE /todos/:id
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/todos/_abc123xyz
```

**JavaScript/Axios Example:**
```javascript
const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/todos/${id}`
    );
    console.log('Deleted:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

deleteTodo('_abc123xyz');
```

**Response (200 OK):**
```json
{
  "message": "Todo deleted",
  "todo": {
    "id": "_abc123xyz",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2024-02-19T10:30:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Todo not found"
}
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | The unique identifier of the todo to delete |

---

### 5. Health Check

Check if the backend server is running and operational.

**Request:**
```http
GET /health
```

**cURL Example:**
```bash
curl http://localhost:5000/health
```

**JavaScript/Axios Example:**
```javascript
const checkHealth = async () => {
  try {
    const response = await axios.get('http://localhost:5000/health');
    console.log('Server status:', response.data);
  } catch (error) {
    console.error('Server is down');
  }
};

checkHealth();
```

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2024-02-19T11:45:00.000Z"
}
```

---

## 🔄 Development Workflow

### Recommended Development Setup

```bash
# Terminal 1: Backend with hot reload
cd backend
npm run dev

# Terminal 2: Frontend with hot reload
cd frontend
npm start

# Terminal 3: (Optional) API Testing
curl http://localhost:5000/health
```

### Making Changes

#### Backend Changes
1. Edit files in `backend/server.js`
2. Save the file
3. **Nodemon automatically restarts** the server
4. Check console for errors

#### Frontend Changes
1. Edit files in `frontend/app.js` or `index.html`
2. Save the file
3. **Browser automatically reloads** (or manual refresh)
4. Check browser console for errors

### Adding a New Endpoint

Example: Add a "clear completed todos" endpoint

**1. Add to backend (`backend/server.js`):**

```javascript
// Clear completed todos
app.delete('/todos/clear-completed', (req, res) => {
  try {
    let todos = readTodos();
    const incomplete = todos.filter(t => !t.completed);
    const deletedCount = todos.length - incomplete.length;
    
    writeTodos(incomplete);
    res.json({ 
      message: `Cleared ${deletedCount} completed todos`,
      remaining: incomplete.length 
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear completed todos' });
  }
});
```

**2. Use in frontend:**

```javascript
const clearCompleted = async () => {
  try {
    const response = await axios.delete(
      `${API_URL}/todos/clear-completed`
    );
    alert(response.data.message);
    fetchTodos(); // Refresh the list
  } catch (err) {
    console.error('Error:', err);
  }
};
```

### Testing During Development

#### API Testing with cURL
```bash
# Test GET
curl http://localhost:5000/todos

# Test POST
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test todo"}'

# Test PUT
curl -X PUT http://localhost:5000/todos/[ID] \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Test DELETE
curl -X DELETE http://localhost:5000/todos/[ID]
```

#### Browser Console Testing
```javascript
// Directly test from browser console
fetch('http://localhost:5000/todos')
  .then(r => r.json())
  .then(data => console.log(data));
```

### Code Style Guidelines

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Use descriptive variable names
- Handle errors gracefully
- Test new code before committing

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

Find and kill the process using the port:

```bash
# On Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess

# Kill the process
Stop-Process -Id [PID] -Force

# Or change the port
set PORT=3001
npm start
```

```bash
# On macOS/Linux
lsof -i :5000
kill -9 [PID]

# Or change the port
PORT=3001 npm start
```

---

#### Issue 2: Backend Not Responding / CORS Error

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:5000/todos' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Causes:**
- Backend not running
- Backend running on wrong port
- CORS not properly configured

**Solutions:**

```bash
# Step 1: Verify backend is running
curl http://localhost:5000/health

# Step 2: Check if it's on correct port
# Default: 5000 (can be changed with PORT environment variable)

# Step 3: Verify API_URL in frontend/app.js
# Should be: const API_URL = 'http://localhost:5000';

# Step 4: Check backend/server.js for CORS middleware
# Should have: app.use(cors());
```

---

#### Issue 3: "todos.json" Not Found / Permission Denied

**Error Message:**
```
Error: ENOENT: no such file or directory, open 'backend/todos.json'
Error: EACCES: permission denied, open 'backend/todos.json'
```

**Solutions:**

```bash
# Verify you're in the backend directory
cd backend
ls -la

# Ensure todos.json has proper permissions
chmod 644 todos.json

# Or restart the server to auto-create it
npm run dev

# Check if backend directory is writable
mkdir -p test && rm -rf test
```

---

#### Issue 4: Dependencies Installation Fails

**Error Message:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with legacy dependency resolution
npm install --legacy-peer-deps

# Or upgrade npm
npm install -g npm@latest
```

---

#### Issue 5: Hot Reload Not Working

**Symptoms:**
- Changes not reflected without manual browser refresh
- Server not restarting on file changes

**Solutions:**

```bash
# Ensure you're using dev scripts, not start
npm run dev   # ✅ Correct - uses nodemon
npm start     # ❌ Wrong - no auto reload

# Reinstall nodemon
npm install --save-dev nodemon

# Try restarting the server
npm run dev
```

---

#### Issue 6: React App Shows Blank Page

**Symptoms:**
- Page loads but nothing displays
- No JavaScript errors in console

**Solutions:**

```bash
# Check if you're on the correct port
# Should be http://localhost:3000

# Clear browser cache
# Ctrl+Shift+R (hard refresh)

# Verify React is loaded
# In browser console, check if React is available:
console.log(React);  // Should print React object

# Check if server is serving files correctly
curl http://localhost:3000

# Reinstall frontend dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

#### Issue 7: Cannot Delete/Update Todo

**Error Message:**
```
Failed to update todo
```

**Causes:**
- Todo ID doesn't exist
- Malformed request
- Backend error in file operations

**Solutions:**

```bash
# Verify todo exists
curl http://localhost:5000/todos | grep [TODO_ID]

# Test update endpoint manually
curl -X PUT http://localhost:5000/todos/[ID] \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Check backend logs for detailed error
# (should print errors when running with npm run dev)

# Verify todos.json is not corrupted
# Check: backend/todos.json
# Should be valid JSON
```

---

### Getting Help

If you encounter issues not listed above:

1. **Check the console logs:**
   - Backend: Output from `npm run dev`
   - Frontend: Browser DevTools → Console tab

2. **Verify connectivity:**
   ```bash
   curl http://localhost:5000/health
   curl http://localhost:3000
   ```

3. **Check file permissions:**
   ```bash
   ls -la backend/
   ls -la frontend/
   ```

4. **Review the code:**
   - `backend/server.js` - All routes and logic
   - `frontend/app.js` - UI and API calls

---

## 🤝 Contributing

We welcome contributions! This project is a great learning opportunity.

### How to Contribute

#### 1. Fork the Repository
```bash
# Go to https://github.com/Varun-2538/clawd_test
# Click "Fork" button
```

#### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/clawd_test.git
cd clawd_test
```

#### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name

# Examples:
git checkout -b feature/add-categories
git checkout -b feature/improve-ui
git checkout -b fix/cors-issue
```

#### 4. Make Your Changes

```bash
# Backend changes
cd backend
# Edit server.js, add new features

# Frontend changes
cd frontend
# Edit app.js, index.html, or add new components
```

#### 5. Test Your Changes

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start

# Test all endpoints manually or use curl
```

#### 6. Commit Your Changes

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Add feature: clear completed todos"

# Or use specific paths
git commit -m "feat: add clear completed endpoint
- Add DELETE /todos/clear-completed endpoint
- Add button to frontend
- Update API documentation"
```

**Commit Message Guidelines:**

- Start with a verb: `Add`, `Fix`, `Improve`, `Refactor`
- Be descriptive and specific
- Reference issues if applicable: `Fix #123`
- Keep messages under 50 characters for title

#### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

#### 8. Create a Pull Request

1. Go to https://github.com/Varun-2538/clawd_test
2. Click "Pull Request" button
3. Select your branch
4. Add description of changes
5. Submit!

### Code Standards

**JavaScript:**
```javascript
// ✅ Good
const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (err) {
    console.error('Error fetching todos:', err);
    throw err;
  }
};

// ❌ Avoid
const fetchtodos=async()=>{
  const r=await axios.get(`${API_URL}/todos`);
  return r.data;
};
```

**Error Handling:**
```javascript
// ✅ Always handle errors
try {
  // code
} catch (err) {
  console.error('Descriptive error message:', err);
  // Handle or rethrow
}

// ❌ Never ignore errors
axios.get('/todos'); // No error handling!
```

**Variable Naming:**
```javascript
// ✅ Clear names
const isCompleted = true;
const todoTitle = "Learn React";
const todoCount = todos.length;

// ❌ Ambiguous names
const x = true;
const t = "Learn React";
const c = todos.length;
```

### Types of Contributions Welcome

- 🐛 **Bug fixes** - Fix issues and improve reliability
- ✨ **Features** - Add new functionality
- 📚 **Documentation** - Improve README, add comments
- 🎨 **UI/UX** - Improve styling and user experience
- ⚡ **Performance** - Optimize code and API calls
- 🧪 **Tests** - Add test coverage
- 🔒 **Security** - Improve security and validation

### Feature Ideas

Looking for something to work on?

1. **Database Integration** - Replace JSON with MongoDB/PostgreSQL
2. **User Authentication** - Add login system
3. **Categories/Tags** - Organize todos by category
4. **Due Dates** - Add deadline tracking
5. **Priority Levels** - Mark todos as high/medium/low priority
6. **Search/Filter** - Find todos by keyword or status
7. **Export/Import** - Backup and restore todos
8. **Dark Mode** - Theme switcher
9. **Unit Tests** - Add Jest tests
10. **Docker** - Containerize the application

---

## 📂 Project Structure

```
clawd_test/
│
├── 📄 README.md                    # This file - comprehensive documentation
├── 📄 DEVELOPMENT.md               # Development progress tracker
├── 📄 .gitignore                   # Git ignore rules
│
├── 📁 backend/                     # Express.js server
│   ├── 📄 server.js               # Main server file with all endpoints
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 .gitignore              # Backend specific ignores
│   ├── 📁 node_modules/           # Installed packages (auto-created)
│   └── 📄 todos.json              # Data file (auto-created on startup)
│
└── 📁 frontend/                    # React application
    ├── 📄 index.html              # HTML entry point
    ├── 📄 app.js                  # React component with UI logic
    ├── 📄 package.json            # Frontend dependencies
    ├── 📁 node_modules/           # Installed packages (auto-created)
    └── 📁 css/                    # Stylesheets (inline in this version)
```

### Key Files Explained

#### `backend/server.js`
- Main Express server
- Defines all API endpoints (GET, POST, PUT, DELETE)
- Handles CORS, body parsing, error handling
- Manages file-based todo storage

#### `frontend/app.js`
- React TodoApp component
- State management with hooks (useState, useEffect)
- API integration with Axios
- UI rendering and event handling

#### `frontend/index.html`
- HTML structure
- Loads React, ReactDOM, and Axios from CDN
- Includes CSS styling
- Root div for React mounting

#### `backend/todos.json`
- JSON file storing all todos
- Auto-created on first server run
- Stores todo objects with id, title, description, completed, createdAt

---

## 🔮 Future Enhancements

### Planned Features

#### Phase 2: Database Integration
- [ ] Replace JSON file with MongoDB
- [ ] Add user accounts
- [ ] Personal todo lists per user
- [ ] Cloud synchronization

#### Phase 3: Advanced Features
- [ ] Recurring todos
- [ ] Due dates and reminders
- [ ] Categories and tags
- [ ] Subtasks
- [ ] File attachments
- [ ] Sharing and collaboration

#### Phase 4: Mobile & PWA
- [ ] React Native mobile app
- [ ] Progressive Web App (PWA)
- [ ] Offline support with service workers
- [ ] Push notifications

#### Phase 5: DevOps & Deployment
- [ ] Docker containerization
- [ ] GitHub Actions CI/CD
- [ ] Automated testing (Jest, Cypress)
- [ ] Deploy to Heroku/AWS/Vercel
- [ ] Environment configuration

### Technology Roadmap

- **Backend:** Express → NestJS → Microservices
- **Database:** JSON → MongoDB → PostgreSQL
- **Frontend:** React → Next.js → TypeScript
- **Testing:** Manual → Jest/Cypress → E2E tests
- **Deployment:** Local → Docker → Kubernetes

---

## 📄 License

This project is licensed under the **MIT License** - see below:

```
MIT License

Copyright (c) 2024 Varun-2538

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

## 📞 Support

### Resources

- **Documentation:** See this README.md
- **Issues:** Report bugs on GitHub Issues
- **Discussions:** Start a discussion for questions

### Quick Links

- [Project Repository](https://github.com/Varun-2538/clawd_test)
- [Issue Tracker](https://github.com/Varun-2538/clawd_test/issues)
- [Discussions](https://github.com/Varun-2538/clawd_test/discussions)

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Powered by [Express.js](https://expressjs.com)
- HTTP requests via [Axios](https://axios-http.com)

---

## 📝 Changelog

### v1.0.0 (2024-02-19)

**Initial Release:**
- ✅ Basic todo CRUD operations
- ✅ React frontend with real-time UI updates
- ✅ Express.js REST API
- ✅ JSON file-based storage
- ✅ CORS enabled
- ✅ Error handling and validation
- ✅ Hot reload development setup
- ✅ Comprehensive documentation

---

## 🚀 Getting Started Checklist

- [ ] Read this entire README
- [ ] Install Node.js and npm
- [ ] Clone the repository
- [ ] Install backend dependencies (`npm install` in `/backend`)
- [ ] Install frontend dependencies (`npm install` in `/frontend`)
- [ ] Start backend server (`npm run dev` in `/backend`)
- [ ] Start frontend server (`npm start` in `/frontend`)
- [ ] Open http://localhost:3000 in your browser
- [ ] Create your first todo! ✨

---

<div align="center">

**Made with ❤️ by the Bot Army**

[⬆ Back to Top](#-todo-list-web-app)

</div>
