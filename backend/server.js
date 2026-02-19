const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;
const TODOS_FILE = path.join(__dirname, 'todos.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read todos from JSON file
function readTodos() {
  try {
    if (fs.existsSync(TODOS_FILE)) {
      const data = fs.readFileSync(TODOS_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading todos:', error);
    return [];
  }
}

// Helper function to write todos to JSON file
function writeTodos(todos) {
  try {
    fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing todos:', error);
    return false;
  }
}

// Validation helper
function validateTodo(todo) {
  const errors = [];
  
  if (!todo.title || typeof todo.title !== 'string' || todo.title.trim() === '') {
    errors.push('Title is required and must be a non-empty string');
  }
  
  if (todo.description && typeof todo.description !== 'string') {
    errors.push('Description must be a string');
  }
  
  if (todo.hasOwnProperty('completed') && typeof todo.completed !== 'boolean') {
    errors.push('Completed must be a boolean');
  }
  
  return errors;
}

// GET /todos - Retrieve all todos
app.get('/todos', (req, res) => {
  try {
    const todos = readTodos();
    res.json({
      success: true,
      data: todos,
      count: todos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve todos'
    });
  }
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Validate input
    const validationErrors = validateTodo({ title, description });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }
    
    const todos = readTodos();
    
    const newTodo = {
      id: uuidv4(),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    
    if (writeTodos(todos)) {
      res.status(201).json({
        success: true,
        message: 'Todo created successfully',
        data: newTodo
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to create todo'
      });
    }
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    // Validate input
    const validationErrors = validateTodo({ title, description, completed });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }
    
    const todos = readTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    // Update fields
    if (title !== undefined) {
      todos[todoIndex].title = title.trim();
    }
    if (description !== undefined) {
      todos[todoIndex].description = description.trim();
    }
    if (completed !== undefined) {
      todos[todoIndex].completed = completed;
    }
    
    todos[todoIndex].updatedAt = new Date().toISOString();
    
    if (writeTodos(todos)) {
      res.json({
        success: true,
        message: 'Todo updated successfully',
        data: todos[todoIndex]
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to update todo'
      });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const todos = readTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    
    if (writeTodos(todos)) {
      res.json({
        success: true,
        message: 'Todo deleted successfully',
        data: deletedTodo
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to delete todo'
      });
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Todo API server is running on http://localhost:${PORT}`);
  console.log(`📁 Todos stored in: ${TODOS_FILE}`);
});
