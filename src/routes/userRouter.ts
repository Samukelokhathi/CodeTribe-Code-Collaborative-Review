import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.use(protect);

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
