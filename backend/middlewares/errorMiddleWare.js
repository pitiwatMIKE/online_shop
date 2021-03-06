const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found Route - ${req.originalUrl}`));
};

const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack
        ? err.stack.split("\n")
        : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandle,
};
