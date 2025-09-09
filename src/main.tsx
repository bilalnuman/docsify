import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import ReactQueryProvider from './providers/ReactQueryProvider.tsx'
<<<<<<< HEAD
import { AppProvider } from './context/AppContext.tsx'
=======
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
<<<<<<< HEAD
      <AppProvider>
        <App />
      </AppProvider>
=======
      <App />
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    </ReactQueryProvider>
    <div className="relative z-[999999]"> <ToastContainer /></div>
  </StrictMode>,
)
