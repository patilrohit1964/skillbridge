const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { z } = require("zod");
const asyncHandler = require("express-async-handler");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// validations schemas
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 charters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password at leat must be 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "password at least must be 6 characters"),
});
//////////////////////////////////////////////////////////////////
// api of register
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const { name, email, password } = parsed.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        message: "Email already in user",
      });
    }
    // hashed pass
    const hashedPass = await argon2.hash(password);
    const user = await User.create({ name, email, password: hashedPass });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User registered successfully ✅",
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.send(400).json({
        message: parsed.error.errors[0].message,
      });
    }
    const { email, password } = parsed?.data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials ❌" });
    }
    const isPassCorrect = await argon2.verify(user.password, password);
    if (!isPassCorrect) {
      res.status(401).json({
        message: "Invalid credentials ❌",
      });
    }
    // jwt assign
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "Login successful 🤘",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  })
);
module.exports = router;
