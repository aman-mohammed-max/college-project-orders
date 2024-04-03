import Food from "@Globaltypes/food";
export default interface OrdersProps {
  status:
    | "orderd"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled"
    | "available";
  orderid: string;
}

export interface Orders {
  id: string;
  userId: String;
  foods: Food[];
  status: OrdersProps["status"];
  createdAt?: Date;
  updatedAt?: Date;
}
