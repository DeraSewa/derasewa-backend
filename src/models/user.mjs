import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        reqired: true,
        trim: true
    },
    email: {
        type: String,
        reqired: true,
        unique: true,
    },
    password: {
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    deraCoin:{
        type: Number,
        default: 0
    },
    referralCode: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;