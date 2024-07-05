import React, { useState, useRef, useEffect } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Login.css";

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
        success: <b>Password Changed Successfully</b>,
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
    <div className="flex justify-center items-center flex-col body h-[100vh]">
      <Toaster toastOptions={{ duration: 1500 }} />
      <div className="container h-[35vh] mt-0 border-r-2 shadow-md pt-12 flex flex-col items-center justify-center sm:w-96 w-[90vw] sm:h-[50vh]">
        <div className="flex gap-4 items-center">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                value={value}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                className="border-black  h-10 w-10 rounded-md pl-2 outline-none text-center"
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            );
          })}
        </div>
        <div className="flex flex-col">
          <input
            type="password"
            name="newPassword"
            placeholder="new password"
            className="mt-4 border-black  h-10 w-56 rounded-md pl-2 outline-none"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            name="ConfirmNewPassword"
            placeholder="confirm new password"
            className="mt-4 border-black  h-10 w-56 rounded-md pl-2 outline-none"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button
          className="mt-8 bg-blue-500 px-4 py-2 text-black rounded-sm cursor-pointer"
          onClick={handleClick}
          disabled={isDisabled}
        >
          Verify
        </button>
      </div>
      <div className="shadow-md container h-[8vh] mt-4 border-r-2 flex items-center justify-center w-[90vw] sm:w-96">
        <p className="mr-2">Click here to </p>
        <Link to={"/login"} className="text-blue-500 font-semibold">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgetVerify;
