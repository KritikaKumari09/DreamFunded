import React from 'react'
import Navbar from "../components/Navbar.jsx"
const Project = () => {
  return (
    <div className='h-full bg-black'>
      <Navbar/>
      <div className='h-[90vh] grid grid-cols-4 grid-rows-1 mt-4 gap-4 p-2'>
        <div className='bg-yellow-100 col-start-1 col-span-3 rounded-md'>hi</div>
        <div className='bg-black rounded-md border-grey border-solid border-[0.1px]'>bye</div>
      </div>
    </div>
  )
}

export default Project
