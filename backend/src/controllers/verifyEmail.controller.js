import { User } from "../models/userSchema.js";
// import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export async function verifyEmail(req,res){
try {
        const {id} = req.params;
        const {otp} = req.body;
        if(!otp) 
            // return res.json(new ApiError(404, 'Otp is required to verify'))
        return res.status(404).json(new ApiResponse('Otp is required to verify',{success: false}))
        const client = await User.findOne(
            {
                username: id
            }
        )
        if(!client) 
            // return res.json(new ApiError(404,'Invalid Username'));
        return res.status(404).json(new ApiResponse('Invalid Username',{success: false}))
        const currDate = new Date(Date.now())
        const isOtpValid = client.otpExpiry > currDate;
        if(!isOtpValid) 
            // return res.status(410).json(new ApiError(410, 'Otp is Expired'))
        return res.status(410).json(new ApiResponse('Otp is Expired',{success: false}))
        const isOtpCorrect = client.otp ===otp;
        // if(!isOtpCorrect) return res.status(401).json(new ApiError(401, 'Invalid Otp'))
        if(!isOtpCorrect) return res.status(401).json(new ApiResponse('Invalid Otp',{success: false}))
        client.isEmailVerified = true;
        await client.save();
        return res.status(200).json(new ApiResponse('Verification Successful',{success: true}))
} catch (error) {
    // return res.json(new ApiError(500,'Server is Down!'))
    return res.status(500).json(new ApiResponse('Server is Down!',{success: false}))
}
}