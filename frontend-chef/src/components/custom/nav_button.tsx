import { socket } from "@/utils/socket";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import OrdersProps from "@Globaltypes/orders";
import { useState } from "react";

export default function Nav_button({ link, isCollapsed, index }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusi, setstatusi] = useState<string | null>(null);

  function tablehandler(data: OrdersProps) {
    console.log(`Table ${link.id} received ${JSON.stringify(data)}`);
    if (data.status === "orderd") {
      setstatusi("order");
    }
    localStorage.setItem(`table:${link.id}`, JSON.stringify(data));
  }

  socket.on(`table:${link.id}`, tablehandler);

  return isCollapsed ? (
    <Tooltip key={index} delayDuration={0}>
      <TooltipTrigger asChild>
        <a
          onClick={() => {
            setSearchParams({ tab: link.id });
          }}
          className={cn(
            buttonVariants({
              variant:
                searchParams.get("tab") == link.id ? "secondary" : "ghost",
              size: "icon",
            }),
            "h-9 w-9"
          )}
        >
          <Book className="h-4 w-4" />
          <span className="sr-only">{"H" + link.number}</span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {"H" + link.number}
        {statusi && (
          <span className="ml-auto text-muted-foreground">
            <Badge variant="outline">{statusi}</Badge>
          </span>
        )}
      </TooltipContent>
    </Tooltip>
  ) : (
    <a
      key={index}
      onClick={() => {
        setSearchParams({ tab: link.id });
      }}
      className={cn(
        buttonVariants({
          variant: searchParams.get("tab") == link.id ? "secondary" : "ghost",
          size: "sm",
        }),
        "justify-start"
      )}
    >
      <Book className="mr-2 h-4 w-4" />
      {"H" + link.number}
      {statusi && (
        <span className={cn("ml-auto")}>
          <Badge variant="outline">{statusi}</Badge>
        </span>
      )}
    </a>
  );
}
