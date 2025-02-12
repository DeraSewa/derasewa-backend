import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

// Function to generate a JWT
const generateJWT = (userId) => {
    return jwt.sign({ userId }, secretKey);
};

// Function to verify a JWT
const verifyJWT = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export { generateJWT, verifyJWT };
