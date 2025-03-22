const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    vehicleType: { type: String },
    vehicleDetails: { type: String, trim: true },
    profileImage: { type: String, trim: true }, // Path to profile image
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
