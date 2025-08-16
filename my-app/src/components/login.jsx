import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('https://todo-backend-production-1458.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

if (response.ok) {
  localStorage.setItem('token', data.token);

  Swal.fire({
    icon: 'success',
    title: 'Login Successful',
    text: 'Welcome to your portfolio!',
    showConfirmButton: false,
    timer: 2000, // auto-close after 2s
  });

  navigate('/portfolio'); // Redirect to portfolio page
} else {
  Swal.fire({
    icon: 'error',
    title: 'Login Failed',
    text: data.message || 'Something went wrong!',
    confirmButtonColor: '#4f46e5',
  });
}

  };

  return (
    <form className="form-container" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
