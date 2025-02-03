import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    hosterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Assuming you have a User model for hosts
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    numberOfRooms: {
        type: Number,
        required: true,
    },
    hasBedroom: {
        type: Boolean,
        required: true,
    },
    hasKitchen: {
        type: Boolean,
        required: true,
    },
    hasBathroom: {
        type: Boolean,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String], // Array of image URLs
        required: true,
    },
    coordinates: {
        type: [Number], 
        required: true
    },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;