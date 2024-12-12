import { Project } from '../../models/projectSchema.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const FundProjects = async (req, res) => {
    try {
        // const projects = await Project.find(); // Fetch all projects without filtering by owner
        const projects = await Project.aggregate(
            [
                {
                  $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "projectOwner",
                  },
                },  
                {
                  $addFields: {
                    projectOwnerName: {
                      $first: "$projectOwner",
                    },
                  },
                },
            ]
        )
        return res.status(200).json(new ApiResponse('Projects fetched successfully', { projects }));
    } catch (error) {
        return res.status(500).json(new ApiResponse('Internal server error', { data: null }));
    }
};

export default FundProjects;


