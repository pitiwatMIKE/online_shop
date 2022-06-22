const asyncHandler = require("express-async-handler");
const { Order, Product, User, Address } = require("../db/models");
const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLICE_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

// @desc    payment with omise
// @route   POST /api/orders/payment
// @access  protected
const payment = asyncHandler(async (req, res) => {
  const { email, amount, token } = req.body;

  try {
    const customer = await omise.customers.create({
      email,
      card: token,
    });

    const charge = await omise.charges.create({
      amount: Math.round(amount),
      currency: "thb",
      customer: customer.id,
    });

    res.json({
      amount: charge.amount,
      status: charge.status,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
});

// @desc    get Orders
// @route   GET /api/orders/
// @access  protected
const getOrders = asyncHandler(async (req, res) => {
  let status = req.query.status || [true, false];
  const orders = await Order.findAll({
    where: { userId: req.user.id, shippingStatus: status },
    order: [["id", "DESC"]],
  });
  if (orders) {
    res.json(orders);
  }
});

// @desc    get OrderItems
// @route   GET /api/orders/items?
// @access  protected
const getOrderItems = asyncHandler(async (req, res) => {
  const getUserId = req.query.userId || req.user.id;
  const order = await Order.findOne({
    where: { userId: getUserId, id: req.query.orderId },
  });

  if (order) {
    const idItems = order.orderItems.map((item) => item.id);
    let orderItems = await Product.findAll({ where: { id: idItems } });

    orderItems = orderItems.map((item, index) => ({
      ...item.dataValues,
      qty: order.orderItems[index].qty,
    }));
    res.json(orderItems);
  } else {
    throw new Error(`Not found Order id: ${req.query.orderId}`);
  }
});

// @desc    create order
// @route   POST /api/orders/create
// @acess   protected
const create = asyncHandler(async (req, res) => {
  const order = await Order.create({ ...req.body, userId: req.user.id });
  if (order) {
    res.json(order);
  }
});

// @desc    get Orders not shipped.
// @route   GET /api/orders/shipping?
// @access  protected
const getOrderShippingStatus = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    where: { shippingStatus: req.query.status },
    order: [["userId", "DESC"]],
    include: {
      model: User,
      attributes: ["email"],

      include: {
        model: Address,
      },
    },
  });
  if (orders) {
    res.json(orders);
  }
});

// @desc    update Orders
// @route   PUT /api/order/update/:id
// @access  protected
const update = asyncHandler(async (req, res) => {
  req.body.shippingDate = Date.now();
  await Order.update({ ...req.body }, { where: { id: req.params.id } });
  res.json({ message: "update success" });
});

module.exports = {
  payment,
  getOrders,
  getOrderItems,
  create,
  getOrderShippingStatus,
  update,
};
