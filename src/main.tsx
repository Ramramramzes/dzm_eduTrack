import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './normalize.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { Dashboard } from './pages/Dashboard/Dashboard.tsx'
import { FillProfile } from './pages/FillProfile/FillProfile.tsx'
import { Programm } from './pages/Programm/Programm.tsx'
import { Students } from './pages/Students/Students.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reg-profile" element={<FillProfile />} />
      <Route path="/programm" element={<Programm />} />
      <Route path="/students" element={<Students />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
