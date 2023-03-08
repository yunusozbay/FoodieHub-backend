const router = require("express").Router();
const User = require("../models/User.model");
const Restaurant = require("../models/Restaurant.model");

router.post("/add", async (req, res, next) => {
  const restaurant = req.body.restaurant;
  try {
    const resto = await Restaurant.create({
      name: restaurant.name,
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
    );
    console.log(updatedUser);
    res.status(201).json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.body.userData._id;
    const restos = await User.findById(userId).populate("restaurants");
    res.status(200).json(restos);
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res, next) => {
  const updatedRestaurant = await User.findByIdAndDelete();
  res.status(200).json(updatedRestaurant);
});

router.post("/delete", async (req, res, next) => {
  try {
    const restoId = req.body.id;
    const restaurant = await Restaurant.findByIdAndDelete(restoId);
    res.status(200).json({ restaurant });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
