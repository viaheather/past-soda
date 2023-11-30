const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
} = require("/Users/heather/Bootcamp/past-soda/controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);
