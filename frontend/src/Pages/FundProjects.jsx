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
          `${import.meta.env.VITE_BACKEND_URL}/api/project/FundProjects`,
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

     
      <div className="px-16 z-1000 flex flex-wrap gap-4 justify-center mb-10">
        {projects.map((project) => (
          <ProjectCard
            projectId={project._id}
            projectName={project.name}
            owner={project.projectOwnerName?.username || "N/A"}
            description={project.description}
            targetAmount={project.totalFundsRequired}
            collectedAmount={project.fundsCollected}
            createdTime={new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            deadlineTime={new Date(project.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          />
        ))}
      </div>
    </>
  );
};

export default FundProjects;
