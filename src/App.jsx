import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Home'
import Navbar from './component/Navbar'
import { BrowserRouter as Router , Routes , Route, useLocation } from 'react-router-dom'
import SignupPage from './component/User/SignupPage'
import LoginPage from './component/User/LoginPage'
import AdminLogin from './component/Admin/AdminLogin'
import DriverSignup from './component/Driver/DriverSignup'
import DriverLogin from './component/Driver/DriverLogin'
import BusDetails from './component/Driver/BusDetails'
import BusViewDetails from './component/BusViewDetails'
import { Toaster } from 'react-hot-toast'
import AdminPage from './component/Admin/AdminPage'
import AllDriverDetails from './component/Driver/AllDriverDetails'
import AllUserDetails from './component/User/AllUserDetails'

function AppContent() {
  const location = useLocation()
  const noHeaderFooterRoutes = ['/userLogin','/userSignup' ,'/adminLogin','/adminPage/driverSignup','/driverLogin' , '/busdetails']
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname)
  return (
    <div >
    {!hideHeaderFooter && <Navbar/>}
   
  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/userSignup' element={<SignupPage/>}/>
      <Route path='/userLogin' element={<LoginPage/>}/>
      <Route path='/adminLogin' element={<AdminLogin/>}/>
      <Route path='/adminPage/driverSignup' element={<DriverSignup/>}/>
      <Route path='/driverLogin' element={<DriverLogin/>}/>
      <Route path='/busdetails' element={<BusDetails/>}/>
      <Route path='/busview' element={<BusViewDetails/>}/>
      <Route path='/adminPage' element={<AdminPage/>}/>
      <Route path='/adminPage/driverDetails' element={<AllDriverDetails/>}/>
      <Route path='/adminPage/userDetails' element={<AllUserDetails/>}/>
    </Routes>
    <Toaster/>
   
   
    </div>
  )
}

export default function App(){
  return(
    <Router>
      <AppContent/>
    </Router>
  )
}