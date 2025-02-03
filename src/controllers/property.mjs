import Property from '../models/property.mjs'; // Adjust the import path based on your project structure
import { verifyToken } from './jwt.mjs'; // Import the verifyToken function

const submitProperty = async (req, res) => {
    console.log(req.body);
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];
        
        // Verify the token and get the user ID (hosterId)
        const decoded = verifyToken(token);
        const hosterId = decoded.userId; // Assuming the JWT contains the userId

        const {
            title,
            type,
            numberOfRooms,
            hasBedroom,
            hasKitchen,
            hasBathroom,
            address,
            phoneNumber,
            price,
            description,
            images,
            coordinates
        } = req.body;

        // Validate input
        if (
            !title ||
            !type ||
            !numberOfRooms ||
            hasBedroom === undefined ||
            hasKitchen === undefined ||
            hasBathroom === undefined ||
            !address ||
            !phoneNumber ||
            !price ||
            !description ||
            !images ||
            !coordinates
        ) {
            return res.status(400).json({ type: "error", message: 'All fields are required.', payload: null });
        }

        // Create a new property instance
        const newProperty = new Property({
            hosterId,
            title,
            type,
            numberOfRooms,
            hasBedroom,
            hasKitchen,
            hasBathroom,
            address,
            phoneNumber,
            price,
            description,
            images,
            coordinates
        });

        // Save the property to the database
        await newProperty.save();

        return res.status(201).json({ type: "success", message: 'Property successfully submitted.', payload: null });
    } catch (error) {
        return res.status(500).json({ type: "error", message: 'Server error. Please try again later.', payload: null });
    }
};

export { submitProperty };
