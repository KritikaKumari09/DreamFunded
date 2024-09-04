import React, { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleDrawer } from "../store/userSlice.js";
import sample from "../assets/images.png";
import "./Component.css";
import DreamFundedLogo from "../assets/DreamFunded-Logo.png"
import { Link } from "react-router-dom";
 
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDrawer = () => {
    dispatch(toggleDrawer());
  };
  const isDrawerOpen = useSelector((state) => state.isOpen);
  const sliderRef = useRef(null);

  return (
    <div className="flex justify-between  bg-white items-center dark:bg-black dark:text-white sm:h-10 h-14 top-0 sticky z-50">
      {/* <h2 className="ml-2">Logo</h2> */}
      <div className="flex  items-center ml-2">
    <img  className="ml-2" src={DreamFundedLogo} style={{ width: '50px', height: '40px' }} alt="DreamFunded" />
    <p className="ml-4 text-2xl">DreamFunded</p>
  </div>

      <div className="sm:grid hidden ">
        <ul className="flex justify-center items-center gap-10">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isActive ? "font-semibold text-orange-500" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/addProject"}
            className={({ isActive }) => {
              return isActive ? "font-semibold text-orange-500" : "";
            }}
          >
            Add a Project
          </NavLink>
        
          <NavLink
            to={"/chat"}
            className={({ isActive }) => {
              return isActive ? "font-semibold text-orange-500" : "";
            }}
          >
            Chat
          </NavLink>
         
        </ul>
      </div>
      <div className="flex gap-4 items-center">
       
        {/* <img
          src={user?.avatarImage || sample}
          alt="profile img"
          className="h-8 mr-4 rounded-[50%] w-8"
        /> */}

{user ? (
<>
<div className="relative group hidden lg:flex mr-4">
  <Link to="/myprofile" className="text-white cursor-pointer" data-tooltip-target="tooltip-default">
    <img
      src={user?.avatarImage || sample}
      alt="profile img"
      className="h-8 rounded-[50%] w-8 ml-6"
    />
  </Link>
  <div className="absolute z-10 left-1/2 transform -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
    My Account
    <div className="tooltip-arrow" data-popper-arrow></div>
  </div>
</div>

<div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
  My Account
  <div className="tooltip-arrow" data-popper-arrow></div>
</div>
</>
  ) : (
    <>
    </>
  )}

        {!isDrawerOpen ? (
          <div className="w-10 sm:hidden" onClick={handleDrawer}>
            <div className="border-b-2 border-black w-6 h-2 dark:border-white"></div>
            <div className="border-b-2 border-black w-6 h-2 dark:border-white"></div>
            <div className="border-b-2 border-black w-6 h-2 dark:border-white"></div>
          </div>
        ) : (
          <button
            className="cancel-button sm:hidden w-10 flex items-center justify-left"
            onClick={handleDrawer}
          >
            <span className="cross dark:text-white">&#10005;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Navbar);
