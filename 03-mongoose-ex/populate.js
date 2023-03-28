import * as dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import product from "./models/product.js";
import productsJson from "./products.json" assert { type: "json" };

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await product.deleteMany();
    await product.create(productsJson);
    console.log("데이터 푸쉬 성공");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start();
