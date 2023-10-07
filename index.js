const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const server = express();
dotenv.config();
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);
server.use(express.json());
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

const userRoute = require("./routes/userRoutes");

server.use("/user", userRoute);
