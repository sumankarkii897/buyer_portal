import { Router } from "express";
import { getMyProfile, loginUser, logoutUser, registerUser } from "../controllers/authController";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/myprofile", getMyProfile);
export default router;
