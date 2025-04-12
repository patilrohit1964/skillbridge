const express = require("express");
const router = express.Router();
const User = require("../models/user");

// api of register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const existingUser = await User.findOne(email);
    if (existingUser) {
      res.status(409).json({
        message: "Email already in user",
      });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User registered successfully ✅",
    });
  } catch (error) {
    console.error("Registration Error", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
