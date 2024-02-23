import mongoose from "mongoose";
import { MONGO_URI } from "../env";
import logger from "jet-logger";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGO_URI as string);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.err(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
