import { createContext, useState } from "react";
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

export const TotalContext = createContext<object>({});

export default function Orders_table() {
  const [total, settotal] = useState<number>(0);

  return (
    <>
      <header className="top-0 left-0 right-0">
        <div className="items-center justify-center flex px-2 py-3">
          <h1 className="text-3xl font-Madimi_One">Your Orders</h1>
        </div>
        <Separator />
      </header>
      <main className="p-4">
        <div className="border rounded-md">
          <ScrollArea className="h-[77svh]">
            <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div>
                      <h1 className="text-lg">Total : ₹{total}</h1>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TotalContext.Provider value={{ total, settotal }}>
                <TableBody>
                  <Order_dishe_card id />
                  <Order_dishe_card id />
                  <Order_dishe_card id />
                  <Order_dishe_card id />
                  <Order_dishe_card id />
                  <Order_dishe_card id />
                  <Order_dishe_card id />
                  <Order_dishe_card id />
                  <Order_dishe_card id />
                  <Order_dishe_card id />
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
