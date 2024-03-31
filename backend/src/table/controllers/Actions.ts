import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import TableProps from "@Globaltypes/table";
import Out from "@Globaltypes/res.out";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";

const prisma = new PrismaClient();

async function generateUniqueID(): Promise<string> {
  let uniqueID: string;
  let existingItem: { id: string } | null;
  do {
    uniqueID = uuidv4();
    existingItem = await prisma.table.findUnique({
      where: { id: uniqueID },
    });
  } while (existingItem !== null);

  return uniqueID;
}

class Action {
  create(req: Request, res: Response) {
    const { number }: { number: TableProps["number"] } = req.body;

    console.log(typeof number);

    generateUniqueID()
      .then((id) => {
        console.log(id);
        QRCode.toDataURL(`http://localhost:5173/tb/${id}`)
          .then((qrCodeDataURL) => {
            prisma.table
              .create({
                data: {
                  id,
                  QRCode: qrCodeDataURL,
                  number,
                },
              })
              .then((table) => {
                res.json({ status: "success", data: table, code: 200 } as Out);
              })
              .catch((err) => {
                res.status(500).json({
                  status: "error",
                  error: err,
                  code: 500,
                  message: "didn't create, try again",
                  errorFrom: "database create",
                } as Out);
              });
          })
          .catch((err) => {
            res.status(500).json({
              status: "error",
              error: err,
              code: 500,
              message: "didn't create, try again",
              errorFrom: "generateQRCodeURL",
            } as Out);
          });
      })
      .catch((err) => {
        res.status(500).json({
          status: "error",
          error: err,
          code: 500,
          message: "didn't create, try again",
          errorFrom: "generateUniqueID",
        } as Out);
      });
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    prisma.table
      .delete({
        where: {
          id,
        },
      })
      .then(() => {
        res.json({ status: "success", message: "Table deleted" } as Out);
      })
      .catch((err) => {
        res.status(500).json({
          status: "error",
          error: err,
          code: 500,
          message: "didn't delete",
          errorFrom: "delete",
        } as Out);
      });
  }
}

export default new Action();
