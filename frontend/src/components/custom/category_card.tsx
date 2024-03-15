import { ReactNode } from "react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

export type WrapperProps = {
  children?: ReactNode;
  name: string;
};

function Category_card(props: WrapperProps) {
  return (
    <div className="shadow-md rounded-lg border m-2">
      <div className="h-full w-full p-2 px-4">
        <h2 className="text-xl font-bold">{props.name}</h2>
      </div>
      <Separator />
      <Carousel className="p-3">
        <CarouselContent className="-ml-1">{props.children}</CarouselContent>
      </Carousel>
    </div>
  );
}

Category_card.defaultProps = {
  name: "Category",
};

export default Category_card;
