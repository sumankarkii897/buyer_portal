import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async () => {
    try {
        const MONGO_URI : string = process.env.MONGO_URI as string;

        await mongoose.connect(MONGO_URI).then(()=> {
    console.log("MongoDB connected successfully")
})
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1);
    }
}
