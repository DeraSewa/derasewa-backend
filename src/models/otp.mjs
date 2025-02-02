import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    type: { type: String, required: true }, // Add type field
    createdAt: { type: Date, default: Date.now, index: { expires: '3m' } } // OTP expires after 3 minutes
});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;