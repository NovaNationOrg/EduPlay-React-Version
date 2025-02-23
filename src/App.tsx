import { useState } from 'react'
import './App.css'
import Home from './components/main-header'
import  LandingPage  from './pages/landing-page'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingPage />
    </>
  )
}

export default App
