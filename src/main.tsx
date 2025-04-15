import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReloadPrompt from './components/reload-prompt.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors position='top-center'/>
    <App />
    <ReloadPrompt />
  </StrictMode>,
)
