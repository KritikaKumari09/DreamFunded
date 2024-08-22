import React, { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleDrawer } from "../store/userSlice.js";
import sample from "../assets/images.png";
import "./Component.css";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDrawer = () => {
    dispatch(toggleDrawer());
  };
  const isDrawerOpen = useSelector((state) => state.isOpen);
  const sliderRef = useRef(null);
  const handleToggle = () => {
    const html = document.querySelector("html");
    const clases = html.classList;
    if (clases[0] == "dark") {
      html.classList.remove("dark");
    } else html.classList.add("dark");
  };
  return (
    <div className="flex justify-between sm:justify-around bg-white items-center dark:bg-black dark:text-white sm:h-10 h-14 top-0 sticky z-50">
      <h2 className="ml-2">Logo</h2>
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
          <li>My Projects</li>
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
        {/* <label class="switch">
          <input type="checkbox" ref={sliderRef} onChange={handleToggle} />
          <span class="slider round"></span>
        </label> */}
        {/* <button onClick={handleToggle}>Switch</button> */}
        {/* <img
          src={user?.avatarImage || sample}
          alt="profile img"
          className="h-8 rounded-[50%] w-8"
        /> */}
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
