import React, { useState, useRef, useEffect } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Login.css";
import Button from "../components/Button";
import ButtonGradient from "../assets/svg/ButtonGradient"; 

const ForgetVerify = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const { id } = useParams();
  const handleClick = () => {
    if (!isPasswordSame) {
      toast.error("Password Doesn't Match", { duration: 1500 });
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password Should Have atleast 8 Character", {
        duration: 1500,
        style: {
          backgroundColor: "white",
        },
      });
      return;
    }

    toast.promise(
      new Promise(async (resolve, reject) => {
        let code = "";
        for (let i = 0; i < 6; i++) code += otp[i];
        try {
          const response = await axios.post(
            `http://localhost:8000/api/user/forget/${id}/verify`,
            {
              otp: code,
              newPassword,
            },
            { withCredentials: true }
          );
          if (response.data.data.success) {
            navigate("/login");
            resolve();
          } else {
            reject(response.data.message);
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Please Wait...",
        success: "Password Changed Successfully",
        error: (err) => `${err}`,
      }
    );
  };

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  useEffect(() => {
    if (otp[5] != "") setIsDisabled(false);
    if (newPassword === confirmNewPassword && newPassword != "")
      setIsPasswordSame(true);
  }, [otp, newPassword, confirmNewPassword]);

  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputsRef.current[index - 1].focus();
    }
  };
  return (
   

     <div className="flex justify-center items-center min-h-screen ">
      <Toaster toastOptions={{ duration: 1500 }} />
      <div className="bg-gray-950 rounded-lg shadow-lg p-8 w-full max-w-md border border-color-1">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Verify OTP & Set New Password</h2>
        <div className="mb-6">
          <div className="flex justify-center gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                value={value}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 border-2 border-gray-300 rounded-md text-center text-xl font-semibold text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <Button
          className="w-full mt-6  text-white py-2 rounded-md     focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleClick}
         
          disabled={isDisabled}
        >
          Verify
        </Button>
        <ButtonGradient/>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Click here to </span>
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>

  );
};

export default ForgetVerify;
