const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found Route - ${req.originalUrl}`));
};

const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message.split("\n"),
    stack: process.env.NODE_ENV === "production" ? null : err.stack.split("\n"),
  });
};

module.exports = {
  notFound,
  errorHandle,
};
