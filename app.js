const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const DBconnection = require("./config/db.js");

const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/.env" });

DBconnection();

const categoryRoutes = require("./routes/categories");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/categories", categoryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API Running on http://localhost:${PORT}`.rainbow.bold);
});
