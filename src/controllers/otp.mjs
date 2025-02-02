import crypto from "crypto";
import Otp from "../models/otp.mjs";

const generateOtp = async (email, type) => {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in the database with type
    const otpEntry = new Otp({ email, otp, type });
    await otpEntry.save();

    return otp;
};

const validateOtp = async (email, otp, type) => {
    const otpEntry = await Otp.findOne({ email, otp, type });

    if (otpEntry) {
        // OTP is valid
        await Otp.deleteOne({ _id: otpEntry._id }); // Delete OTP after validation
        return true;
    }

    // OTP is invalid
    return false;
};


export { generateOtp, validateOtp };
