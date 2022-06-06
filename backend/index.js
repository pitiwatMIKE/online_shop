const express = require("express");
const app = express();
require('dotenv').config()

app.get("/server", (_, res) => {
  res.send("server is runing ...");
});

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is runnig mode ${ENV} on port ${PORT}`)
);
