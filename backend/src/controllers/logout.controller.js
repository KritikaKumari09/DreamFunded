import { User } from "../models/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// /logging out user
export const logoutUser= asyncHandler(async(req,res)=>{
    
   
   

    await User.findByIdAndUpdate(req.user._id, { 
               
        $unset:{
            refreshToken:1 
            
        }
    },
    {new : true} 
)

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',  // Important for cross-origin requests
    path: '/'          // Ensure cookie is accessible on all paths
} 

return res.status(200)
.clearCookie("accessToken", options)
.clearCookie("refreshToken", options)
.status(200)
.json(new ApiResponse("User logged out", {}, ))

})