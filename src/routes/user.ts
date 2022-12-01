import express from "express";
import * as userController from '../controllers/userController';
import { verifyTokenAndAuthorization } from "../routes/verifyToken";

const router = express.Router();

router.put('/:id', verifyTokenAndAuthorization, userController.updateUser);
router.delete('/:id', verifyTokenAndAuthorization, userController.deleteUser);
router.get('/find/:id', verifyTokenAndAuthorization, userController.getUser);
router.get('/', verifyTokenAndAuthorization, userController.getAllUsers);

export default router