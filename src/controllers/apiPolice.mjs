import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;

const checkAPIKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // Normalize both keys for comparison
    const normalizedApiKey = apiKey ? apiKey.replace(/['"]/g, '') : ''; // Remove quotes if present
    const normalizedStoredApiKey = API_KEY.replace(/['"]/g, ''); // Remove quotes if present

    if (normalizedApiKey && normalizedApiKey === normalizedStoredApiKey) {
        next(); // API key is valid, proceed to the next middleware or route handler
    } else {
        res.status(403).json({
            status: "error",
            message: "Forbidden: Invalid API Key"
        });
    }
};

export default checkAPIKey;
