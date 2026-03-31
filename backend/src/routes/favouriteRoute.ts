import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute";
import { addFavourite, getFavourites, removeFavourite } from "../controllers/favouriteController";

const router = Router();

router.use(protectRoute);

router.get("/", getFavourites);
router.post("/:propertyId", addFavourite);
router.delete("/:propertyId", removeFavourite);

export default router;