import { useEffect, useState } from "react";
import db from "@/utils/localDB";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { CarouselItem } from "@/components/ui/carousel";

export type DisheProps = {
  id: any;
  tabID: any;
  name: string;
  price: number;
  image: string;
  rating: number;
};

function Dishe_card(props: DisheProps) {
  const [qn, setqn] = useState<number>(0);

  function db_headler() {
    if (qn === 0 || qn === undefined) {
      db.collection("foods").doc({ id: props.id.toString() }).delete();
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
  }

  useEffect(() => {
    db.collection("foods")
      .doc({ id: props.id.toString() })
      .get()
      .then((document: any) => {
        if (document?.quality !== undefined) {
          setqn(document.quality);
        }
      });
  }, []);

  useEffect(() => {
    db_headler();
  }, [qn]);

  return (
    <CarouselItem className="basis-1/3 pl-1">
      <Card className="overflow-hidden">
        <CardContent className="p-0 ">
          <AspectRatio ratio={1 / 1}>
            <img
              src={props.image}
              alt={props.name + " image"}
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
              className="w-full h-full"
            />
          </AspectRatio>
        </CardContent>
        <CardFooter className="p-1 pt-0.5">
          <div className="flex flex-col w-full">
            <div className="px-0.5">
              <CardTitle className=" text-base">{props.name}</CardTitle>
              <CardDescription className="px-0.5 flex justify-between">
                <p className="text-xs">₹{props.price}</p>
                <Rating
                  style={{ maxWidth: 42 }}
                  value={props.rating}
                  readOnly={true}
                />
              </CardDescription>
            </div>
            <div className="flex items-center justify-between rounded-md mt-0.5 p-0.5 bg-secondary">
              <Button
                variant="ghost"
                onClick={() => {
                  setqn((prv) => prv - 1);
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
                  setqn((prv) => prv + 1);
                }}
                size="sm"
                className="h-7 w-7 px-2 text-xs"
              >
                +
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </CarouselItem>
  );
}

Dishe_card.defaultProps = {
  name: "Some Dishe",
  price: 99,
  image: "https://via.placeholder.com/360x600",
  rating: 0,
};

export default Dishe_card;
