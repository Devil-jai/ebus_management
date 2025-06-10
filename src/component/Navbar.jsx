import React from "react";
import logo from '../assets/bus_logo.png'
import admin from '../assets/profile.png'
import { Link, useLocation } from "react-router-dom";
import DriverLogout from "./Driver/DriverLogout";
function Navbar({onLoginClick}) {
  const location = useLocation()
  return (
<nav className="absolute left-1/2 transform -translate-x-1/2 top-10 w-full max-w-screen-lg px-4 py-2 bg-white shadow-md rounded-md lg:px-8 lg:py-3 z-20">
  <div className="flex  items-center justify-between text-slate-800">
    <a href="#" className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold max-[470px]:text-[12px]">
      Ebus Management
    </a>

    <div >
      <ul className="flex  gap-2    lg:items-center ">
        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
          <Link to='adminLogin'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="h-6 w-6 text-slate-500">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          </Link>
        </li>
        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
    {
      location.pathname ==='/'?
      <button onClick={onLoginClick} className="rounded-2xl max-[470px]:text-[12px] text-white bg-purple-600 hover:bg-purple-700 cursor-pointer font-bold px-2 py-1 shadow border-2">
            Login
          </button>:<DriverLogout/>
    }
          
        </li>
      </ul>
    </div>
  </div>
</nav>



  );
}

export default Navbar;
