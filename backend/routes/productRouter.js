const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  getProductLatest,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router.route("/latest").get(getProductLatest);
router.route("/:id").get(getProduct);
module.exports = router;
