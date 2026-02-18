const { useState, useEffect } = React;

const API_URL = 'http://localhost:5000';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos. Make sure backend is running on port 5000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setError('Please enter a title');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/todos`, {
        title: newTitle,
        description: newDescription
      });
      setTodos([...todos, response.data]);
      setNewTitle('');
      setNewDescription('');
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, {
        completed: !completed
      });
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionClick = (todo) => {
    const newDesc = prompt('Edit description:', todo.description);
    if (newDesc !== null) {
      updateTodo(todo.id, { description: newDesc });
    }
  };

  const handleTitleClick = (todo) => {
    const newTitle = prompt('Edit title:', todo.title);
    if (newTitle && newTitle.trim()) {
      updateTodo(todo.id, { title: newTitle.trim() });
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, updates);
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return React.createElement('div', { className: 'container' },
    // Header
    React.createElement('div', { className: 'header' },
      React.createElement('h1', null, '✓ Todo List'),
      React.createElement('p', null, `${completedCount} of ${totalCount} completed`)
    ),

    // Content
    React.createElement('div', { className: 'content' },
      // Error message
      error && React.createElement('div', { className: 'error' }, error),

      // Add form
      React.createElement('form', { className: 'add-todo-form', onSubmit: addTodo },
        React.createElement('input', {
          type: 'text',
          placeholder: 'What needs to be done?',
          value: newTitle,
          onChange: (e) => setNewTitle(e.target.value),
          disabled: loading
        }),
        React.createElement('button', {
          type: 'submit',
          disabled: loading
        }, loading ? '⏳' : '✓ Add')
      ),

      // Loading state
      loading && !todos.length && React.createElement('div', { className: 'loading' }, '⏳ Loading...'),

      // Todos list
      todos.length > 0 ? React.createElement('ul', { className: 'todos-list' },
        todos.map(todo =>
          React.createElement('li', { key: todo.id, className: `todo-item ${todo.completed ? 'completed' : ''}` },
            React.createElement('input', {
              type: 'checkbox',
              className: 'todo-checkbox',
              checked: todo.completed,
              onChange: () => toggleComplete(todo.id, todo.completed)
            }),
            React.createElement('div', { className: 'todo-content' },
              React.createElement('div', {
                className: 'todo-title',
                onClick: () => handleTitleClick(todo),
                style: { cursor: 'pointer' }
              }, todo.title),
              todo.description && React.createElement('div', {
                className: 'todo-description',
                onClick: () => handleDescriptionClick(todo),
                style: { cursor: 'pointer' }
              }, `📝 ${todo.description}`)
            ),
            React.createElement('div', { className: 'todo-actions' },
              React.createElement('button', {
                className: 'btn-small btn-delete',
                onClick: () => deleteTodo(todo.id)
              }, '🗑️ Delete')
            )
          )
        )
      ) : !loading && React.createElement('div', { className: 'empty-state' },
        React.createElement('p', null, '✨ All done! Add a new task to get started.')
      )
    )
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(TodoApp));
