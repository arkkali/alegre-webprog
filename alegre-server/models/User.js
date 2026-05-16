import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// 1. Define Counter Schema to track the "U-01", "U-02" sequence
const counterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema(
  {
    // 2. Add customId to your schema definitions
    customId: {
      type: String,
      unique: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
    role: {
      type: String,
      enum: ["Admin", "Editor", "User", "Viewer"],
      default: "User",
    },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    contact: { type: String, required: true },
    address: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // 3. Generate Custom ID sequencing only for brand new users
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      const paddedSequence = String(counter.seq).padStart(2, "0");
      this.customId = `U-${paddedSequence}`;
    } catch (error) {
      return next(error);
    }
  }

  // 4. Handle password hashing logic
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export const User = mongoose.model("User", userSchema);