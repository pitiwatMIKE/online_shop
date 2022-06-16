const express = require("express");
const { ADMIN, USER } = require("../constants/roleConstant");
const { create, getAddress } = require("../controllers/addressControler");
const { protect, permit } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, permit(USER, ADMIN), getAddress);
router.route("/").post(protect, permit(USER, ADMIN), create);

module.exports = router;
