import { sendMail } from "./mail.mjs";
import { generateOtp, validateOtp } from "./otp.mjs";
import User from "../models/user.mjs"; // Import the User model
import generateReferralCode from "./referralCode.mjs";
import bcrypt from 'bcrypt'; // Import bcryptjs
import { generateToken, verifyToken } from "./jwt.mjs"; // Import JWT utilities

const validateUserAccount = async (req, res) => {
    const { firstName, lastName, email, password, usingReferralCode, referralCode } = req.body;
    const user = await User.findOne({ email });

    // Validation logic
    if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
        return res.status(400).json({ type: "error", message: 'Invalid first name', payload: null });
    }

    if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
        return res.status(400).json({ type: "error", message: 'Invalid last name', payload: null });
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ type: "error", message: 'Invalid email address', payload: null });
    }

    if(user){
        return res.status(400).json({ type: "error", message: 'Email is already registered', payload: null });
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || typeof password !== 'string' || !passwordPattern.test(password)) {
        return res.status(400).json({
            type: "error",
            message: 'Invalid password. Must be at least 8 characters long and include at least one capital letter, one small letter, one number, and one special character.',
            payload: null
        });
    }

    // Check referral code if used
    if (usingReferralCode) {
        if (!referralCode || typeof referralCode !== 'string' || referralCode.trim() === '' || referralCode.trim().length !== 8) {
            return res.status(400).json({ type: "error", message: 'Invalid referral code. Must be 8 characters long.', payload: null });
        }

        // Validate referral code from User model
        const referredUser = await User.findOne({ referralCode: referralCode.trim() });
        if (!referredUser) {
            return res.status(400).json({ type: "error", message: 'Referral code is invalid', payload: null });
        }
    }

    try {
        const otp = await generateOtp(email, "register-user");
        const payload = {
            email,
            firstName,
            lastName,
            otp
        };
        await sendMail({ type: 1, payload });

        // If validation passes
        res.status(200).json({ type: "success", message: 'User account validated successfully', payload: null });
    } catch (error) {
        res.status(500).json({ type: "error", message: 'Error generating OTP or sending email', payload: null });
    }
};

const registerUserAccount = async (req, res) => {
    const { firstName, lastName, email, password, otp, usingReferralCode, referralCode } = req.body;
    const userReferralCode = generateReferralCode();

    try {
        // Verify the OTP
        const isOtpValid = await validateOtp(email, otp, "register-user")
        if (!isOtpValid) {
            return res.status(400).json({ type: "error", message: 'Invalid or expired OTP', payload: null });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password and generated referral code
        const potentialReferringUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            referralCode: userReferralCode
        });
        await potentialReferringUser.save();

        // Account created, update DeraCoin
        await User.findByIdAndUpdate(potentialReferringUser._id, { $inc: { deraCoin: 200 } });

        if (usingReferralCode) {
            const referringUser = await User.findOne({ referralCode: referralCode.trim() });
            if (referringUser) {
                // Someone used referral code
                await User.findByIdAndUpdate(referringUser._id, { $inc: { deraCoin: 20 } });

                // Update the newly registered user
                await User.findByIdAndUpdate(potentialReferringUser._id, { $inc: { deraCoin: 100 } });
            }
        }

        res.status(201).json({ type: "success", message: 'User account created successfully', payload: null });
    } catch (error) {
        res.status(500).json({ type: "error", message: 'Error creating user account', payload: null });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ type: "error", message: 'Email and password are required.', payload: null });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ type: "error", message: 'Invalid email or password.', payload: null });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ type: "error", message: 'Invalid email or password.', payload: null });
        }

        // Generate a token without expiration
        const jwtToken = generateToken(user._id);

        // Respond with token
        res.status(200).json({ type: "success", message: 'Login successful', payload: jwtToken });
    } catch (error) {
        res.status(500).json({ type: "error", message: 'Server error', payload: null });
    }
}

export { validateUserAccount, registerUserAccount, loginUser };
