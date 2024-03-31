import { useContext, useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import { TotalContext } from "@/screens/orders/table";

export type FoodProps = {
  id: any;
};

export default function Order_dishe_card(props: FoodProps) {
  const [qn, setqn] = useState<number>(0);
  //@ts-ignore
  const { settotal } = useContext(TotalContext);

  let pres: number = 100;

  useEffect(() => {}, [qn]);

  return (
    <TableRow>
      <TableCell>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <img
              src="https://via.placeholder.com/360x600"
              className=" w-24 h-16 object-cover rounded-md"
              alt=""
            />

            <div>
              <h1 className="text-lg">name</h1>
              <Rating style={{ maxWidth: 52 }} value={3} readOnly={true} />
            </div>
          </div>
          <div className="w-20">
            <p>
              ₹{pres * qn}/<sub>{qn}p</sub>
            </p>
            <div className="flex items-center w-full justify-between rounded-md mt-0.5 p-0.5 bg-secondary">
              <Button
                variant="ghost"
                onClick={() => {
                  setqn(qn - 1);
                }}
                size="sm"
                disabled={qn === 0}
                className="h-7 w-7 px-2 text-xs"
              >
                -
              </Button>
              <p className="text-xs font-bold">{qn}</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setqn(qn + 1);
                }}
                size="sm"
                className="h-7 w-7 px-2 text-xs"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
