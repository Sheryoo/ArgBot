const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found", data: null });
    }
    crypto.pbkdf2(
      password,
      user.salt,
      310000,
      32,
      "sha256",
      async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ status: false ,message: err, data: null });
        }
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return res.status(401).json({
            status: false,
            message: "Incorrect Password",
            data: null,
          });
        }
        const id = new Date().getDate();

        const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        const response = { email: user.email, fullName: user.fullName, phoneNumber: user.phoneNumber, city: user.city, token: token };
        return res.status(200).json({
          status: true,
          message: "Logged in successfully",
          data: response,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ status: false, message: error, data: null });
  }
};

router.post("/login/", login);

module.exports = router;
