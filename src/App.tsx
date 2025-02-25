import { useState } from 'react'
import './App.css'
import Header from './components/header'
import  LandingPage  from './pages/landing-page'
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom'
import "./styles/fonts.css"
import ScanningPage from './pages/scanning-page'


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path = "/" >
            <Route index element={<LandingPage/>}/>
            {/* <Route path = "header" element={<Header gameClass='hangman-header' headerText={'Yes'} />}/> */}
            <Route path = "gameScan" element={<ScanningPage/>}/>
            <Route path = "jeopardyGame" element={<Header gameClass='hangman-header'  headerText='Yow'/>}/>

          </Route>
        </Routes>
      </BrowserRouter>

      

      
      
    </>
  )
}

export default App
