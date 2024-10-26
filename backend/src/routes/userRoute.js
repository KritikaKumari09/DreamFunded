import { Router } from "express";
import {
  registerUser,
  checkUsername,
  loginUser,
  logoutUser,
  verifyEmail,
  forgetPasswordHandler,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  forgetPasswordVerifyAndSetNewPassword,
  getFeedback
} from "../controllers/index.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("HII");
});

router.get("/checkUsername/:username", checkUsername); // to check whether username is available or not
router.post("/register", upload.single("avatarImage"), registerUser); // to register user
router.post("/login", loginUser);
router.post("/verifyEmail/:id", verifyEmail);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyJWT, changeCurrentPassword);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.get("/forget/:id", forgetPasswordHandler);
router.post("/forget/:id/verify", forgetPasswordVerifyAndSetNewPassword);
router.post("/feedback",getFeedback)
export default router;
