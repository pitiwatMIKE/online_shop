const express = require("express");
const router = express.Router();
const { USER } = require("../constants/roleConstant");
const { protect, permit } = require("../middlewares/authMiddleware");

const {
  register,
  updateUser,
  login,
} = require("../controllers/userController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/:id/update").put(protect, permit(USER), updateUser);

module.exports = router;
