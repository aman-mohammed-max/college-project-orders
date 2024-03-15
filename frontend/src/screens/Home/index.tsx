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
import Dishe_card from "@/components/custom/dishe_card";
import { Button } from "@/components/ui/button";
import QrReader from "react-web-qr-reader";
import validUrl from "valid-url";
import Category_card from "@/components/custom/category_card";

export default function Home() {
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
          <div>
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost">
                <ScanLine size="26" />
              </Button>
            </DrawerTrigger>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
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
            <Category_card name="Starters">
              <Dishe_card
                name="Some Dishe"
                price={99}
                image="https://via.placeholder.com/360x600"
                rating={3}
              />
              <Dishe_card
                name="Some Dishe"
                price={99}
                image="https://via.placeholder.com/360x600"
                rating={3}
              />
              <Dishe_card
                name="Some Dishe"
                price={99}
                image="https://via.placeholder.com/360x600"
                rating={3}
              />
            </Category_card>
            <ScrollBar />
          </ScrollArea>
        </main>
        <DrawerContent>
          <DrawerHeader className="pb-3">
            <DrawerTitle>Select Your Table </DrawerTitle>
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
