import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
// import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import "./ChatApp.css";
import MessageBox from "../components/MessageBox.jsx";
import sampleAvatar from "../assets/images.png";
import { NavLink, useLoaderData } from "react-router-dom";
import axios from "axios";
import SenderBox from "../components/SenderBox.jsx";
import RecievedBox from "../components/RecievedBox.jsx";
import { addMessage, setGroup, removeChat } from "../store/userSlice.js";
import recieveAudio from "../assets/recieve.mp3";
import backLogo from "../../src/assets/arrow-left-solid.svg";

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

  return (
    <>
      <Navbar/>
      <div className="grid grid-cols-1 sm:grid-cols-5 h-[94vh] gap-4 sm:pt-4 dark:bg-[#1f1f1ff7]">
        {/* // start of Stack */}
      <div className="col-start-1 sm:col-span-1 md:ml-2 rounded-lg dark:bg-[#1f1f1f] h-[100vh] message-stack bg-[#1a1a1a]">
          <div className="h-20 flex items-center pl-2 gap-2 text-white">
            <img
              src={user?.avatarImage}
              alt="user_img"
              className="rounded-full h-16 w-16"
            />
            <div>
              <h2 className="font-semibold text-sm sm:text-base">
                {user?.username}
              </h2>
            </div>
          </div>
          {/* Safe mapping */}
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
        {/* // end of stack */}
        <div
          className={
            chat
              ? "bg-black col-span-1 sm:col-span-4 sm:rounded-md sm:ml-1 sm:grid sm:grid-rows-12 overflow-hidden absolute z-1 top-14 ml-0 sm:relative rounded-none sm:top-0 flex flex-col"
              : ""
          }
        >
          {/* Message Navbar */}
          {chat && (
            <div className="dark:bg-black sm:hidden h-16 rounded-none flex items-center px-4 gap-6">
              <i
                className="fa-solid fa-arrow-left text-xl text-white"
                onClick={handleBack}
              ></i>
              <div className="flex items-center gap-3">
                <img
                  src={sampleAvatar}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <h2 className="font-semibold text-xl text-white">
                  {chat?.name}
                </h2>
              </div>
            </div>
          )}

          {/* Messages from here */}
          {!chat && 
           <div>
            select chats
           </div>
          }
          <div
            className={
              chat
                ? "bg-black col-span-4 sm:rounded-md rounded-b-none py-2 chat-area flex flex-col overflow-y-auto overflow-x-hidden row-start-1 row-span-11 "
                : ""
            }
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
          {/* send message section here */}
          {chat && (
            <div className="flex overflow-x-hidden send-message">
              <input
                type="text"
                className="h-12 ml-0 outline-none w-full sm:w-[1125px] pl-4 msg-box"
                placeholder="type message here ..."
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    sendMessage();
                  }
                }}
                value={newMessage}
              />
              <button
                className="ml-0 h-12 w-24 bg-blue-700 text-white btn rounded-r-md"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatApp;
