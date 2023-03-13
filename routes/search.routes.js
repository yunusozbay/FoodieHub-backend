const router = require("express").Router();
const axios = require('axios')
YELP_URL=process.env.YELP_URL
YELP_TOKEN=process.env.YELP_TOKEN

router.post("/restaurant", async (req, res, next) => {
  try {
      const random = await axios.get(
        `${YELP_URL}/${req.body.id}`,
          {
            headers: {
              Authorization: `Bearer ${YELP_TOKEN}`,
              withCredentials: true,
            },
          }
        );
        res.json(random.data);
  } catch (error) {
      console.log(error)
  }
});


router.post("/restaurants", async (req, res, next) => {
    try {
        const allRest = await axios.get(
            `${YELP_URL}/search?location=${req.body.city}&categories=restaurants&term=${req.body.food}&limit=20`,
            {
              headers: {
                Authorization: `Bearer ${YELP_TOKEN}`,
                accept: "application/json",
              },
            }
          );
          res.json(allRest.data);
    } catch (error) {
        console.log(error)
    }
});




  
  
  module.exports = router;