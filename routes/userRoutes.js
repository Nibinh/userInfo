const express = require("express");
const router = express.Router();

const user = require("../controller/userController");

router.post("/register", user.addUser);
router.get("/get/:id", user.getUser);
router.get("/get", user.getAllUsers);

module.exports = router;
