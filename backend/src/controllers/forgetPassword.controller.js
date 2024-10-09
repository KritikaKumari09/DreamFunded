import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateOtp } from "../utils/basicUtils.js";
import { sendEmail } from "../utils/nodemailer.js";

export async function forgetPasswordHandler(req, res) {
  const { id } = req.params;
  if (!id)
    return res
      .status(404)
      .json(new ApiError(404, "Please Provide Username/ Email"));
  try {
    const existingUser = await User.findOne({
      $or: [{ email: id }, { username: id }],
    });
    if (!existingUser)
      return res
        .status(404)
        .json(new ApiResponse("User not found", { success: false }));
    existingUser.forgetPasswordOtp = generateOtp();
    existingUser.forgetPasswordOtpExpiry = new Date(Date.now() + 3600000);
    await existingUser.save();
    await sendEmail({
      to: existingUser.email,
      type: "forget",
      code: existingUser.forgetPasswordOtp,
    });
    return res.status(200).json(new ApiResponse("Otp Sent Successfully"));
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "Something went wrong please try again", error));
  }
}

export async function forgetPasswordVerifyAndSetNewPassword(req, res) {
  const { otp, newPassword } = req.body;
  if (!otp || !newPassword)
    return res
      .status(401)
      .json(new ApiError(401, "Otp and newPassword is Required"));
  const { id } = req.params;
  try {
    const existingUser = await User.findOne({
      $or: [{ email: id }, { username: id }],
    });
    if (!existingUser)
      return res
        .status(404)
        .json(new ApiError(404, "Username not found", { success: false }));
    const isOtpCorrect = existingUser.forgetPasswordOtp === otp;
    if (!isOtpCorrect)
      return res
        .status(200) // here 200 status given so that invalid otp is message display or else its not displayed rather axios error is displayed in output screen if we give status code 300 or above
        .json(new ApiResponse("Invalid Otp", { success: false }));
    const currDate = new Date(Date.now());
    const isOtpValid = existingUser.forgetPasswordOtpExpiry > currDate;
    if (!isOtpValid)
      return res.status(200).json(
        new ApiResponse("Otp has been Expired please try Again", {
          success: false,
        })
      );
    existingUser.password = newPassword;
    existingUser.forgetPasswordOtp = "";
    existingUser.forgetPasswordOtpExpiry = currDate;
    await existingUser.save();
    return res.status(200).json(
      new ApiResponse("Password changed successfully", {
        username: existingUser.username,
        email: existingUser.email,
        success: true,
      })
    );
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "Something went wrong please try again", error));
  }
}
