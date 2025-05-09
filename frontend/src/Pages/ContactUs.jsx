"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx"
import { NavLink } from "react-router-dom";
import axios from "axios"
import {Toaster, toast} from "react-hot-toast"
// import { motion } from "framer-motion";
import { BackgroundBeams } from "../components/ui/background-beams.jsx"; // Assuming BackgroundBeams is a separate component.
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice.js";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user)
  const isDrawerOpen = useSelector((state)=>state.isOpen)

  const handleLogout = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
            {},
            { withCredentials: true }
          );
  
          if (response.status === 200) {  // Check for a successful response status
            resolve("Logged Out Successfully");
            setTimeout(() => {
              dispatch(logout());
              navigate("/");
            }, 1000);
          } else {
            reject("Something Went Wrong");
          }
        } catch (error) {
          reject(error.response?.data?.message || "An error occurred during logout");
        }
      }),
      {
        loading: "Please Wait...",
        success: "Logged Out",
        error: "Something Went Wrong",
      }
    );
  };
  const sendFeedback = async(e) =>{
    e.preventDefault();
    toast.promise(new Promise(async(res,rej)=>{
      try {
        const data = {
          name: name,
          email: email,
          message: message
        }
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/feedback`,data)
        setName("")
        setEmail("")
        setMessage("")
        console.log(response)
        if(response.data.data.success)res(response.data.message)
        else rej(response.data.message)
      } catch (error) {
        rej(error)
        console.log(error)
      }
    }), 
    {
      loading: 'Loading...',
      error: (err)=>err,
      success: (res)=>res
    }
  )
    
  }
  return (
    <div>
      <Toaster/>
      <div
    className={
      isDrawerOpen
        ? "absolute z-50 dark:text-white h-full  w-[60%] right-0 sm:hidden dark:bg-black top-14 overflow-hidden flex flex-col justify-between pb-20 items-center"
        : "absolute z-50 text-white h-full  w-0 right-0 sm:hidden dark:bg-black top-14 overflow-hidden flex flex-col justify-between pb-20 items-center"
    }
    id="drawer"
  >
    <ul className="flex justify-center items-center gap-6 flex-col mt-4">
      <NavLink
        to={"/"}
       className="hover:text-orange-500"
      >
        Home
      </NavLink>
      <NavLink
        to={"/addProject"}
        className="hover:text-orange-500"
      >
        Start a Project
      </NavLink>
      
      {user ? (
      <NavLink
      to={"/myprofile"}
      className="hover:text-orange-500"
    >
      My Account
    </NavLink>
    ) : (
     <></>
    )}
    </ul>
    
    {user ? (
      <button
        className="mt-5 px-4 py-2 dark:text-black dark:bg-yellow-500 hover:bg-yellow-300 w-20 rounded-sm bg-orange-600 text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    ) : (
      <button className="mt-5 px-4 py-2 dark:text-black dark:bg-yellow-500 hover:bg-yellow-300 w-20 rounded-sm bg-orange-600 text-white">
        <NavLink to={"/login"}>Login</NavLink>
      </button>
    )}
  </div>
      <Navbar />
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Background animation */}
      <BackgroundBeams className="absolute inset-0" />

      <div className="relative z-10 max-w-2xl p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center mb-8">
          We'd love to hear from you! Whether you have a question about our
          platform, a suggestion, or need assistance, feel free to reach out.
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full p-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="w-full p-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={e=>setMessage(e.target.value)}
              className="w-full p-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={sendFeedback}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
