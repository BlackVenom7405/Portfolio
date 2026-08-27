import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initScrollEffects } from './utils/scrollEffects'

// Initialize advanced parallax and reveal effects
setTimeout(() => {
  initScrollEffects();
}, 500); // 500ms delay to ensure all DOM elements are rendered

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
