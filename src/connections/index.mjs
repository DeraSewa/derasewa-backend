import mongoose from 'mongoose';

const connectMongoDB = async (url) => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export { connectMongoDB };
