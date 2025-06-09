import React from "react";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <div className="min-h-screen   bg-blue-950 ">
        <div className="flex justify-around pt-40 flex-wrap">
          <Link to="driverSignup">
            {" "}
            <div
              className=" mt-5
      w-[254px] h-[200px] 
      bg-purple-400 border border-white 
      shadow-[12px_17px_51px_rgba(0,0,0,0.22)] 
      backdrop-blur-[6px] 
      rounded-[17px] 
      text-center 
      flex items-center justify-center 
      font-bold text-white 
      cursor-pointer 
      transition-all duration-500 
      select-none 
      hover:border-black hover:scale-[1.05] 
      active:scale-[0.95] active:rotate-[1.7deg]
    "
            >
              Driver Registration
            </div>
          </Link>
          <Link to="/adminPage/driverDetails  ">
            {" "}
            <div
              className=" mx-3 mt-5
      w-[254px] h-[200px] 
      bg-purple-400 border border-white 
      shadow-[12px_17px_51px_rgba(0,0,0,0.22)] 
      backdrop-blur-[6px] 
      rounded-[17px] 
      text-center 
      flex items-center justify-center 
      font-bold text-white 
      cursor-pointer 
      transition-all duration-500 
      select-none 
      hover:border-black hover:scale-[1.05] 
      active:scale-[0.95] active:rotate-[1.7deg]
    "
            >
              Driver Details
            </div>
          </Link>
          <Link to="/adminPage/userDetails">
            {" "}
            <div
              className=" mt-5
      w-[254px] h-[200px] 
      bg-purple-400 border border-white 
      shadow-[12px_17px_51px_rgba(0,0,0,0.22)] 
      backdrop-blur-[6px] 
      rounded-[17px] 
      text-center 
      flex items-center justify-center 
      font-bold text-white 
      cursor-pointer 
      transition-all duration-500 
      select-none 
      hover:border-black hover:scale-[1.05] 
      active:scale-[0.95] active:rotate-[1.7deg]
    "
            >
              User Details
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
