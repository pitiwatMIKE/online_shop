const express = require("express");
const router = express.Router();
const { ADMIN } = require("../constants/roleConstant");
const {
  getProducts,
  getProduct,
  getProductLatest,
  create,
  update,
  deleteProduct,
} = require("../controllers/productController");
const { protect, permit } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadImageMidleware");

router.route("/").get(getProducts);
router.route("/latest").get(getProductLatest);
router.route("/:id").get(getProduct);
router
  .route("/create")
  .post(protect, permit(ADMIN), upload.single("imageProduct"), create);
router
  .route("/update/:id")
  .put(protect, permit(ADMIN), upload.single("imageProduct"), update);
router.route("/delete/:id").delete(protect, permit(ADMIN), deleteProduct);
module.exports = router;
