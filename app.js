// Import libraries
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

// Import routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const notFound = require("./middleware/notFound");

// Connect to the database
const sequelize = require("./models/database");
sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Define express app
const app = express();
const API = process.env.API_URI;
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(`${API}`, registerRoute);
app.use(`${API}`, loginRoute);
app.use(notFound);

app.listen(3030, () => {
  console.log("The server is running on : http://localhost:3030/api/v1/");
});
