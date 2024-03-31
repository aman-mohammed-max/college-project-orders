import { createRef, useEffect, useState } from "react";
import axios from "axios";
import { Nav } from "@/components/custom/nav";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Url from "@/lib/apiurl";
// @ts-ignore
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Main from "@/Layout/Home/main";
import Out from "@Globaltypes/res.out";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [tables, settables] = useState();
  const [searchParams] = useSearchParams();

  const numberRef = createRef<HTMLInputElement>();

  useEffect(() => {
    axios
      .get(`${Url.table}/`)
      .then(function (res: { data: Out }) {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        } else if (res.data.status === "success") {
          settables(res.data.data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    axios
      .post(`${Url.table}/`, { number: numberRef.current?.value.toString() })
      .then((res) => {
        if (res.data.status === "error") {
          toast.error("Error creating table");
          throw new Error(res.data.message);
        } else if (res.data.status === "success") {
          toast.success("Table created successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error creating table");
      });
  }

  return (
    <div className="flex h-full">
      <div className="w-72">
        <div className="px-2 py-1 flex align-middle justify-between">
          <DropdownMenu>
            <h3 className="text-lg font-medium ml-1">Tables</h3>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-7 w-7 focus:outline-none"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Create Table</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form className="px-2 py-1" onSubmit={handleSubmit}>
                <Label htmlFor="picture">Enter the label number</Label>
                <Input type="number" ref={numberRef} />

                <Button
                  variant="secondary"
                  className="w-full mt-2 focus:outline-none focus:ring-none"
                  type="submit"
                >
                  Create
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator />
        {
          // @ts-ignore
          !(tables?.length == 0) ? (
            <Nav
              // @ts-ignore
              links={tables?.sort((a, b) => a.number - b.number)}
              isCollapsed={false}
            />
          ) : (
            <h1 className="font-medium text-center mt-3">There is no tables</h1>
          )
        }
      </div>
      <Separator orientation="vertical" />
      {searchParams.get("tab") && <Main />}
    </div>
  );
}

export default Home;
