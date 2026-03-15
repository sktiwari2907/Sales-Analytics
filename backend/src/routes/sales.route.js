import express from "express";
import * as salesController from "../controllers/sales.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/getData", salesController.getData);
router.post("/saveData", salesController.saveData);
router.post("/getDashboardData", salesController.getDashboardData);
router.post("/getFilterPanelData", salesController.getFilterPanelData);

export default router;