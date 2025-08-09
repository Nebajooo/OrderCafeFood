import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.databaseURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ Database connection failed: ${error.message}`);
    process.exit();
  }
};

export default connectDB;
