require("dotenv").config();

const mockData = require("./MOCK_DATA.json");
const Job = require("./models/Job");

const connectDb = require("./db/connect");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);

    await Job.create(mockData);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
