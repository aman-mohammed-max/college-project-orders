import { Utensils, ReceiptIndianRupee } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function Layout_Home() {
  return (
    <div className="h-screen">
      <Outlet />
      <div className="fixed bottom-0 left-0 right-0">
        <div className="grid grid-cols-2 h-12">
          <button className="inline-flex justify-center whitespace-nowrap items-center bg-secondary text-secondary-foreground hover:bg-secondary/80  broder-r border-r-2 gap-0.5 text-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <Utensils size={20} strokeWidth={"2.5px"} />
            <p>Foods</p>
          </button>
          <button className="inline-flex justify-center whitespace-nowrap items-center bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-0.5 text-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <ReceiptIndianRupee size={20} strokeWidth={"2.5px"} />
            <p>Orders</p>
          </button>
        </div>
      </div>
    </div>
  );
}
