require("dotenv").config();

const mockData = require("./MOCK_DATA.json");
const Job = require("./models/Job");

const connectDb = require("./db/connect");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    // await Job.deleteMany({ createdBy: "642b6dc52a133ff51de05655" });
    await Job.create(mockData);
    console.log("시드 푸시 성공!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
