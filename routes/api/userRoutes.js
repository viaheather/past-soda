const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("/Users/heather/Bootcamp/past-soda/controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
