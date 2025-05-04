import jwt from "jsonwebtoken"
import { User } from "../models/userSchema.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { generateAccessAndRefreshTokens } from "./genAccess&RefreshToken.controller.js"
import { ApiResponse } from "../utils/ApiResponse.js"


export const refreshAccessToken= asyncHandler(async(req,res)=>{
    
    const incomingRefreshToken= req.cookies.refreshToken || req.body.refreshToken
    
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }
    
    try {
        const decodedToken= jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        // verify funct takes parameter which is to be decoded as 1st argument and its secret key as 2nd argument
    
    
        // since while creating refresh token we used only user._id therfore we can use decoded refresh token to get user id and then get its info using User.findById()  
        const user=await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401 , "Refresh token is expired or used")
        }
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',  // Important for cross-origin requests
            path: '/'          // Ensure cookie is accessible on all paths
        }
        const {accessToken, newrefreshToken}=await generateAccessAndRefreshTokens(user._id)
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)  // Fixed typo from "accesToken" to "accessToken"
        .cookie("refreshToken", newrefreshToken, options)
        .json(
            new ApiResponse(
               "Access token refreshed", {accessToken,refreshToken:newrefreshToken}
                
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token" )
    }

})