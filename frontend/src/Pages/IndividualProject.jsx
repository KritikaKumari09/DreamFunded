import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx';

export function GridBackgroundDemo() {
    const {id} = useParams();
    const displayBoardRef = useRef(null);
    const data = "<p>This is my new Project Named <strong>Jarvis 2.0&nbsp;&nbsp;</strong>which is updated version of <strong><em>Jarvis</em></strong><br> <a href='https://www.google.co.in/'>Google</a></p>";
    displayBoardRef.current
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Navbar/>
      <div ref={displayBoardRef} dangerouslySetInnerHTML={{__html:data}} className='text-white bg-black h-96 w-96 rounded-md m-12 border-white border-[0.3px] absolute right-12 p-8'>
      </div>
    </div>
  );
}
const IndividualProject = () => {
  return (
    <>
    <GridBackgroundDemo/>
    </>
  )
}

export default IndividualProject
