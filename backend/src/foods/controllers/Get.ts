import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


class Get {
    async byid(req: Request, res: Response) {
        const { id  } = req.params;
        const food = await prisma.food.findUnique({
            where: {
                id
            }
        });
        res.json(food);
    }
    
    async list(req: Request, res: Response) {
        const foods = await prisma.food.findMany();
        res.json(foods);
    }
}

export default new Get();