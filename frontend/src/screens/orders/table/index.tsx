import { createContext, useEffect, useState } from "react";
import db from "@/utils/localDB";
import { useParams } from "react-router-dom";
import { socket } from "@/utils/socket";
import { Separator } from "@/components/ui/separator";
import Order_dishe_card from "@/components/custom/order_dishe_card";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  alertVariants,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { BellPlus, Trash2 } from "lucide-react";
import OrdersProps, { Orders } from "@Globaltypes/orders";
import axios from "axios";
import Url from "@/lib/apiurl";

export const TotalContext = createContext<object>({});

interface ActionProps {
  [key: string]: {
    Children: string | JSX.Element;
    variant: ButtonProps["variant"];
    handler?: () => void;
    second: {
      isShow: boolean;
      Children?: string | JSX.Element;
      variant?: ButtonProps["variant"];
      handler?: () => void;
    };
  };
}

export default function Orders_table() {
  const [total, settotal] = useState<number>(0);
  const [Foods, setFoods] = useState<object[] | null>(null);
  const [Actiontype, setActiontype] = useState("confirm");

  const { id } = useParams();

  const Actions: ActionProps = {
    confirm: {
      Children: "confirm",
      variant: "default",
      handler: () => {
        axios
          .post(`${Url.orders}`, {
            foods: Foods,
            status: "orderd",
          } as Orders)
          .then((orders: { data: { data: Orders } }) => {
            socket.emit(`table:${id}`, {
              orderid: orders.data.data.id,
              status: "orderd",
            } as OrdersProps);
          });
      },
      second: {
        isShow: true,
        Children: <Trash2 />,
        variant: "outline",
        handler: () => {
          db.collection("foods").delete();
          window.location.reload();
        },
      },
    },
  };

  socket.on(`table:${id}`, (data: OrdersProps) => {
    console.log(data);
  });

  useEffect(() => {
    db.collection("foods")
      .get()
      .then((foods: Array<object>) => {
        if (foods.length === 0) {
          setFoods(null);
        } else {
          setFoods(foods);
        }
      });
  }, []);

  return (
    <>
      <header className="top-0 left-0 right-0">
        <div className="items-center justify-center flex px-2 py-3">
          <h1 className="text-3xl font-Madimi_One">Your Orders</h1>
        </div>
        <Separator />
      </header>
      <main className="p-4 space-y-3">
        <div className={cn(alertVariants(), "flex justify-between")}>
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add .</AlertDescription>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <BellPlus />
          </Button>
        </div>
        <div className="border rounded-md">
          <ScrollArea className="h-[70svh]">
            <Table>
              {!Foods && (
                <TableCaption>A list of your recent invoices.</TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex justify-between items-center py-2">
                      <h1 className="text-lg">Total : ₹{total}</h1>
                      <div className="gap-1 flex">
                        {Actions[Actiontype].second.isShow && (
                          <Button
                            variant={Actions[Actiontype].second.variant}
                            onClick={Actions[Actiontype].second.handler}
                            size="sm"
                          >
                            {Actions[Actiontype].second.Children}
                          </Button>
                        )}
                        <Button
                          variant={Actions[Actiontype].variant as any}
                          onClick={Actions[Actiontype].handler}
                          size="sm"
                        >
                          {Actions[Actiontype].Children}
                        </Button>
                      </div>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TotalContext.Provider value={{ total, settotal }}>
                <TableBody className="last:border-b">
                  {Foods &&
                    Array.isArray(Foods) &&
                    Foods?.map((food: any) => (
                      <Order_dishe_card
                        tabID={food.tabID}
                        key={food.id}
                        quality={food.quality}
                        id={food.id}
                      />
                    ))}
                </TableBody>
              </TotalContext.Provider>
            </Table>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </main>
    </>
  );
}
