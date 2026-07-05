import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`✅ MongoDB Connected : ${connInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB Error:", error);
    process.exit(1);
  }
};





export default connectDB;
