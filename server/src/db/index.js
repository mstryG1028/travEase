import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connInstance = await mongoose.connect(
      "mongodb://127.0.0.1:27017/travEase",
    );
    console.log(`✅ MongoDB Connected : ${connInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB Error:", error);
    process.exit(1);
  }
};


export default connectDB;
