import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, useNavigate } from 'react-router'
import '../twlog.js'
import axios from 'axios'
import toast from 'react-hot-toast'



const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND,
    withCredentialss: true
})



axios.interceptors.response.use(response => {
  return response
}, error =>{
      console.log("error:", error)

  if (error.response.status === 401 ) {
    
    console.log("Nije autorizovano")
    location.href = '/login'
  } else if (error.response.status === 402) {
    location.href = "/"
    toast.error("Nemate ovlašćenja za pristup")
    
  }


  return Promise.reject(error)
})


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)