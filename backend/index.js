const express = require("express");
const app = express();
const path = require("path");
const { notFound, errorHandle } = require("./middlewares/errorMiddleWare");
const userRouter = require("./routes/userRouter");

require("dotenv").config();
app.use(express.json());

// route
app.use("/api/users", userRouter);

//Error handle
app.use(notFound);
app.use(errorHandle);

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

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is runnig mode ${ENV} on port ${PORT}`)
);
