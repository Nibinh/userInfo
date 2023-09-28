const { json } = require("express");
const User = require("../models/user");

const addUser = async (req, res) => {
  try {
    const { name, email, age, role, salary } = req.body;

    const isExisting = await User.findOne({ email });
    if (isExisting) return res.status(400).send("Email already registred here");
    if (!name || !email || !age || !role || !salary)
      return res.status(400).send("Fill all Feilds");

    await User.create({
      name,
      email,
      age,
      role,
      salary,
    });
    return res.status(200).send("User Registered");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured" + error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(400).send("no user found");
    return res.status(200).json({ message: "User Found", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured" + error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    //filter
    let query;
    if (req.query.role) {
      const qurole = req.query.role;
      query = User.find({ role: qurole });
    } else {
      query = User.find();
    }
    //sorting logic
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      query = query.sort("-createdAt");
    }
    //paginatoin
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const userCount = await User.countDocuments();
      if (skip >= userCount) {
        console.log(userCount);
        return res.status(400).send("Page not Found");
      }
    }
    if (req.query.search) {
      const search = {};
      search.name = { $regex: req.query.search, $options: "i" };
      query = query.find(search);
      console.log(query);
    }

    const users = await query;

    return res.status(200).json({ message: "Data send", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured" + error.message });
  }
};
module.exports = {
  addUser,
  getUser,
  getAllUsers,
};
