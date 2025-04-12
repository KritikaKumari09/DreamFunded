import {ApiResponse} from "../utils/ApiResponse.js"
import {Feedback} from "../models/feedback.js"

export const getFeedback = async (req,res) =>{
    const {name,email,message} = req.body;
    const validationRules = [
        { field: 'name', value: name, message: 'Name is Required' },
        { field: 'email', value: email, message: 'Email is Required' },
        { field: 'message', value: message, message: 'Message is required field' }
       ];
    for(const rule of validationRules){
        if(!rule.value){
            return res.status(200).json(new ApiResponse(rule.message,{data: 'Empty'}))
        }
    }
    const userFeeback = new Feedback({name: name,email: email, message: message});
    const savedFeedback = await userFeeback.save();
    if(!savedFeedback)return res.json(new ApiResponse('Internal Server Error', {data: null}))
    return res.json(new ApiResponse('Feedback submitted Successfully',{success: true, body: savedFeedback}))
}