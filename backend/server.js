const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File-based storage
const todosFile = path.join(__dirname, 'todos.json');

// Initialize todos file if it doesn't exist
if (!fs.existsSync(todosFile)) {
  fs.writeFileSync(todosFile, JSON.stringify([], null, 2));
}

// Helper functions
const readTodos = () => {
  try {
    const data = fs.readFileSync(todosFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeTodos = (todos) => {
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
};

const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

// Routes

// GET all todos
app.get('/todos', (req, res) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST create new todo
app.post('/todos', (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todos = readTodos();
    const newTodo = {
      id: generateId(),
      title: title.trim(),
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT update todo
app.put('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todos = readTodos();
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (title !== undefined) todos[todoIndex].title = title.trim();
    if (description !== undefined) todos[todoIndex].description = description;
    if (completed !== undefined) todos[todoIndex].completed = completed;

    writeTodos(todos);
    res.json(todos[todoIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;

    let todos = readTodos();
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const deletedTodo = todos.splice(todoIndex, 1);
    writeTodos(todos);

    res.json({ message: 'Todo deleted', todo: deletedTodo[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Todo API server running on http://localhost:${PORT}`);
  console.log(`📋 API endpoints: GET/POST /todos, PUT/DELETE /todos/:id`);
});
