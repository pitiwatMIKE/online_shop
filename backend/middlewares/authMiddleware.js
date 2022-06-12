const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findOne({
        where: { id: decode.id },
        attributes: { exclude: ["password"] },
      });

      if (req.user === null) {
        res.status(401);
        throw new Error("Not authorized, not found user");
      }

      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      throw new Error("Not authorized, token faild");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const permit = (...permittedRoles) => {
  return (req, res, next) => {
    const { user } = req;

    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      res.status(403);
      throw new Error("forbidden");
    }
  };
};

module.exports = {
  protect,
  permit,
};
