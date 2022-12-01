import express from "express";
const router = express.Router();
import * as projectController from '../controllers/projectController';
import { verifyTokenAndAuthorization } from "./verifyToken";

router.post("/", verifyTokenAndAuthorization, projectController.createProject);
router.put('/:id', verifyTokenAndAuthorization, projectController.updateProject);
router.delete('/:id', verifyTokenAndAuthorization, projectController.deleteProject);
router.get('/find/:id', projectController.getProject);
router.get('/', projectController.getAllProjects);

export default router