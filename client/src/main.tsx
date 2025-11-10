import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import {Route, Router, Routes} from 'react-router'
import './index.css'
import App from './App.tsx'

import HealthPage from './pages/HealthPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
 