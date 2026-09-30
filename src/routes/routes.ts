import { Router } from "express";
import { getAllProjects, addProject, assignUserToProject } from "../controllers/projectAuth";
import { protect } from "../middleware/authMiddleware";

const router = Router()


router.post('/project', protect, addProject)
router.get('/projects', getAllProjects)
router.post('/:id/members', assignUserToProject)

export default router