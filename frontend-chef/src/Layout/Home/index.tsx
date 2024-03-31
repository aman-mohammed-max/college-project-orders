import { UserNav } from "@/components/custom/user-nav";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function Layout_Home() {
  return (
    <div className="h-screen">
      <div>
        <div className="flex h-16 items-center px-4">
          <h1 className="font-Madimi_One text-3xl font-medium">Tasty Admin</h1>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <Separator />
      <Outlet />
      <Toaster />
    </div>
  );
}
