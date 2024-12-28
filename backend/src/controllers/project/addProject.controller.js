import {ApiResponse} from '../../utils/ApiResponse.js'
import {Project} from '../../models/projectSchema.js'
import mongoose from 'mongoose';
import { Chat } from '../../models/chat.Schema.js';

const addProject = async(req, res) => {
  const { name, owner, description, deadline, totalFundsRequired } = req.body;
  
  /*
  
  if(!name)return res.status(200).json(new ApiResponse('Project Name is Required',{data: 'Empty'}))
  if(!owner)return res.status(200).json(new ApiResponse('Project Owner is Required',{data: 'Empty'}))
  if(!description)return res.status(200).json(new ApiResponse('Pleae Provide a desciption of your Project',{data: 'Empty'}))
  if(!deadline)return res.status(200).json(new ApiResponse('Deadline is required Field',{data: 'Empty'}))
  if(!totalFundsRequired)return res.status(200).json(new ApiResponse('Please provide total funds required',{data: 'Empty'}))
  
  */
 
 // * Alternative Way
 
    const validationRules = [
     { field: 'name', value: name, message: 'Project Name is Required' },
     { field: 'owner', value: owner, message: 'Project Owner is Required' },
     { field: 'description', value: description, message: 'Please provide a description of your project' },
     { field: 'deadline', value: deadline, message: 'Deadline is a required field' },
     { field: 'totalFundsRequired', value: totalFundsRequired, message: 'Please provide total funds required' }
    ];
    
    for(const rule of validationRules){
        if(!rule.value){
            return res.status(200).json(new ApiResponse(rule.message,{data: 'Empty'}))
        }
    }


// ! new Mongoose.Types.ObjectId is depricated 
  let tags = req.body.tags.split(',');
  tags = tags.map((tag)=>{
    tag = tag.trim();
    tag = tag.toLowerCase();
    return tag;
  })
  console.log(tags);
  // return res.json({'message': 'Tags are added successfully', 'tags': tags});
    const newProject = new Project({
    name,
    owner: new mongoose.Types.ObjectId(owner),
    description,
    deadline: new Date(deadline),
    totalFundsRequired: Number(totalFundsRequired),
    tags: tags,
  })

  newProject.save()
  .then(async(data)=>{
    const newChat = new Chat({admin: new mongoose.Types.ObjectId(owner),name: name, projectID: newProject._id});
    newChat.participants.push(new mongoose.Types.ObjectId(owner));
    await newChat.save();
    return res.status(200).json(new ApiResponse('Project added successfully',data))
  })
  .catch((error)=>{
    return res.status(500).json(new ApiResponse('Failed to add Project', error))
  })
  return;
};

export default addProject;
