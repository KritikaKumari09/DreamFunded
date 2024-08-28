import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice.js";
import Button from "../components/Button.jsx";
import ButtonGradient from "../assets/svg/ButtonGradient.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/user/login",
            { username, password },
            { withCredentials: true }
          );
          if (!response) reject("Something Went Wrong");
          else {
            const user = response.data.data.user;
            resolve();
            setTimeout(() => {
              dispatch(login(user));
              navigate("/");
            }, 1000);
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Please Wait...",
        success: "Logged In",
        error: "Something Went Wrong",
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Toaster />
      <div className="w-full max-w-md">
        <div className="bg-gray-950 shadow-md rounded-lg overflow-hidden border border-color-1">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center text-white mb-8">Login</h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Username"
                className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <Link to="/forget" className="text-sm text-blue-500 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <Button onClick={handleClick} className="w-full">
                Login
              </Button>
              <ButtonGradient className="w-full" />
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
          <div className="px-6 py-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;