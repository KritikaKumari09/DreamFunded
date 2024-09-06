import {ApiResponse} from '../utils/ApiResponse.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { User } from '../models/userSchema.js'
import {generateOtp} from '../utils/basicUtils.js'
import {sendEmail} from '../utils/nodemailer.js'
import fs from 'fs'

export const registerUser = async(req,res) =>{
    try {
        const {username, email, password} = req.body
        if(!username || !email || !password)return res.status(200).json(new ApiResponse('username, email & password is required',{success: false}))
        const existingUser = await User.findOne({
              email: email    
        })
        if(existingUser) return res.status(400).json(new ApiResponse('Email already in Use',{success: false}))
        let avatarImage = "";
        if(req.file){
            const response = await uploadOnCloudinary(req.file.path);
            if(response){
                avatarImage = response.url
                fs.unlinkSync(req.file.path)
            }else{
                fs.unlinkSync(req.file.path)
                return res.status(503).json(new ApiResponse('Failed to Upload Avtar on Cloudinary',{success: false}))
            }
        }
        const newUser = new User({
            username,
            email,
            password,
            avatarImage,
            otp: generateOtp(),
            otpExpiry: Date.now() + 600000,
            // 10 minutes is the expiry time
        })

        const response  = await newUser.save();
        if(!response){
            res.status(500).json(new ApiResponse('Failed to register user',{data: 'none', success: false}))
        }
        await sendEmail({to: newUser.email,type: "verify",code :Number(newUser.otp), userName:newUser.username});
        res.status(200).json(new ApiResponse('User Saved Successfully',{username: response.username,email: response.email, avatarImage: response.avatarImage,success: true}))
    } catch (error) {
        console.log('Unable to register User')
    }
}