import express, { Router } from "express";
const router: Router = express.Router();

import Get from "@app/table/controllers/Get"
import Actions from "@app/table/controllers/Actions"

router.get("/", Get.list);
router.get("/:id", Get.byid);
router.post("/", Actions.create);
router.delete("/:id", Actions.delete);

export default router;
