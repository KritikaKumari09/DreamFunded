import React, { useEffect, useRef,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User, CalendarDays, Target } from "lucide-react";
import projectImage from  '/project.jpg'
import DOMPurify from "dompurify";
import { useParams } from 'react-router-dom';
import axios from 'axios'

const ProjectDescription = ({description, fullDescriptionNeeded}) => {
  // below function to preserve HTML tags while truncating
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    const textContent = text.replace(/<[^>]*>/g, ''); // Remove HTML tags for length check
    if (textContent.length <= maxLength) return text;
    return textContent.slice(0, maxLength) + "...";
  };
  
  return (
       <>
           {/* <span
        className="inline text-black text-sm mb-2 font-normal text-lg font-sans min-h-12"
        style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis',  whiteSpace: 'nowrap' }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(truncateText(description, 100))
        }}
      /> */}
      <span
  className="inline text-black text-sm font-normal text-lg font-sans"
  style={{
    maxHeight: '3em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap' // Ensure content stays on the same line
  }}
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(truncateText(description, fullDescriptionNeeded?1000000:100))
  }}
/>

    </>
  );
};

const Timeline = ({createdTime , deadlineTime}) =>{
    return (
        <>
          <CalendarDays size={16} className='inline'/>
          <p className='inline px-2 font-medium text-sm'>
          {createdTime} - {deadlineTime}
           
            </p>
        </>
    )
}

const TargetBar = ({ targetAmount, collectedAmount }) => {
  const [percentage, setPercentage] = React.useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    setPercentage((Number(collectedAmount) / Number(targetAmount)) * 100);
    if (barRef.current) {
      barRef.current.style.width = `${percentage}%`;
    }
  }, [collectedAmount, targetAmount, percentage]);

  return (
    <div className="p-4 ">
      <div className="flex flex-row items-center mb-2">
        <Target size={20} className="inline" />
        <span className="inline text-base font-semibold px-2">{`$ ${targetAmount}`}</span>
        <span className="ml-auto text-base font-semibold">{`${Math.floor(percentage)}% Funded`}</span>
      </div>
      <div className="bg-gray-200 w-full h-3 rounded-full">
        <div className=" h-3 rounded-full transition-all duration-500" ref={barRef}></div>
      </div>
      <p className="text-sm mt-2 font-medium">{`$${Number(collectedAmount).toFixed(2).toLocaleString()} raised`}</p>
    </div>
  );
};


const ProjectDisplay = () => {
  const { id } = useParams(); // Access the ID from the URL
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    // Fetch project data using the ID
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/project/fund_Project/${id}`,{withCredentials: true}); // Replace with your API endpoint
        // const data = await response.json();
        setProjectData(response.data.data.project);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [id]);

  if (!projectData) {
    return <div>No project data found </div>;
  }
const projectName=projectData.name;
const owner=projectData.projectOwnerName?.username || "N/A";
const description=projectData.description;
const targetAmount= projectData.totalFundsRequired;
const collectedAmount=projectData.fundsCollected;
const createdTime=new Date(projectData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const deadlineTime =new Date(projectData.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });






console.log("project data below")
console.log(projectData)
  return (
    <div className="max-w-6xl m-10 mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative h-full">
          <img 
            src={projectData.image || projectImage} // Use fetched project data
            alt="project-image" 
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <div className="flex flex-col h-full text-black bg-white px-2 py-1">
          <h1> <span className='font-bold'>Project Name:</span>             {projectName}</h1>
          <p> <span className='font-bold'>Owner:</span> {owner}</p>
         
         <span className='font-bold'>Description: 
        <ProjectDescription description={description} fullDescriptionNeeded={true}/> </span> 
          <div className='p-2'><Timeline 
            createdTime={createdTime} 
            deadlineTime={deadlineTime}
          /></div>
          {/* <Timeline 
            createdTime={createdTime} 
            deadlineTime={deadlineTime}
          /> */}
          <TargetBar 
            collectedAmount={collectedAmount} 
            targetAmount={targetAmount}
          />
          <div className="p-4">
            <button className="bg-black hover:bg-gray-800 text-white rounded-md py-3 px-6 w-full text-lg font-medium transition-colors"
            >
              Back This Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default ProjectDisplay;

export default ProjectDisplay;