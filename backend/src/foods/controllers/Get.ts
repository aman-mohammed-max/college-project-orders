import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Out from "@Globaltypes/res.out";
import FoodProps from "@Globaltypes/food";
const prisma = new PrismaClient();

const FakeData: any = [
  {
    id: 0,
    name: "fish",
    ithems: [
      {
        id: 1,
        name: "fish1",
        price: 65,
        image: "https://via.placeholder.com/360x600",
        rating: 3,
      },
      {
        id: 2,
        name: "fish2",
        price: 99,
        image: "https://via.placeholder.com/360x600",
        rating: 3,
      },
      {
        id: 3,
        name: "fish3",
        price: 95,
        image: "https://via.placeholder.com/360x600",
        rating: 3,
      },
    ],
  },
  {
    id: 1,
    name: "meat",
    ithems: [
      {
        id: 4,
        name: "meat1",
        price: 23,
        image: "https://via.placeholder.com/360x600",
        rating: 3,
      },
      {
        id: 5,
        name: "meat2",
        price: 89,
        image: "https://via.placeholder.com/360x600",
        rating: 3,
      },
      {
        id: 6,
        name: "meat3",
        price: 56,
        image: "https://via.placeholder.com/360x600",
        rating: 3,
      },
    ],
  },
];

class Get {
  byid(req: Request, res: Response) {
    const { id } = req.params;
    // prisma.food
    //   .findUnique({
    //     where: {
    //       id,
    //     },
    //   })
    //   .then((food) => {
    //     if (!food) {
    //       res.json({
    //         status: "idle",
    //         code: 404,
    //         message: "Food not found",
    //       } as Out);
    //     } else if (food) {
    //       res.json({ status: "success", data: food, code: 200 } as Out);
    //     }
    //   })
    //   .catch((err) => {
    //     res.status(500).json({
    //       status: "error",
    //       error: err,
    //       code: 500,
    //       message: "didn't get",
    //       errorFrom: "database get",
    //     } as Out);
    //   });
    // @ts-ignore
    const food = FakeData.find((food: FoodProps) => food.id === Number(id));
    if (!food) {
      res.json({
        status: "idle",
        code: 404,
        message: "Food not found",
      } as Out);
    } else if (food) {
      res.json({ status: "success", data: food, code: 200 } as Out);
    }
  }

  list(req: Request, res: Response) {
    // prisma.food
    //   .findMany()
    //   .then((foods) => {
    //     res.json({
    //       status: "success",
    //       data: foods,
    //       code: 200,
    //     } as Out);
    //   })
    //   .catch((err) => {
    //     res.status(500).json({
    //       status: "error",
    //       error: err,
    //       code: 500,
    //       message: "didn't get",
    //       errorFrom: "database get",
    //     } as Out);
    //   });
    res.json({
      status: "success",
      data: FakeData,
      code: 200,
    } as Out);
  }
}

export default new Get();
