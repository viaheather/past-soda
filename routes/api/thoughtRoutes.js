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

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(reactions).delete(reactions);

module.exports = router;
