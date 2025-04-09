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
import Available from './Pages/Available.jsx';
import Details from './Pages/Details.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Private from './Pages/Private.jsx';
import MyBookings from './Pages/MyBookings.jsx';
import LineChart from './Components/LineChart.jsx';


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
      element:<Private><AddCar></AddCar></Private>
    },
    {
      path:"/mycar/:email",
      element:<Private><MyCar></MyCar></Private>
    },
    {
      path:"/available",
      element:<Available></Available>
    },
    {
      path:"/details/:id",
      element:<Details></Details>
    },
    {
      path:"/login",
      element:<Login></Login>
    },
    {
      path:"/register",
      element:<Register></Register>
    },
    {
      path:"/mybookings/:email",
      element:<MyBookings></MyBookings>
    },
    {
      path:"/chart",
      element:<LineChart></LineChart>
    },

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
