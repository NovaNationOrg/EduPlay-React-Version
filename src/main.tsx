import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReloadPrompt from './components/reload-prompt.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ReloadPrompt />
  </StrictMode>,
)
