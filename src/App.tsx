import './App.css'
// import Header from './components/header'
import LandingPage from './pages/landing-page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./styles/fonts.css"
import ScanningPage from './pages/scanning-page'
import ListPage from './pages/Jeopardy/list-page';
import QuestionPage from './pages/Jeopardy/question-page'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<LandingPage />} />
            {/* <Route path = "header" element={<Header gameClass='hangman-header' headerText={'Yes'} />}/> */}
            {/* <Route path="jeopardyGame" element={<Header gameClass='hangman-header' headerText='Yow' />} /> */}

            <Route path="gameScan" element={<ScanningPage />} />
            <Route path="jeopardyGame" element={<ListPage />} />
            <Route path="jeopardyGame/question" element={<QuestionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
