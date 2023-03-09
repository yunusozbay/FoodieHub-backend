const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");
const uploader = require("../middlewares/cloudinary.config.js");

//All users
router.get("/", async (req, res, next) => {
  const allUsers = await User.find();
  res.json({ allUsers });
});

//Show profile
router.get("/:id", async (req, res, next) => {
  const oneUser = await User.findById(req.params.id).populate(
    "restaurants friends events friend_requests invitations"
  );
  console.log(oneUser);
  res.json({ oneUser });
});

//One user
router.get("/:id/details", async (req, res, next) => {
  const oneUser = await User.findById(req.params.id).populate(
    "restaurants friends events"
  );
  console.log(oneUser);
  res.json({ oneUser });
});

//Update user
router.post("/:id/update", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body},
      { new: true }
    ).populate("restaurants friends events friend_requests invitations");
    console.log(updatedUser);
    res.status(200).json({ updatedUser });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.post(
  "/avatar/:id/update",
  uploader.single("userPhotos"),
  async (req, res, next) => {
    try {
      let image = "";
      if (!req.file) {
        res.status(200).json({ message: "no image" });
      } else {
        image = req.file.path;
      }
      console.log(image);
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {...req.body, image_url: image}, {new:true});
      console.log(updatedUser);
      res.status(200).json({ updatedUser });
    } catch (err) {
      console.log("Ohh nooo, error", err);
    }
  }
);

module.exports = router;
