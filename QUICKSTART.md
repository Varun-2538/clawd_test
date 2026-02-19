# Quick Start Guide

Get the Todo List Web App running in minutes!

## 🚀 Start Backend (Port 5000)

```bash
cd backend
npm install
npm start
```

Expected output:
```
✅ Todo API server is running on http://localhost:5000
📁 Todos stored in: [path]/todos.json
```

## 🎨 Start Frontend (Port 3000)

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

## 🌐 Alternative: Use Frontend Without Build

Simply open `frontend/public/index.html` directly in your browser. Make sure the backend is running!

## ✅ Test the Setup

```bash
# Check backend is running
curl http://localhost:5000/health

# Create a todo
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Todo","description":"Learn the app"}'

# Get all todos
curl http://localhost:5000/todos
```

## 📝 Features

- ✅ Add, edit, delete todos
- 📋 Mark todos as complete
- 🏷️ Filter: All, Active, Completed
- 💾 Auto-saved to JSON file
- 📱 Responsive mobile design
- 🎨 Beautiful gradient UI

## 🆘 Troubleshooting

**Backend won't start:**
- Port 5000 is in use? Try: `netstat -ano | findstr :5000`
- Node not installed? `node --version`

**Frontend can't connect:**
- Backend running on localhost:5000? ✓
- Check browser console for errors
- CORS should be enabled automatically

**Port already in use:**
- Windows: `netstat -ano | findstr :5000`
- Mac/Linux: `lsof -i :5000`

## 📚 Full Documentation

See `README.md` for:
- Complete API documentation
- Detailed setup instructions
- Project structure
- Technology stack
- Development guide

---

That's it! You're ready to manage your todos! 🎯
