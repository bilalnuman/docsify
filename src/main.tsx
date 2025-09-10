import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import ReactQueryProvider from './providers/ReactQueryProvider.tsx'
import { AppProvider } from './context/AppContext.tsx'
import "./i18n"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ReactQueryProvider>
    <div className="relative z-[999999]"> <ToastContainer /></div>
  </StrictMode>,
)
