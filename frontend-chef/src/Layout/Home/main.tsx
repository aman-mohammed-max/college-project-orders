import axios from "axios";
import Url from "@/lib/apiurl";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableProps from "@Globaltypes/table";
import Out from "@Globaltypes/res.out";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QrCode, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Foods from "@/components/custom/foods";

export default function Main() {
  const [searchParams] = useSearchParams();
  const [table, settable] = useState<TableProps>();
  const [orders, setorders] = useState<object | null>();

  function deletehandel() {
    const id = searchParams.get("tab");
    axios.delete(`${Url.table}/${id}`).then((res: { data: Out }) => {
      if (res.data.status === "error") {
        toast.error("Something want wrong");
      } else if (res.data.status === "success") {
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    const ordere = JSON.parse(
      localStorage.getItem(`table:${searchParams.get("tab")}`) as string
    );
    axios
      .get(`${Url.table}/${searchParams.get("tab")}`)
      .then((res: { data: Out }) => {
        if (res.data.status === "error") {
          toast.error(res.data.message);
          throw new Error(res.data.message);
        } else if (res.data.status === "success") {
          settable(res.data.data);
        }
      });
    axios.get(`${Url.orders}/${ordere.orderid}`).then((res: { data: Out }) => {
      if (res.data.status === "error") {
        toast.error(res.data.message);
        throw new Error(res.data.message);
      } else if (res.data.status === "success") {
        setorders(res.data.data);
        console.log(res.data.data);
      }
    });
  }, [searchParams.get("tab")]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full px-3 py-3">
        <h1 className="font-medium text-2xl">{"H" + table?.number}</h1>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <QrCode />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-3 pb-0">
              <div className="grid gap-2">
                <div className="space-y-2 text-center">
                  <h4 className="font-medium leading-none">QR Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <Separator />
                <div className="flex flex-col justify-center p-3 gap-2 pt-1">
                  <img
                    src={table?.QRCode}
                    alt="table image"
                    className="border rounded-md"
                  />
                  <a
                    download={`${table?.id}.H${table?.number}.png`}
                    href={table?.QRCode}
                    className={cn(
                      buttonVariants({
                        variant: "secondary",
                        size: "lg",
                      }),
                      "w-full"
                    )}
                  >
                    Download
                  </a>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2 />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Delete</h4>
                  <p className="text-sm text-muted-foreground">
                    do you want to delete this table
                  </p>
                </div>
                <div className="flex gap-1 w-full justify-end">
                  <Button>Cancel</Button>
                  <Button onClick={deletehandel}>Delete</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="secondary">Cancel</Button>
          <Button variant="secondary">Take it</Button>
        </div>
      </div>
      <Separator />
      <div className="w-full h-[90%] flex justify-center">
        <ScrollArea className="h-full w-11/12 border-x">
          <Table>
            {
              // @ts-ignore
              orders?.foods.length == 0 && (
                <TableCaption className="text-center">
                  There is no orders
                </TableCaption>
              )
            }
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  {
                    // @ts-ignore
                    orders?.foods.length + " " + "items"
                  }
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Quality</TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                // @ts-ignore
                orders?.foods.map((food: any) => (
                  <Foods key={food.id} id={food.id} qn={food.quality} />
                ))
              }
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
