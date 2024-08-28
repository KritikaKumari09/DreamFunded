import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Login.css";


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
        success: "Otp Sent Successfully",
        error: "Something Went Wrong",
      }
    );
  };
  return (
    <div className="flex justify-center items-center flex-col body h-[100vh]">
      <Toaster />
      <div className="container h-[35vh] mt-0 border-r-2 shadow-md pt-12 flex flex-col items-center justify-center sm:w-96 w-[90vw] sm:h-[50vh]">
        <div className="flex flex-col gap-4 items-center">
          <input
            type="text"
            placeholder="username or email"
            className="border-black  h-10 w-80 rounded-md pl-2 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          className="mt-8 bg-blue-500 px-4 py-2 text-black rounded-sm cursor-pointer"
          onClick={handleClick}
        >
          Send Otp
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

export default Forget;



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast ,Toaster } from "react-hot-toast";
// import axios from "axios";

// const Forget = () => {
//   const [username, setUsername] = useState("");
//   const navigate = useNavigate();

//   const handleClick = () => {
//     toast.promise(
//       new Promise(async (resolve, reject) => {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/api/user/forget/${username}`
//           );
//           if (!response) reject("Something Went Wrong");
//           else {
//             navigate(`/forget/${username}/verify`);
//             resolve();
//           }
//         } catch (error) {
//           reject(error);
//         }
//       }),
//       {
//         loading: "Please Wait...",
//         success: "OTP Sent Successfully",
//         error: "Something Went Wrong",
//       }
//     );
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen p-4 ">
//       <Toaster />
//       <div className="w-full max-w-md space-y-4">
//         <div className="bg-gray-800 rounded-lg shadow-md border border-color-1 p-6">
//           <div className="flex flex-col gap-6 items-center">
//             <input
//               type="text"
//               placeholder="Username or email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <button
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
//               onClick={handleClick}
//             >
//               Send OTP
//             </button>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
//           <div className="flex justify-center items-center">
//             <p className="mr-2">Click here to</p>
//             <Link to="/login" className="text-blue-500 font-semibold hover:underline">
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Forget;