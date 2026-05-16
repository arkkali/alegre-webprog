import { Router } from "express";
import { User } from "../models/User.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { formatUser } from "../utils/formatUser.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = req.body.password;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (user.role === "Viewer") {
      return res.status(403).json({ message: "Viewers cannot log in." });
    }
    if (user.status !== "active") {
      return res
        .status(403)
        .json({ message: "This account is inactive. Contact an administrator." });
    }

    const token = signToken(user);
    res.json({ token, user: formatUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message || "Login failed." });
  }
});

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      contactNumber,
      age,
    } = req.body;

    const contact = String(contactNumber || "").replace(/\D/g, "");
    if (contact.length !== 11) {
      return res
        .status(400)
        .json({ message: "Contact number must be exactly 11 digits." });
    }

    const created = await User.create({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim().toLowerCase(),
      username: String(username).trim(),
      password,
      role: "User",
      age: Number(age),
      gender: "Male",
      status: "active",
      contact,
      address: "",
    });

    res.status(201).json({ user: formatUser(created) });
  } catch (e) {
    if (e.code === 11000) {
      return res
        .status(400)
        .json({ message: "That email or username is already registered." });
    }
    res.status(400).json({ message: e.message || "Registration failed." });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    res.json({ user: formatUser(user) });
  } catch {
    res.status(401).json({ message: "Invalid session." });
  }
});

export default router;
