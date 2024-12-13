import React, { useEffect, useRef } from 'react'
import DOMPurify from "dompurify";
import projectImage from  '/project.jpg'
import {User,CalendarDays,Target} from "lucide-react"

const ProjectCardDescription = ({projectName,owner,description}) => {
    return (
        <>
        <div className='bg-white text-black'>
            <h2 className='max-h-6 overflow-hidden font-extrabold text-lg'>{projectName || "Project Name"}</h2>
            <User size={16} className='inline'/>
            <p className='text-sm px-2 inline'>{owner || "Project Owner"}</p>
        </div>

        <div
            className="text-black text-sm mb-2 font-thin font-sans min-h-12"  
            style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis'}}
            dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
                description?.length > 100
                ? description.substring(0, 100) + '...'
                : description
            ),
            }}
        />
        </>
    )
}

const Timeline = () =>{
    return (
        <>
          <CalendarDays size={16} className='inline'/>
          <p className='inline px-2 font-medium text-sm'>March-2024 - December 2024</p>
        </>
    )
}

const TargetBar = ({targetAmount, collectedAmount}) => {
    const [percentage, setPercentage] = React.useState(0);
    const barRef = useRef(null);

    useEffect(() => {
        setPercentage((Number(collectedAmount) / Number(targetAmount)) * 100);
        if(barRef.current){
            barRef.current.style.width = `${percentage}%`;
        }
    }, [collectedAmount, targetAmount]);

    return (
        <>
        <div className='flex flex-row items-center'>
          <Target size={16} className='inline'/>
          <span className='inline text-[12px] font-semibold px-2'>{`$ ${targetAmount}`}</span>
          <span className='ml-auto self-end text-[12px] font-semibold px-2'>{`${Math.floor(percentage)}% Funded `}</span>
        </div>
        <div className='bg-gray-200 w-full h-2 rounded-md mt-2'>
            <div className='bg-black w-[0%] h-2 rounded-md' ref={barRef}></div>
        </div>
        <p className='text-[11px]'>{`$${(Number(collectedAmount).toFixed(2)).toLocaleString()} raised`}</p>
        </>
    )
}

const ProjectCard = ({projectName ,owner, description, targetAmount, collectedAmount}) => {
  return (
    <div className='min-h-96 flex flex-col min-w-72 max-w-72 bg-white rounded-md text-black shadow-sm relative'>
      <img src={projectImage} alt="project-image" className='rounded-md hover:scale-100'/>
      <div className='p-2'>
        <ProjectCardDescription projectName={projectName} owner={owner} description={description}/>
        <Timeline/>
        <br />
        <TargetBar collectedAmount={collectedAmount} targetAmount={targetAmount}/>
      </div>
      <button className='bg-black self-center text-white rounded-md min-h-8 py-2 mb-2 px-4 min-w-[80%]'>Show Project</button>
    </div>
  )
}

export default ProjectCard
