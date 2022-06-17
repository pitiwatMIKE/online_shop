const asyncHandler = require("express-async-handler");
const { Address } = require("../db/models");

// @desc  get addess user
// @route GET /api/addrss
// @access protected
const getAddress = asyncHandler(async (req, res) => {
  const userAddress = await Address.findOne({
    where: { userId: req.user.id },
    attributes: { exclude: ["id", "createdAt", "updatedAt", "userId"] },
  });
  if (userAddress) {
    res.json(userAddress);
  } else {
    res.json(null);
  }
});

// @desc    Create and update Address
// @route   POST /api/address
// @access  protected
const create = asyncHandler(async (req, res) => {
  const addressAlready = await Address.findOne({
    where: { userId: req.user.id },
  });

  if (!addressAlready) {
    // create
    const address = await Address.create({ ...req.body, userId: req.user.id });
    res.json(address);
  } else {
    // update
    const address = await addressAlready.update({ ...req.body });
    res.json(address);
  }
});

module.exports = {
  getAddress,
  create,
};
