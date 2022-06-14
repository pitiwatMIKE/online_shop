const asyncHandler = require("express-async-handler");
const { Address } = require("../db/models");
// @desc    Create Address
// @route   POST /api/address
// @access  protected
const create = asyncHandler(async (req, res) => {
  const createAddress = await Address.create(req.body);
  res.json(createAddress);
});

module.exports = {
    create
}
