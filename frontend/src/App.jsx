import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home'
import LoginSignup from './pages/LoginSignup/LoginSignup'
import Profile from './pages/Profile/Profile'
import Navbar from './components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/user' element={<LoginSignup />}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
