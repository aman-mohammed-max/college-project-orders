import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Out from "@Globaltypes/res.out";

const prisma = new PrismaClient();

class Get {
  byid(req: Request, res: Response) {
    const { id } = req.params;
    prisma.table
      .findUnique({
        where: {
          id,
        },
      })
      .then((table) => {
        if (!table) {
          res.json({
            status: "idle",
            code: 404,
            message: "Table not found",
          } as Out);
        } else if (table) {
          res.json({ status: "success", data: table, code: 200 } as Out);
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: "error",
          error: err,
          code: 500,
          message: "didn't get",
          errorFrom: "database get",
        } as Out);
      });
  }

  async list(req: Request, res: Response) {
    prisma.table
      .findMany()
      .then((tables) => {
        res.json({ status: "success", data: tables, code: 200 } as Out);
      })
      .catch((err) => {
        res.status(500).json({
          status: "error",
          error: err,
          code: 500,
          message: "didn't get",
          errorFrom: "database get",
        } as Out);
      });
  }
}

export default new Get();
