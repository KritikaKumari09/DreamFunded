import {Project} from "../../models/projectSchema.js"

//* this is JSDoc syntax to document the function
/**
 * @desc    Get project by tags
 * @route   POST /api/project/getProjectByTags
 * @access  Public
 */
const getProjectByTag = async (req, res) =>{
    try {
        let {tags} = req.body;
        tags = tags.split(",");
        tags = tags.map(tag =>{
            tag = tag.trim();
            tag = tag.toLowerCase();
            return tag;
        })
        const projects = await Project.find({tags: {$in: tags}});
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});    
    }
};  

export default getProjectByTag;