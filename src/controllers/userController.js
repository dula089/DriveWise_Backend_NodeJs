const User = require("../models/user");
const UserProfile = require("../models/userProfile");
const fs = require("fs");
const path = require("path");

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find user to get email
    const user = await User.findById(userId).select("email username");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find profile or return empty profile with email
    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.json({
        email: user.email,
        username: user.username,
      });
    }

    // Return combined user and profile data
    res.json({
      email: user.email,
      username: user.username,
      name: profile.name,
      phone: profile.phone,
      location: profile.location,
      vehicleType: profile.vehicleType,
      vehicleDetails: profile.vehicleDetails,
      profileImage: profile.profileImage,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, phone, location, vehicleType, vehicleDetails, profileImage } =
      req.body;

    // Find or create profile
    let profile = await UserProfile.findOne({ userId });

    if (!profile) {
      profile = new UserProfile({
        userId,
        name,
        phone,
        location,
        vehicleType,
        vehicleDetails,
        profileImage,
      });
    } else {
      // Update existing profile
      profile.name = name;
      profile.phone = phone;
      profile.location = location;
      profile.vehicleType = vehicleType;
      profile.vehicleDetails = vehicleDetails;

      // Only update profile image if a new one is provided
      if (profileImage) {
        profile.profileImage = profileImage;
      }
    }

    await profile.save();

    res.json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user.userId;

    // Get the relative path to the uploaded file
    const relativePath = `uploads/profiles/${req.file.filename}`;

    // Find user profile to update or create
    let profile = await UserProfile.findOne({ userId });

    // If profile exists and has an existing image, delete the old file
    if (profile && profile.profileImage) {
      try {
        const oldImagePath = path.join(__dirname, "..", profile.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (err) {
        console.error("Error deleting old profile image:", err);
        // Continue even if deletion fails
      }
    }

    // Return the image URL
    res.status(200).json({
      message: "Profile image uploaded successfully",
      imageUrl: relativePath,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
