import { TableCell, TableRow } from "@/components/ui/table";
import Url from "@/lib/apiurl";
import axios from "axios";
import { useEffect, useState } from "react";

interface FoodsProps {
  id: string;
  qn: number;
}

export default function Foods(props: FoodsProps) {
  const [food, setfood] = useState<any>();
  useEffect(() => {
    axios.get(`${Url.foods}/${props.id}`).then((res) => {
      if (res.data.status === "error") {
        console.error(res.data.message);
      } else if (res.data.status === "success") {
        setfood(res.data.data);
        console.log(res.data.data);
      }
    });
  }, []);
  return (
    <TableRow>
      <TableCell className="font-medium w-32">
        <img
          className="w-24 h-16 object-cover rounded-md"
          src={food?.image}
          alt=""
        />
      </TableCell>
      <TableCell>{food?.name}</TableCell>
      <TableCell className="text-right">{props.qn}</TableCell>
      {/* <TableCell className="text-right">$250.00</TableCell> */}
    </TableRow>
  );
}
