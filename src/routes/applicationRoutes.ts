import { Router } from "express";
import { addApplication } from "../controllers/applicationControllers";

const router = Router()

router.post('/application',addApplication)

export default router; 