const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  login,
} = require("../controllers/UserControllers");

router.post("/create-account", createUser);
router.get("/getAllUsers", getUsers);
router.post("/login", login);

module.exports = router;
