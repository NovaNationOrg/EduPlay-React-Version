import { useState } from 'react'
import './App.css'
import Home from './components/main-header'
import  LandingPage  from './pages/landing-page'
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom'



function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path = "/" >
            <Route index element={<LandingPage/>}/>
            <Route path = "header" element={<Home headerText={'Yes'} />}/>
          </Route>
        </Routes>
      </BrowserRouter>

      <Outlet />

      
      
    </>
  )
}

export default App
