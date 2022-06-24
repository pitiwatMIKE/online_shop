const asyncHandler = require("express-async-handler");
const { User } = require("../db/models");
const generateToken = require("../utils/generateToken");
const { Op } = require("sequelize");

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
        email: user.email,
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
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(409);
    throw Error("This email has already been used.");
  }
});

// @desc  Get My Account
// @route /api/users/my_account
// @access protected
const getMyAccount = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: {
      exclude: ["password", "id", "role", "createdAt", "updatedAt"],
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Not found User");
  }
});

// @desc  Update My Account
// @route /api/users/my_account/update
// @access protected
const updateMyAccount = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.user.id },
  });

  if (!user) {
    res.status(404);
    throw new Error("Not Found User");
  }

  const userAlready = await User.findOne({
    where: { email: req.body.email, id: { [Op.ne]: user.id } },
  });

  if (userAlready) {
    res.status(409);
    throw new Error("This email has already been used.");
  }

  if (req.body.password === "") {
    delete req.body.password;
  }

  const update = await user.update({ ...req.body });
  res.json({
    firstName: update.firstName,
    lastName: update.lastName,
    email: update.email,
  });
});

// @desc    get all users
// @route   GET /api/users
// @access  protected
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// @desc    get user by id
// @route   GET /api/users/:id
// @access  protected
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error(`Not Found User id: ${req.params.id}`);
  }
});

// @desc    update user
// @route   PUT /api/update/:id
// access   protected
const update = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  if (!user) {
    res.status(404);
    throw new Error("Not Found User");
  }

  if (req.body.password === "") {
    delete req.body.password;
  }

  const update = await user.update(
    { ...req.body },
    { attributes: { exclude: ["password", "createdAt", "updatedAt"] } }
  );

  res.json({
    id: update.id,
    email: update.email,
    firstName: update.firstName,
    lastName: update.lastName,
    role: update.role,
  });
});

// @desc    Delete user
// @route   DELTE /api/users/delete/:id
// @access  protected
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteUser = await User.destroy({ where: { id: id } });
  if (deleteUser) {
    res.json(`Delete User id:${id} success`);
  } else {
    res.status(404);
    throw new Error(`User id:${id} Not Found`);
  }
});

module.exports = {
  login,
  register,
  getMyAccount,
  updateMyAccount,
  getUsers,
  getUserById,
  update,
  deleteUser
};
