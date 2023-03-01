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
    email: req.body.email,
    passwordHash: hashedPassword,
  });
  res.status(201).json({ message: "User created" });
});

// Login
router.post("/login", async (req, res, next) => {
  // Check for user
  const matchedUsers = await User.find({ email: req.body.email });
  console.log(req.body);
  if (matchedUsers.length) {
    const currentUser = matchedUsers[0];
    // Check password
    if (bcrypt.compareSync(req.body.password, currentUser.passwordHash)) {
      // Generate token
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: { user: { email: currentUser.email, id: currentUser._id } },
        },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
        }
      );
      res.status(200).json({ token });
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
    res.json(req.payload.data.user);
  }
});

module.exports = router;