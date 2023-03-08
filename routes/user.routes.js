const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");

//All users
router.get("/", async (req, res, next) => {
  const allUsers = await User.find();
  res.json({ allUsers });
});

//Show profile
router.get("/:id", isAuthenticated, async (req, res, next) => {
  console.log(req.payload);
  if (req.payload) {
    const oneUser = await User.findById(req.params.id).populate("restaurants");
    console.log(oneUser);
    res.json({ oneUser });
  }
});

//One user
router.get("/:id/details", async (req, res, next) => {
  const oneUser = await User.findById(req.params.id).populate("restaurants");
  console.log(oneUser);
  res.json({ oneUser });
});

//Update user
router.post("/:id/update", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json({ updatedUser });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

module.exports = router;
