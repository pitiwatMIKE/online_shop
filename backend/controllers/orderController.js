const asyncHandler = require("express-async-handler");
const { Order } = require("../db/models");
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
      amount: Math.round(amo),
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

// @desc    create order
// @route   POST /api/orders/create
// @acess   protected
const create = asyncHandler(async (req, res) => {
  const order = await Order.create({ ...req.body, userId: req.user.id });

  if (order) {
    res.json(order);
  }
});

module.exports = {
  payment,
  create,
};
