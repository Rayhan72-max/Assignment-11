import { useState } from 'react'

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
