import mongoose, { now } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "제품명을 입력해주세요"],
  },
  price: {
    type: Number,
    required: [true, "금액을 입력해주세요"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE}는 지원되지 않는 옵션입니다",
    },
  },
});

export default mongoose.model("Product", ProductSchema);
