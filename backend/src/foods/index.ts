import express, { Router } from "express";
const router: Router = express.Router();

import Get from "@app/foods/controllers/Get"

router.get("/", Get.list);
router.get("/:id", Get.byid);

export default router;
