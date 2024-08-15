import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            return res.json(new ApiResponse("Unauthorised",[],401))
        }
        const decodedToken=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToken?._id ).select("-password -refreshToken")
        
        
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})