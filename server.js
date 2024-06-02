const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const { sequelize } = require('./Models/SyncModel');

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));

readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database: ", err);
  });
