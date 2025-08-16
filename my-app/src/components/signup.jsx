import { useState } from 'react';
import Swal from 'sweetalert2';
import '../index.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('https://todo-backend-production-1458.up.railway.app/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

if (response.ok) {
  Swal.fire({
    icon: 'success',
    title: 'Signup Successful 🎉',
    text: 'Your account has been created!',
    showConfirmButton: false,
    timer: 2000, // auto close in 2s
  });
} else {
  Swal.fire({
    icon: 'error',
    title: 'Signup Failed',
    text: data.message || 'Something went wrong!',
    confirmButtonColor: '#4f46e5',
  });
}
  };

  return (
    <form className="form-container" onSubmit={handleSignup}>
      <h2>Signup</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
