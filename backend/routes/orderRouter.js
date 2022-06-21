const express = require("express");
const router = express.Router();
const { USER, ADMIN } = require("../constants/roleConstant");
const { protect, permit } = require("../middlewares/authMiddleware");
const { payment, create } = require("../controllers/orderController");

router.route("/payment").post(protect, permit(USER, ADMIN), payment);
router.route("/create").post(protect, permit(USER, ADMIN), create);

module.exports = router;
