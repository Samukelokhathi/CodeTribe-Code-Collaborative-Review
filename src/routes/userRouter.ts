import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { getUser, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.use(protect);

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
