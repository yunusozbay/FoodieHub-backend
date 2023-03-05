const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", (req, res, next) => {
  res.json("Auth routes");
});

// Signup
router.post("/signup", async (req, res, next) => {
  // Hash password
  const salt = bcrypt.genSaltSync(13);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  // Create the User
  await User.create({
    username: req.body.username,
    email: req.body.email,
    passwordHash: hashedPassword,
  });
  res.status(201).json({ message: "User created" });
});

// Login
router.post("/login", async (req, res, next) => {
  // Check for user
  const matchedUsers = await User.find({
    username: req.body.username,
  }).populate("friend_requests");
  if (matchedUsers.length) {
    const currentUser = matchedUsers[0];
    // Check password
    if (bcrypt.compareSync(req.body.password, currentUser.passwordHash)) {
      // Generate token
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            user: {
              username: currentUser.username,
              id: currentUser._id,
              email: currentUser.email,
              restaurants: currentUser.restaurants,
              events: currentUser.events,
              friends: currentUser.friends,
              friend_requests: currentUser.friend_requests,
              invitations: currentUser.invitations,
            },
          },
        },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
        }
      );
      res.status(200).json({ token, currentUser });
    } else {
      res.status(403).json({ message: "Wrong password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//Verify
router.get("/verify", isAuthenticated, (req, res, next) => {
  if (req.payload) {
    return res.json(req.payload.data.user);
  }
});

module.exports = router;
