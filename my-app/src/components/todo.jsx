import React, { useEffect, useState } from 'react';
import '../components/todo.css';

function TodoPage() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  // Fetch all todos
  useEffect(() => {
    fetch('http://todo-backend-production-1458.up.railway.app/api/auth/signup/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!text.trim()) return;
    const response = await fetch('http://todo-backend-production-1458.up.railway.app/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setText('');
  };

  // Delete todo
  const handleDelete = async (id) => {
    await fetch(`http://todo-backend-production-1458.up.railway.app/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
<div className="todo-container">
  <h2 className="todo-title">ToDo List</h2>
  <div className="input-wrapper">
    <input
      type="text"
      placeholder="Enter todo"
      value={text}
      onChange={e => setText(e.target.value)}
      className="todo-input"
    />
    <button onClick={handleAdd} className="add-button">Add</button>
  </div>
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo._id} className="todo-item">
        <span>{todo.text}</span>
        <button onClick={() => handleDelete(todo._id)} className="delete-button">❌</button>
      </li>
    ))}
  </ul>
</div>

  );
}

export default TodoPage;
