import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css' // Import our theme variables first
import './styles/components.css' // Import our custom component styles
import './styles/svg-fix.css' // Fix for SVG sizing issues
import './styles/login.css' // Login page specific styles
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
