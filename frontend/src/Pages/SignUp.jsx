// import React, { useEffect, useRef, useState } from "react";
// import { ReactCrop } from "react-image-crop";
// import sample from "../assets/images.png";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";
// import Button from "../components/Button";
// import ButtonGradient from "../assets/svg/ButtonGradient";

// const SignUp = () => {
//   const inputRef = useRef(null);
//   const [image, setImage] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [timer, setTimer] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         const url = reader.result;
//         setImage(url);
//       };

//       reader.readAsDataURL(file);
//     } else {
//       console.log("No file selected");
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       const data = await axios.post(
//         "http://localhost:8000/",
//         { url: image },
//         { withCredentials: true }
//       );
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleImageClick = () => {
//     inputRef.current.click();
//   };

//   useEffect(() => {
//     if (!timer) {
//       clearTimeout(timer);
//     }
//     const timerID = setTimeout(async () => {
//       const response = await axios.get(
//         `http://localhost:8000/api/user/checkUsername/${username}`
//       );
//       setIsUsernameAvailable(response.data.data.isAvailable);
//       setMessage(response.data.message);
//     }, [1000]);

//     setTimer(timerID);

//     return () => {
//       clearTimeout(timer);
//       setTimer(null);
//     };
//   }, [username]);

//   const handleSubmit = () => {
//     toast.promise(
//       new Promise(async (res, rej) => {
//         try {
//           const response = await axios.post(
//             `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
//             {
//               username,
//               email,
//               password,
//               avatarImage: image
//             },
//             { withCredentials: true }
//           );
//           console.log(response)
//           res("Success buddy");
//         } catch (error) {
//           rej(error.response.data.message);
//         }
//       }),
//       {
//         loading: "Please Wait ...",
//         success: (data)=>{return data},
//         error: (data) => {
//           return data;
//         },
//       }
//     );
//   };
//   return (
//     <div className="grid place-content-center place-items-center h-[100vh] ">
//       <Toaster />
//       <div className=" h-[60vh] sm:h-[65vh] w-[20rem] mb-36 shadow-md flex flex-col items-center rounded-md py-4 px-2 gap-6">
//         <img
//           src={image || sample}
//           alt="user"
//           className="h-32 w-32 rounded-full"
//           onClick={handleImageClick}
//         />
//         <input
//           type="file"
//           className=""
//           ref={inputRef}
//           onChange={handleFileChange}
//           hidden
//         />
//         <div className="flex flex-col">
//           <input
//             type="text"
//             className="border-[1px] sm:border-[2px] h-10 w-72 rounded-md px-2 border-gray-200 outline-none focus:border-cyan-300 text-gray-500"
//             placeholder="username"
//             spellCheck={false}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           {message && (
//             <p
//               className={
//                 isUsernameAvailable
//                   ? "text-[12px] pl-2 text-green-600"
//                   : "text-[12px] pl-2 text-red-500"
//               }
//             >
//               {message}
//             </p>
//           )}
//         </div>
//         <input
//           type="email"
//           className="border-[1px] sm:border-[2px] h-10 w-72 rounded-md px-2 border-gray-200 outline-none text-gray-500 focus:border-cyan-300"
//           placeholder="email"
//           spellCheck={false}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="border-[1px] sm:border-[2px] h-10 w-72 rounded-md px-2 border-gray-200 outline-none text-gray-500 focus:border-cyan-300"
//           placeholder="password"
//           spellCheck={false}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="flex flex-col justify-center">
//           <Button
            
//             disabled={!isUsernameAvailable}
//             onClick={handleSubmit}
//           >
//             Register Now
//           </Button>
//           <ButtonGradient/>
//           <hr className="my-3 w-full" />
//           <p className="text-sm">
//             Already Have an Account?{" "}
//             <Link to={"/login"} className="text-cyan-500">
//               Log In
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;




import React, { useEffect, useRef, useState } from "react";
import { ReactCrop } from "react-image-crop";
import sample from "../assets/images.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Button from "../components/Button";
import ButtonGradient from "../assets/svg/ButtonGradient";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [message, setMessage] = useState(null);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const url = reader.result;
        setImage(url);
      };

      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  const handleUpload = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8000/",
        { url: image },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (!timer) {
      clearTimeout(timer);
    }
    const timerID = setTimeout(async () => {
      const response = await axios.get(
        `http://localhost:8000/api/user/checkUsername/${username}`
      );
      setIsUsernameAvailable(response.data.data.isAvailable);
      setMessage(response.data.message);
    }, [1000]);

    setTimer(timerID);

    return () => {
      clearTimeout(timer);
      setTimer(null);
    };
  }, [username]);

  const handleSubmit = () => {
    toast.promise(
      new Promise(async (res, rej) => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/user/register",
            {
              username,
              email,
              password,
              avatarImage: image
            },
            { withCredentials: true }
          );
          console.log(response)
          res("Registered successfully");
        } catch (error) {
          rej(error.response.data.message);
        }
      }),
      {
        loading: "Please Wait ...",
        success: "Your account has been created. Check your email for verification",
        error: "Something Went Wrong",
      },
      
    );
  };
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Toaster />
      <div className="w-full max-w-md">
        <div className="bg-gray-950 shadow-lg rounded-lg overflow-hidden border border-color-1">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>
            <div className="flex flex-col items-center mb-6">
              <img
                src={image || sample}
                alt="user"
                className="h-32 w-32 rounded-full cursor-pointer border-4 border-gray-200 hover:border-cyan-300 transition-colors"
                onClick={handleImageClick}
              />
              <p className="mt-2 text-sm text-gray-400">Click to upload image</p>
              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                hidden
              />
            </div>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 text-gray-700"
                  placeholder="Username"
                  spellCheck={false}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {message && (
                  <p className={`text-xs mt-1 ${isUsernameAvailable ? "text-green-600" : "text-red-500"}`}>
                    {message}
                  </p>
                )}
              </div>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 text-gray-700"
                placeholder="Email"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 text-gray-700"
                placeholder="Password"
                spellCheck={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-col items-center">
                <Button
                  disabled={!isUsernameAvailable}
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Register Now
                </Button>
                <ButtonGradient className="w-full mt-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-500 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
