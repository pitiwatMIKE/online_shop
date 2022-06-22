const express = require("express");
const router = express.Router();
const { USER, ADMIN } = require("../constants/roleConstant");
const { protect, permit } = require("../middlewares/authMiddleware");
const {
  payment,
  create,
  getOrders,
  getOrderItems,
} = require("../controllers/orderController");

router.route("/").get(protect, permit(USER, ADMIN), getOrders);
router.route("/order_items").get(protect, permit(USER, ADMIN), getOrderItems);
router.route("/payment").post(protect, permit(USER, ADMIN), payment);
router.route("/create").post(protect, permit(USER, ADMIN), create);

module.exports = router;
