const express = require("express");
const router = express.Router();
const { USER, ADMIN } = require("../constants/roleConstant");
const { protect, permit } = require("../middlewares/authMiddleware");

const {
  register,
  login,
  getMyAccount,
  updateMyAccount,
  getUsers,
  getUserById,
  update,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(protect, permit(ADMIN), getUsers);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/my_account").get(protect, permit(USER, ADMIN), getMyAccount);
router
  .route("/my_account/update")
  .put(protect, permit(USER, ADMIN), updateMyAccount);

router.route("/update/:id").put(protect, permit(ADMIN), update);
router.route("/delete/:id").delete(protect, permit(ADMIN), deleteUser);
router.route("/:id").get(protect, permit(ADMIN), getUserById);

module.exports = router;
