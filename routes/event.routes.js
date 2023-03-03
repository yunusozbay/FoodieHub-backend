const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Restaurant = require("../models/Restaurant.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/new", async (req, res, next) => {
  const user = await User.findById(req.body.userData.id);
  console.log(req.body.userData.id, user);
  const newRestaurant = await Restaurant.create({
    name: req.body.restaurant.name,
    image_url: req.body.restaurant.image_url,
    address: req.body.restaurant.location,
    coordinates: req.body.restaurant.coordinates,
    phone: req.body.restaurant.phone,
    price: req.body.restaurant.price,
    rating: req.body.restaurant.rating,
    review_count: req.body.restaurant.review_count,
  });
  const newEvent = await Event.create({
    title: req.body.newEvent.title,
    restaurant: newRestaurant._id,
    date: new Date(req.body.newEvent.date),
    time: req.body.newEvent.time,
    created_by: req.body.userData.id,
  });
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $push: { events: newEvent._id } },
    { new: true }
  );
  res.status(201).json({ message: "Event created" });
});

module.exports = router;
