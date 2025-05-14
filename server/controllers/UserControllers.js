const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");

const generateToken = require("../Utils/jsonToken");

const createUser = async (req, res) => {
  const body = req.body;
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(body.password, salt, async (err, hash) => {
        const createduser = await user.create({
          Name: body.Name,
          password: hash,
          email: body.email,
        });
        const userData = createduser.toJSON();
        delete userData.password;
        return res.status(201).send(userData);
      });
    });
  } catch (err) {
    return console.log("Error");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    const allUsersData = users.map((u) => {
      const userObj = u.toJSON();
      delete userObj.password;
      return userObj;
    });

    delete allUsersData.password;
    res
      .status(200)
      .send({ message: "Successfully fetched", users: allUsersData });
  } catch (err) {
    res.send(err);
  }
};

const login = async (req, res) => {
  const { Name, password } = req.body;
  try {
    const User = await user.findOne({
      where: { Name: Name },
    });

    if (User) {
      const passwordValid = await bcrypt.compare(password, User.password);
      if (!passwordValid) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      const userData = User.toJSON();
      delete userData.password;
      return res.status(200).json({
        message: "Successfully Logged In",
        user: userData,
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createUser, getUsers, login };
