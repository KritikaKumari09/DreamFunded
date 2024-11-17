import { Router } from "express";
import {upload} from '../middlewares/multer.middlewares.js'
import addProject from "../controllers/project/addProject.controller.js";
import getAllProjects from "../controllers/project/getAllProjects.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import getProjectByTag from "../controllers/project/getProjectByTag.js";
const router = Router();

router.post("/addProject",upload.none(),addProject);
router.post("/getProjectByTags",upload.none(),getProjectByTag); 
router.get("/getAllProject",verifyJWT,getAllProjects)
export default router;
