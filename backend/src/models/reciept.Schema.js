import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
    payer:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        default: 'inr',
    },
    paymentMethodType: {
        type: String,
        required: true,
        default: 'card',
    },
    status: {
        type: String,
        required: true,
    }
},{timestamps: true});

const Receipt = mongoose.model('Receipt',receiptSchema);

export default Receipt;