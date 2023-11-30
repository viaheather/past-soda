const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("/Users/heather/Bootcamp/past-soda/controllers/thoughtsController.js");

// /api/thoughts/
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:routeId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
