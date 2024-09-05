import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { io } from "socket.io-client";
import Navbar from '../components/Navbar.jsx'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice.js";
import "./ChatApp.css";
import MessageBox from "../components/MessageBox.jsx";
import sampleAvatar from "../assets/images.png";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import SenderBox from "../components/SenderBox.jsx";
import RecievedBox from "../components/RecievedBox.jsx";
import { addMessage, setGroup, removeChat } from "../store/userSlice.js";
import recieveAudio from "../assets/recieve.mp3";
import backLogo from "../../src/assets/arrow-left-solid.svg";
import toast, { Toaster } from "react-hot-toast";
import sample from "../assets/images.png"

const ChatApp = () => {
  let result = useLoaderData();

  /* Ensure result.data.data is always an array, otherwise we will not be able to use groups.map */
  const groupsData = Array.isArray(result.data.data) ? result.data.data : [];

  const socket = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const groups = useSelector((state) => state.groups || []);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const messageBoxRef = useRef(null);
  const recieve = new Audio(recieveAudio);
  const isDrawerOpen = useSelector((state)=>state.isOpen)

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:8000", {
        query: { username: user?.username, id: user?._id },
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user?.username]);

  useEffect(() => {
    if (socket.current) {
      dispatch(setGroup(groupsData));
      socket.current.on("recieve", (data) => {
        recieve.play();
        dispatch(addMessage({ groupId: data.groupId, message: data.message }));
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off("Online");
        socket.current.on("recieve", () => {});
      }
    };
  }, []);

  useEffect(() => {
    setMessages(chat?.messages);
    setGroupMembers(chat?.groupMembers);
    const div = document.getElementById(chat?._id);
    if (div) {
      div.style.backgroundColor = "#e2e8f0 ";
      return () => {
        setMessages([]);
        setGroupMembers([]);
        div.style.backgroundColor = "";
      };
    }
  }, [chat]);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const group = groups?.find((grp) => grp?._id === chat?._id);
    if (group) {
      setMessages(group.messages);
      setGroupMembers(group.groupMembers);
    }
  }, [groups]);

  const sendMessage = async () => {
    try {
      const msg = newMessage;
      setNewMessage("");
      await axios.post(
        "http://localhost:8000/api/chat/sendMessage",
        { groupId: chat._id, message: msg },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    const data = {
      id: user._id,
      time: new Date(Date.now()),
      content: newMessage,
      groupId: chat._id,
    };
    const senderData = {
      sender: user._id,
      content: newMessage,
      createdAt: new Date(Date.now()),
    };
    dispatch(addMessage({ groupId: chat._id, message: senderData }));
    socket.current.emit("message", data);
    setNewMessage("");
  };

  /* Function to reset chat state in store to null */
  const handleBack = () => {
    dispatch(removeChat());
  };

  /* Function to logout the user */
  // const handleLogout = async () => {
  //   try {
  //     dispatch(logout());
  //     await axios.post(
  //       "http://localhost:8000/api/user/logout",
  //       {},
  //       { withCredentials: true }
  //     );
  //   } catch (error) {}
  // };


  
const handleLogout = () => {
  toast.promise(
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/logout",
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

  return (
    <>
    <Toaster />
    <div
    className={
      isDrawerOpen
        ? "absolute z-10 dark:text-white  h-full  w-[60%] right-0 sm:hidden dark:bg-black top-14 overflow-hidden flex flex-col justify-between pb-20 items-center"
        : "absolute z-10 text-white h-full  w-0 right-0 sm:hidden dark:bg-black top-14 overflow-hidden flex flex-col justify-between pb-20 items-center"
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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`w-full sm:w-80 lg:w-96 ${chat ? 'hidden sm:block' : ''} bg-[#1a1a1a] dark:bg-[#1f1f1f] overflow-y-auto flex-shrink-0`}>
          <div className="h-20 flex items-center px-4 gap-2 text-white">
            <img
              src={user?.avatarImage || sample}
              alt="user_img"
              className="rounded-full h-12 w-12"
            />
            <div>
              <h2 className="font-semibold text-sm sm:text-base">
                {user?.username}
              </h2>
            </div>
          </div>
          {Array.isArray(groups) && groups.length > 0 ? (
            groups.map((grp, idx) => (
              <MessageBox
                key={idx}
                username={grp?.name}
                id={grp?._id}
                lastMessage={grp?.messages?.[grp.messages.length - 1]?.content}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No groups available</p>
          )}
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${!chat ? 'hidden sm:flex' : ''}`}>
          {chat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white dark:bg-black h-16 flex items-center px-4 gap-4 border-b dark:border-gray-700 flex-shrink-0">
                <button 
                  className="sm:hidden text-xl text-gray-600 dark:text-white"
                  onClick={handleBack}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <img
                  src={sampleAvatar}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {chat?.name}
                </h2>
              </div>

              {/*Below code for  Messages */}
              <div 
                className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900"
                ref={messageBoxRef}
              >
                {messages?.map((msg, idx) => {
                  const obj = groupMembers.find((user) => user._id === msg.sender);
                  return msg.sender === user?._id ? (
                    <SenderBox
                      message={msg.content}
                      time={msg.createdAt}
                      key={idx}
                    />
                  ) : (
                    <RecievedBox
                      message={msg.content}
                      time={msg.createdAt}
                      img={obj?.avatarImage || sampleAvatar}
                      key={idx}
                      sender={obj?.username || "Unknown"}
                    />
                  );
                })}
              </div>

              {/* Below code for Message Input */}
              <div className="bg-white dark:bg-gray-800 p-4 border-t dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex-grow h-12 outline-none px-4 bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-l-md"
                    placeholder="Type a message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    value={newMessage}
                  />
                  <button
                    className="h-12 px-6 bg-blue-700 text-white rounded-r-md"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatApp;