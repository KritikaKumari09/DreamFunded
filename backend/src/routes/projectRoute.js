import { Router } from "express";
import {upload} from '../middlewares/multer.middlewares.js'
import addProject from "../controllers/project/addProject.controller.js";
import getAllProjects from "../controllers/project/getAllProjects.js";
import FundProjects from "../controllers/project/FundProjects.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/addProject",upload.none(),addProject);
router.get("/getAllProject",verifyJWT,getAllProjects)
router.get("/FundProjects",FundProjects)

export default router;
