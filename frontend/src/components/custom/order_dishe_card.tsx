import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import { TotalContext } from "@/screens/orders/table";
import FoodProps from "@Globaltypes/food";
import Url from "@/lib/apiurl";
import db from "@/utils/localDB";

export type Order_dishe_cardProps = {
  id: any;
  quality: number;
  tabID: string;
};

export default function Order_dishe_card(props: Order_dishe_cardProps) {
  const [qn, setqn] = useState<number>(props.quality);
  const [food, setfood] = useState<FoodProps>();

  //@ts-ignore
  const { settotal } = useContext(TotalContext);

  useEffect(() => {
    if (qn === 0 || qn === undefined) {
      db.collection("foods").doc({ id: props.id.toString() }).delete();
      window.location.reload();
    } else {
      db.collection("foods").add(
        {
          id: props.id.toString(),
          quality: qn,
          tabID: props.tabID.toString(),
        },
        props.id.toString()
      );
    }
  }, [qn]);

  useEffect(() => {
    axios.get(`${Url.foods}/${props.id}`).then((res: { data: any }) => {
      if (res.data.status === "error") {
        console.error(res.data.message);
      } else if (res.data.status === "success") {
        setfood(res.data.data);
        settotal((prev: number) => prev + (res.data.data.price as number) * qn);
      }
    });
  }, []);

  return (
    <TableRow>
      <TableCell>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <img
              src={food?.image}
              className="w-24 h-16 object-cover rounded-md"
              alt=""
            />

            <div>
              <h1 className="text-lg">{food?.name}</h1>
              <Rating
                style={{ maxWidth: 52 }}
                value={food?.rating as number}
                readOnly={true}
              />
            </div>
          </div>
          <div className="w-20">
            <p>
              ₹{(food?.price as number) * qn}/<sub>{qn}p</sub>
            </p>
            <div className="flex items-center w-full justify-between rounded-md mt-0.5 p-0.5 bg-secondary">
              <Button
                variant="ghost"
                onClick={() => {
                  setqn(qn - 1);
                  settotal((prev: number) => prev - (food?.price as number));
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
                  settotal((prev: number) => prev + (food?.price as number));
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
