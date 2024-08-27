import React, { useEffect, useRef } from "react";
import user from "../assets/images.png";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../store/userSlice.js";
const MessageBox = ({ username, avatar, lastMessage ="", id }) => {
  const dispatch = useDispatch();
  const chat = useSelector(state=>state.chat)
  const groups = useSelector(state=>state.groups)
  const selectChatHandle = () => {
    const res = groups.find((e)=>e._id == id)
    dispatch(selectChat(res));
  };
  const msgBoxRef = useRef(null);

  // useEffect(()=>{
  //   if(msgBoxRef.current){
  //     if(id == chat._id){
  //       msgBoxRef.current.style.backgroundColor = "#e2e8f0";
  //     }else{
  //       msgBoxRef.current.style.backgroundColor = "white";
  //     }
  //   }
  // },[chat])
  
  return (
    <div
      className="h-16 my-1 pl-4 flex gap-2  items-center  cursor-pointer hover:bg-[#525151db]"
      onClick={selectChatHandle}
      id={id}
      ref={msgBoxRef}
    >
      <img src={avatar || user} alt="" className="h-12 w-12 rounded-full" />
      <div>
        <h2 className="text-md text-gray-500">
          {username || "username"}
        </h2>
        <p className="text-sm text-gray-500 overflow-y-hidden  h-6">{lastMessage || ""}</p>
      </div>
    </div>
  );
};

export default MessageBox;
