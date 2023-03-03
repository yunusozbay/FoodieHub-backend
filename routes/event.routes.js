const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/new", (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
