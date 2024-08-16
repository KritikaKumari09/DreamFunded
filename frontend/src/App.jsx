import { useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { logout } from "./store/userSlice";
import { io } from "socket.io-client";
import axios from "axios";
import { NavLink } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const isDrawerOpen = useSelector((state) => state.isOpen);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(logout());
      await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {}
  };
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payment/checkout",
        {},
        { withCredentials: true }
      );
      console.log(response.data.session.url);
      window.location.href = response.data.session.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={
          isDrawerOpen
            ? "absolute z-10 dark:text-white  h-full  w-[60%] right-0 sm:hidden dark:bg-black top-14 overflow-hidden flex flex-col justify-between pb-20 items-center"
            : "absolute z-10 text-white h-full  w-0 right-0 sm:hidden dark:bg-black top-14 overflow-hidden flex flex-col justify-between pb-20 items-center"
        }
        id="drawer"
      >
        <ul className="flex justify-center items-center gap-6 flex-col mt-4">
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
            className={({ isActive, isPending }) =>
              isActive ? "font-semibold text-orange-500" : ""
            }
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
        {user ? (
          <button
            className="mt-5 px-4 py-2 dark:text-black dark:bg-yellow-500 w-20 rounded-sm bg-orange-600 text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button className="mt-5 px-4 py-2 dark:text-black dark:bg-yellow-500 w-20 rounded-sm bg-orange-600 text-white">
            <NavLink to={"/login"}>Login</NavLink>
          </button>
        )}
      </div>
      <Navbar />
      <Outlet />
      {/* <button onClick={handleCheckout}>Checkout</button> */}
    </>
  );
}

export default App;
