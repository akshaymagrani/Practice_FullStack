import { useState } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      {showLogin ? <Login toggle={() => setShowLogin(false)} /> : <SignUp toggle={() => setShowLogin(true)} />}
    </>
  )
}

export default App
