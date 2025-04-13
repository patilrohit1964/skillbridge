const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { z } = require("zod");
const asyncHandler = require("express-async-handler");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");

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
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });
    const html = `
        <h1>Welcome to MERN App 🎉</h1>
        <p>Your OTP is <b>${otp}</b></p>
        <p>Valid for 10 minutes only.</p>
    `;
    await sendEmail(email, "verify your email", html);
    res.status(201).json({
      message: "Registered! OTP sent to your email.",
      user: {
        _id: user._id,
        email: user.email,
      },
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
      return res.status(404).json({ message: "user not found" });
    }
    const isPassCorrect = await argon2.verify(user.password, password);

    if (!isPassCorrect) {
      res.status(401).json({
        message: "Invalid credentials ❌",
      });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
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

router.post(
  "/verify-otp",
  asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      if (user.isVerified) {
        return res.status(400).json({ message: "user already verified" });
      }
      if (user.otp != otp) {
        return res.status(400).json({ message: "invalid otp" });
      }
      if (user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "otp has expired" });
      }
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
      res.status(200).json({ message: "Email verified successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "verification failed" });
    }
  })
);
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    res.json({
      message: "You are logged in ✅",
      userId: req.user,
    });
  })
);

module.exports = router;
