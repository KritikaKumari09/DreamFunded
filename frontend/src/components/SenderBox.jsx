import React from 'react'

const SenderBox = ({message, time}) => {
    const date = new Date(time);
    const options = {
        hour: '2-digit',
        minute: '2-digit'
      };
    const localTime = date.toLocaleTimeString(undefined, options);
  
  return (
    <div className='flex justify-end my-1 pr-1 text-pretty items-center'>
      <span className='bg-green-700 text-white max-w-[90%] sm:max-w-[70%] md:max-w-[50%] h-auto min-h-8 rounded-xl rounded-tr-none px-2 text-left break-words inline-block'>
        {message}
        <sub className='text-[10px] pl-1'>{localTime}</sub>
      </span>
    </div>
  )
}

export default SenderBox
