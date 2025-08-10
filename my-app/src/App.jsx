import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import TodoPage from './components/todo'
import './index.css'


function App() {
  return (
    <div className="App">
      <nav style={{ padding: '10px' }}>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </div>
  )
}

export default App
