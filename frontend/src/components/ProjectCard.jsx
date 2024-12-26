import React, { useEffect, useRef } from 'react'
import DOMPurify from "dompurify";
import projectImage from  '/project.jpg'
import {User,CalendarDays,Target} from "lucide-react"
import { Link, useNavigate } from "react-router-dom";

// const ProjectCardDescription = ({projectName,owner,description}) => {
//     return (
//         <>
//         <div className='bg-white text-black'>
//             <h2 className='max-h-6 overflow-hidden font-extrabold text-lg'>{projectName || "Project Name"}</h2>
//             <User size={16} className='inline'/>
//             <p className='text-sm px-2 inline'>{owner || "Project Owner"}</p>
//         </div>

//         <div
//             className="text-black text-sm mb-2 font-thin font-sans min-h-10"  
//             style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis'}}
//             dangerouslySetInnerHTML={{
//             __html: DOMPurify.sanitize(
//                 description?.length > 100
//                 ? description.substring(0, 100) + '...'
//                 : description
//             ),
//             }}
//         />
//         </>
//     )
// }

const ProjectCardDescription = ({projectName,owner,description}) => {
    
  // below function to preserve HTML tags while truncating
    const truncateText = (text, maxLength) => {
      if (!text) return "";
      const textContent = text.replace(/<[^>]*>/g, ''); // Remove HTML tags for length check
      if (textContent.length <= maxLength) return text;
      return textContent.slice(0, maxLength) + "...";
    };
    
    return (
      <>
        <div className="bg-white text-black">
          <h2 className="max-h-6 overflow-hidden font-extrabold text-lg">
            {projectName || "Project Name"}
          </h2>
          <User size={16} className="inline" />
          <p className="text-sm px-2 inline">{owner || "Project Owner"}</p>
        </div>
    
        <div
          className="text-black text-sm mb-2 font-thin font-sans min-h-12"
          style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(truncateText(description, 100))
          }}
        />
      </>
    );
  
  
  }
  
  
  





const Timeline = ({createdTime , deadlineTime}) =>{
    return (
        <>
          <CalendarDays size={16} className='inline'/>
          <p className='inline px-2 font-medium text-[11px]'>
          {createdTime} - {deadlineTime}
           
            </p>
        </>
    )
}

const TargetBar = ({targetAmount, collectedAmount}) => {
    const [percentage, setPercentage] = React.useState(0);
    const barRef = useRef(null);

    useEffect(()=>{
      barRef.current.style.width = `${percentage}%`;
    },[percentage])
    useEffect(() => {
        setPercentage((Number(collectedAmount) / Number(targetAmount)) * 100);
    }, []);

    return (
        <>

        
        <div className='flex flex-row items-center'>
          <Target size={16} className='inline'/>
          <span className='inline text-[12px] font-semibold px-2'>{`$ ${targetAmount}`}</span>
          <span className='ml-auto self-end text-[12px] font-semibold px-2'>{`${Math.floor(percentage)}% Funded `}</span>
        </div>



        <div className='bg-gray-200 w-full h-2 rounded-md mt-2'>
            <div className={`bg-black h-2 rounded-md`} ref={barRef}></div>
        </div>
        <p className='text-[11px]'>{`$${(Number(collectedAmount).toFixed(2)).toLocaleString()} raised`}</p>
        </>
    )
}

// const ProjectCard = ({projectName ,owner, description, targetAmount, collectedAmount,createdTime,deadlineTime}) => {
//   return (
//     <div className='min-h-96 flex flex-col min-w-72 max-w-72 bg-white rounded-md text-black shadow-sm relative'>
//       <img src={projectImage} alt="project-image" className='rounded-md hover:scale-100'/>
//       <div className='p-2'>
//         <ProjectCardDescription projectName={projectName} owner={owner} description={description}/>
//         <Timeline createdTime={createdTime} deadlineTime={deadlineTime}/>
//         <br />
//         <TargetBar collectedAmount={collectedAmount} targetAmount={targetAmount}/>
//       </div>
//       <button className='bg-black hover:bg-gray-800 self-center text-white rounded-md min-h-8 py-2 mb-2 px-4 min-w-[80%]'>
//         <Link to={{
//       pathname: "/fund_Project",
//       state: { projectName: {projectName}, owner: {owner},description: {description}, targetAmount:{targetAmount}, collectedAmount:{collectedAmount},createdTime:{createdTime},deadlineTime:{deadlineTime} }, // Example variables
//     }}>
//         Show Project
//                       </Link></button>
//     </div>
//   )
// }

const ProjectCard = ({projectId, projectName, owner, description, targetAmount, collectedAmount, createdTime, deadlineTime }) => {
  return (
    <div className='min-h-96 flex flex-col min-w-72 max-w-72 bg-white rounded-md text-black shadow-sm relative my-10 overflow-hidden transition-all duration-1000'>
      <img src={projectImage} alt="project-image" className='hover:scale-105' style={{borderTopLeftRadius: '6px',borderTopRightRadius: '6px'}}/>
      <div className='p-2'>
        
        <ProjectCardDescription projectName={projectName} owner={owner} description={description}/>
        <Timeline createdTime={createdTime} deadlineTime={deadlineTime}/>
        <br />
        <TargetBar collectedAmount={collectedAmount} targetAmount={targetAmount}/>
      </div>
      <Link 
        to={`/fund_Project/${projectId}`} 
        className='bg-black text-center hover:bg-gray-800 self-center text-white rounded-md min-h-8 py-2 mb-2 min-w-[90%]'
      >
        Show Project
      </Link>
    </div>
  );
};

export default ProjectCard
