const router = require("express").Router();

const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/:username", isAuthenticated ,async (req, res, next) => {
  const username = req.params["username"];
  const userProfile = await User.find({ username: username });
  console.log(userProfile);
  res.status(200).json({ ...userProfile });
});

module.exports = router; 
