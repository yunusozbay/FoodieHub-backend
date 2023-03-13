require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);
const eventRoutes = require("./routes/event.routes");
app.use("/events", eventRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

const restaurantRoutes = require("./routes/restaurant.routes");
app.use("/restaurants", restaurantRoutes);

const searchRoutes = require("./routes/search.routes");
app.use("/search", searchRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
