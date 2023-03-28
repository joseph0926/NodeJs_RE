// mongoose를 이용한 스키마(모델) 작업

import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "이름을 작성해주세요"],
    trim: true,
    maxlength: [20, "이름은 최대 20자를 넘을수없습니다"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Task", TaskSchema);
