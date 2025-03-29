import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Auth/AuthProvider.jsx';
import Unable from './Pages/Unable.jsx';
import Home from './Pages/Home.jsx';
import AddCar from './Pages/AddCar.jsx';
import MyCar from './Pages/MyCars.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[{
      path:"/",
      element:<Home></Home>
    },
    {
      path:"/addcar",
      element:<AddCar></AddCar>
    },
    {
      path:"/mycar",
      element:<MyCar></MyCar>
    }
    ]
  },
  {
    path: "*",
    element: <Unable></Unable>
  }
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
