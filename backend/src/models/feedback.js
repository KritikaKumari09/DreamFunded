import mongoose from "mongoose"

const feedbackSchema =new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true
    },
    message: {
        type: String,
        requried: true
    }
},{timestamps: true})

export const Feedback = mongoose.model("Feeback",feedbackSchema);