import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, // {
        //     //These options are deprecated in newer MongoDB Node.js drivers (post-4.0.0) and are no longer needed with the latest Mongoose versions, so i'm commenting them out too.
        //     // useNewUrlParser: true,
        //     // useUnifiedTopology: true
        // }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
