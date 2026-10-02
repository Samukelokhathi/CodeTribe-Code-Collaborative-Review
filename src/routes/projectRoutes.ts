import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { addProject } from "../controllers/projectController";

const router = Router();

router.use(protect); // every project route needs a token

router.post("/", addProject);

export default router;
