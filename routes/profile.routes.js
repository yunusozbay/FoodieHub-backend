const router = require("express").Router();

const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", async(req, res, next) => {
  res.json({message: "All good in profile route"})
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const userProfile = await User.findById(id);
  res.status(200).json({ userProfile });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const updateUserProfile = req.body;
  await User.findByIdAndUpdate(id, updateUserProfile);
  res.status(200).json({ message: "User profile updated properly" });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // Delete one recipe
    await User.findByIdAndDelete(id);
    res.status(200).res.json({ message: "user profile deleted properly" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
