import './App.css'
// import Header from './components/header'
import LandingPage from './pages/landing-page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./styles/fonts.css"
import jeopardyRoutes from './routes/jeopardy-routes'
import ScanningPage from './pages/scanning-page'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<LandingPage />} />
            <Route path="gameScan" element={<ScanningPage />} />,
            {jeopardyRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
