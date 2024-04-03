import express, { Router } from "express";
const router: Router = express.Router();

import Actions from "@app/orders/controllers/Actions";
import Get from "@app/orders/controllers/Get";

router.post("/", Actions.create);
router.get("/:id", Get.byid);

export default router;
