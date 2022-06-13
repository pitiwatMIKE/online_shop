const asyncHandler = require("express-async-handler");
const { Product } = require("../db/models");

// @desc    get all products
// @route   /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// @desc    get prouduct id
// @route   /api/product/:id
// @access  public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
});

// @desc    get prouduct latest
// @route   /api/product/latest?amount=
// @access  public
const getProductLatest = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    order: [["createdAt", "DESC"]],
    limit: Number(req.query.amount),
  });
  res.json(products);
});

module.exports = {
  getProducts,
  getProduct,
  getProductLatest,
};
