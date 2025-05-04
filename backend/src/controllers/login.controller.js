import { User } from "../models/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessAndRefreshTokens } from "./genAccess&RefreshToken.controller.js";

export const loginUser= asyncHandler(async(req,res)=>{
        
    const {email,username,password}=req.body;
    if(!(username || email)){
        throw new ApiError(400, "username or email required")
    }
    
    const user= await User.findOne({ 
        $or:[{username}, {email}] 
    })
    if(!user){
        throw new ApiError(404, "User does not exist")
    }

      const isPasswordValid =await user.isPasswordCorrect(password)


   if(!isPasswordValid){
    throw new ApiError(401 ,"Invalid user credentials" )
   }

//    below line for email verification
   if(!user.isEmailVerified) { return res.status(400).json(new ApiResponse("PLease Verify Your Email",{success: false})) }
   
const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)// since it may take time since we are saving info in db in this method 



const loggedInUser= await User.findById(user._id).select("-password -refreshToken -otp") // we created this new loggedInUser object because the user object we initially created had empty access and refresh token because we called generateAccessAndRefreshTokesn inabove line and user object was assigned both tokens in above line and not before.

 

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',  // Important for cross-origin requests
    path: '/'          // Ensure cookie is accessible on all paths
}

return res
 .status(200)
 .cookie("accessToken", accessToken, options)
 .cookie("refreshToken", refreshToken, options)

 .json(
    new ApiResponse(
         "User logged In Successfully",
        {user:loggedInUser,accessToken,refreshToken}
       
    )
 )
})

