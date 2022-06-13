const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Product } = require("../db/models");

// @desc    get all products
// @route   /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
  let pageSize = 4;
  let page = req.query.page || 1;
  let keyword = req.query.search || null;
  let condition = keyword ? { name: { [Op.substring]: keyword } } : {};

  let { rows, count } = await Product.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    where: condition,
    offset: pageSize * (page - 1),
    limit: pageSize,
  });

  count = Math.ceil(count / pageSize);

  if (rows) {
    res.json({ products: rows, maxPage: count });
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
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
