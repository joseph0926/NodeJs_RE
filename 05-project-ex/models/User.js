import mongoose from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "이름을 입력해주세요"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "이메일을 입력해주세요"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "이메일을 확인해주세요",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "비밀번호를 입력해주세요"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default mongoose.model("User", UserSchema);
