const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Product } = require("../db/models");

// @desc    get all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
  let pageSize = 12;
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
// @route   GET /api/products/:id
// @access  public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json({
    id: product.id,
    name: product.name,
    price: product.price,
    desc: product.desc,
    imageProduct: product.imageProduct,
  });
});

// @desc    get prouduct latest
// @route   GET /api/products/latest?amount=
// @access  public
const getProductLatest = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    order: [["createdAt", "DESC"]],
    limit: Number(req.query.amount),
  });
  res.json(products);
});

// @desc    create product
// @route   POST /api/prodcuts/create
// @access  protected
const create = asyncHandler(async (req, res) => {
  if (req.imageFileName) {
    req.body.imageProduct = "/static/images/imageProduct/" + req.imageFileName;
  }
  const product = await Product.create(req.body);
  res.json(product);
});

// @desc    update Product
// @route   PUT /api/products/update/:id
// @access  protected
const update = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ where: { id: req.params.id } });
  if (product) {
    if (req.imageFileName) {
      req.body.imageProduct =
        "/static/images/imageProduct/" + req.imageFileName;
    }
    const response = await product.update({ ...req.body });
    res.json(response);
  } else {
    res.status(404);
    throw new Error(`Not Found Product id: ${req.params.id}`);
  }
});

// @desc    Delete Product
// @route   DELTE /api/products/delete/:id
// @access  protected
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteProduct = await Product.destroy({ where: { id: id } });
  if (deleteProduct) {
    res.json(`Delete Product id:${id} success`);
  } else {
    res.status(404);
    throw new Error(`Product id:${id} Not Found`);
  }
});

module.exports = {
  getProducts,
  getProduct,
  getProductLatest,
  create,
  update,
  deleteProduct,
};
