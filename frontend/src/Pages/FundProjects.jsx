import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { curve } from "../assets/index.js";
import { BackgroundBeams } from "../components/ui/background-beams.jsx"; // Assuming BackgroundBeams is a separate component.
import ProjectCard from "../components/ProjectCard.jsx";

const FundProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/project/FundProjects",
          { withCredentials: true }
        );
        setProjects(response.data.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  useEffect(() => {
    console.log(projects);
  }, [projects]);
  return (
    <>
      <Navbar />
      <BackgroundBeams className="absolute inset-0" />
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[1.875rem] md:mb-10 lg:mb-[2.25rem]">
        <BackgroundBeams className="absolute inset-0" />
        <h1 className="h3 mt-6 mb-4">
          <span className="inline-block relative">
            Fund Projects{" "}
            <img
              src={curve}
              className="absolute top-full left-0 w-full xl:-mt-2"
              width={624}
              height={28}
              alt="curve"
            />
          </span>
        </h1>
      </div>

      {/* <div className="flex flex-wrap justify-center">
        {projects.map((project) => (
          <div key={project._id} className="projcard m-4 p-4 ">
            <p className="heading text-white font-bold text-lg mb-2">{project.name}</p>
            <p className="heading text-white font-bold text-base mb-2">Project owner:</p>
            <p className=" text-sm mb-2"> {project.projectOwnerName?.username|| 'N/A'}</p>
            <div
              className="text-white text-sm mb-2"
              style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  project.description.length > 100
                    ? project.description.substring(0, 100) + '...'
                    : project.description
                ),
              }}
            />
            <p className=" text-sm">Deadline: {new Date(project.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
           
            <p className="text-white text-sm">Status: {project.status}</p>
          </div>
        ))}
      </div> */}
      <div className="px-16 z-1000 flex flex-wrap gap-4 justify-center">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            projectName={project.name}
            owner={project.projectOwnerName?.username || "N/A"}
            description={project.description}
            targetAmount={project.totalFundsRequired}
            collectedAmount={project.fundsCollected}
          />
        ))}
      </div>
    </>
  );
};

export default FundProjects;
