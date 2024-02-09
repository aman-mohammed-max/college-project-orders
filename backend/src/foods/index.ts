import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

router.get("/", (rq: Request, rs: Response) => {
  rs.json({ hello: "hgdsdg" });
});

export default router;
