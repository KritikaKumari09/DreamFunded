import { useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
// import Navbar from "./components/Navbar.jsx";
import { logout } from "./store/userSlice";
import { io } from "socket.io-client";
import axios from "axios";
import { NavLink } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";

function App() {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const isDrawerOpen = useSelector((state) => state.isOpen);
  const dispatch = useDispatch();
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
      {/* <Navbar /> */}
      {/* <Outlet /> */}
      {/* <button onClick={handleCheckout}>Checkout</button> */}
      <HomePage/>
    </>
  );
}

export default App;
