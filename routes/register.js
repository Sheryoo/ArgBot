const express = require("express");
const crypto = require("crypto");
const User = require("../models/Users");

const router = express.Router();

router.post("/register/", (req, res) => {
  let salt = crypto.randomBytes(16).toString("hex");
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ status: false ,message: "Something went wrong", data: null });
      }
      try {
        if (await User.findOne({ where: { email: req.body.email } })) {
          return res
            .status(409)
            .json({ status: false ,message: "This email already exists", data: null });
        }
        if (await User.findOne({ where: { phoneNumber: req.body.phoneNumber } })) {
          return res
            .status(409)
            .json({ status: false ,message: "This phone number already exists", data: null });
        }
        const user = await User.create({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hashedPassword,
          salt: salt,
          city: req.body.city,
          phoneNumber: req.body.phoneNumber,
        });
        const response = { email:user.email, fullName:user.fullName, phoneNumber:user.phoneNumber, city:user.city }
        res
          .status(201)
          .json({ status: true, message: "User created successfully", data: response});
      } catch (err) {
        res.status(409).json({status: false ,message: "The user already exists", data: null });
      }
    }
  );
});
module.exports = router;
