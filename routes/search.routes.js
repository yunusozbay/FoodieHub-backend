const router = require("express").Router();
YELP_URL=process.env.YELP_URL
YELP_TOKEN=process.env.YELP_TOKEN

router.post("/restaurant", async (req, res, next) => {
  try {
    console.log(req.body)
      const random = await fetch(
        `${YELP_URL}/${req.body.id}`,
          {
            headers: {
              Authorization: `Bearer ${YELP_TOKEN}`,
              withCredentials: true,
            },
          }
        );
        const parsed = await random.json()
        res.json(parsed);
  } catch (error) {
      console.log(error)
  }
});


router.post("/restaurants", async (req, res, next) => {
    try {
        const allRest = await fetch(
            `${YELP_URL}/search?location=${req.body.city}&categories=restaurants&term=${req.body.food}&limit=20`,
            {
              headers: {
                Authorization: `Bearer ${YELP_TOKEN}`,
                accept: "application/json",
              },
            }
          );
          const parsed = await allRest.json()
          res.json(parsed);
    } catch (error) {
        console.log(error)
    }
});




  
  
  module.exports = router;