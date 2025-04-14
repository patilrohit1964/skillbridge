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
      return res.status(400).json({
        message: parsed.error.errors[0].message,
      });
    }

    const { email, password } = parsed?.data;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassCorrect = await argon2.verify(user.password, req.body.password);

    if (!isPassCorrect) {
      return res.status(401).json({
        message: "Invalid credentials ❌",
      });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
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

router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message:
            "User not found with this email. Please create an account first.",
        });
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000;
      await user.save();
      const html = `
      <h1>Request for reset password 🎉</h1>
      <p>Your OTP is <b>${otp}</b></p>
      <p>Valid for 10 minutes only.</p>
  `;
      await sendEmail(email, "Reset Password", html);
      return res.status(200).json({
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong. Please try again.",
      });
    }
  })
);

router.post(
  "/reset-pass",
  asyncHandler(async (req, res) => {
    try {
      const { email, newPassword, otp } = req.body;
      if (!email || !newPassword || !otp) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await User.findOne({ email, otp });
      if (!user) {
        return res.status(400).json({
          message: "User not found with this email or OTP is incorrect",
        });
      }
      if (user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "OTP has expired" });
      }
      user.password = await argon2.hash(newPassword);
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Something went wrong" });
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
