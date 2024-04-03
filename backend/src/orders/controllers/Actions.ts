import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Out from "@Globaltypes/res.out";

const prisma = new PrismaClient();

class Action {
  create(req: Request, res: Response) {
    const { status, foods } = req.body;
    prisma.order
      .create({
        data: {
          status,
          foods,
        },
      })
      .then((order) => {
        res.json({ status: "success", data: order, code: 200 } as Out);
      })
      .catch((err) => {
        res.json({
          status: "error",
          error: err,
          code: 500,
          message: "didn't create, try again",
          errorFrom: "database create",
        } as Out);
      });
  }
}

export default new Action();
