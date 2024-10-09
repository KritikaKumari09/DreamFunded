import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Login.css";
import Button from "../components/Button.jsx";
import ButtonGradient from "../assets/svg/ButtonGradient.jsx";

const Forget = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/user/forget/${username}`
          );
          if (!response) reject("Something Went Wrong");
          else {
            navigate(`/forget/${username}/verify`)
            resolve()
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Please Wait...",
        success: "OTP Sent Successfully",
        error: "Something Went Wrong",
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 body">
      <Toaster />
      <div className="w-full max-w-md space-y-6">
        <div className=" rounded-lg bg-gray-950 shadow-lg border border-color-1 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Forgot Password</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username or email"
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              className="w-full "
              onClick={handleClick}
            >
              Send OTP
            </Button>
            <ButtonGradient/>
          </div>
        </div>
        <div className="  p-1">
          <div className="flex justify-center items-center">
            <p className="text-gray-600">Remember your password?</p>
            <Link to="/login" className="ml-2 text-blue-500 font-semibold hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;