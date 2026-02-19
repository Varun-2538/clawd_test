# Todo List Web App

A full-stack todo list application built with Express.js (backend) and React (frontend). Features a modern, responsive UI with complete CRUD operations for managing your daily tasks.

## Features

✨ **Modern UI**
- Beautiful gradient design with responsive layout
- Smooth animations and transitions
- Mobile-friendly interface

🚀 **Functionality**
- ✅ Create, read, update, and delete todos
- 📋 Mark todos as complete/incomplete
- 🏷️ Filter todos (All, Active, Completed)
- 📝 Add detailed descriptions to tasks
- ⏰ Timestamps for creation and updates

🔧 **Backend**
- RESTful API with Express.js
- JSON file-based storage
- CORS enabled for frontend
- Input validation and error handling
- Unique IDs for each todo (UUID)

🎨 **Frontend**
- React with hooks for state management
- Axios for API communication
- No build step required (uses CDN)
- Real-time UI updates
- Error and success notifications

## Project Structure

```
clawd_test/
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── package.json        # Backend dependencies
│   └── todos.json          # JSON file storage (auto-created)
├── frontend/
│   └── public/
│       ├── index.html      # HTML with embedded styles
│       └── app.js          # React application
│   └── package.json        # Frontend dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

You should see:
```
✅ Todo API server is running on http://localhost:5000
📁 Todos stored in: [path]/todos.json
```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (optional if using CDN):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Or simply open `frontend/public/index.html` in your browser. The app will connect to the backend at `http://localhost:5000`.

## Running the App

### Option 1: Full Setup with npm

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

### Option 2: Standalone Frontend

You can run the frontend standalone by opening `frontend/public/index.html` directly in your browser. It will try to connect to the backend API at `http://localhost:5000`.

**Make sure the backend is running!**

## API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### GET /todos
Retrieve all todos.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "title": "Buy groceries",
      "description": "Milk, bread, eggs",
      "completed": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### POST /todos
Create a new todo.

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs (optional)"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": "uuid-string",
    "title": "Buy groceries",
    "description": "Milk, bread, eggs",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### PUT /todos/:id
Update a todo by ID.

**Request Body:**
```json
{
  "title": "Updated title (optional)",
  "description": "Updated description (optional)",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": { /* updated todo */ }
}
```

#### DELETE /todos/:id
Delete a todo by ID.

**Response:**
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": { /* deleted todo */ }
}
```

#### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- **200 OK** - Successful GET request
- **201 Created** - Successful POST request
- **400 Bad Request** - Validation error
- **404 Not Found** - Todo not found
- **500 Internal Server Error** - Server error

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

## Todo Object Structure

```typescript
{
  id: string (UUID),
  title: string (required, non-empty),
  description: string (optional),
  completed: boolean (default: false),
  createdAt: string (ISO 8601 timestamp),
  updatedAt: string (ISO 8601 timestamp)
}
```

## Input Validation

**Title:**
- Required
- Must be a non-empty string
- Whitespace is trimmed

**Description:**
- Optional
- Must be a string if provided
- Whitespace is trimmed

**Completed:**
- Optional
- Must be a boolean if provided

## Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Ensure Node.js is installed: `node --version`
- Try installing dependencies: `npm install`

### Frontend can't connect to backend
- Make sure backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify backend is accessible: `curl http://localhost:5000/health`

### Todos data is lost
- Check if `backend/todos.json` exists and is readable
- Ensure the backend has write permissions in its directory
- Check backend logs for file system errors

### Port 3000 or 5000 already in use
- **Windows:** `netstat -ano | findstr :5000`
- **Mac/Linux:** `lsof -i :5000`
- Kill the process or use a different port

## Development

### Adding New Features

1. **Backend Changes:**
   - Edit `backend/server.js`
   - Add new endpoints or modify validation
   - Restart the server

2. **Frontend Changes:**
   - Edit `frontend/public/app.js` or `index.html`
   - Changes are reflected immediately in browser

### Testing the API

Use curl or Postman:

```bash
# Get all todos
curl http://localhost:5000/todos

# Create a todo
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Description"}'

# Update a todo
curl -X PUT http://localhost:5000/todos/[id] \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:5000/todos/[id]
```

## Technology Stack

**Backend:**
- Node.js
- Express.js
- UUID
- CORS

**Frontend:**
- React 18
- Axios
- HTML5 & CSS3

## License

MIT

## Support

For issues or questions, refer to the troubleshooting section above or check the browser console for error messages.

---

**Happy tasking!** 🎯
