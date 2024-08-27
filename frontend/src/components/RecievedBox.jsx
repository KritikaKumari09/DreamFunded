import React from "react";
import profile from "../assets/images.png";

const RecievedBox = ({ message, time, img, sender }) => {
  const date = new Date(time);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const localTime = date.toLocaleTimeString(undefined, options);

  return (
    <span className="flex justify-start my-1 pr-1 pl-1 w-full">
      <div className="h-8 w-8 rounded-full mr-2 flex-shrink-0 overflow-hidden">
        <img src={img || profile} alt="user_img" className="w-full h-full object-cover" />
      </div>
      <span className="bg-[#1f1f1f] text-gray-300 max-w-[90%] sm:max-w-[70%] md:max-w-[50%] h-auto min-h-8 rounded-xl rounded-tl-none px-2 text-left break-words inline-block">
        <span className="leading text-yellow-600 text-[13px]">{sender}</span>
        <br />
        {message}
        <sub className="text-[10px] pl-1">{localTime}</sub>
      </span>
    </span>
  );
};

export default RecievedBox;
