const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose.connect(url);

const db = mongoose.connection;

db.on("Connected", () => {
  console.log("Connected to MongoDb");
});

db.on("Error", (err) => {
  console.log(`MongoDb connections error${err}`);
});

db.on("disconnected", () => {
  console.log("MongoDb disconnected");
});

process.on("SIGINT", () => {
  db.close(() => {
    console.log("MongoDb connection close through app termination");
    process.exit(0);
  });
});

module.exports = mongoose;
