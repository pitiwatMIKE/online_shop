const express = require("express");
const app = express();
const path = require("path");
var morgan = require("morgan");
const { notFound, errorHandle } = require("./middlewares/errorMiddleWare");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const addressRouter = require("./routes/addressRoute");
const orderRouter = require("./routes/orderRouter");
require("dotenv").config();
app.use(morgan("tiny"));
app.use(express.json());

// route
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);

// db:migrate and db:seed
app.get("/reset/db", async (req, res) => {
  try {
    await require("./resetdb")();
    res.send("reset database success");
  } catch (e) {
    res.status(500);
    console.log(e);
  }
});

// static
app.use("/static", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/server", (_, res) => {
    res.send("server is runing ...");
  });
}
//Error handle
app.use(notFound);
app.use(errorHandle);

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is runnig mode ${ENV} on port ${PORT}`)
);
