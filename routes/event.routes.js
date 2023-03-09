const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Restaurant = require("../models/Restaurant.model");

const router = require("express").Router();

//Create an event
router.post("/new", async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userData._id);
    console.log(req.body.userData._id, user);
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
      invited_users: req.body.newEvent.invited_users,
      created_by: req.body.userData._id,
    });
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { events: newEvent._id } },
      { new: true }
    );
    const invitedUsers = await User.updateMany(
      { _id: { $in: req.body.newEvent.invited_users } },
      { $push: { invitations: newEvent._id } },
      { new: true }
    );
    console.log(invitedUsers);
    res.status(201).json({ updatedUser });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

//Show event
router.get("/:id", async (req, res, next) => {
  try {
    const foundEvent = await Event.findById(req.params.id).populate(
      "restaurant invited_users created_by"
    );
    console.log(foundEvent);
    res.status(200).json({ foundEvent });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

//Edit event
router.post("/:id/edit", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).populate("restaurant invited_users created_by");
    res.status(200).json({ updatedEvent });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

//Delete event
router.post("/:id/delete", async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

module.exports = router;
