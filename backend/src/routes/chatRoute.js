import { Router } from "express";
import {
  makeGroup,
  getUserGroups,
  joinGroup,
  sendMessage,
  getAllMessages,
} from "../controllers/index.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { groupAuth } from "../middlewares/groupAuth.middleware.js";

const router = Router();

router.post("/create",upload.none(),makeGroup);
router.post("/join", verifyJWT, joinGroup);
router.post("/sendMessage", verifyJWT, groupAuth, sendMessage);
router.get("/getAllGroups", verifyJWT, getUserGroups);
router.post("/getAllMessages",verifyJWT, groupAuth,getAllMessages);
export default router;
