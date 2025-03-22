const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

// Protected routes - require authentication
router.get("/profile", authMiddleware, userController.getUserProfile);
router.post(
  "/profile/update",
  authMiddleware,
  userController.updateUserProfile
);

// Profile image upload route
router.post(
  "/upload-profile-image",
  authMiddleware,
  upload.single("profileImage"),
  userController.uploadProfileImage
);

module.exports = router;
