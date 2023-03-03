const router = require("express").Router();
const User = require("../models/User.model");
const Restaurant = require("../models/Restaurant.model");
const { findByIdAndUpdate } = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/add", async (req, res, next) => {
  /* console.log(req.body.userData.id); */
  const user = req.body.userData
 /*  const user = await findByIdAndUpdate(userId) */
  console.log(user)


});
module.exports = router;
