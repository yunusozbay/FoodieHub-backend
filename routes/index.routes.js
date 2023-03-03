const router = require("express").Router();
const User = require("../models/User.model");
const Restaurant = require("../models/Restaurant.model");
const { findByIdAndUpdate } = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/add", async (req, res, next) => {
  const restaurant = req.body.restaurant;
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
  const userId = req.body.userData.id
  const updatedUser = await User.findByIdAndUpdate(userId, {$push:{restaurants: resto}}, {new:true}  )
  console.log(updatedUser)
});

router.get("/displayFavRestaurants", async (req, res, next) => {
  /* const userId = req.body.userData.id */
  const userId = "64021021417bf39fd1bc77fe"
  const restos = await User.findById(userId).populate('restaurants')

  res.json(restos);
});

router.get("/updateRestaurant", async (req, res, next) => {
  const updatedRestaurant = await User.findByIdAndDelete()
  res.json("All good in here");
});

module.exports = router;

router.get("/deleteRestaurant", async (req, res, next) => {
  /* const userId = req.body.userData.id */
  const userId = "64021021417bf39fd1bc77fe"
  const deleted = await User.findByIdAndDelete()
  res.json("All good in here");
});

module.exports = router;

