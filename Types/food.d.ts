export default interface FoodProps {
  id: string;
  name: string;
  image: string;
  price: number;
  QMTO: Boolean;
  details: Object;
  description: string;
  orders: Object;
  Category: object;
  categoryId?: String;
  rating: number;
}
