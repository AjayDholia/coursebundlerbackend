import express from "express";
import { changePassword, getMyProfile, login, logout, register, updateProfile, updateprofilepicture } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/Auth.js";

const router = express.Router();

// to register a user use this route 
router.route("/register").post(register)

router.route("/login").post(login);

// Login
// Logout
router.route("/logout").get(logout);
// get my profile
router.route("/me").get(isAuthenticated,getMyProfile);
// change password 
router.route("/changepassword").put(isAuthenticated,changePassword);
// update profile
router.route("/updateprofile").put(isAuthenticated,updateProfile);
// update profile picture
router.route("/updateprofilepicture").put(isAuthenticated,updateprofilepicture);
// forget password
// reset password

// Add to playlist
// remove from playlist

export default router