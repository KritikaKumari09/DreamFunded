import { Router } from "express";
import {upload} from '../middlewares/multer.middlewares.js'
import addProject from "../controllers/project/addProject.controller.js";
const router = Router();

router.post("/addProject",upload.none(),addProject);

export default router;
