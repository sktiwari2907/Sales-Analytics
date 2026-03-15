import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getRoles", userController.getRoles);
router.get("/getACL", authenticate, userController.getACL);

export default router;