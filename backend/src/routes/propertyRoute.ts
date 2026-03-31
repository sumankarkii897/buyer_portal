import { Router } from "express";
import { createProperty, getAllProperties, getSingleProperty } from "../controllers/propertyController";
import { authorizeRole } from "../middleware/authorizeRole";
import { protectRoute } from "../middleware/protectRoute";
const router = Router();
// router.use(protectRoute);
router.post("/create",protectRoute, authorizeRole("seller"),  createProperty);
router.get("/", getAllProperties);
router.get("/:id", getSingleProperty);

export default router;