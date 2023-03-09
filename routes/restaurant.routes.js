const router = require("express").Router();
const User = require("../models/User.model");
const Restaurant = require("../models/Restaurant.model");
const uploader = require("../middlewares/cloudinary.config.js");

router.post("/add", async (req, res, next) => {
  const restaurant = req.body.restaurant;
  console.log(restaurant);
  try {
    const resto = await Restaurant.create({
      name: restaurant.name,
      alias: restaurant.alias,
      image_url: restaurant.image_url,
      location: restaurant.location,
      coordinates: restaurant.coordinates,
      phone: restaurant.display_phone,
      price: restaurant.price,
      rating: restaurant.rating,
      review_count: restaurant.review_count,
    });
    const userId = req.body.userData._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { restaurants: resto._id } },
      { new: true }
    ).populate("restaurants friends friend_requests events invitations");
    console.log(updatedUser);
    res.status(201).json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile/:id", async (req, res, next) => {
  try {
    const restoId = req.params.id;
    const restaurant = await Restaurant.findById(restoId);
    res.status(200).json({ restaurant });
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res, next) => {
  const updatedRestaurant = await User.findByIdAndDelete();
  res.status(200).json(updatedRestaurant);
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const restoId = req.params.id;
    console.log(req.body);
    const restaurant = await Restaurant.findByIdAndDelete(restoId);
    const updatedUser = await User.findById(req.body.userId).populate(
      "restaurants friends events friend_requests invitations"
    );
    console.log(updatedUser);
    res.status(200).json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/profile/:id/edit",
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
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { $push: { userPhotos: image } },
        { new: true }
      );
      console.log(updatedRestaurant);
      res.status(200).json({ updatedRestaurant });
    } catch (err) {
      console.log("Ohh nooo, error", err);
    }
  }
);
module.exports = router;
