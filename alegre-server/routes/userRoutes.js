import { Router } from "express";
import { User } from "../models/User.js";
import { forbidEditor, requireAuth } from "../middleware/auth.js";
import { formatUser } from "../utils/formatUser.js";

const router = Router();

router.use(requireAuth);
router.use(forbidEditor);

router.get("/", async (req, res) => {
  try {
    const docs = await User.find().sort({ createdAt: -1 });
    res.json({ users: docs.map((d) => formatUser(d)) });
  } catch (e) {
    res.status(500).json({ message: e.message || "Failed to load users." });
  }
});

router.post("/", async (req, res) => {
  try {
    const b = req.body;
    const contactDigits = String(b.contact || "").replace(/\D/g, "");
    const created = await User.create({
      firstName: String(b.firstName).trim(),
      lastName: String(b.lastName).trim(),
      email: String(b.email).trim().toLowerCase(),
      username: String(b.username).trim(),
      password: b.password,
      role: b.role || "User",
      age: Number(b.age),
      gender: b.gender || "Male",
      status: b.status === "inactive" ? "inactive" : "active",
      contact: contactDigits,
      address: String(b.address || "").trim(),
    });
    res.status(201).json({ user: formatUser(created) });
  } catch (e) {
    if (e.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or username is already in use." });
    }
    res.status(400).json({ message: e.message || "Could not create user." });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const b = req.body;
    if (b.firstName != null) user.firstName = String(b.firstName).trim();
    if (b.lastName != null) user.lastName = String(b.lastName).trim();
    if (b.email != null) user.email = String(b.email).trim().toLowerCase();
    if (b.username != null) user.username = String(b.username).trim();
    if (b.role != null) user.role = b.role;
    if (b.age != null) user.age = Number(b.age);
    if (b.gender != null) user.gender = b.gender;
    if (b.status != null) user.status = b.status;
    if (b.contact != null) {
      user.contact = String(b.contact).replace(/\D/g, "");
    }
    if (b.address != null) user.address = String(b.address).trim();
    if (b.password && String(b.password).length >= 8) {
      user.password = b.password;
    }

    await user.save();
    res.json({ user: formatUser(user) });
  } catch (e) {
    if (e.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or username is already in use." });
    }
    res.status(400).json({ message: e.message || "Could not update user." });
  }
});

export default router;
