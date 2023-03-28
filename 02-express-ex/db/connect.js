import mongoose from "mongoose";

// mongoose를 이용한 DB 연결

const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
