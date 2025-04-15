import './App.css'
// import Header from './components/header'
import LandingPage from './pages/landing-page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./styles/fonts.css"
import ScanningPage from './pages/scanning-page'
import gameRoutes from './routes/game-routes'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route key="root" path="/" >
            <Route key="landing-page" index element={<LandingPage />} />
            <Route key="game-scan" path="gameScan" element={<ScanningPage />} />,
            {gameRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
