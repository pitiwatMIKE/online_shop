const asyncHandler = require("express-async-handler");
const { User } = require("../db/models");
const generateToken = require("../utils/generateToken");

// @desc    Login
// @route   POST /api/users/login
// @access  protected
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  if (user) {
    if (await user.comparePassword(password)) {
      res.json({
        id: user.id,
        user: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(422);
      throw new Error("Invalid Password");
    }
  } else {
    res.status(404);
    throw new Error("Not Found User");
  }
});

// @desc    Register
// @route   POST /api/users/register
// @access  public
const register = asyncHandler(async (req, res) => {
  const userAlredy = await User.findAll({ where: { email: req.body.email } });

  if (userAlredy.length === 0) {
    const user = await User.create(req.body);

    res.json({
      id: user.id,
      name: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(409);
    throw Error("this user is alredy");
  }
});

// @desc    Update User
// @route   PUT /api/users/update
// @access  protected
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const updateUser = await user.update({ ...req.body });

  res.json({
    id: updateUser.id,
    firstName: updateUser.firstName,
    lastName: updateUser.lastName,
    email: updateUser.email,
    role: updateUser.role,
  });
});

module.exports = {
  login,
  register,
  updateUser,
};
