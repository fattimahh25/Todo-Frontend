import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import PortfolioForm from './components/portfolioForm'
import './index.css'


function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">𝕻𝖔𝖗𝖙𝖋𝖔𝖑𝖎𝖔 𝕲𝖊𝖓𝖊𝖗𝖆𝖙𝖔𝖗</div>
       <div className='links'> <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link></div>
      </nav>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/portfolio" element={<PortfolioForm />} />
      </Routes>
    </div>
  )
}

export default App
