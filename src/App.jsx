import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Shared/Navbar'
import Footer from './Shared/footer'

function App() {
  

  return (
   <div>
  <Navbar></Navbar>
  <Outlet></Outlet>
  <Footer></Footer>
   </div>
    
   
  )
}

export default App
