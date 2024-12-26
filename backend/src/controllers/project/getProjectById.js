import { Project } from '../../models/projectSchema.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import mongoose from 'mongoose'; // Ensure mongoose is imported to validate ObjectId

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(new ApiResponse('Invalid project ID', { data: null }));
    }

    // Fetch the project with the given ID and include the owner's information
    const project = await Project.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'projectOwner',
        },
      },
      {
        $addFields: {
          projectOwnerName: {
            $first: '$projectOwner',
          },
        },
      },
      {
        $project: {
          projectOwner: 0, // Exclude the raw projectOwner array
        },
      },
    ]);

    // If no project is found, return a 404 response
    if (!project.length) {
      return res.status(404).json(new ApiResponse('Project not found', { data: null }));
    }

    return res.status(200).json(new ApiResponse('Project fetched successfully', { project: project[0] }));
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json(new ApiResponse('Internal server error', { data: null }));
  }
};

export default getProjectById;
