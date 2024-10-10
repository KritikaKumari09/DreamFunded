import React, { useEffect, useRef, useState } from "react";
import sample from "../assets/images.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Button from "../components/Button";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/getCroppedImage.js';

const SignUp = () => {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [message, setMessage] = useState(null);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // * to store cropped image url
  const [croppedImageFile, seCroppedImageFile] = useState(null); // * to store cropped-image as File Object

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result;
        setImage(url);  // * Image successfully selected, show the cropper, (cropper is Conditionally Rendered)
      };
      reader.readAsDataURL(file);
    }
  };

  //* when an image is clicked it focuses on input File
  const handleImageClick = () => {
    setCroppedImage(null)
    inputRef.current.click();
  };

  const handleCropImage = async () => {
    try {
      //* here getCroppedImg return an object conatining {file,fileUrl};
      const result = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(result.fileUrl); // Store the cropped image
      seCroppedImageFile(result.file);
      setImage(null); // Hide cropper
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (username === "") return;
    if (!timer) clearTimeout(timer);
    const timerID = setTimeout(async () => {
      const response = await axios.get(
        `http://localhost:8000/api/user/checkUsername/${username}`
      );
      setIsUsernameAvailable(response.data.data.isAvailable);
      setMessage(response.data.message);
    }, 1000);
    setTimer(timerID);

    return () => {
      clearTimeout(timer);
      setTimer(null);
    };
  }, [username]);

  const handleSubmit = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("avatarImage", croppedImageFile);  // Use the cropped image
          const response = await axios.post(
            "http://localhost:8000/api/user/register",
            formData,
            { withCredentials: true }
          );
          resolve();
          navigate(`/verifyEmail/${username}`);
        } catch (error) {
          reject(
            error.response?.data?.message || "Network error or server is unreachable"
          );
        }
      }),
      {
        loading: "Please Wait ...",
        success: "Your account has been created. Check your email for verification",
        error: (err) => `${err}`,
      }
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
              {!image && !croppedImage && (
                <img
                  src={sample}
                  alt="user"
                  className="h-32 w-32 rounded-full cursor-pointer border-4 border-gray-200 hover:border-cyan-300 transition-colors"
                  onClick={handleImageClick}
                />
              )}

              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                hidden
              />

              {image && (
                <div className="relative mt-4" style={{ width: "300px", height: "300px" }}>
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                  <Button onClick={handleCropImage} className="mt-4">
                    Crop Image
                  </Button>
                </div>
              )}

              {croppedImage && (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="h-32 w-32 rounded-full mt-4"
                  onClick={handleImageClick}
                />
              )}

              <p className="mt-2 text-sm text-gray-400">Click to upload image</p>
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
