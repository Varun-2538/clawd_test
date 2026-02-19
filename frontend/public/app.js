const { useState, useEffect, useCallback } = React;

const API_URL = 'http://localhost:5000/todos';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch todos from API
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running on port 5000.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Add new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(API_URL, {
        title,
        description
      });
      setTodos([...todos, response.data.data]);
      setTitle('');
      setDescription('');
      setSuccess('Todo added successfully!');
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || 'Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  // Update todo
  const handleUpdateTodo = async (id, updates) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.put(`${API_URL}/${id}`, updates);
      setTodos(todos.map(t => t.id === id ? response.data.data : t));
      setSuccess('Todo updated successfully!');
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || 'Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    setLoading(true);
    setError('');
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(t => t.id !== id));
      setSuccess('Todo deleted successfully!');
    } catch (err) {
      setError('Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion
  const handleToggleComplete = (todo) => {
    handleUpdateTodo(todo.id, { completed: !todo.completed });
  };

  // Start editing
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  // Save edit
  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      setError('Title is required');
      return;
    }
    await handleUpdateTodo(editingId, {
      title: editTitle,
      description: editDescription
    });
    setEditingId(null);
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return React.createElement('div', { className: 'container' },
    React.createElement('div', { className: 'header' },
      React.createElement('h1', null, '✓ Todo List'),
      React.createElement('p', null, 'Organize your tasks and boost productivity')
    ),

    React.createElement('div', { className: 'content' },
      error && React.createElement('div', { className: 'error' }, error),
      success && React.createElement('div', { className: 'success' }, success),

      // Add Todo Form
      React.createElement('div', { className: 'input-section' },
        React.createElement('form', { onSubmit: handleAddTodo },
          React.createElement('div', { className: 'input-group' },
            React.createElement('input', {
              type: 'text',
              placeholder: 'What needs to be done?',
              value: title,
              onChange: (e) => setTitle(e.target.value),
              disabled: loading
            }),
            React.createElement('textarea', {
              placeholder: 'Add a description... (optional)',
              value: description,
              onChange: (e) => setDescription(e.target.value),
              disabled: loading
            })
          ),
          React.createElement('div', { className: 'button-group' },
            React.createElement('button', {
              type: 'submit',
              className: 'btn-primary',
              disabled: loading
            }, loading && editingId === null ? 'Adding...' : '➕ Add Todo')
          )
        )
      ),

      // Filters
      React.createElement('div', { className: 'filters' },
        React.createElement('button', {
          className: `filter-btn ${filter === 'all' ? 'active' : ''}`,
          onClick: () => setFilter('all')
        }, 'All'),
        React.createElement('button', {
          className: `filter-btn ${filter === 'active' ? 'active' : ''}`,
          onClick: () => setFilter('active')
        }, 'Active'),
        React.createElement('button', {
          className: `filter-btn ${filter === 'completed' ? 'active' : ''}`,
          onClick: () => setFilter('completed')
        }, 'Completed')
      ),

      // Todos List
      React.createElement('div', { className: 'todos-section' },
        React.createElement('div', { className: 'todos-header' },
          React.createElement('h2', null, 'Your Tasks'),
          React.createElement('span', { className: 'todos-count' }, `${filteredTodos.length} ${filteredTodos.length === 1 ? 'task' : 'tasks'}`)
        ),

        loading && todos.length === 0 ?
          React.createElement('div', { className: 'loading' }, 'Loading todos...') :

        filteredTodos.length === 0 ?
          React.createElement('div', { className: 'empty-state' },
            React.createElement('h3', null, 'No tasks yet'),
            React.createElement('p', null, filter === 'completed' ? 'You haven\'t completed any tasks yet' : filter === 'active' ? 'All tasks completed! Great job! 🎉' : 'Create your first todo to get started!')
          ) :

          React.createElement('div', { className: 'todos-list' },
            filteredTodos.map(todo =>
              editingId === todo.id ?
                React.createElement('div', { key: todo.id, className: 'todo-item' },
                  React.createElement('div', { className: 'todo-content', style: { width: '100%' } },
                    React.createElement('input', {
                      type: 'text',
                      value: editTitle,
                      onChange: (e) => setEditTitle(e.target.value),
                      style: {
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '2px solid #667eea',
                        borderRadius: '6px',
                        fontSize: '1em'
                      }
                    }),
                    React.createElement('textarea', {
                      value: editDescription,
                      onChange: (e) => setEditDescription(e.target.value),
                      style: {
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '2px solid #667eea',
                        borderRadius: '6px',
                        fontSize: '1em',
                        minHeight: '80px'
                      }
                    }),
                    React.createElement('div', { className: 'button-group' },
                      React.createElement('button', {
                        className: 'btn-success btn-small',
                        onClick: handleSaveEdit,
                        disabled: loading
                      }, 'Save'),
                      React.createElement('button', {
                        className: 'btn-secondary btn-small',
                        onClick: () => setEditingId(null),
                        disabled: loading
                      }, 'Cancel')
                    )
                  )
                ) :

                React.createElement('div', {
                  key: todo.id,
                  className: `todo-item ${todo.completed ? 'completed' : ''}`
                },
                  React.createElement('input', {
                    type: 'checkbox',
                    className: 'todo-checkbox',
                    checked: todo.completed,
                    onChange: () => handleToggleComplete(todo)
                  }),
                  React.createElement('div', { className: 'todo-content' },
                    React.createElement('div', { className: 'todo-title' }, todo.title),
                    todo.description && React.createElement('div', { className: 'todo-description' }, todo.description),
                    React.createElement('div', { className: 'todo-meta' },
                      `Created: ${new Date(todo.createdAt).toLocaleDateString()} at ${new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    )
                  ),
                  React.createElement('div', { className: 'todo-actions' },
                    React.createElement('button', {
                      className: 'btn-secondary btn-small',
                      onClick: () => handleStartEdit(todo)
                    }, '✏️ Edit'),
                    React.createElement('button', {
                      className: 'btn-danger btn-small',
                      onClick: () => handleDeleteTodo(todo.id)
                    }, '🗑️ Delete')
                  )
                )
            )
          )
      )
    )
  );
}

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(TodoApp));
