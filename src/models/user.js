const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    refreshToken: { type: String }, // Stores the refresh token
    vehicle_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }], // Supports multiple vehicles
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

module.exports = mongoose.model("User", UserSchema);
