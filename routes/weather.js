const express = require("express");
const router = express.Router();
const User = require("../models/Users");

const authMiddleware = require("../middleware/auth");

router.post("/get-weather", authMiddleware, async (req, res) => {
  const user = await User.findOne({ where: { email: req.user.email } });
  const city = user.city;
  APIresult = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_TOKEN}&q=${city}&days=7&aqi=no&alerts=no`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  APIresult = await APIresult.json();
  result = await APIresult["forecast"]["forecastday"];
  for (let i = 0; i < result.length; i++) {
    result[i] = {
      minCelsius: result[i]["day"]["mintemp_c"],
      maxCelsius: result[i]["day"]["maxtemp_c"],
      date: result[i]["date"],
      icon: `https:${result[i]["day"]["condition"]["icon"]}`,
    };
  }
  res.send({ result: result });
});
module.exports = router;
