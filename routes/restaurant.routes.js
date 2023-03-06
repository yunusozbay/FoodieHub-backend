const router = require("express").Router();
const User = require("../models/User.model");
const Restaurant = require("../models/Restaurant.model");

router.post("/add", async (req, res, next) => {
  const restaurant = req.body.restaurant;
  try {
    const resto = await Restaurant.create({
      name: restaurant.name,
      image_url: restaurant.image_url,
      address: restaurant.location,
      coordinates: restaurant.coordinates,
      phone: restaurant.display_phone,
      price: restaurant.price,
      rating: restaurant.rating,
      review_count: restaurant.review_count,
    });
    const userId = req.body.userData.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { restaurants: resto } },
      { new: true }
    );
    console.log(updatedUser);
    res
      .status(201)
      .json({ message: "Restaurant created and added to the list of user" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.body.userData.id;
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
    const userId = req.body.userData.id;
    const restoId = req.body.restaurant._id
    const currentUser = await User.findByIdAndUpdate(userId, {$pull: { restaurants: restoId } }, {new:true});

    res.status(200).json({currentUser});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
