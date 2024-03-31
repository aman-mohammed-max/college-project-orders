import axios from "axios";
import {
  CircleUserRound,
  LogOut,
  ScanLine,
  Settings,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Out from "@Globaltypes/res.out";
import TableProps from "@Globaltypes/table";
import Dishe_card from "@/components/custom/dishe_card";
import { Button, buttonVariants } from "@/components/ui/button";
import QrReader from "react-web-qr-reader";
import validUrl from "valid-url";
import Category_card from "@/components/custom/category_card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Url from "@/lib/apiurl";
import { cn } from "@/lib/utils";
import FoodProps from "@Globaltypes/food";

export default function Home() {
  const [table, settable] = useState<TableProps | undefined | null>(undefined);
  const [Foods, setFoods] = useState<FoodProps[]>([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`${Url.table}/${id}`).then((res: { data: Out }) => {
      if (res.data.status === "success" && id) {
        settable(res.data.data);
      } else if (res.data.status === "error" && id) {
        console.error(res.data.message);
      } else if (res.data.status === "idle" && id) {
        settable(null);
      }
    });
    axios.get(`${Url.foods}`).then((res: { data: Out }) => {
      if (res.data.status === "success") {
        setFoods(res.data.data);
      } else if (res.data.status === "error") {
        console.error(res.data.message);
      }
    });
  }, [id]);

  const handleScan = (result: any) => {
    if (result) {
      if (validUrl.isUri(result.data)) {
        window.location.href = result.data;
      }
    }
  };
  const handleError = (error: any) => {
    console.log(error);
  };

  return (
    <div>
      <Drawer>
        <header className="flex px-2 py-1 align-middle items-center justify-between">
          <h1 className="text-3xl font-Madimi_One">Tasty</h1>
          <div className="flex justify-center items-center">
            {table ? (
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })
                )}
              >
                <h1 className="text-lg font-bold">H{table.number}</h1>
              </div>
            ) : (
              <DrawerTrigger asChild>
                <Button size="icon" variant="ghost">
                  <ScanLine size="26" />
                </Button>
              </DrawerTrigger>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none" asChild>
                <Button size="icon" variant="ghost">
                  <CircleUserRound size="26" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <Separator />

        <main className=" h-[89vh] w-full">
          <ScrollArea className="h-full w-full">
            {Foods.map((category: any) => (
              <Category_card name={category.name} key={category.id}>
                {category.ithems.map((dishe: any) => (
                  <Dishe_card
                    key={dishe.id}
                    tabID={id}
                    id={dishe.id}
                    name={dishe.name}
                    price={dishe.price}
                    image={dishe.image}
                    rating={dishe.rating}
                  />
                ))}
              </Category_card>
            ))}
            <ScrollBar />
          </ScrollArea>
        </main>
        <DrawerContent>
          <DrawerHeader className="pb-3">
            <DrawerTitle>Select Your Table</DrawerTitle>
            <DrawerDescription>Scan the QR Code of the table</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <QrReader
              delay={500}
              className="rounded-cam"
              onError={handleError}
              onScan={handleScan}
            />
          </div>

          <DrawerFooter className="pb-3 gap-3">
            <DrawerClose>
              <Button
                variant="secondary"
                className="w-full font-bold text-lg"
                size="lg"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
