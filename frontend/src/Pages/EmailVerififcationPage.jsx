import React, { useState, useRef, useEffect } from 'react';
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Button from '../components/Button';
import ButtonGradient from '../assets/svg/ButtonGradient';
const EmailVerififcationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputs = useRef([]);
  const { id } = useParams();

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const otpValue = otp.join('');
  //   if (otpValue.length === 6) {
  //     // Here you would typically send the OTP to your backend for verification
  //     console.log('Verifying OTP:', otpValue);
  //     // For demo purposes, let's assume the correct OTP is '123456'
  //     if (otpValue === '123456') {
  //       setSuccess(true);
  //       setError('');
  //     } else {
  //       setError('Invalid OTP. Please try again.');
  //     }
  //   } else {
  //     setError('Please enter a valid 6-digit OTP.');
  //   }
  // };

  const handleClick = () => {
    

    toast.promise(
      new Promise(async (resolve, reject) => {
        let code = "";
        for (let i = 0; i < 6; i++) code += otp[i];
        try {
          const response = await axios.post(
            `http://localhost:8000/api/user/verifyEmail/${id}`,
            {
              otp: code,
              
            },
            { withCredentials: true }
          );
          if (response.data.data.success) {
            navigate("/login");
            resolve();
          } else {
            reject(response.data.message);
          }

        }catch(error){
          // reject(error)
          if (error.response) {
            // Server responded with a status outside of 2xx
            reject(error.response.data.message || "Something went wrong"); // Pass the API error message
          } else {
            // Network or other errors
            reject("Network error or server is unreachable");
          }
        }
       
      }),
      {
        loading: "Please Wait...",
        success: "Email Verified Successfully",
        error: (err) => `${err}`,
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
       <Toaster />
      <div className="bg-gray-950 rounded-lg shadow-lg p-8 w-full max-w-md border border-color-1">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Verify your email
        </h2>
        <p className="mt-2  text-center text-sm text-gray-150">
          We've sent a code to your email. Please enter it below.
        </p>
        <div className=" py-4 px-4 shadow sm:rounded-lg sm:px-10">
          
              <div>
                <label htmlFor="otp" className="sr-only">
                  One-time password
                </label>
                <div className="flex justify-between">
                  {otp.map((data, index) => (
                    <input
                      className="w-12 text-black h-12 border-2 rounded bg-gray-100 border-gray-300 text-center text-xl focus:border-blue-500 focus:ring-blue-500"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      ref={(input) => inputs.current.push(input)}
                    />
                  ))}
                </div>
              </div>
             
              <div>
                <Button
                  type="submit"
                  className="w-full mt-4"
                  onClick={handleClick}
                >
                  Verify Email
                </Button>
                <ButtonGradient/>
              </div>
            
        </div>
      </div>

    </div>
  );
};

export default EmailVerififcationPage;