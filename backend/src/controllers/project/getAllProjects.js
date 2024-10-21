import {Project} from '../../models/projectSchema.js'
import { ApiResponse } from '../../utils/ApiResponse.js';

const getAllproject = async(req,res) =>{
    try {
        const user = req.user;
        if(!user)return res.status(200).json(new ApiResponse('Please Login first',{data: null}))
        const id = user._id;
        const projects = await Project.find({owner: id})
        return res.status(200).json(new ApiResponse('Projects fetched Sucessfully',{projects: projects}));
    } catch (error) {
        return res.status(500).json(new ApiResponse('Internal server error',{data: null}))
    }
}

export default getAllproject