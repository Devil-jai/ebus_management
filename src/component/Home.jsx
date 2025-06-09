import React, { useRef } from "react";
import home from "../assets/home_img.jpg";

import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Home() {
  const drawerCheckboxRef = useRef(null);

  const openDrawer = () => {
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = true;
    }
  };
  return (
    <>
      <Navbar onLoginClick={openDrawer} />

      <div className="drawer drawer-end">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerCheckboxRef}
        />
        <div className="drawer-content relative z-10">
          {/* Fixed background */}
          <div
            style={{ backgroundImage: `url(${home})` }}
            className="h-screen bg-cover bg-center fixed top-0 left-0 w-full"
          >
            <div
              className="flex justify-center items-center h-full text-white"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            >
              <div className="text-center max-w-4xl px-4">
                <p className="lg:text-2xl sm:text-xl max-[470px]:text-[12px]">
                  E-Bus Management Based Current Location System offers
                  real-time tracking of electric buses, helping passengers and
                  operators stay updated with accurate location information. It
                  improves route planning, purpleuces wait times, and supports
                  smart, eco-friendly urban transport.
                </p>
                <br />
                <button className="bg-transparent  sm:text-xl max-[470px]:text-[12px] hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                  Ebus Management System
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="drawer-side z-50 ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className=" bg-base-200 text-base-content min-h-full w-40 p-4 flex flex-col items-center font-bold">
            <li className="">
              <Link to="/driverLogin " className="hover:rounded-xl hover:bg-purple-100 px-14 py-3">Driver</Link>
            </li>
            <li className="mt-4">
              <Link className="hover:rounded-xl hover:bg-purple-100 px-14 py-3" to="/userLogin">User</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
