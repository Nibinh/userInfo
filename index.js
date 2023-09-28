const express = require("express");
const dotenv = require("dotenv");

const server = express();
dotenv.config();
server.use(express.json());
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

const userRoute = require("./routes/userRoutes");

server.use("/user", userRoute);
