


import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import ButtonGradient from "../assets/svg/ButtonGradient.jsx";
import Header from '../components/Header.jsx';
import Button from "../components/Button.jsx";

const Post = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]);
  const [fund, setFund] = useState("");

  return (
    <>

     <div className="flex justify-center pt-8"> <Button className="  h-12 text-lg font-semibold" href="/">
           Back to home page
        </Button></div> 



    <div className="min-h-screen flex items-center justify-center py-10  px-4 sm:px-6 lg:px-8 text-gray-700">
      <div className="max-w-4xl w-full space-y-8 bg-gray-950 p-10  rounded-xl shadow-lg border border-color-1">
        <h1 className="text-3xl font-bold text-center text-color-1">Create New Project</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="">
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                Project Title
              </label>
              <input
                id="title"
                className="w-full h-12 px-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Title of the Project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">
                Project Description
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
                className="rounded-md border border-gray-300"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-1">
                Deadline
              </label>
              <input
                type="date"
                id="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="fund" className="block text-sm font-medium text-gray-400 mb-1">
                Total Amount of Fund
              </label>
              <input
                type="number"
                id="fund"
                value={fund}
                onChange={(e) => setFund(e.target.value)}
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>
            <Button className="w-full h-12 text-lg font-semibold">
              Upload Project
            </Button>
            <ButtonGradient className="w-full h-12" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Post;