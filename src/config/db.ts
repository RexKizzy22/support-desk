import mongoose from "mongoose";
import { MONGO_URI } from "../env";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
