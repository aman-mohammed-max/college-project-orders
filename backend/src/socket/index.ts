import { Socket as Socketts } from "socket.io";
import TableProps from "@Globaltypes/table";
import OrdersProps from "@Globaltypes/orders";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function Socket(socket: Socketts) {
  prisma.table.findMany().then((tables) => {
    for (const table of tables) {
      socket.on(`table:${table.id}`, (value: OrdersProps) => {
        socket.broadcast.emit(`table:${table.id}`, value);
      });
    }
  });
}

export default Socket;
