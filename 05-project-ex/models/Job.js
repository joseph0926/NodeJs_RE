import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "회사명을 입력해주세요"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "포지션을 입력해주세요"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "사용자를 입력해주세요"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
